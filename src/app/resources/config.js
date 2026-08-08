const baseURL = "rashim.in";

// Routes rendered in the site navigation. /resume is deliberately absent:
// the page still builds and resolves, it is just not linked from the UI.
const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/now": true,
  "/uses": true,
};

const protectedRoutes = {};

const display = {
  location: true,
  time: true,
};

export { routes, protectedRoutes, display, baseURL };
