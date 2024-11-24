import React, { useState, useEffect } from "react";
import type { InferredPaths, Route, RouterContextType, RouterState, SearchParamsForPath } from "../types";
import { RouterContext } from "../context";
import { Router } from "../core/router";

// Provider component
export function RouterProvider<
  TRoutes extends readonly Route<any, any, any>[]
>({
  router,
  children,
}: {
  router: Router<TRoutes>;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<RouterState>(router.getCurrentState());

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      const path = window.location.pathname + window.location.search;
      router.navigate(path, { replace: true }).then(setState);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  const contextValue: RouterContextType<InferredPaths,SearchParamsForPath<InferredPaths>> = {
    state,
    navigate: async (path, options) => {
      const newState = await router.navigate(path, options);
      setState(newState);
      return newState;
    },
    back: () => {
      const newState = router.back();
      setState(newState);
      return newState;
    },
    forward: () => {
      const newState = router.forward();
      setState(newState);
      return newState;
    },
    getCurrentRoute: () => router.getCurrentRoute(),
    getCurrentState: () => router.getCurrentState(),
    isActive: (path) => router.isActive(path),
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}