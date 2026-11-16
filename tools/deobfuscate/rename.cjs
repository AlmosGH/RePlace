const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const reviewed = {
  ...require("./names.json"),
  ...require("./reviewed-locals.json"),
  ...require("./semantic-names.json"),
};

const camel = (text) => {
  const words =
    String(text)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .match(/[a-zA-Z][a-zA-Z0-9]*/g) || [];
  return words
    .map((word, index) =>
      index
        ? word[0].toUpperCase() + word.slice(1)
        : word[0].toLowerCase() + word.slice(1),
    )
    .join("");
};
const property = (node) =>
  t.isMemberExpression(node)
    ? !node.computed && t.isIdentifier(node.property)
      ? node.property.name
      : t.isStringLiteral(node.property)
        ? node.property.value
        : ""
    : "";
const meaningful = (name) =>
  reviewed[name] || (name && !/^_0x/.test(name) ? name : "");
const singular = (name) =>
  name.endsWith("ies")
    ? name.slice(0, -3) + "y"
    : name.endsWith("s")
      ? name.slice(0, -1)
      : name;

function expressionName(node, depth = 0) {
  if (!node || depth > 4) return "";
  if (t.isIdentifier(node)) return meaningful(node.name);
  if (t.isMemberExpression(node)) {
    const key = property(node),
      object = expressionName(node.object, depth + 1);
    if (key === "length") return object ? object + "Length" : "length";
    if (key && key !== "prototype")
      return key.length > 1 ? key : object ? object + key.toUpperCase() : key;
    if (node.computed && object) return singular(object) + "Entry";
  }
  if (t.isCallExpression(node)) {
    const method = property(node.callee),
      callee = t.isIdentifier(node.callee)
        ? meaningful(node.callee.name)
        : method;
    if (callee === "$") {
      const selector = node.arguments[0];
      if (t.isThisExpression(selector)) return "element";
      if (t.isStringLiteral(selector)) {
        const id =
          selector.value.match(/id=["']([\w-]+)/)?.[1] ||
          selector.value.match(/^[#.](\w[\w-]*)/)?.[1];
        return (
          (id
            ? camel(id)
            : selector.value.startsWith("<")
              ? "html"
              : "selected") + "Element"
        );
      }
      return "element";
    }
    if (["find", "closest", "children", "filter"].includes(method)) {
      const selector = node.arguments[0];
      return (
        (t.isStringLiteral(selector)
          ? camel(selector.value.match(/^[#.](\w[\w-]*)/)?.[1] || "selected")
          : "selected") + "Element"
      );
    }
    if (
      method === "attr" ||
      method === "data" ||
      method === "getItem" ||
      method === "get"
    ) {
      if (t.isStringLiteral(node.arguments[0]))
        return camel(node.arguments[0].value.replace(/^data-/, ""));
    }
    if (method === "val") return "inputValue";
    if (method === "html") return "html";
    if (method === "text") return "text";
    if (method === "getContext") return "context";
    if (method === "createElement" && t.isStringLiteral(node.arguments[0]))
      return node.arguments[0].value === "canvas"
        ? "canvasElement"
        : node.arguments[0].value === "a"
          ? "downloadLink"
          : "element";
    if (method === "getResponseHeader") return "responseContentType";
    if (method === "getBoundingClientRect") return "bounds";
    if (method === "getImageData" || method === "createImageData")
      return "imageData";
    if (method === "screenToPaintingSpace") return "paintingPosition";
    if (method === "paintingToScreenSpace") return "screenPosition";
    if (method === "split") return "parts";
    if (method === "exec" || method === "match") return "match";
    if (
      callee === "nowSeconds" ||
      callee === "nowMilliseconds" ||
      method === "now" ||
      method === "getTime"
    )
      return "timestamp";
    if (
      ["parseInt", "parseFloat", "round", "floor", "ceil", "abs"].includes(
        callee,
      )
    )
      return expressionName(node.arguments[0], depth + 1) || "number";
    if (callee === "normalizePointerEvent") return "pointerEvent";
    if (callee === "hexToRgb") return "rgb";
    if (callee === "rgbToLab") return "lab";
    if (callee === "rgbToHex") return "hexColor";
    if (callee && !["call", "apply", "bind"].includes(callee))
      return (
        camel(
          callee.replace(/^(get|create|load|calculate|format)(?=[A-Z])/, ""),
        ) + "Result"
      );
  }
  if (t.isNewExpression(node))
    return (
      camel(
        t.isIdentifier(node.callee) ? node.callee.name : property(node.callee),
      ) || "instance"
    );
  if (t.isBinaryExpression(node)) {
    if (
      node.operator === "+" &&
      (t.isStringLiteral(node.left) || t.isStringLiteral(node.right))
    ) {
      const text = t.isStringLiteral(node.left)
        ? node.left.value
        : node.right.value;
      return text.includes("<") ? "html" : text.includes("/") ? "url" : "text";
    }
    return (
      expressionName(node.left, depth + 1) ||
      expressionName(node.right, depth + 1)
    );
  }
  return "";
}

function infer(binding) {
  const name = binding.identifier.name;
  if (reviewed[name]) return { name: reviewed[name], evidence: "reviewed" };
  const declaration = binding.path;
  if (declaration.isCatchClause())
    return { name: "error", evidence: "catch parameter" };
  const references = binding.referencePaths;
  const memberNames = references
    .map((ref) =>
      ref.parentPath.isMemberExpression() && ref.key === "object"
        ? property(ref.parent)
        : "",
    )
    .filter(Boolean);
  if (
    memberNames.some((key) =>
      [
        "preventDefault",
        "stopPropagation",
        "pageX",
        "pageY",
        "originalEvent",
        "keyCode",
        "which",
        "isTrusted",
      ].includes(key),
    )
  )
    return { name: "event", evidence: "event properties" };
  const fn = declaration.findParent((p) => p.isFunction());
  if (binding.kind === "param" && fn) {
    const index = fn.node.params.findIndex((param) =>
      t.isIdentifier(param, { name }),
    );
    const parent = fn.parentPath;
    if (parent.isCallExpression()) {
      const method = property(parent.node.callee);
      const callee = t.isIdentifier(parent.node.callee)
        ? meaningful(parent.node.callee.name)
        : method;
      if (method === "req")
        return {
          name: index === 0 ? "success" : "response",
          evidence: "HTTP callback signature",
        };
      if (
        method === "on" ||
        method === "addEventListener" ||
        method === "one"
      ) {
        const event =
          parent.node.arguments.find((arg) => t.isStringLiteral(arg))?.value ||
          "";
        return {
          name: /click|touch|mouse|pointer|key|input|change|submit|wheel|scroll/.test(
            event,
          )
            ? "event"
            : camel(event || "message") + "Payload",
          evidence: "event callback",
        };
      }
      if (
        callee === "requestAnimationFrame" ||
        method === "requestAnimationFrame"
      )
        return { name: "frameTime", evidence: "animation callback" };
      if (["forEach", "map", "filter", "sort", "each"].includes(method))
        return {
          name:
            method === "sort"
              ? index === 0
                ? "firstEntry"
                : "secondEntry"
              : index === 0
                ? "entry"
                : "index",
          evidence: "collection callback",
        };
    }
    const key = parent.isObjectProperty()
      ? parent.node.key.name || parent.node.key.value
      : "";
    const signatures = {
      req: ["method", "url", "data", "cache", "callback"],
      success: ["response", "status", "xhr"],
      error: ["xhr", "status", "error"],
      step: ["value", "tween"],
      progress: ["event"],
      screenToPaintingSpace: ["screenX", "screenY"],
      paintingToScreenSpace: ["paintingX", "paintingY"],
      placedInActiveWarArea: ["x", "y"],
      onWarStart: ["area", "fightEndAt"],
      onWarZoneChange: ["area"],
      drawPixel: ["x", "y", "color"],
      setScale: ["scale"],
      formatScale: ["scale"],
      switchChannel: ["channel"],
      addMessageRow: ["message"],
      sendMessage: ["message"],
      showModal: ["target", "content"],
      openModal: ["target", "content"],
      onChangeTools: ["tool", "enabled", "save"],
      updateNotificationCount: ["count"],
    };
    if (signatures[key]?.[index])
      return { name: signatures[key][index], evidence: "method signature" };
  }
  // A value stored under a descriptive property usually has that property's role.
  for (const ref of references) {
    const p = ref.parentPath;
    if (p.isAssignmentExpression() && ref.key === "right") {
      const key = property(p.node.left);
      if (key && key.length > 1)
        return { name: key, evidence: "assigned property" };
    }
    if (p.isCallExpression()) {
      const method = property(p.node.callee),
        index = p.node.arguments.indexOf(ref.node);
      if (index >= 0 && ["css", "animate", "offset"].includes(method))
        return {
          name: method === "offset" ? "offset" : "styles",
          evidence: "DOM style argument",
        };
      if (index === 2 && method === "req")
        return { name: "requestData", evidence: "HTTP request data" };
      if (index === 0 && ["text", "html", "val"].includes(method))
        return {
          name:
            method === "html"
              ? "html"
              : method === "text"
                ? "text"
                : "inputValue",
          evidence: "DOM value argument",
        };
      if (
        index === 1 &&
        ["attr", "data"].includes(method) &&
        t.isStringLiteral(p.node.arguments[0])
      )
        return {
          name: camel(p.node.arguments[0].value.replace(/^data-/, "")),
          evidence: "DOM attribute value",
        };
      if (ref.key === "callee")
        return { name: "callback", evidence: "called parameter" };
    }
  }
  const init = declaration.isVariableDeclarator()
    ? declaration.node.init
    : null;
  const expression = expressionName(init);
  if (expression)
    return { name: expression, evidence: "initializer expression" };
  for (const assignment of binding.constantViolations) {
    if (assignment.isAssignmentExpression()) {
      const expression = expressionName(assignment.node.right);
      if (expression)
        return { name: expression, evidence: "assigned expression" };
    }
  }
  if (memberNames.includes("user") && memberNames.includes("painting"))
    return { name: "paintingData", evidence: "server fields" };
  if (
    memberNames.includes("status") ||
    memberNames.includes("statusText") ||
    memberNames.includes("responseJSON")
  )
    return { name: "xhr", evidence: "HTTP response fields" };
  if (memberNames.includes("message"))
    return { name: "messageData", evidence: "message field" };
  if (memberNames.includes("x") && memberNames.includes("y"))
    return { name: "position", evidence: "coordinate fields" };
  if (memberNames.length) {
    const key = memberNames.find(
      (key) =>
        key.length > 1 &&
        ![
          "length",
          "push",
          "join",
          "split",
          "toLowerCase",
          "toUpperCase",
          "toString",
          "indexOf",
          "replace",
          "substring",
          "substr",
          "charAt",
          "slice",
        ].includes(key),
    );
    if (key) return { name: key + "Data", evidence: "accessed field" };
    if (memberNames.includes("push"))
      return { name: "entries", evidence: "array methods" };
    if (memberNames.includes("length"))
      return { name: "items", evidence: "length access" };
  }
  if (
    declaration.parentPath?.isForInStatement() ||
    declaration.parentPath?.parentPath?.isForInStatement()
  )
    return { name: "key", evidence: "property iterator" };
  if (declaration.parentPath?.parentPath?.isForStatement())
    return { name: "index", evidence: "loop counter" };
  if (t.isStringLiteral(init))
    return {
      name: init.value.includes("<") ? "html" : "text",
      evidence: "string initializer",
    };
  if (t.isBooleanLiteral(init))
    return { name: "enabled", evidence: "boolean initializer" };
  if (t.isNumericLiteral(init))
    return { name: "count", evidence: "numeric initializer" };
  if (t.isArrayExpression(init))
    return { name: "entries", evidence: "array initializer" };
  if (t.isObjectExpression(init)) {
    const fields = references
      .filter(
        (p) =>
          p.parentPath.isMemberExpression() &&
          p.key === "object" &&
          p.parentPath.parentPath.isAssignmentExpression() &&
          p.parentPath.key === "left",
      )
      .map((p) => property(p.parent));
    if (fields.length)
      return {
        name:
          fields
            .slice(0, 2)
            .map((x, i) => (i ? x[0].toUpperCase() + x.slice(1) : x))
            .join("") + "Options",
        evidence: "object fields",
      };
    return { name: "options", evidence: "object initializer" };
  }
  return {
    name: binding.kind === "param" ? "argument" : "value",
    evidence: "unknown role",
  };
}

function rename(ast) {
  traverse(ast, {
    Program(p) {
      p.scope.crawl();
    },
  });
  const bindings = [];
  const seen = new Set();
  traverse(ast, {
    Scope(p) {
      for (const binding of Object.values(p.scope.bindings)) {
        if (
          !seen.has(binding) &&
          /^_0x[\da-f]+$/i.test(binding.identifier.name)
        ) {
          seen.add(binding);
          bindings.push(binding);
        }
      }
    },
  });
  const scopes = new Map();
  traverse(ast, {
    Scope(p) {
      if (!scopes.has(p.scope)) scopes.set(p.scope, scopes.size);
    },
  });
  const externalReferences = [];
  traverse(ast, {
    ReferencedIdentifier(p) {
      if (!p.scope.getBinding(p.node.name)) externalReferences.push(p);
    },
  });
  const manifest = [];
  // Infer every name before mutation so inference is deterministic.
  const proposals = bindings.map((binding) => ({ binding, ...infer(binding) }));
  const proposedNames = new Map(
    proposals.map((p) => [p.binding.identifier.name, p.name]),
  );
  const planned = new Map(),
    collisions = [];
  const containsScope = (outer, inner) => {
    for (let scope = inner; scope; scope = scope.parent)
      if (scope === outer) return true;
    return false;
  };
  function contextual(node, depth = 0) {
    if (!node || depth > 4) return "";
    if (t.isIdentifier(node))
      return proposedNames.get(node.name) || meaningful(node.name);
    if (t.isThisExpression(node)) return "";
    if (t.isMemberExpression(node)) {
      const parent = contextual(node.object, depth + 1),
        key = property(node);
      if (key) return parent ? camel(parent + " " + key) : key;
      return parent ? singular(parent) + "Entry" : "";
    }
    if (t.isCallExpression(node)) {
      const method = property(node.callee);
      const argument = node.arguments[0];
      if (t.isStringLiteral(argument)) {
        const selectorName =
          argument.value.match(/\[(?:data-id|name)=["']([^"']+)/)?.[1] ||
          argument.value.match(/[#.]([\w-]+)/)?.[1];
        if (selectorName)
          return camel(selectorName) + (method === "val" ? "Value" : "Element");
      }
      return contextual(node.callee, depth + 1).replace(
        /^(get|create|parse)(?=[A-Z])/,
        "",
      );
    }
    return "";
  }
  function candidates(binding, base) {
    const names = [base],
      declaration = binding.path;
    const init = declaration.isVariableDeclarator()
      ? declaration.node.init
      : null;
    if (init) {
      if (t.isMemberExpression(init)) {
        const object = contextual(init.object),
          key = property(init);
        if (key)
          names.push(
            camel((property(init.object) || "") + " " + key),
            camel(object + " " + key),
          );
        else if (object) names.push(singular(object) + "Entry");
      }
      const source = contextual(init);
      if (source) names.push(source, camel(source + " " + base));
      if (t.isStringLiteral(init) && init.value.includes("<")) {
        const tag = init.value.match(/(?:class|id)=["']([\w-]+)/)?.[1];
        if (tag) names.push(camel(tag) + "Html");
      }
    }
    for (const ref of binding.referencePaths) {
      const parent = ref.parentPath;
      if (parent.isCallExpression()) {
        const method = property(parent.node.callee),
          index = parent.node.arguments.indexOf(ref.node);
        if (index === 2 && method === "req") {
          const url = parent.node.arguments[1];
          const endpoint = t.isStringLiteral(url)
            ? url.value.match(/(?:get|post)-([\w-]+)\.php/)?.[1]
            : "";
          if (endpoint) names.push(camel(endpoint) + "Request");
        }
        if (
          index >= 0 &&
          ["html", "text", "append", "prepend", "val"].includes(method)
        ) {
          const target = contextual(parent.node.callee.object);
          if (target) names.push(camel(target + " " + base));
        }
      }
      if (
        parent.isMemberExpression() &&
        ref.key === "property" &&
        parent.node.computed
      ) {
        const target = contextual(parent.node.object);
        if (target)
          names.push(
            camel(singular(target) + " " + (base === "key" ? "key" : base)),
          );
      }
    }
    if (declaration.isVariableDeclarator()) {
      const loop = declaration.parentPath.parentPath;
      if (loop.isForInStatement()) {
        const collection = contextual(loop.node.right);
        if (collection) names.push(camel(singular(collection) + " key"));
      }
    }
    return [
      ...new Set(
        names.map(camel).filter((name) => name && t.isValidIdentifier(name)),
      ),
    ];
  }
  function conflicts(binding, name) {
    if (
      externalReferences.some(
        (p) => p.node.name === name && containsScope(binding.scope, p.scope),
      )
    )
      return true;
    for (const [other, chosen] of planned) {
      if (chosen !== name) continue;
      if (other.scope === binding.scope) return true;
      if (
        containsScope(other.scope, binding.scope) &&
        other.referencePaths.some((ref) =>
          containsScope(binding.scope, ref.scope),
        )
      )
        return true;
      if (
        containsScope(binding.scope, other.scope) &&
        binding.referencePaths.some((ref) =>
          containsScope(other.scope, ref.scope),
        )
      )
        return true;
    }
    return false;
  }
  for (const { binding, name, evidence } of proposals) {
    const choices = candidates(binding, name);
    const next = choices.find((candidate) => !conflicts(binding, candidate));
    if (!next) {
      const generate = require("@babel/generator").default;
      collisions.push({
        original: binding.identifier.name,
        base: name,
        choices,
        declaration: generate(binding.path.node).code.slice(0, 200),
        references: binding.referencePaths
          .slice(0, 3)
          .map((p) => generate(p.parent).code.slice(0, 160)),
      });
      continue;
    }
    planned.set(binding, next);
    const previous = binding.identifier.name;
    manifest.push({
      original: previous,
      readable: next,
      scope: scopes.get(binding.scope),
      evidence,
    });
  }
  if (collisions.length) {
    require("node:fs").writeFileSync(
      require("node:path").join(__dirname, "naming-review.json"),
      JSON.stringify(collisions, null, 2),
    );
    throw new Error(
      `Review ${collisions.length} naming collisions in naming-review.json`,
    );
  }
  for (const [binding, next] of planned)
    binding.scope.rename(binding.identifier.name, next);
  return manifest;
}

module.exports = { rename };
