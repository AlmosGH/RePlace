// A bounded definite-assignment proof for legacy scratch globals. This is an
// abstract interpreter, not execution: all non-boolean values/calls are unknown.
// It retains separate paths so an exhausted-image flag can guard a post-loop read.
function proveScratchInitialization(fn, name) {
  let safe = true,
    steps = 0;
  const UNKNOWN = Symbol("unknown");
  const copy = (s) => ({
    initialized: s.initialized,
    flags: new Map(s.flags),
    flow: s.flow,
  });
  const outcome = (state, value = UNKNOWN) => [{ state, value }];
  function expression(node, state) {
    if (!node) return outcome(state);
    if (++steps > 20000) {
      safe = false;
      return [];
    }
    if (node.type === "Identifier") {
      if (node.name === name && !state.initialized) safe = false;
      return outcome(
        state,
        state.flags.has(node.name) ? state.flags.get(node.name) : UNKNOWN,
      );
    }
    if (node.type === "BooleanLiteral") return outcome(state, node.value);
    if (
      [
        "NumericLiteral",
        "StringLiteral",
        "NullLiteral",
        "ThisExpression",
      ].includes(node.type)
    )
      return outcome(state);
    if (/FunctionExpression|ArrowFunctionExpression/.test(node.type)) {
      safe = false;
      return [];
    }
    if (node.type === "AssignmentExpression") {
      if (node.left.type === "Identifier") {
        if (node.operator !== "=") expression(node.left, state);
        return expression(node.right, state).map((result) => {
          if (node.left.name === name) result.state.initialized = true;
          if (typeof result.value === "boolean")
            result.state.flags.set(node.left.name, result.value);
          else result.state.flags.delete(node.left.name);
          return result;
        });
      }
      return chain([node.left, node.right], state);
    }
    if (node.type === "UnaryExpression")
      return expression(node.argument, state).map((r) => ({
        ...r,
        value:
          node.operator === "!" && typeof r.value === "boolean"
            ? !r.value
            : UNKNOWN,
      }));
    if (node.type === "LogicalExpression") {
      const results = [];
      for (const left of expression(node.left, state)) {
        const execute =
          typeof left.value === "boolean"
            ? node.operator === "&&"
              ? left.value
              : node.operator === "||"
                ? !left.value
                : null
            : null;
        if (execute !== true)
          results.push({ ...left, state: copy(left.state) });
        if (execute !== false)
          results.push(...expression(node.right, copy(left.state)));
      }
      return results;
    }
    if (node.type === "ConditionalExpression")
      return branches(node.test, node.consequent, node.alternate, state, true);
    if (node.type === "MemberExpression")
      return chain(
        node.computed ? [node.object, node.property] : [node.object],
        state,
      );
    if (["CallExpression", "NewExpression"].includes(node.type))
      return chain([node.callee, ...node.arguments], state);
    if (node.type === "SequenceExpression")
      return chain(node.expressions, state);
    if (node.type === "BinaryExpression")
      return chain([node.left, node.right], state);
    if (node.type === "UpdateExpression") {
      expression(node.argument, state);
      if (node.argument.type === "Identifier")
        state.flags.delete(node.argument.name);
      return outcome(state);
    }
    if (node.type === "ArrayExpression") return chain(node.elements, state);
    if (node.type === "ObjectExpression")
      return chain(
        node.properties.flatMap((p) =>
          p.type === "ObjectProperty"
            ? p.computed
              ? [p.key, p.value]
              : [p.value]
            : [],
        ),
        state,
      );
    safe = false;
    return [];
  }
  function chain(nodes, state) {
    let results = outcome(state);
    for (const node of nodes)
      results = results.flatMap((r) => expression(node, r.state));
    return results.map((r) => ({ ...r, value: UNKNOWN }));
  }
  function branches(test, yes, no, state, asExpression = false) {
    const results = [];
    for (const result of expression(test, state)) {
      if (result.value !== false)
        results.push(
          ...(asExpression
            ? expression(yes, copy(result.state))
            : statement(yes, copy(result.state))),
        );
      if (result.value !== true)
        results.push(
          ...(asExpression
            ? expression(no, copy(result.state))
            : statement(no, copy(result.state))),
        );
    }
    return results;
  }
  function statement(node, state) {
    if (!node) return [state];
    if (++steps > 20000) {
      safe = false;
      return [];
    }
    if (node.type === "BlockStatement") {
      let states = [state];
      for (const child of node.body) {
        states = states.flatMap((s) => (s.flow ? [s] : statement(child, s)));
        if (states.length > 128) {
          safe = false;
          return [];
        }
      }
      return states;
    }
    if (node.type === "ExpressionStatement")
      return expression(node.expression, state).map((r) => r.state);
    if (node.type === "VariableDeclaration") {
      let states = [state];
      for (const d of node.declarations) {
        if (d.id.type !== "Identifier") {
          safe = false;
          return [];
        }
        if (d.init)
          states = states.flatMap((s) =>
            expression(
              {
                type: "AssignmentExpression",
                operator: "=",
                left: d.id,
                right: d.init,
              },
              s,
            ).map((r) => r.state),
          );
      }
      return states;
    }
    if (node.type === "IfStatement")
      return branches(node.test, node.consequent, node.alternate, state);
    if (node.type === "WhileStatement") {
      const queue = [state],
        seen = new Set(),
        exits = [];
      while (queue.length) {
        const next = queue.shift(),
          key = JSON.stringify([next.initialized, [...next.flags].sort()]);
        if (seen.has(key)) continue;
        seen.add(key);
        if (seen.size > 128) {
          safe = false;
          return [];
        }
        for (const condition of expression(node.test, next)) {
          if (condition.value !== true) exits.push(copy(condition.state));
          if (condition.value !== false)
            for (const body of statement(node.body, copy(condition.state))) {
              if (body.flow === "break") {
                body.flow = null;
                exits.push(body);
              } else if (body.flow) exits.push(body);
              else queue.push(body);
            }
        }
      }
      return exits;
    }
    if (["ReturnStatement", "ThrowStatement"].includes(node.type))
      return expression(node.argument, state).map((r) => ({
        ...r.state,
        flow: "return",
      }));
    if (node.type === "BreakStatement") {
      if (node.label) safe = false;
      return [{ ...state, flow: "break" }];
    }
    if (node.type === "EmptyStatement" || node.type === "FunctionDeclaration")
      return [state];
    safe = false;
    return [];
  }
  statement(fn.body, { initialized: false, flags: new Map(), flow: null });
  return safe;
}
module.exports = { proveScratchInitialization };
