const baseURL = "rashim.in";

// Routes the site owns. Header renders its own navLinks list and only uses this
// as a filter, so /resume being here makes it sitemap-visible without adding a
// nav link — the page stays unlinked in the UI, as intended.
const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/now": true,
  "/uses": true,
  "/resume": true,
};

const protectedRoutes = {};

const display = {
  location: true,
  time: true,
};

export { routes, protectedRoutes, display, baseURL };
