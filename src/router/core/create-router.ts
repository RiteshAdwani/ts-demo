import type { RouterOptions, Route } from "../types";
import { Router } from "./router";

export function createRouter<TRoutes extends readonly Route<any, any, any>[]>(
  options: RouterOptions<TRoutes>
) {
  // Create router instance
  const router = new Router<TRoutes>(options);

  return {
    // Core router instance
    router,

    // Navigation methods
    navigate: (path: string, options?: { replace?: boolean; state?: any }) =>
      router.navigate(path, options),
    back: () => router.back(),
    forward: () => router.forward(),

    // State getters
    getCurrentRoute: () => router.getCurrentRoute(),
    getCurrentState: () => router.getCurrentState(),

    // Utils
    isActive: (path: string) => router.isActive(path),
  } as const;
}
