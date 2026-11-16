"""Offline protocol and real local-WebSocket integration tests; no live writes."""
import asyncio
import json
import random
from unittest.mock import patch
import unittest

from aiohttp import web

from pixelplace_client import (
    ALPHANUMERIC, CACHE_ALPHABET, CACHE_DIGITS, PONG_DIGITS,
    Credentials, HeartbeatConfig, MAX_PENDING, PixelplaceClient, ProtocolError,
    ServerError, cache_local, page_heartbeat, pong_alive,
)


class Tokens(unittest.TestCase):
    def test_cache_timestamp_and_alphabets(self):
        for timestamp in (1767225600, 1794830400, 1893456000):
            token = cache_local(timestamp, random.Random(timestamp))
            cursor = 0
            for index, (length, digit) in enumerate(zip(
                (3, 2, 3, 4, 3, 2, 4, 2, 3, 4), str(timestamp + 258)
            )):
                alphabet = CACHE_ALPHABET if index in (2, 4, 7) else ALPHANUMERIC
                self.assertTrue(set(token[cursor:cursor + length]) <= set(alphabet))
                cursor += length
                self.assertEqual(token[cursor].lower(), CACHE_DIGITS[int(digit)])
                self.assertEqual(token[cursor + 1], digit)
                cursor += 2
            self.assertEqual(token[cursor:], "=")

    def test_pong_timestamp_offsets_and_tail(self):
        config = HeartbeatConfig("335", 6)
        timestamp, offset = 1794830400, 37
        token = pong_alive(config, "0", now=timestamp, time_offset=offset,
                           rng=random.Random(123))
        cursor = 0
        for length, digit in zip(config.lengths(), str(timestamp + offset - 5400)):
            cursor += length
            self.assertEqual(token[cursor].lower(), PONG_DIGITS[int(digit)])
            cursor += 1
        self.assertEqual(token[cursor], "0")
        self.assertTrue(token.endswith("0="))
        self.assertTrue(4 <= len(token[cursor + 1:-2]) <= 25)

    def test_page_config_does_not_default_missing_fields(self):
        html = '<script>var CFVersion = "335";</script><div id="ls"><span>6</span></div>'
        self.assertEqual(page_heartbeat(html), HeartbeatConfig("335", 6))
        for bad in ("<title>Just a moment...</title>", '<div id="ls">6</div>'):
            with self.assertRaises(ProtocolError):
                page_heartbeat(bad)

    def test_credentials_partial_and_repr(self):
        with self.assertRaises(ValueError):
            Credentials("dummy-id")
        c = Credentials("dummy-id", "dummy-key", "dummy-token")
        self.assertNotIn("dummy", repr(c))
        self.assertNotIn("dummy", repr(PixelplaceClient(credentials=c)))

    def test_invalid_parameters(self):
        for kwargs in ({"board_id": True}, {"reconnect_attempts": 100},
                       {"base_url": "https://user:password@example.com"},
                       {"base_url": "http://example.com"}):
            with self.assertRaises((ProtocolError, ValueError)):
                PixelplaceClient(**kwargs)
        with self.assertRaises(ProtocolError):
            pong_alive(HeartbeatConfig("335", 1000000), "0", now=1794830400)


class Integration(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.received = []
        self.connections = 0
        self.engineio = 3
        self.disconnect_once = False
        self.reject = False
        self.omit_canvas = False
        self.app = web.Application()
        self.app.router.add_get('/7', self.page)
        self.app.router.add_get('/api/get-painting.php', self.bootstrap)
        self.app.router.add_get('/api/ping.php', self.http_ping)
        self.app.router.add_get('/socket.io/', self.socket)
        self.runner = web.AppRunner(self.app)
        await self.runner.setup()
        self.site = web.TCPSite(self.runner, '127.0.0.1', 0)
        await self.site.start()
        port = self.site._server.sockets[0].getsockname()[1]
        self.base = f'http://127.0.0.1:{port}'
        self.client = PixelplaceClient(base_url=self.base, on_event=self.record, engineio=3,
                                       reconnect_attempts=0, heartbeat=None)
        self.applied = []

    async def asyncTearDown(self):
        await self.client.close()
        await self.runner.cleanup()

    def record(self, name, payload):
        if name in ('canvas', 'p'):
            self.applied.append((name, payload))

    async def page(self, request):
        self.assertIn('CACHE-L0CAL', request.headers)
        return web.Response(text='<script>var CFVersion="335";</script><div id="ls">6</div>')

    async def bootstrap(self, request):
        self.assertIn('CACHE-L0CAL', request.headers)
        return web.json_response({
            'host': {'wss': self.base}, 'update_version': 7,
            'user': {'id': 0, 'connected': False},
            'painting': {'id': 7, 'width': 10, 'height': 10, 'palette': [0, 1],
                         'rate': 21, 'cooldown': 0},
        })

    async def http_ping(self, request):
        self.assertIn('CACHE-L0CAL', request.headers)
        return web.Response(status=204)

    async def test_http_keepalive_accepts_no_content(self):
        await self.client.connect()
        self.assertEqual(await self.client._get('/api/ping.php'), '')

    async def socket(self, request):
        self.assertEqual(int(request.query['EIO']), self.engineio)
        self.assertEqual(request.headers['Origin'], self.base)
        ws = web.WebSocketResponse()
        await ws.prepare(request)
        self.connections += 1
        await ws.send_str('0' + json.dumps({'sid': 'local-test', 'upgrades': [],
                                          'pingInterval': 50, 'pingTimeout': 500}))
        if self.engineio == 4:
            self.assertEqual((await ws.receive()).data, '40')
        await ws.send_str('40')
        init = json.loads((await ws.receive()).data[2:])
        self.assertEqual(init, ['init', {'boardId': 7}])
        self.received.append(init)
        if self.reject:
            await ws.send_str('42["throw.error",1]')
        elif not self.omit_canvas:
            await ws.send_str('42["p",[[1,1,0,1,0,0]]]')
            await ws.send_str('42["canvas",[[],[]]]')
            await ws.send_str('42["server_time",1794830400]')
            await ws.send_str('42["ping.alive"]')
        if self.disconnect_once and self.connections == 1:
            await ws.close()
            return ws
        if self.engineio == 4:
            await ws.send_str('2')
        async for message in ws:
            if message.type.name != 'TEXT':
                break
            if message.data == '2':
                self.received.append('engine-ping')
                await ws.send_str('3')
            elif message.data == '3':
                self.received.append('engine-pong')
            elif message.data.startswith('42'):
                self.received.append(json.loads(message.data[2:]))
        return ws

    async def wait_until(self, condition):
        async with asyncio.timeout(5):
            while not condition():
                await asyncio.sleep(0.01)

    async def test_engineio3_init_order_and_both_heartbeats(self):
        await self.client.connect()
        await self.wait_until(lambda: 'engine-ping' in self.received and
                              any(isinstance(e, list) and e[0] == 'pong.alive' for e in self.received))
        self.assertEqual([e[0] for e in self.applied], ['canvas', 'p'])
        self.assertTrue(self.client.ready.is_set())
        self.assertLessEqual(abs(self.client._time_offset + int(__import__('time').time()) - 1794830400), 2)
        with self.assertRaises(PermissionError):
            await self.client.place_pixel(1, 1, 0)
        self.assertFalse(any(isinstance(e, list) and e[0] == 'p' for e in self.received))

    async def test_engineio4_uses_server_ping(self):
        self.engineio = self.client.engineio = 4
        await self.client.connect()
        await self.wait_until(lambda: 'engine-pong' in self.received)
        self.assertNotIn('engine-ping', self.received)

    async def test_rejection_is_terminal_and_not_ready(self):
        self.reject = True
        self.client.reconnect_attempts = 3
        with self.assertRaises(ServerError):
            await self.client.connect()
        self.assertFalse(self.client.ready.is_set())
        self.assertEqual(self.connections, 1)
        self.assertIsNone(self.client._session)

    async def test_reconnect_reinitializes_without_replaying_writes(self):
        self.disconnect_once = True
        self.client.reconnect_attempts = 1
        with patch('pixelplace_client.random.uniform', return_value=0.01):
            await self.client.connect()
            await self.wait_until(lambda: self.connections == 2 and self.client.ready.is_set())
        self.assertEqual(sum(isinstance(e, list) and e[0] == 'init' for e in self.received), 2)
        self.assertFalse(self.client.pending)
        self.assertFalse(any(isinstance(e, list) and e[0] == 'p' for e in self.received))

    async def test_timeout_closes_resources(self):
        self.omit_canvas = True
        with self.assertRaises(TimeoutError):
            await self.client.connect(timeout=0.2)
        self.assertIsNone(self.client._session)
        self.assertIsNone(self.client._task)

    async def test_queue_bound_and_invalid_batches(self):
        await self.client.connect()
        self.client.ready.clear()
        with self.assertRaises(ProtocolError):
            await self.client._handle('p', [[1, 1, 0, 1]] * (MAX_PENDING + 1))
        with self.assertRaises(ProtocolError):
            await self.client._handle('canvas', [[], [None]])
        self.client.pending = [[]] * MAX_PENDING
        with self.assertRaises(ProtocolError):
            await self.client._handle('p', [])

    async def test_explicit_write_packet_limits_and_no_ack_claim(self):
        await self.client.connect()
        self.client.allow_placements = True
        self.client.credentials = Credentials('dummy-id', 'dummy-key', 'dummy-token')
        self.client.metadata['user']['connected'] = True
        await self.client.place_pixel(2, 3, 1)
        await self.wait_until(lambda: ['p', [2, 3, 1, 1]] in self.received)
        with self.assertRaises(RuntimeError):
            await self.client.place_pixel(2, 3, 1)
        for x, y, c in ((-1, 0, 0), (10, 0, 0), (0, 0, True), (0, 0, 2)):
            with self.assertRaises((ProtocolError, ValueError)):
                await self.client.place_pixel(x, y, c)


if __name__ == '__main__':
    unittest.main()
