const fs = require("node:fs");
const path = require("node:path");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const { parse, sha256 } = require("./common.cjs");
const { rename } = require("./rename.cjs");
const { annotate } = require("./annotate.cjs");

function literal(node) {
  if (
    t.isStringLiteral(node) ||
    t.isNumericLiteral(node) ||
    t.isBooleanLiteral(node)
  )
    return { value: node.value };
  if (t.isNullLiteral(node)) return { value: null };
  if (
    t.isUnaryExpression(node, { operator: "-" }) &&
    t.isNumericLiteral(node.argument)
  )
    return { value: -node.argument.value };
  return null;
}

function condition(node) {
  const direct = literal(node);
  if (direct) return { value: Boolean(direct.value) };
  if (!t.isBinaryExpression(node)) return null;
  const left = literal(node.left),
    right = literal(node.right);
  if (!left || !right) return null;
  switch (node.operator) {
    case "===":
      return { value: left.value === right.value };
    case "!==":
      return { value: left.value !== right.value };
    default:
      return null;
  }
}

function application(source) {
  const ast = parse(source);
  if (ast.program.body.length !== 7)
    throw new Error("Unexpected conservative artifact");
  const sequence = ast.program.body[6].expression;
  if (
    !t.isSequenceExpression(sequence) ||
    sequence.expressions.length !== 2 ||
    !t.isCallExpression(sequence.expressions[0]) ||
    sequence.expressions[0].callee.name !== "_0x56df5f"
  ) {
    throw new Error("Unexpected bootstrap invocation");
  }
  ast.program.body = [t.expressionStatement(sequence.expressions[1])];
  return ast;
}

function simplify(ast) {
  const counts = {
    constantBranchesRemoved: 0,
    preservedHoistedBindings: 0,
    sequencesExpanded: 0,
  };
  // All dead declarations are retained as var bindings. This preserves var
  // hoisting and Annex B block-function bindings, including undefined values.
  function hoisted(node) {
    const names = new Set();
    function visit(part) {
      if (!part) return;
      if (t.isFunctionDeclaration(part)) {
        if (part.id) names.add(part.id.name);
        return;
      }
      if (t.isFunction(part)) return;
      if (t.isVariableDeclaration(part, { kind: "var" })) {
        for (const decl of part.declarations)
          for (const name of Object.keys(t.getBindingIdentifiers(decl.id)))
            names.add(name);
      }
      for (const key of t.VISITOR_KEYS[part.type] || []) {
        const children = part[key];
        if (Array.isArray(children)) children.forEach(visit);
        else visit(children);
      }
    }
    visit(node);
    return [...names];
  }
  traverse(ast, {
    IfStatement: {
      exit(p) {
        const test = condition(p.node.test);
        if (!test) return;
        const kept = test.value ? p.node.consequent : p.node.alternate;
        const dropped = test.value ? p.node.alternate : p.node.consequent;
        const names = hoisted(dropped);
        const statements = names.length
          ? [
              t.variableDeclaration(
                "var",
                names.map((name) => t.variableDeclarator(t.identifier(name))),
              ),
            ]
          : [];
        counts.preservedHoistedBindings += names.length;
        // Retain the selected block's lexical scope.
        if (kept) statements.push(kept);
        if (statements.length) p.replaceWith(t.blockStatement(statements));
        else p.remove();
        counts.constantBranchesRemoved++;
      },
    },
    ExpressionStatement: {
      exit(p) {
        if (!t.isSequenceExpression(p.node.expression)) return;
        const statements = p.node.expression.expressions.map((expr) =>
          t.expressionStatement(expr),
        );
        if (p.inList) p.replaceWithMultiple(statements);
        else p.replaceWith(t.blockStatement(statements));
        counts.sequencesExpanded++;
      },
    },
  });
  // Flatten ordinary statement blocks only when they contain no lexical or
  // function declarations. Function bodies and control-statement bodies stay.
  traverse(ast, {
    BlockStatement: {
      exit(p) {
        if (!p.inList || p.node.directives.length) return;
        if (
          p.node.body.some(
            (statement) =>
              t.isFunctionDeclaration(statement) ||
              t.isClassDeclaration(statement) ||
              (t.isVariableDeclaration(statement) && statement.kind !== "var"),
          )
        )
          return;
        p.replaceWithMultiple(p.node.body);
      },
    },
  });
  // Remove only unused, initializer-free var bindings. There is no eval or
  // string-based reference to obfuscated identifiers in the audited application.
  traverse(ast, {
    Program(p) {
      p.scope.crawl();
    },
  });
  traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.init || !t.isIdentifier(p.node.id) || p.parent.kind !== "var")
        return;
      const binding = p.scope.getBinding(p.node.id.name);
      if (
        binding &&
        !binding.referenced &&
        binding.constantViolations.length === 0
      )
        p.remove();
    },
  });
  traverse(ast, {
    BlockStatement: {
      exit(p) {
        if (
          p.inList &&
          !p.node.directives.length &&
          !p.node.body.some(
            (s) =>
              t.isFunctionDeclaration(s) ||
              t.isClassDeclaration(s) ||
              (t.isVariableDeclaration(s) && s.kind !== "var"),
          )
        )
          p.replaceWithMultiple(p.node.body);
        else if (
          p.parentPath.isIfStatement() &&
          p.key === "alternate" &&
          p.node.body.length === 1 &&
          t.isIfStatement(p.node.body[0])
        )
          p.replaceWith(p.node.body[0]);
      },
    },
  });
  // Splitting a sequence can expose a leading string expression. Keep it out
  // of the directive prologue (especially "use strict") when printing/reparsing.
  // Prettier preserves the distinction by parenthesizing the expression.
  traverse(ast, {
    "Program|BlockStatement"(p) {
      const first = p.node.body[0];
      if (t.isExpressionStatement(first) && t.isStringLiteral(first.expression))
        p.node.body.unshift(t.emptyStatement());
    },
  });
  return counts;
}

function print(ast) {
  return (
    generate(ast, {
      comments: true,
      compact: false,
      minified: false,
      jsescOption: { minimal: true },
    }).code + "\n"
  );
}

if (require.main === module) {
  (async () => {
    const [input, output] = process.argv.slice(2);
    if (!input || !output)
      throw new Error("Usage: node readable.cjs CONSERVATIVE.js OUTPUT.js");
    const ast = application(fs.readFileSync(input, "utf8"));
    const counts = simplify(ast);
    const names = rename(ast);
    const explanatoryComments = annotate(ast);
    traverse(ast, {
      NumericLiteral(p) {
        delete p.node.extra;
      },
      StringLiteral(p) {
        delete p.node.extra;
      },
    });
    const code = await require("prettier").format(print(ast), {
      parser: "babel",
      printWidth: 110,
      singleQuote: true,
      trailingComma: "none",
    });
    fs.writeFileSync(output, code);
    fs.writeFileSync(
      output + ".names.json",
      JSON.stringify(names, null, 2) + "\n",
    );
    fs.writeFileSync(
      output + ".report.json",
      JSON.stringify(
        {
          source: path.basename(input),
          sourceSha256: sha256(fs.readFileSync(input)),
          outputSha256: sha256(code),
          ...counts,
          renamedBindings: names.length,
          explanatoryComments,
          removedBootstrapBytes: 127995,
          removedConsoleSuppression: true,
          bytes: Buffer.byteLength(code),
        },
        null,
        2,
      ) + "\n",
    );
    console.log(
      JSON.stringify({
        output,
        ...counts,
        renamedBindings: names.length,
        bytes: Buffer.byteLength(code),
        sha256: sha256(code),
      }),
    );
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { application, simplify, print, condition };
