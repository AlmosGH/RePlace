"""Pixelplace's observed 2026 JSON Socket.IO protocol over WebSocket.

No polling, binary attachments, custom namespaces, browser impersonation, or
claims that emitting a placement constitutes acceptance. See README.md.
"""

from __future__ import annotations

import argparse
import asyncio
from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
import json
import math
import os
from pathlib import Path
import random
import re
import time
from typing import Any, Callable
from urllib.parse import urljoin, urlsplit, urlunsplit, urlencode

import aiohttp

ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
CACHE_ALPHABET = "gmbonjklezcfxta1234567890GMBONJKLEZCFXTA"
CACHE_DIGITS = "wskhryicam"
PONG_DIGITS = "gnbrzslxio"
MAX_BODY = 4 * 1024 * 1024
MAX_PENDING = 4096
MAX_BATCH = 32768


class ProtocolError(RuntimeError):
    """Invalid or unsupported protocol; reconnecting blindly will not fix it."""


class ServerError(ProtocolError):
    def __init__(self, code: Any):
        # Never embed a server-provided string, which might contain credentials.
        self.code = str(code) if str(code).isdigit() else "unknown"
        super().__init__(f"Server rejected the operation (throw.error {self.code})")


def integer(value: Any, name: str, low: int = 0, high: int = 2**53 - 1) -> int:
    if isinstance(value, bool):
        raise ProtocolError(f"Invalid {name}")
    if isinstance(value, str) and re.fullmatch(r"-?\d+", value):
        value = int(value)
    if not isinstance(value, int) or not low <= value <= high:
        raise ProtocolError(f"Invalid {name}")
    return value


def finite(value: Any, name: str, low: float = 0, high: float = 86400) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError):
        raise ProtocolError(f"Invalid {name}") from None
    if isinstance(value, bool) or not math.isfinite(number) or not low <= number <= high:
        raise ProtocolError(f"Invalid {name}")
    return number


def random_text(length: int, alphabet: str, rng: Any) -> str:
    # Use random(), matching the source's floor(Math.random() * length).
    return "".join(alphabet[int(rng.random() * len(alphabet))] for _ in range(length))


def cache_local(now: int | None = None, rng: Any = random) -> str:
    """Generate a fresh CACHE-L0CAL value; the '0' in L0CAL is a zero."""
    digits = str(integer(int(time.time()) if now is None else now, "timestamp") + 258)
    lengths = (3, 2, 3, 4, 3, 2, 4, 2, 3, 4)
    result = ""
    for index, digit in enumerate(digits):
        if index < len(lengths):
            alphabet = CACHE_ALPHABET if index in (2, 4, 7) else ALPHANUMERIC
            result += random_text(lengths[index], alphabet, rng)
        letter = CACHE_DIGITS[int(digit)]
        result += (letter.upper() if rng.random() < 0.5 else letter) + digit
    return result + "="


@dataclass(frozen=True)
class HeartbeatConfig:
    cf_version: str
    ls: int
    wsa: int = 6
    p_save: int = 3

    def lengths(self) -> tuple[int, ...]:
        if not re.fullmatch(r"\d+", self.cf_version):
            raise ProtocolError("CFVersion must contain decimal digits")
        return (6, 5, 9, 4, 5, int(self.cf_version[0]),
                integer(self.wsa, "wsa", 0, 32), integer(self.ls, "ls", 0, 32),
                integer(self.p_save, "pSave", 0, 32))


def pong_alive(config: HeartbeatConfig, user_digit: str, *,
               now: int | None = None, time_offset: int = 0, rng: Any = random) -> str:
    """Application heartbeat, distinct from Engine.IO ping/pong."""
    if not re.fullmatch(r"\d", user_digit):
        raise ProtocolError("Heartbeat user digit must be a decimal digit")
    timestamp = (int(time.time()) if now is None else now) + time_offset - 5400
    digits = str(timestamp)
    lengths = config.lengths()
    if not digits.isdigit() or len(digits) < len(lengths):
        raise ProtocolError("Timestamp too short for the observed heartbeat")
    token = ""
    for count, length in enumerate(lengths):
        alphabet = CACHE_ALPHABET if rng.random() >= 0.5 else ALPHANUMERIC
        token += random_text(length, alphabet, rng)
        letter = PONG_DIGITS[int(digits[count])]
        token += letter.upper() if rng.random() < 0.5 else letter
    restricted = rng.random() >= 0.5
    tail_length = int(rng.random() * (17 if restricted else 22)) + 4
    return token + user_digit + random_text(
        tail_length, CACHE_ALPHABET if restricted else ALPHANUMERIC, rng
    ) + "0="


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ls_depth = 0
        self.ls_text = ""
        self.depth = 0

    def handle_starttag(self, tag: str, attrs: list) -> None:
        if tag not in ("area", "base", "br", "col", "embed", "hr", "img", "input",
                       "link", "meta", "param", "source", "track", "wbr"):
            self.depth += 1
        if dict(attrs).get("id") == "ls":
            self.ls_depth = self.depth

    def handle_endtag(self, tag: str) -> None:
        if self.ls_depth == self.depth:
            self.ls_depth = 0
        self.depth -= 1

    def handle_data(self, data: str) -> None:
        if self.ls_depth:
            self.ls_text += data


def page_heartbeat(html: str) -> HeartbeatConfig:
    match = re.search(r"\bCFVersion\s*=\s*['\"](\d+)['\"]", html)
    parser = PageParser()
    parser.feed(html)
    if not match or not parser.ls_text.strip():
        raise ProtocolError("Page lacks CFVersion/#ls; it may be a challenge or a new version")
    config = HeartbeatConfig(match[1], integer(parser.ls_text.strip(), "ls", 0, 32))
    config.lengths()
    return config


@dataclass(repr=False)
class Credentials:
    auth_id: str = ""
    auth_key: str = ""
    auth_token: str = ""

    def __post_init__(self) -> None:
        values = (self.auth_id, self.auth_key, self.auth_token)
        if any(values) and not all(values):
            raise ValueError("Set all three PIXELPLACE_AUTH_* variables or none")
        if any(len(v) > 4096 or any(c in v for c in "\r\n;") for v in values):
            raise ValueError("Invalid credential value")

    @classmethod
    def from_environment(cls) -> Credentials:
        return cls(*(os.environ.get("PIXELPLACE_AUTH_" + key, "")
                     for key in ("ID", "KEY", "TOKEN")))

    def cookies(self) -> dict[str, str]:
        return ({"authId": self.auth_id, "authKey": self.auth_key,
                 "authToken": self.auth_token} if self.auth_id else {})


def validate_origin(url: str, *, websocket: bool = False) -> str:
    parsed = urlsplit(url)
    allowed = ("https", "wss") if websocket else ("https",)
    local = parsed.hostname in ("localhost", "127.0.0.1", "::1")
    if (parsed.username or parsed.password or not parsed.hostname or parsed.query or
            parsed.fragment or (parsed.scheme not in allowed and not
            (local and parsed.scheme in (("http", "ws") if websocket else ("http",))))):
        raise ValueError("Use HTTPS/WSS (HTTP/WS allowed on loopback), without credentials or query")
    return url.rstrip("/")


@dataclass
class PixelplaceClient:
    board_id: int = 7
    base_url: str = "https://pixelplace.io"
    credentials: Credentials = field(default_factory=Credentials, repr=False)
    engineio: int = 4
    # Observed on the live page on 2026-11-16. Pass None to discover from HTML.
    heartbeat: HeartbeatConfig | None = field(default_factory=lambda: HeartbeatConfig("335", 6))
    bootstrap_file: Path | None = None
    socket_url: str | None = None
    on_event: Callable[[str, Any], None] | None = field(default=None, repr=False)
    reconnect_attempts: int = 3
    allow_placements: bool = False
    default_palette: tuple[int, ...] = ()

    def __post_init__(self) -> None:
        self.board_id = integer(self.board_id, "board ID", 1)
        self.base_url = validate_origin(self.base_url)
        self.engineio = integer(self.engineio, "Engine.IO version", 3, 4)
        integer(self.reconnect_attempts, "reconnect attempts", 0, 10)
        if len(self.default_palette) > 256:
            raise ValueError("Default palette exceeds 256 colors")
        for color in self.default_palette:
            integer(color, "default palette index", 0, 255)
        self.ready = asyncio.Event()
        self.events: Counter[str] = Counter()
        self.sent: Counter[str] = Counter()
        self.pending: list = []
        self.metadata: dict = {}
        self.error: Exception | None = None
        self._task: asyncio.Task | None = None
        self._ws: aiohttp.ClientWebSocketResponse | None = None
        self._session: aiohttp.ClientSession | None = None
        self._write_lock = asyncio.Lock()
        self._place_lock = asyncio.Lock()
        self._time_offset = 0
        self._next_placement = 0.0
        self._cooldown_until = 0.0

    async def __aenter__(self) -> PixelplaceClient:
        await self.connect()
        return self

    async def __aexit__(self, *args: Any) -> None:
        await self.close()

    async def _get(self, path: str) -> str:
        assert self._session is not None
        url = urljoin(self.base_url + "/", path)
        for _ in range(4):
            async with self._session.get(url, headers={"CACHE-L0CAL": cache_local()},
                                         allow_redirects=False) as response:
                if response.status in (301, 302, 303, 307, 308):
                    next_url = urljoin(url, response.headers.get("Location", ""))
                    next_parts, base_parts = urlsplit(next_url), urlsplit(self.base_url)
                    if (next_parts.netloc != base_parts.netloc or
                            next_parts.scheme != base_parts.scheme):
                        raise ProtocolError("Refusing cross-origin HTTP redirect")
                    url = next_url
                    continue
                if response.status == 204:
                    return ""
                if response.status != 200:
                    raise ProtocolError(f"HTTP {response.status}; a browser session or challenge may be required")
                chunks = bytearray()
                async for chunk in response.content.iter_chunked(65536):
                    chunks.extend(chunk)
                    if len(chunks) > MAX_BODY:
                        raise ProtocolError("HTTP response exceeds the size limit")
                return chunks.decode("utf-8")
        raise ProtocolError("Too many HTTP redirects")

    async def _bootstrap(self) -> str:
        if self.heartbeat is None:
            self._heartbeat = page_heartbeat(await self._get(f"/{self.board_id}"))
        else:
            self._heartbeat = self.heartbeat
            self._heartbeat.lengths()
        if self.bootstrap_file:
            if self.bootstrap_file.stat().st_size > MAX_BODY:
                raise ProtocolError("Bootstrap file exceeds the size limit")
            data = json.loads(self.bootstrap_file.read_text(encoding="utf-8"))
        else:
            data = json.loads(await self._get(
                f"/api/get-painting.php?id={self.board_id}&connected={int(bool(self.credentials.auth_id))}"))
        if not isinstance(data, dict):
            raise ProtocolError("Expected a bootstrap object")
        try:
            painting, user = data["painting"], data["user"]
            if integer(painting["id"], "painting ID") != self.board_id:
                raise ProtocolError("Bootstrap board ID mismatch")
            self.width = integer(painting["width"], "width", 1, 65536)
            self.height = integer(painting["height"], "height", 1, 65536)
            finite(painting.get("rate", 0), "placement rate", 0, 3600000)
            finite(painting.get("cooldown", 0), "cooldown")
            palette = painting["palette"]
            if not isinstance(palette, list) or len(palette) > 256:
                raise ProtocolError("Invalid palette")
            self.palette = {integer(c, "palette index", 0, 255) for c in palette}
            if not self.palette:
                self.palette = set(self.default_palette)
            self.user_id = str(integer(user["id"], "user ID"))
            if integer(data.get("update_version", 7), "client version") > 7:
                raise ProtocolError("Server requires a newer application protocol")
            host = self.socket_url or data["host"]["wss"]
        except (KeyError, TypeError):
            raise ProtocolError("Bootstrap schema is missing required fields") from None
        if not isinstance(host, str):
            raise ProtocolError("Invalid socket host")
        if "://" not in host:
            host = "https://" + host
        host = validate_origin(host, websocket=True)
        hostname = urlsplit(host).hostname
        base_hostname = urlsplit(self.base_url).hostname
        if not self.socket_url and hostname != base_hostname and not (
                base_hostname == "pixelplace.io" and hostname and hostname.endswith(".pixelplace.io")):
            raise ProtocolError("Bootstrap advertises an unexpected socket host")
        self.metadata = data
        self._user_digit = random.choice(self.user_id)
        self._time_offset = 0
        parsed = urlsplit(host)
        return urlunsplit(("wss" if parsed.scheme in ("https", "wss") else "ws",
                           parsed.netloc, parsed.path.rstrip("/") + "/socket.io/",
                           urlencode({"EIO": self.engineio, "transport": "websocket"}), ""))

    async def connect(self, timeout: float = 30) -> None:
        if self._task is not None:
            raise RuntimeError("Client already started; close it before connecting again")
        self.error = None
        self._session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=20),
            cookie_jar=aiohttp.CookieJar(unsafe=urlsplit(self.base_url).hostname in
                                       ("127.0.0.1", "localhost", "::1")))
        # Scope HTTP cookies to the base origin; socket auth is sent in init.
        from yarl import URL
        self._session.cookie_jar.update_cookies(self.credentials.cookies(), URL(self.base_url))
        self._task = asyncio.create_task(self._supervise())
        waiter = asyncio.create_task(self.ready.wait())
        try:
            done, _ = await asyncio.wait((waiter, self._task), timeout=timeout,
                                         return_when=asyncio.FIRST_COMPLETED)
            if self._task in done:
                raise self.error or ConnectionError("Connection ended before canvas initialization")
            if not done:
                raise TimeoutError("Timed out waiting for the server canvas event")
        except BaseException:
            await self.close()
            raise
        finally:
            waiter.cancel()
            await asyncio.gather(waiter, return_exceptions=True)

    async def close(self) -> None:
        self.ready.clear()
        if self._task:
            self._task.cancel()
            await asyncio.gather(self._task, return_exceptions=True)
            self._task = None
        if self._session:
            await self._session.close()
            self._session = None
        self._ws = None
        self.pending.clear()

    async def _supervise(self) -> None:
        try:
            for attempt in range(self.reconnect_attempts + 1):
                try:
                    await self._connection()
                    raise ConnectionError("Socket closed")
                except (aiohttp.ClientConnectionError, asyncio.TimeoutError, ConnectionError):
                    if attempt >= self.reconnect_attempts:
                        raise ConnectionError("Connection lost; reconnect budget exhausted") from None
                    await asyncio.sleep(min(20, 2.5 * 2**attempt) * random.uniform(0.5, 1.5))
        except asyncio.CancelledError:
            raise
        except Exception as error:
            self.error = error
        finally:
            self.ready.clear()

    async def _emit(self, name: str, data: Any) -> None:
        async with self._write_lock:
            if self._ws is None or self._ws.closed:
                raise ConnectionError("Socket is disconnected")
            await self._ws.send_str("42" + json.dumps([name, data], separators=(",", ":")))
            self.sent[name] += 1

    async def _connection(self) -> None:
        assert self._session is not None
        self.ready.clear()
        self.pending.clear()
        url = await self._bootstrap()
        origin = urlsplit(self.base_url)
        async with self._session.ws_connect(
            url, origin=f"{origin.scheme}://{origin.netloc}", compress=15,
            max_msg_size=MAX_BODY, timeout=aiohttp.ClientWSTimeout(ws_close=5),
        ) as ws:
            self._ws = ws
            opened = initialized = False
            ping_interval, ping_timeout = 25.0, 20.0
            last_engine = next_ping = time.monotonic()
            pong_due: float | None = None
            next_hb = time.monotonic() + 120
            next_http_ping = time.monotonic() + 300
            http_ping: asyncio.Task | None = None
            canvas_due = time.monotonic() + 30
            try:
                while True:
                    now = time.monotonic()
                    if not self.ready.is_set() and now > canvas_due:
                        raise TimeoutError("Server did not initialize the canvas")
                    if opened and self.engineio == 3:
                        if pong_due is not None and now > pong_due:
                            raise ConnectionError("Engine.IO pong timed out")
                        if pong_due is None and now >= next_ping:
                            await ws.send_str("2")
                            pong_due = now + ping_timeout
                    elif opened and now - last_engine > ping_interval + ping_timeout:
                        raise ConnectionError("Engine.IO ping timed out")
                    if initialized and now >= next_hb:
                        await self._emit("hb", " ")
                        next_hb = now + random.randint(73, 92)
                    if http_ping is not None and http_ping.done():
                        http_ping.result()
                        http_ping = None
                    if self.ready.is_set() and http_ping is None and now >= next_http_ping:
                        http_ping = asyncio.create_task(self._get("/api/ping.php"))
                        next_http_ping = now + 300
                    try:
                        deadlines = [canvas_due] if not self.ready.is_set() else []
                        if opened:
                            deadlines.append((pong_due if pong_due is not None else next_ping)
                                             if self.engineio == 3 else last_engine + ping_interval + ping_timeout)
                        if initialized:
                            deadlines.append(next_hb)
                        timeout = max(0.001, min([1.0] + [deadline - time.monotonic() for deadline in deadlines]))
                        message = await ws.receive(timeout=timeout)
                    except asyncio.TimeoutError:
                        continue
                    if message.type == aiohttp.WSMsgType.ERROR:
                        raise ProtocolError("Invalid WebSocket frame received")
                    if message.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED):
                        raise ConnectionError("WebSocket closed")
                    if message.type != aiohttp.WSMsgType.TEXT:
                        raise ProtocolError("Binary Socket.IO packets are unsupported")
                    packet = message.data
                    if packet.startswith("0"):
                        if opened:
                            raise ProtocolError("Duplicate Engine.IO handshake")
                        info = json.loads(packet[1:])
                        ping_interval = finite(info["pingInterval"], "ping interval", 1, 3600000) / 1000
                        ping_timeout = finite(info["pingTimeout"], "ping timeout", 1, 3600000) / 1000
                        opened = True
                        last_engine = time.monotonic()
                        next_ping = last_engine + ping_interval
                        if self.engineio == 4:
                            await ws.send_str("40")
                    elif packet.startswith("2"):
                        last_engine = time.monotonic()
                        await ws.send_str("3" + packet[1:])
                    elif packet.startswith("3"):
                        last_engine = time.monotonic()
                        pong_due = None
                        next_ping = last_engine + ping_interval
                    elif packet.startswith("40"):
                        if not opened or initialized:
                            raise ProtocolError("Unexpected namespace connect")
                        payload = {"boardId": self.board_id, **self.credentials.cookies()}
                        await self._emit("init", payload)
                        initialized = True
                    elif packet.startswith("42"):
                        if not initialized:
                            raise ProtocolError("Event arrived before namespace initialization")
                        event = json.loads(packet[2:])
                        if not isinstance(event, list) or not 1 <= len(event) <= 2 or not isinstance(event[0], str):
                            raise ProtocolError("Unsupported Socket.IO event shape")
                        await self._handle(event[0], event[1] if len(event) > 1 else None)
                    elif packet.startswith(("1", "41", "44")):
                        raise ProtocolError("Server ended or rejected the session")
                    elif packet != "6":
                        raise ProtocolError("Unsupported Socket.IO packet")
            finally:
                if http_ping is not None:
                    http_ping.cancel()
                    await asyncio.gather(http_ping, return_exceptions=True)
                self.ready.clear()
                self.pending.clear()
                self._ws = None

    def _notify(self, name: str, payload: Any) -> None:
        if self.on_event:
            self.on_event(name, payload)

    @staticmethod
    def _batch(payload: Any) -> list:
        if not isinstance(payload, list) or len(payload) > MAX_BATCH:
            raise ProtocolError("Invalid or oversized pixel batch")
        if any(not isinstance(p, list) or not 4 <= len(p) <= 6 for p in payload):
            raise ProtocolError("Invalid pixel tuple")
        return payload

    async def _handle(self, name: str, payload: Any) -> None:
        # Do not retain arbitrary event names or raw chat/session contents.
        known = {"canvas", "p", "server_time", "ping.alive", "throw.error", "throw.error.special",
                 "rate_change", "cooldown", "cooldown_dot", "queue"}
        self.events[name if name in known else "other"] += 1
        if name == "throw.error":
            raise ServerError(payload)
        if name == "throw.error.special":
            raise ServerError(payload.get("id") if isinstance(payload, dict) else None)
        if name == "server_time":
            self._time_offset = integer(payload, "server time") - int(time.time())
        elif name == "ping.alive":
            await self._emit("pong.alive", pong_alive(
                self._heartbeat, self._user_digit, time_offset=self._time_offset))
        elif name == "canvas":
            if not isinstance(payload, list) or len(payload) != 2:
                raise ProtocolError("Expected two canvas batch lists")
            for batch in payload:
                self._batch(batch)
            self._notify("canvas", payload)
            for batch in self.pending:
                self._notify("p", batch)
            self.pending.clear()
            self.ready.set()
            return
        elif name == "p":
            self._batch(payload)
            if not self.ready.is_set():
                if (len(self.pending) >= MAX_PENDING or
                        sum(len(batch) for batch in self.pending) + len(payload) > MAX_PENDING):
                    raise ProtocolError("Pixel queue overflow before canvas initialization")
                self.pending.append(payload)
                return
        elif name == "rate_change":
            self.metadata["painting"]["rate"] = finite(payload, "placement rate", 0, 3600000)
        elif name == "cooldown":
            seconds = payload[1] if isinstance(payload, list) and len(payload) > 1 else self.metadata["painting"].get("cooldown", 0)
            self._cooldown_until = time.monotonic() + finite(seconds, "cooldown")
        elif name == "cooldown_dot":
            timestamp = finite(payload, "cooldown timestamp", 0, 10**15)
            self._cooldown_until = time.monotonic() + max(0, timestamp / 1000 - time.time())
        self._notify(name, payload)

    async def place_pixel(self, x: int, y: int, color: int) -> None:
        """Send one normal pixel. Return means sent, never accepted or committed."""
        if not self.allow_placements:
            raise PermissionError("Enable allow_placements explicitly before writing")
        if not self.ready.is_set():
            raise ConnectionError("Canvas has not initialized")
        if not self.credentials.auth_id or not self.metadata["user"].get("connected"):
            raise PermissionError("Placement requires an authenticated session")
        x, y = integer(x, "x", 0, self.width - 1), integer(y, "y", 0, self.height - 1)
        color = integer(color, "color", 0, 255)
        if not self.palette:
            raise ProtocolError("Empty palette requires the page's global palette; refusing to guess")
        if color not in self.palette:
            raise ValueError("Color is absent from the painting palette")
        # Serialize the decision with sends; never enqueue/replay offline placements.
        async with self._place_lock:
            now = time.monotonic()
            if now < max(self._next_placement, self._cooldown_until):
                raise RuntimeError("Placement rate/cooldown limit has not elapsed")
            await self._emit("p", [x, y, color, 1])
            painting = self.metadata["painting"]
            delay = max(float(painting.get("rate", 0)) / 1000,
                        float(painting.get("cooldown", 0)), 0.1)
            self._next_placement = time.monotonic() + delay

async def main_async(args: argparse.Namespace) -> None:
    heartbeat = None
    if args.cf_version is not None or args.ls is not None:
        if args.cf_version is None or args.ls is None:
            raise ValueError("Supply both --cf-version and --ls")
        heartbeat = HeartbeatConfig(args.cf_version, args.ls)
    if args.discover_heartbeat:
        heartbeat = None
    client = PixelplaceClient(
        board_id=args.board, base_url=args.base_url, engineio=args.engineio,
        heartbeat=heartbeat, bootstrap_file=args.bootstrap_file,
        socket_url=args.socket_url, credentials=Credentials.from_environment(),
        reconnect_attempts=args.reconnect_attempts,
    )
    try:
        await client.connect()
        print(json.dumps({"status": "canvas_received", "board": client.board_id,
                          "engineio": client.engineio, "read_only": True}), flush=True)
        deadline = time.monotonic() + args.seconds
        while time.monotonic() < deadline:
            if client.error:
                raise client.error
            await asyncio.sleep(min(1, max(0, deadline - time.monotonic())))
        if client.error:
            raise client.error
        if not client.ready.is_set():
            raise ConnectionError("Observation ended while reconnecting")
        print(json.dumps({"status": "observation_complete", "events": dict(client.events),
                          "sent": dict(client.sent), "ready": client.ready.is_set()}))
    finally:
        await client.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--board", type=int, default=7)
    parser.add_argument("--base-url", default="https://pixelplace.io")
    parser.add_argument("--engineio", type=int, choices=(3, 4), default=4)
    parser.add_argument("--cf-version", default="335", help="Live page profile observed 2026-11-16")
    parser.add_argument("--ls", type=int, default=6)
    parser.add_argument("--discover-heartbeat", action="store_true", help="Read CFVersion/#ls from the painting HTML instead")
    parser.add_argument("--bootstrap-file", type=Path)
    parser.add_argument("--socket-url")
    parser.add_argument("--seconds", type=float, default=180)
    parser.add_argument("--reconnect-attempts", type=int, default=3)
    args = parser.parse_args()
    try:
        finite(args.seconds, "observation duration", 1, 86400)
        asyncio.run(main_async(args))
    except KeyboardInterrupt:
        pass
    except Exception as error:
        # Transport exception strings can include request URLs/headers/cookies.
        message = str(error) if isinstance(error, (ProtocolError, ValueError)) else type(error).__name__
        parser.exit(1, f"Connection failed: {message}\n")


if __name__ == "__main__":
    main()
