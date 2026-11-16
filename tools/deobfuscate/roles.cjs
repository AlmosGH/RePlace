const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

// Narrow rules for recurring roles that differ syntactically across the
// observed 2026 builds. Unmatched collisions remain explicit review failures.
function resolveRoles(ast, proposed, collisions) {
  const bindings = new Map();
  traverse(ast, {
    Scope(p) {
      for (const binding of Object.values(p.scope.bindings))
        bindings.set(binding.identifier.name, binding);
    },
  });
  const result = {};
  for (const issue of collisions) {
    const binding = bindings.get(issue.original),
      init = binding?.path.node.init;
    if (!binding) continue;
    let name;
    if (
      /CompletesAt$/.test(issue.base) &&
      t.isBinaryExpression(init, { operator: "-" })
    )
      name = issue.base.replace("CompletesAt", "MillisecondsRemaining");
    else if (
      issue.base === "auctionExpiresAt" &&
      t.isBinaryExpression(init, { operator: "-" })
    )
      name = "auctionSecondsRemaining";
    else if (
      issue.base === "firstChroma" &&
      t.isBinaryExpression(init, { operator: "+" }) &&
      t.isBinaryExpression(init.right, { operator: "*" }) &&
      t.isNumericLiteral(init.right.left)
    )
      name =
        Math.abs(init.right.left.value - 0.045) < 0.00001
          ? "chromaWeight"
          : Math.abs(init.right.left.value - 0.015) < 0.00001
            ? "hueWeight"
            : null;
    else if (t.isBinaryExpression(init, { operator: "/" })) {
      if (issue.base === "deltaLightness") name = "normalizedLightness";
      if (issue.base === "deltaChroma") name = "normalizedChroma";
      if (issue.base === "deltaHueSquared") name = "normalizedHue";
    } else if (
      issue.base === "value" &&
      t.isBinaryExpression(init, { operator: "+" })
    )
      name = "formattedTime";
    else if (issue.base === "argument") {
      const fn = binding.path.findParent((p) => p.isFunction()),
        body = fn ? generate(fn.node.body).code : "";
      if (body.includes(".lovemail-open")) name = "mailOpened";
      else if (proposed[fn?.node.id?.name] === "runCaptchaAction")
        name = "requiresCaptcha";
    } else if (issue.base === "enabled") {
      const branch = binding.referencePaths
        .map((ref) => ref.findParent((p) => p.isIfStatement()))
        .find(Boolean);
      if (branch && generate(branch.node).code.includes(".pixelsPlaced"))
        name = "paintingFilteredOut";
    }
    if (name) result[issue.original] = name;
  }
  return {
    ...require("./legacy-roles.cjs").inferLegacyRoles(
      ast,
      proposed,
      collisions,
    ),
    ...result,
  };
}
module.exports = { resolveRoles };
