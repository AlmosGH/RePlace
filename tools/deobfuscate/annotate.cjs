const t = require("@babel/types");

// These describe observed behavior; they do not reinterpret payload fields or
// imply that this reference client can run without the original site/backend.
const functions = {
  randomCacheToken:
    "The protocol mixes this restricted alphabet with the alphanumeric alphabet when building request tokens.",
  nowMilliseconds:
    "UI animation and placement cooldowns use milliseconds; server timestamps elsewhere use seconds.",
  nowSeconds:
    "Convert the browser clock to the integer-second timestamps expected by the existing protocol.",
  initializePainting:
    "Build the painting UI from the server response, then register input, chat, shop, and realtime handlers. Shared state stays inside this ready callback.",
  showNotification:
    "Suppress identical consecutive notices unless explicitly allowed; dismissal and visual effects are scheduled separately.",
  scheduleNotificationDismissal:
    "Leave the notification visible for six seconds before starting its fade-out animation.",
  loadTrackingHistory:
    "Fetch the recorded snapshot and pixel history used by the time-machine view; entering history changes the client rendering mode.",
  renderHistoryFrame:
    "Advance recorded pixels at the selected playback speed while keeping rendering on animation frames.",
  drawBrushFrame:
    "Repeat placement while drawing is active and update the rolling placement-rate display. Each placement still follows the normal send path.",
  zoomAroundViewportCenter:
    "Compensate the painting offset when changing scale so the viewport center remains over the same canvas position.",
  formatDuration:
    "Format a duration in seconds using the original day/hour/minute boundary rules.",
  normalizePointerEvent:
    "Recover page coordinates from mouse or touch events, preserving the original coordinate fallback order.",
  connectRealtime:
    "Create the original websocket-only Socket.IO connection and register its server-event handlers. Reconnection uses the existing handshake and state-reset logic.",
  applyPixelBatch:
    "Apply the initial and updated pixel lists in their original order; indices in each pixel tuple are protocol fields.",
  loadBombImages:
    "Load the per-user image assets referenced by bomb commands before applying the associated pixel batch.",
  rgbToLab:
    "Convert RGB values to CIE Lab for perceptual palette matching. Keep the original floating-point constants for numerical correspondence.",
  colorDifference:
    "Compare Lab lightness, chroma, and hue rather than raw RGB distance.",
  findNearestPaletteColor:
    "Select the palette entry with the best original perceptual similarity score.",
  placeNextImagePixel:
    "Skip transparent source pixels and place the next eligible image pixel through the normal painting path.",
  renderImagePainterFrame:
    "Throttle image placement using the server-provided rate and the client cooldown before scheduling another frame.",
  setPageLoading:
    "Control the page-level loader; the painting loader is managed independently.",
  setPaintingLoading:
    "Control the painting loader while snapshots or canvas resources are being prepared.",
  showAccessRequest:
    "Choose the access-request UI from the painting permissions and account state already returned by the server.",
};
const variables = {
  inputIntegrityState:
    "Application-level input checks are retained. These are separate from the removed obfuscator bootstrap and can affect requests to the original server.",
  api: "Central HTTP wrapper: track pending requests, optionally cancel a previous matching request, construct protocol headers, and dispatch server responses.",
  defaultPalette:
    "The order array controls presentation; color indices remain unchanged because the server and stored pixels use them.",
  connection:
    "Mutable realtime connection state shared by the handshake, placement, chat, and reconnect handlers.",
  serverData:
    "Authoritative account, painting, permission, and shop data populated by the painting HTTP response.",
  elements:
    "Cached jQuery handles for the main UI surfaces; keep selectors unchanged to match the original page markup.",
  pointer:
    "Translate between page and painting coordinates and update the desktop/mobile cursor overlays.",
  canvasRenderer:
    "Own canvas buffers, view transforms, drawing tools, protection overlays, placement state, and rendering callbacks.",
  chat: "Keep channel visibility, unread counts, message rendering, and outgoing command handling together.",
  ui: "Coordinate modal state, form content, toolbar preferences, and the settings persisted by the original client.",
};
const methods = {
  req: "The fourth argument cancels an older request with the same method/URL. CACHE-L0CAL is an existing protocol header, not an HTTP cache directive.",
  hookWire:
    "Observe the existing outgoing websocket traffic for the application input-integrity checks without changing the original send arguments.",
  screenToPaintingSpace:
    "Invert the painting transform. The legacy zoom branch compensates for browsers whose rectangle coordinates already include zoom.",
  paintingToScreenSpace:
    "Apply the painting transform to position overlays in page space.",
  drawPixelAt:
    "The from-server path updates the rendered canvas; the local path validates client state and sends the existing placement tuple. Payload positions and event names must stay stable.",
  getUrlHash:
    "Read the shared x/y/scale view from the URL and constrain zoom to the configured bounds.",
  addMessageRow:
    "Render the original message variants and their metadata. Preserve the existing distinction between text insertion and trusted markup paths.",
  sendMessage:
    "Interpret local slash commands first; messages and moderation commands use their existing Socket.IO events and field names.",
  openModal:
    "Switch visible modal content through the existing loading and permission paths.",
  onChangeTools:
    "Apply the requested tool setting and its existing persistence behavior.",
};
const events = {
  canvas:
    "Server pixel batches are rendered only after any image resources required by their commands have been loaded.",
  connect:
    "A transport connection is not yet an authenticated painting session; the original authentication handshake follows.",
  disconnect:
    "Reset connection-dependent UI/state through the original disconnect path.",
  "pong.alive":
    "Preserve the original heartbeat exchange and token construction.",
  "area.fight.start":
    "Update the active war area and the associated UI from the server event.",
  "area.fight.end":
    "Render the server-provided war result and reset the active fight state.",
};

function annotate(ast) {
  const traverse = require("@babel/traverse").default;
  let comments = 0;
  function add(node, text) {
    if (!text) return;
    t.addComment(node, "leading", " " + text + " ");
    comments++;
  }
  traverse(ast, {
    FunctionDeclaration(p) {
      add(p.node, functions[p.node.id.name]);
    },
    VariableDeclarator(p) {
      if (t.isIdentifier(p.node.id)) add(p.parent, variables[p.node.id.name]);
    },
    AssignmentExpression(p) {
      if (t.isIdentifier(p.node.left) && t.isObjectExpression(p.node.right))
        add(p.parent, variables[p.node.left.name]);
    },
    ObjectProperty(p) {
      if (t.isFunction(p.node.value))
        add(p.node, methods[p.node.key.name || p.node.key.value]);
    },
    ObjectMethod(p) {
      add(p.node, methods[p.node.key.name || p.node.key.value]);
    },
    CallExpression(p) {
      const callee = p.node.callee;
      if (
        t.isMemberExpression(callee) &&
        callee.property.name === "on" &&
        t.isStringLiteral(p.node.arguments[0])
      ) {
        const statement = p.findParent((parent) =>
          parent.isExpressionStatement(),
        );
        if (statement) add(statement.node, events[p.node.arguments[0].value]);
      }
    },
  });
  return comments + require("./detailed-comments.cjs").annotateDetailed(ast);
}
module.exports = { annotate };
