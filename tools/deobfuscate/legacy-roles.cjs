const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;
function member(node) {
  return t.isMemberExpression(node)
    ? node.property.name || node.property.value
    : "";
}
function inferLegacyRoles(ast, proposed, collisions) {
  const bindings = new Map();
  traverse(ast, {
    Scope(p) {
      for (const binding of Object.values(p.scope.bindings))
        bindings.set(binding.identifier.name, binding);
    },
  });
  const result = {};
  for (const issue of collisions) {
    const binding = bindings.get(issue.original);
    if (!binding) continue;
    const p = binding.path,
      init = p.node.init;
    let name;
    if (issue.base === "console") name = "logger";
    if (t.isRegExpLiteral(init)) name = "lineBreakPattern";
    const fn = p.isFunctionDeclaration()
      ? p
      : p.findParent((q) => q.isFunction());
    const source = fn ? generate(fn.node.body).code : "";
    const parent = fn?.parentPath;
    const method = fn?.isObjectMethod()
      ? fn.node.key.name || fn.node.key.value
      : parent?.isObjectProperty()
        ? parent.node.key.name || parent.node.key.value
        : parent?.isAssignmentExpression()
          ? member(parent.node.left)
          : "";
    if (binding.kind === "param" && fn) {
      const index = fn.node.params.findIndex((param) =>
        t.isIdentifier(param, { name: issue.original }),
      );
      const signatures = {
        on: ["event", "listener"],
        once: ["event", "listener"],
        addEventListener: ["event", "listener"],
        removeListener: ["event", "listener"],
        off: ["event", "listener"],
        send: ["data", "options", "callback"],
        write: ["data", "options", "callback"],
        sendPacket: ["type", "data", "options", "callback"],
        encodePacket: ["packet", "supportsBinary", "utf8Encode", "callback"],
        decodePacket: ["data", "binaryType", "utf8Decode"],
        encodeBase64Packet: ["packet", "callback"],
        encodePayload: ["packets", "supportsBinary", "callback"],
        decodePayload: ["data", "binaryType", "callback"],
        encodePayloadAsArrayBuffer: ["packets", "callback"],
        encodePayloadAsBlob: ["packets", "callback"],
        decodePayloadAsBinary: ["data", "binaryType", "callback"],
      };
      name = signatures[method]?.[index] || name;
      if (!name && binding.referencePaths.length === 0)
        name =
          ["unusedInput", "unusedOptions", "unusedCallback"][index] ||
          "unusedContext";
      if (!name && source.includes("._callbacks"))
        name = index === 0 ? "event" : "listener";
      if (!name && source.includes("sendPacket"))
        name = index === 1 ? "options" : "callback";
      if (!name && source.includes("parser error:")) name = "reason";
      if (!name && source.includes("Array.isArray")) name = "input";
      if (!name && source.includes("JSON.stringify")) name = "valueToSerialize";
      if (!name && source.includes("JSON.parse")) name = "jsonText";
      if (!name && source.includes("probe error:")) name = "reason";
      if (!name && source.includes("Lone surrogate"))
        name = index === 0 ? "codePoint" : "strict";
      if (!name && source.includes("encodeBase64Packet"))
        name = index === 1 ? "supportsBinary" : "callback";
      if (!name && source.includes("encodePacket"))
        name =
          index === 0 ? "packet" : index === 1 ? "encodedPackets" : "callback";
      if (!name && source.includes("hasOwnProperty")) name = "object";
      if (!name && source.includes("utf8") && source.includes(".decode"))
        name = "encodedText";
      if (!name && issue.base === "callback") name = "onComplete";
      if (
        !name &&
        binding.referencePaths.some(
          (ref) => ref.parentPath.isCallExpression() && ref.key === "callee",
        )
      )
        name = "onResult";
      if (
        !name &&
        binding.referencePaths.some((ref) =>
          ref.parentPath.isBinaryExpression(),
        )
      )
        name =
          [
            "value",
            "offset",
            "length",
            "limit",
            "mode",
            "flags",
            "timestamp",
            "context",
            "target",
            "source",
            "width",
            "height",
            "scale",
          ][index] || "input";
    }
    if (
      (p.isFunctionDeclaration() || t.isFunction(init)) &&
      (!name || ["callback", "value"].includes(issue.base))
    ) {
      if (
        source.includes("return localStorage") ||
        source.includes("return window.localStorage")
      )
        name = "getLocalStorage";
      else if (source.includes("JSON.stringify")) name = "serializeJson";
      else if (source.includes("JSON.parse")) name = "parseJson";
      else if (source.includes("parser error:")) name = "makeParserError";
      else if (source.includes("Lone surrogate")) name = "validateSurrogate";
      else if (source.includes("Invalid byte index"))
        name = "readContinuationByte";
      else if (
        source.includes("String.fromCharCode") &&
        source.includes("55296")
      )
        name = "decodeCodePoint";
      else if (source.includes("55296") && source.includes("57343"))
        name = "encodeCodePoint";
      else if (source.includes("clearTimeout")) name = "cancelTimer";
      else if (source.includes(".concat") && source.includes(".length"))
        name = "resetTaskQueue";
      else if (source.includes(".run()")) name = "drainTaskQueue";
      else if (source.includes("Array.isArray")) name = "copyArray";
      else if (source.includes("probe error:")) name = "onProbeError";
      else if (source.includes("transport closed")) name = "onTransportClose";
      else if (source.includes("socket closed")) name = "onSocketClose";
      else if (source.includes("upgrading")) name = "onCompetingUpgrade";
      else if (source.includes("hasOwnProperty")) name = "copyOwnProperties";
      else if (source.includes("removeChild") && source.includes("iframe"))
        name = "removeTransportFrame";
      else if (
        source.includes("typeof self") ||
        source.includes("typeof window")
      )
        name = "getGlobalObject";
      else if (source.includes(".length +") && source.includes("':'"))
        name = "prefixPacketLength";
      else if (source.includes(".charCodeAt")) name = "readStringCodePoints";
      else if (source.includes("encodeBase64Packet"))
        name = "encodeBinaryPacket";
      else if (source.includes(".map(") || source.includes(".join("))
        name = "mapPayloadParts";
    }
    if (!name && t.isConditionalExpression(init) && source.includes("Blob"))
      name = "supportsNativeBlob";
    if (!name && t.isLogicalExpression(init) && source.includes("getBlob"))
      name = "supportsBlobBuilder";
    if (!name && issue.base === "index" && t.isConditionalExpression(init))
      name = "byteLength";
    if (!name && binding.referencePaths.length === 0) name = "unusedState";
    if (!name && issue.base === "enabled" && source.includes("welcome"))
      name = "welcomeVisible";
    const signature = fn?.node.params || [],
      index = signature.findIndex((param) =>
        t.isIdentifier(param, { name: issue.original }),
      );
    const isWeaponAnimation =
      signature.length === 10 && source.includes("requestAnimationFrame");
    const isWeaponFill =
      signature.length === 5 &&
      source.includes(".drawPixelAt(true") &&
      source.includes("> 8");
    if (isWeaponAnimation)
      name =
        binding.kind === "param"
          ? [
              "frameCount",
              "diameter",
              "centerX",
              "centerY",
              "maximumDiameter",
              "color",
              "rounded",
              "phase",
              "originalColor",
              "effectId",
            ][index]
          : p.isFunctionDeclaration()
            ? "animateWeaponPulse"
            : name;
    if (isWeaponFill)
      name =
        binding.kind === "param"
          ? ["diameter", "centerX", "centerY", "color", "rounded"][index]
          : p.isFunctionDeclaration()
            ? "fillWeaponArea"
            : name;
    if (
      t.isBinaryExpression(init, { operator: "-" }) &&
      t.isBinaryExpression(init.right, { operator: "/" })
    ) {
      if (t.isIdentifier(init.left, { name: signature[1]?.name }))
        name = "startX";
      if (t.isIdentifier(init.left, { name: signature[2]?.name }))
        name = "startY";
    }
    if (p.isFunctionDeclaration() || t.isFunction(init)) {
      if (source.includes("account without your consent"))
        name = "showUnsafeBotWarning";
      if (source.includes("#gembox") && source.includes(".box-content-x > div"))
        name = "resetGemBoxContents";
      if (source.includes("/api/get-my-friends.php") && signature.length === 0)
        name = "refreshFriendsList";
      if (source.includes("Math.pow(10,") && source.includes("Math.round"))
        name = "roundToDecimalPlaces";
      if (source.includes("Math.floor(Math.random()"))
        name = "randomIntegerInclusive";
      if (source.includes(".encodePacket(") && signature.length === 2)
        name = "encodePayloadPacket";
      if (
        source.includes("65535") &&
        source.includes("56320") &&
        signature.length === 1
      )
        name = "codePointsToString";
      if (signature.length === 7 && source.includes("requestAnimationFrame"))
        name = "animateWeaponExpansion";
      if (
        source.includes("Math.round") &&
        source.includes("1.5") &&
        source.includes("'s'")
      )
        name = "formatDurationUnit";
      if (
        source.includes("1.5") &&
        source.includes("Math.floor") &&
        signature.length === 3
      )
        name = "formatScaledDurationUnit";
      if (source.includes("works - aborting")) name = "onCompetingTransport";
      if (source.includes(".packets[") && source.includes("'b' +"))
        name = "encodeBase64PacketData";
      if (source.includes(".strict = false") && source.includes(".decode("))
        name = "decodeUtf8Safely";
      if (
        source.includes("new Array(") &&
        source.includes(".length") &&
        signature.length === 3
      )
        name = "mapPayloadAsync";
      if (source.includes(".charCodeAt(") && source.includes("65536"))
        name = "textToCodePoints";
      if (
        source.includes("charCodeAt") &&
        source.includes("55296") &&
        signature.length === 1
      )
        name = "stringToCodePoints";
      if (
        source.includes(">>") &&
        source.includes("& 63 | 128") &&
        signature.length === 2
      )
        name = "encodeContinuationByte";
      if (source.includes("4294967168")) name = "encodeUtf8CodePoint";
      if (source.includes("Invalid UTF-8 detected"))
        name = "decodeUtf8CodePoint";
      if (signature.length === 0 && source.includes(".drawPixelAt(false"))
        name = "placeCursorPixel";
      if (
        signature.length === 1 &&
        source.includes("requestAnimationFrame") &&
        source.includes(".drawPixelAt(")
      )
        name = "renderRepeatedPlacement";
      if (
        signature.length === 1 &&
        source.includes("requestAnimationFrame") &&
        source.includes(".painting.rate")
      )
        name = "renderRateLimitedPlacement";
      if (
        t.isFunction(init) &&
        source.includes("=") &&
        source.includes(".length") &&
        signature.length === 3
      )
        name = "mapPayloadEntry";
    }
    if (binding.kind === "param") {
      if (signature.length === 7 && source.includes("requestAnimationFrame"))
        name = [
          "frameCount",
          "diameter",
          "centerX",
          "centerY",
          "maximumDiameter",
          "color",
          "rounded",
        ][index];
      if (
        source.includes("Math.round") &&
        source.includes("1.5") &&
        source.includes("'s'")
      )
        name = (
          signature.length === 4
            ? ["value", "pluralizationValue", "unitSize", "unitLabel"]
            : ["value", "unitSize", "unitLabel"]
        )[index];
      if (source.includes("Invalid UTF-8 detected")) name = "strict";
      if (source.includes("4294967168"))
        name = index === 0 ? "codePoint" : "strict";
      if (source.includes(">>") && source.includes("& 63 | 128"))
        name = index === 0 ? "codePoint" : "shift";
      if (source.includes(".join") && signature.length === 2 && index === 1)
        name = "encodedParts";
      if (
        source.includes("new Uint8Array") &&
        signature.length === 2 &&
        index === 1
      )
        name = "buffer";
      if (
        signature.length === 3 &&
        source.includes(".on(") &&
        source.includes(".removeListener(")
      )
        name = ["emitter", "event", "listener"][index];
      if (
        p.parentPath.isFunction() &&
        signature.length === 1 &&
        source.includes(".substr(")
      )
        name = "encodedInput";
      if (
        binding.referencePaths.some(
          (ref) =>
            ref.parentPath.isAssignmentExpression() &&
            ref.key === "right" &&
            t.isMemberExpression(ref.parent.left) &&
            ref.parent.left.computed,
        )
      )
        name = "encodedValue";
      if (issue.base === "argument" && !name && signature.length === 2)
        name = index === 0 ? "error" : "result";
      if (issue.base === "argument" && !name && signature.length === 3)
        name = ["index", "entry", "onComplete"][index];
    }
    if (issue.base === "argument")
      for (const ref of binding.referencePaths) {
        const call = ref.parentPath;
        if (
          call.isCallExpression() &&
          [7, 10].includes(call.node.arguments.length) &&
          t.isNumericLiteral(call.node.arguments[0], { value: 0 }) &&
          t.isNumericLiteral(call.node.arguments[1], { value: 0 })
        )
          name =
            (call.node.arguments.length === 10
              ? [
                  "frameCount",
                  "diameter",
                  "centerX",
                  "centerY",
                  "maximumDiameter",
                  "color",
                  "rounded",
                  "phase",
                  "originalColor",
                  "effectId",
                ]
              : [
                  "frameCount",
                  "diameter",
                  "centerX",
                  "centerY",
                  "maximumDiameter",
                  "color",
                  "rounded",
                ])[call.node.arguments.indexOf(ref.node)] || name;
      }
    if (issue.base === "activeSocialPanel") name = "socialPanelState";
    if (
      issue.base === "value" &&
      binding.referencePaths.some((ref) => {
        const body = ref.findParent((q) => q.isFunction());
        if (!body) return false;
        const text = generate(body.node).code;
        return (
          text.includes("Math.abs") &&
          text.includes("clientX") &&
          text.includes("originalEvent") &&
          text.length < 4000
        );
      })
    )
      name = "pointerPressPending";
    if (issue.base === "supportsBlobBuilder") name = "hasBlobBuilderApi";
    if (
      ["enabled", "welcomeVisible"].includes(issue.base) &&
      binding.referencePaths.some((ref) =>
        generate(
          ref.findParent((q) => q.isStatement())?.node || ref.parent,
        ).code.includes("requestAnimationFrame"),
      )
    )
      name = "repeatedPlacementActive";
    if (binding.referencePaths.length === 0)
      name = issue.base === "unusedState" ? "unusedLegacyFlag" : "unusedState";
    if (name && name !== issue.base) result[issue.original] = name;
  }
  return result;
}
module.exports = { inferLegacyRoles };
