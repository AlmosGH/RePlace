const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const notes = {
  initializePainting:
    "Initialization boundary for a server-selected painting. The response has already supplied the account, painting configuration, shop data and permission settings. This function constructs the shared renderer/UI objects before registering handlers that close over them. Later callbacks read those mutable objects, so moving handlers into independent modules would require preserving the same state and initialization order.",
  req: "HTTP request boundary. The pending-request key combines the method and URL; cancelling a matching request is optional and is not a statement about HTTP caching. The wrapper builds the original protocol headers and translates transport outcomes into the existing success flag/response callback. Error branches can instead redirect, open a modal, or display a notice; callers must preserve those distinctions.",
  drawPixelAt:
    "Placement and replay share this entry point. Browser-initiated placement follows the original account/tool/cooldown checks and the existing outgoing socket format; server-originated updates apply painting/protection data and tracking information. An emitted packet is not itself a server acknowledgement. Keep coordinate, color and command positions stable, including the alternate paths for weapon/image commands.",
  connectRealtime:
    "Connection lifecycle boundary. Creating the Socket.IO transport is followed by the existing authentication/painting handshake; transport connectivity and application readiness are separate states. Server-event callbacks update the same renderer, account and chat state used by the UI. Reconnect/reset branches intentionally retain their original ordering and pending-data behavior.",
  addMessageRow:
    "Chat rendering boundary. Message type selects different markup and metadata paths, including system notices, user messages and richer event content. Text insertion and HTML insertion are intentionally distinct operations in the original client; this commented reference does not convert one into the other. Channel visibility, scroll position, unread counts and per-user presentation all affect the resulting row.",
  sendMessage:
    "Outgoing chat and local-command boundary. Local slash commands may update the UI, request data, or emit a command packet instead of sending ordinary chat text. The existing channel, whisper, moderation and account checks therefore remain ahead of their dispatch branches. Preserve command spelling and payload keys, which are contracts with the original server.",
  hookWire:
    "Application input-integrity observation. The wrapper keeps a reference to the previous WebSocket send function, records qualifying traffic, and delegates with the original receiver and arguments. This is application behavior retained from the supplied client, not the obfuscator bootstrap removed by the deobfuscator. The client-side observation does not establish what the backend subsequently enforces.",
  maybePost:
    "Integrity-report gate. The original signal, scheduling and participation conditions are checked before starting a report. Recording a signal, qualifying for a report, scheduling it and actually transmitting it are separate state transitions. Keep the guards intact to preserve duplicate-report suppression and the original network behavior.",
  notePlacement:
    "Record participation from an observed placement using the existing painting/war-area conditions. The state changes here can influence whether a later integrity report is eligible. The coordinates are painting coordinates, not page coordinates.",
  screenToPaintingSpace:
    "Convert page/screen coordinates into painting coordinates. The canvas rectangle supplies the current page offset; the current scale supplies the inverse zoom. The legacy branch accounts for the original browser-specific zoom behavior. Rounding and bounds checks are performed by callers in their original positions, rather than silently being moved into this transform.",
  paintingToScreenSpace:
    "Convert painting positions into overlay/page positions using the existing scale and canvas rectangle. This is used by cursors and visual effects; it does not mutate the painting pixels. Keep it paired with the inverse transform when changing view logic.",
  normalizePointerEvent:
    "Normalize coordinates across the original mouse/touch event shapes. The fallback order matters because page, client and changed-touch coordinates can coexist on wrapped jQuery events. The function preserves the original object/result behavior rather than creating a new event abstraction.",
  setCursorPosition:
    "Update cursor and placement previews using the current view and tool state. Desktop pointer placement and mobile-centered placement follow different branches. Weapon radius, brush size and rendering/zoom mode affect overlay dimensions, so the displayed cursor is not a direct statement about a server-accepted placement.",
  setCursorCoords:
    "Translate the current input into integer painting coordinates, apply the client bounds checks, and update coordinate state/display. Invalid positions keep the original null-coordinate behavior used by later placement guards.",
  updateScaleAndPosition:
    "Apply the current view transform and associated overlays. This is a presentation operation over shared x/y/scale state, not a pixel-data edit. Chat/input state and the original rendering-mode branches can affect work performed before the transform is applied.",
  getColorFromPainting:
    "Read an existing pixel from the painting buffer and resolve it against the current palette. The caller can request the resolved color or use the path that updates selection. Palette indices remain protocol/storage values; changing their order would change meaning.",
  checkProtectionFromPainting:
    "Read the original protection image/buffer for a painting coordinate. This is a browser-side preliminary check over the latest local snapshot and does not prove that a later server request will be permitted.",
  checkDuplicateFromPainting:
    "Compare the requested placement with currently rendered pixel data using the original palette conversion. This avoids a local duplicate path; it does not replace server-side placement validation or guarantee that the local snapshot is current.",
  triggerCooldownPanel:
    "Manage the original cooldown display and any repeating countdown update. The display uses browser time and the existing server-provided cooldown state. Clearing the previous interval before replacing it prevents multiple countdown callbacks from controlling the same UI.",
  loadPainting:
    "Painting resource-loading boundary. Resource callbacks and loaded/readiness flags determine when rendering and interaction can proceed. Keep loading UI transitions separate from transport connection state and from authentication state.",
  loadPalette:
    "Build palette controls from the configured presentation order while retaining the original numeric color identifiers. Selection and disabled/availability states belong to the current painting/account context.",
  selectPaletteColor:
    "Update the selected palette entry and the related cursor/tool appearance through the original availability checks. The selected color is subsequently used by placement; selecting it alone does not send a pixel.",
  loadTrackingHistory:
    "Load a recorded snapshot/history for the time-machine UI. Replay is a separate rendering mode, with its own image load and timing callbacks. The live client state is still shared, so replay guards must remain in their original placement branches.",
  renderHistoryFrame:
    "Render the next eligible recorded pixels according to the original playback index, elapsed-time check and speed. requestAnimationFrame schedules presentation work; the timestamp field used for the recorded history remains distinct from the frame clock.",
  drawBrushFrame:
    "Repeated brush placement is driven by frame timestamps while drawing remains active. The frame-level throttle and the normal placement/cooldown path are both relevant. The rolling placement-rate display counts recent local placement timestamps; it is not a fabricated server-side rate acknowledgement.",
  applyPixelBatch:
    "Consume the server batch lists in their original order. Each array position is a protocol field; the initial/update lists and command-bearing entries must not be reshaped. Image resources required by command entries are loaded through the existing preparatory path.",
  loadBombImages:
    "Prepare the image resources associated with the supplied user identifiers. Completion includes load-error callbacks so the batch does not wait indefinitely for a single image. The original cache and completion callback semantics are retained.",
  openModal:
    "Modal state transition boundary. Existing active content, target selectors, loaders and permission-driven content initialization are coordinated here. A modal change can trigger an asynchronous loader; visible presentation must not be taken as evidence that its request already completed.",
  closeModal:
    "Restore the original modal visibility/active-state behavior. Related tool and painting input state is shared with the rest of the application, so closing a dialog can affect which later input handlers run.",
  updateActiveContent:
    "Select and initialize the requested modal/content branch. Many branches read current server/account state or initiate additional requests, so the operation is more than a DOM show/hide toggle. Preserve the original selectors and branch-specific initialization order.",
  saveUserSettings:
    "Persist the current browser-side preferences through the original storage path. These are client preferences, not authority to change server account/painting permissions.",
  onChangeTools:
    "Apply a tool or settings change to the current shared state and its UI. Some preferences also persist or reset other tool modes. The optional arguments control the original behavior and must not be collapsed into an unconditional save.",
  fetchPaintingAccess:
    "Load the selected access-request page/filter and render its results. Pagination/filter fields are sent using the original names. An empty result, a transport failure and a denied operation follow different callback/UI paths.",
  fetchPaintingModerators:
    "Load the painting moderator list and permission controls from the server response. Checkbox presentation reflects returned permission fields; it does not grant permissions without the corresponding server request.",
  loadUserProfile:
    "Request a profile and render the response through the existing account, permission, privacy and activity branches. Rich profile sections can trigger further UI setup, so rendering is not equivalent to a single text replacement.",
  openProfile:
    "Open or route the profile interaction using the current chat/modifier-key state before the profile request/render path. The username/query format and profile selectors are part of the existing UI contract.",
  runCaptchaAction:
    "Dispatch the selected form/action directly or defer it through the existing CAPTCHA flow according to the supplied flag. The action identifier maps to a stored callback, and completion uses the original token/data arguments.",
  requestCaptcha:
    "Record the pending action and open the CAPTCHA UI only under the original pending-state guard. The action is resumed by a separate completion handler; opening the UI alone is not completion.",
  disconnectUser:
    "Execute the original local account/session reset and navigation path. Clearing browser state and disconnecting transport are distinct effects; preserve the branch-specific order.",
  placeNextImagePixel:
    "Advance the image-painting cursor, skip eligible transparent/unchanged source pixels, and use the normal placement entry point. Source image offsets, target painting offsets and palette indices remain distinct quantities.",
  renderImagePainterFrame:
    "Schedule the next image-painting step using the original rate and cooldown checks. The started flag is read again for rescheduling, which allows stop/reset actions to halt the loop without inventing an acknowledgement.",
  rgbToLab:
    "Convert RGB through the original normalized color-space calculation for perceptual palette matching. The exact floating-point constants are preserved even when historical versions differ by tiny arithmetic-obfuscation artifacts.",
  colorDifference:
    "Calculate the original perceptual distance from Lab lightness/chroma/hue terms. Intermediate normalization and negative-roundoff handling are retained; simplifying them to raw RGB distance would change palette selection.",
  findNearestPaletteColor:
    "Choose the best original similarity score from the current image-painter palette entries. Tie handling and score rounding are part of the original selection behavior.",
  resizeViewport:
    "Synchronize page/canvas presentation with current viewport dimensions. The force flag bypasses the original dimension-change test. It does not change the painting pixel dimensions configured by the server.",
  renderActiveEffects:
    "Render the currently supplied effect/item entries, skipping entries expired according to the existing second-based clock. This UI state is derived from server data and the browser clock, not a separate server acknowledgement.",
  showWarArea:
    "Render a server-described war area and schedule its original time-dependent updates. Area ownership, fight timing and marker visibility come from shared server/event data.",
  removeWarArea:
    "Remove the selected area marker and stop its associated update timer. Other areas and the shared painting remain active.",
  useWeapon:
    "Follow the original selected-item, account, protection and war-state branches before the server-facing item action. A client-side confirmation or UI change is not proof that the server accepted the action.",
  useItem:
    "Submit the selected inventory item through its existing request and callback path. Inventory/UI updates occur according to the returned result, rather than being invented by this commented reference.",
};
function property(node) {
  return t.isMemberExpression(node)
    ? !node.computed
      ? node.property.name
      : t.isStringLiteral(node.property)
        ? node.property.value
        : null
    : null;
}
function pathText(node) {
  if (t.isIdentifier(node)) return node.name;
  if (t.isThisExpression(node)) return "this";
  if (t.isMemberExpression(node)) {
    const object = pathText(node.object),
      key = property(node);
    return object ? object + (key ? "." + key : "[computed]") : null;
  }
  return null;
}
function staticPrefix(node) {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isBinaryExpression(node, { operator: "+" }))
    return staticPrefix(node.left);
  return null;
}
function functionName(p) {
  if (p.node.id?.name) return p.node.id.name;
  if (p.isObjectMethod()) return p.node.key.name || p.node.key.value;
  if (p.parentPath.isObjectProperty())
    return p.parent.key.name || p.parent.key.value;
  if (p.parentPath.isAssignmentExpression()) return property(p.parent.left);
  return null;
}
function describe(p) {
  const network = new Set(),
    emits = new Set(),
    dom = new Set(),
    writes = new Set(),
    timers = new Set();
  let usesThis = false;
  p.traverse({
    Function(q) {
      q.skip();
    },
    ThisExpression() {
      usesThis = true;
    },
    AssignmentExpression(q) {
      const target = q.node.left;
      const base = t.isIdentifier(target)
        ? target
        : t.isMemberExpression(target)
          ? (() => {
              let n = target;
              while (t.isMemberExpression(n)) n = n.object;
              return n;
            })()
          : null;
      if (!base) return;
      const binding = t.isIdentifier(base)
        ? q.scope.getBinding(base.name)
        : null;
      if (
        t.isThisExpression(base) ||
        (binding && binding.scope.getFunctionParent() !== p.scope)
      ) {
        const name = pathText(target);
        if (name) writes.add(name);
      }
    },
    CallExpression(q) {
      const c = q.node.callee,
        method = property(c),
        args = q.node.arguments;
      if (method === "req" && t.isStringLiteral(args[0])) {
        const url = staticPrefix(args[1]);
        if (url)
          network.add(
            args[0].value +
              " " +
              url +
              (t.isStringLiteral(args[1]) ? "" : " <dynamic suffix>"),
          );
      }
      if (t.isIdentifier(c, { name: "fetch" })) {
        const url = staticPrefix(args[0]);
        if (url) network.add("fetch " + url);
      }
      if (method === "emit" && t.isStringLiteral(args[0]))
        emits.add(args[0].value);
      if (
        [
          "text",
          "html",
          "show",
          "hide",
          "css",
          "attr",
          "prop",
          "val",
          "append",
          "remove",
          "addClass",
          "removeClass",
        ].includes(method)
      ) {
        const receiver = pathText(c.object);
        dom.add(receiver ? receiver + "." + method : method);
      }
      const timer = t.isIdentifier(c) ? c.name : method;
      if (
        ["setTimeout", "setInterval", "requestAnimationFrame"].includes(timer)
      )
        timers.add(
          timer +
            (t.isNumericLiteral(args[1]) ? " (" + args[1].value + " ms)" : ""),
        );
    },
  });
  const lines = [];
  const name = functionName(p);
  if (notes[name]) lines.push(notes[name]);
  const parent = p.parentPath;
  if (parent.isCallExpression()) {
    const method = property(parent.node.callee),
      args = parent.node.arguments;
    if (
      ["on", "one", "addEventListener"].includes(method) &&
      t.isStringLiteral(args[0])
    ) {
      const selector = t.isStringLiteral(args[1])
        ? " delegated to " + JSON.stringify(args[1].value)
        : "";
      lines.push(
        "Registered " +
          args[0].value +
          " callback" +
          selector +
          ". It reads the current shared state when the event arrives; registration does not execute the callback body.",
      );
    }
    if (method === "req") {
      const url = staticPrefix(args[1]);
      lines.push(
        "HTTP completion callback" +
          (url ? " for " + url : "") +
          ". It runs through the existing wrapper result/error flow; preserve guard returns and branch-specific UI updates.",
      );
    }
    if (
      t.isIdentifier(parent.node.callee) &&
      ["setTimeout", "setInterval", "requestAnimationFrame"].includes(
        parent.node.callee.name,
      )
    )
      lines.push(
        "Scheduled callback. State may have changed since scheduling, so the guards inside this body are evaluated at execution time.",
      );
  }
  const add = (title, set) => {
    if (set.size)
      lines.push(
        title +
          ": " +
          [...set].slice(0, 8).join(", ") +
          (set.size > 8
            ? " (plus " + (set.size - 8) + " other observed operations)"
            : "") +
          ".",
      );
  };
  add("Direct network calls", network);
  add("Outgoing socket event names", emits);
  add("Shared/receiver state written", writes);
  add("Observed DOM operations", dom);
  add("Scheduled work", timers);
  if (usesThis)
    lines.push(
      "This body uses the call receiver (`this`); replacing it with an unbound callback can change behavior.",
    );
  if (!notes[name] && lines.length < 2) return null;
  if (p.node.params.length)
    lines.push(
      "Input bindings: " +
        p.node.params
          .map((node) =>
            t.isIdentifier(node) ? node.name : "destructured/rest input",
          )
          .join(", ") +
        ". Names describe inferred roles; protocol field names are preserved separately.",
    );
  return lines;
}
function annotateDetailed(ast) {
  let count = 0;
  traverse(ast, {
    Function(p) {
      if (count >= 1200) return;
      const lines = describe(p);
      if (!lines) return;
      const target =
        p.isFunctionDeclaration() || p.isObjectMethod()
          ? p.node
          : p.parentPath.isObjectProperty()
            ? p.parent
            : p.parentPath.isAssignmentExpression()
              ? p.parent
              : p.node;
      const text =
        "*\n" +
        lines
          .map((line) => " * " + line.replace(/\*\//g, "* /"))
          .join("\n *\n") +
        "\n ";
      t.addComment(target, "leading", text);
      count++;
    },
  });
  return count;
}
module.exports = { annotateDetailed };
