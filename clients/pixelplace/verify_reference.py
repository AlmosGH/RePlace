"""Compare Python tokens with isolated functions extracted from origin/main.

Only the pure generators/encoding blocks are evaluated, inside a timed Node VM.
The application, DOM handlers, and networking are never executed.
"""
import json
from pathlib import Path
import subprocess

from pixelplace_client import HeartbeatConfig, cache_local, pong_alive


class Stream:
    def __init__(self, seed):
        self.state = seed

    def random(self):
        x = self.state
        x ^= (x << 13) & 0xffffffff
        x ^= x >> 17
        x ^= (x << 5) & 0xffffffff
        self.state = x & 0xffffffff
        return self.state / 2**32


def function(source, name):
    start = source.index('function ' + name + '(')
    body = source.index('{', start)
    depth = 1
    end = body + 1
    # These two audited helpers contain no braces inside strings or comments.
    while depth:
        depth += (source[end] == '{') - (source[end] == '}')
        end += 1
    return source[start:end]


def main():
    root = Path(__file__).resolve().parents[2]
    revision = subprocess.check_output(['git', 'rev-parse', 'origin/main'], cwd=root, text=True).strip()
    source = subprocess.check_output(['git', 'show', revision + ':reference/script.readable.js'],
                                     cwd=root, text=True, encoding='utf-8')
    helpers = function(source, 'randomCacheToken') + '\n' + function(source, 'randomAlphanumericString')
    cache_start = source.index('var tokenDigitTable = {}')
    cache_end = source.index("requestHeaders['CACHE-L0CAL'] = cacheToken;", cache_start)
    cache = source[cache_start:cache_end] + 'return cacheToken;'
    pong_start = source.index('let entries = [6, 5, 9, 4, 5]')
    pong_end = source.index("connection.io.emit('pong.alive', heartbeatToken);", pong_start)
    pong = source[pong_start:pong_end] + 'return heartbeatToken;'
    table_start = source.index("digitLetterTable['0']")
    table_end = source.index('var digitLetters = digitLetterTable;', table_start)
    table = 'var digitLetterTable = {};\n' + source[table_start:table_end] + 'var digitLetters = digitLetterTable;'
    vectors = []
    for seed in range(1, 41):
        timestamp = 1767225600 + seed * 500000
        config = HeartbeatConfig(str(seed % 9 + 1) + '35', seed % 10)
        digit = str(seed % 10)
        offset = seed * 11 - 220
        vectors.append({'seed': seed, 'now': timestamp, 'cf': int(config.cf_version[0]),
                        'ls': config.ls, 'digit': digit, 'offset': offset,
                        'expected_cache': cache_local(timestamp, Stream(seed)),
                        'expected_pong': pong_alive(config, digit, now=timestamp,
                                                    time_offset=offset, rng=Stream(seed))})
    program = r'''
const fs = require('node:fs');
const vm = require('node:vm');
const input = JSON.parse(fs.readFileSync(0,'utf8'));
const output = [];
for (const vector of input.vectors) {
  const sandbox = { vector };
  const body = `
    let state = vector.seed;
    Math.random = () => { state ^= state << 13; state ^= state >>> 17;
      state ^= state << 5; return (state >>> 0) / 4294967296; };
    function nowSeconds() { return vector.now; }
    function randomInteger(min,max) {return Math.floor(Math.random()*(max-min+1))+min;}
    ${input.helpers}
    ${input.table}
    var connection = {wsv:vector.cf,wsa:6,wsb:vector.ls};
    var canvasRenderer = {pSave:3,tDelay:vector.offset};
    var userCacheDigit = vector.digit;
    function cacheGenerator() { var cacheToken = ''; ${input.cache} }
    function pongGenerator() { ${input.pong} }
    var actualCache = cacheGenerator();
    state = vector.seed;
    var actualPong = pongGenerator();
    ({cache:actualCache,pong:actualPong});`;
  output.push(vm.runInNewContext(body, sandbox, {timeout:1000}));
}
process.stdout.write(JSON.stringify(output));
'''
    result = subprocess.run(['node', '-e', program], cwd=root, text=True, encoding='utf-8',
                            input=json.dumps({'helpers': helpers, 'table': table, 'cache': cache,
                                              'pong': pong, 'vectors': vectors}),
                            capture_output=True, check=True, timeout=15)
    actual = json.loads(result.stdout)
    for vector, value in zip(vectors, actual, strict=True):
        assert value['cache'] == vector['expected_cache'], f"CACHE-L0CAL mismatch, seed {vector['seed']}"
        assert value['pong'] == vector['expected_pong'], f"pong.alive mismatch, seed {vector['seed']}"
    print(json.dumps({'revision': revision, 'cache_vectors': len(vectors),
                      'pong_vectors': len(vectors), 'matched': True}))


if __name__ == '__main__':
    main()
