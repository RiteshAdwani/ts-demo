import { createRouter } from "./router";
import { routes } from "./routes";

export const { router, navigate, back, forward, getCurrentRoute, isActive } = createRouter({
  routes,
  initialPath: window.location.pathname,
});
