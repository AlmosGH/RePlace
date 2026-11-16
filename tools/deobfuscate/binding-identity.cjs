const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const assert = require("node:assert/strict");
const { proveScratchInitialization } = require("./scratch-flow.cjs");
function bindingGraph(ast) {
  const scopes = new Map(),
    declarations = new Map(),
    graph = [];
  traverse(ast, {
    Scope(p) {
      if (!scopes.has(p.scope)) scopes.set(p.scope, scopes.size);
      for (const binding of Object.values(p.scope.bindings))
        declarations.set(binding.identifier, binding);
    },
  });
  traverse(ast, {
    Identifier(p) {
      const parent = p.parentPath;
      if (
        p.key === "property" &&
        parent.isMemberExpression() &&
        !parent.node.computed
      )
        return;
      if (
        p.key === "key" &&
        (parent.isObjectProperty() || parent.isObjectMethod()) &&
        !parent.node.computed
      )
        return;
      if (p.isReferencedIdentifier() || p.isBindingIdentifier()) {
        const binding =
          declarations.get(p.node) || p.scope.getBinding(p.node.name);
        graph.push([
          p.parent.type,
          p.key,
          binding ? scopes.get(binding.scope) : null,
        ]);
      }
    },
  });
  return graph;
}

// Some older builds reuse single-letter names in many lexical scopes. Give
// each binding a unique internal identity before applying the semantic model.
// The source name/scope is recorded separately; public property names stay put.
function uniquifyBindings(ast) {
  const beforeGraph = bindingGraph(ast);
  const scopes = new Map(),
    bindings = [],
    seen = new Set(),
    used = new Set();
  traverse(ast, {
    Identifier(p) {
      used.add(p.node.name);
    },
    Scope(p) {
      if (!scopes.has(p.scope)) scopes.set(p.scope, scopes.size);
      for (const b of Object.values(p.scope.bindings))
        if (!seen.has(b)) {
          seen.add(b);
          bindings.push(b);
        }
    },
  });
  const planned = new Map(),
    mapping = {};
  let index = 0;
  for (const binding of bindings) {
    let id;
    do {
      id = "_0xabcdef000000" + (++index).toString(16);
    } while (used.has(id));
    planned.set(binding, id);
    mapping[id] = {
      original: binding.identifier.name,
      scope: scopes.get(binding.scope),
    };
  }
  const edits = [];
  const declarations = new Map(
    [...planned].map(([binding, name]) => [binding.identifier, name]),
  );
  traverse(ast, {
    Identifier(p) {
      if (declarations.has(p.node)) {
        edits.push([p.node, declarations.get(p.node)]);
        return;
      }
      const binding = p.scope.getBinding(p.node.name);
      if (!planned.has(binding)) return;
      const parent = p.parentPath;
      if (
        p.key === "property" &&
        parent.isMemberExpression() &&
        !parent.node.computed
      )
        return;
      if (
        p.key === "key" &&
        (parent.isObjectProperty() || parent.isObjectMethod()) &&
        !parent.node.computed
      )
        return;
      if (p.isReferencedIdentifier() || p.isBindingIdentifier()) {
        if (
          parent.isObjectProperty() &&
          p.key === "value" &&
          parent.node.shorthand
        ) {
          parent.node.key = t.cloneNode(parent.node.key);
          parent.node.shorthand = false;
        }
        edits.push([p.node, planned.get(binding)]);
      }
    },
  });
  for (const [node, name] of edits) node.name = name;
  traverse(ast, {
    Program(p) {
      p.scope.crawl();
    },
  });
  assert.deepEqual(
    bindingGraph(ast),
    beforeGraph,
    "Unique binding normalization changed lexical resolution",
  );
  return mapping;
}
function preserveScratchBindings(ast, removedNames) {
  const reads = new Map();
  traverse(ast, {
    ReferencedIdentifier(p) {
      if (removedNames.has(p.node.name) && !p.scope.getBinding(p.node.name)) {
        if (!reads.has(p.node.name)) reads.set(p.node.name, []);
        reads.get(p.node.name).push(p);
      }
    },
  });
  function assigns(statement, name) {
    const expression =
      statement?.type === "ExpressionStatement" ? statement.expression : null;
    return (
      expression?.type === "AssignmentExpression" &&
      expression.operator === "=" &&
      expression.left.type === "Identifier" &&
      expression.left.name === name
    );
  }
  for (const [name, paths] of reads) {
    for (const read of paths) {
      let proven = false;
      for (
        let ancestor = read;
        ancestor.parentPath && !ancestor.isFunction();
        ancestor = ancestor.parentPath
      ) {
        if (
          ancestor.inList &&
          Array.isArray(ancestor.container) &&
          Number.isInteger(ancestor.key)
        ) {
          if (
            ancestor.container
              .slice(0, ancestor.key)
              .some((node) => assigns(node, name))
          ) {
            proven = true;
            break;
          }
        }
      }
      if (!proven) {
        const fn = read.findParent((p) => p.isFunction());
        if (fn) proven = proveScratchInitialization(fn.node, name);
      }
      if (!proven)
        throw Error(
          "Live bootstrap dependency cannot be safely removed: " + name,
        );
    }
  }
  if (reads.size) {
    const declaration = t.variableDeclaration(
      "var",
      [...reads.keys()].map((name) => t.variableDeclarator(t.identifier(name))),
    );
    t.addComment(
      declaration,
      "leading",
      " Legacy global scratch slots: the renderer overwrites each slot before every live read. Preserve the declarations while removing their former obfuscator initializer. ",
    );
    ast.program.body.unshift(declaration);
    traverse(ast, {
      Program(p) {
        p.scope.crawl();
      },
    });
  }
  return [...reads.keys()];
}
module.exports = { uniquifyBindings, preserveScratchBindings, bindingGraph };
