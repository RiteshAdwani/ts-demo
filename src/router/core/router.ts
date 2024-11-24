import { InferredPaths, NavigateOptions, Route, RouterOptions, RouterState, SearchParamsForPath } from "../types";
import { findMatchingRoute, extractRouteMatch } from "./utils";

export class Router<TRoutes extends readonly Route<any, any, any>[]> {
  private routes: TRoutes;
  private history: RouterState[] = [];
  private currentIndex: number = -1;

  constructor(options: RouterOptions<TRoutes>) {
    this.routes = options.routes;
    const initialPath = options.initialPath || "/";

    const matchedRoute = findMatchingRoute(initialPath, this.routes);
    const match = matchedRoute
      ? extractRouteMatch(initialPath, matchedRoute)
      : { params: {}, searchParams: {} };
    // console.log({ match });

    // Initialize with parsed params from URL
    const initialState: RouterState = {
      currentPath: initialPath,
      params: match.params,
      searchParams: match.searchParams,
      isLoading: true,
    };

    this.history.push(initialState);
    this.currentIndex = 0;

    // Immediately invoke initial navigation
    this.navigate(initialPath, { replace: true });
  }

  public async navigate(
    path: string,
    options?: NavigateOptions
  ): Promise<RouterState> {
    const matchedRoute = findMatchingRoute(path, this.routes);
    if (!matchedRoute) {
      throw new Error(`No route found for path: ${path}`);
    }

    const match = extractRouteMatch(path, matchedRoute);
    const newState: RouterState = {
      currentPath: path,
      previousPath: this.getCurrentState().currentPath,
      params: match.params,
      searchParams: match.searchParams,
      isLoading: true,
    };

    try {
      if (matchedRoute.loader) {
        newState.data = await matchedRoute.loader(match.params);
      }

      newState.isLoading = false;

      if (options?.replace) {
        this.history[this.currentIndex] = newState;
        window.history.replaceState(null, "", path);
      } else {
        this.history.splice(this.currentIndex + 1);
        this.history.push(newState);
        this.currentIndex++;
        window.history.pushState(null, "", path);
      }
      return newState;
    } catch (error) {
      return {
        ...newState,
        isLoading: false,
        error: error as Error,
      };
    }
  }

  public back(): RouterState {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const newState = this.history[this.currentIndex];
      window.history.pushState(null, "", newState.currentPath);
      return newState;
    }
    return this.getCurrentState();
  }

  public forward(): RouterState {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const newState = this.history[this.currentIndex];
      window.history.pushState(null, "", newState.currentPath);
      return newState;
    }
    return this.getCurrentState();
  }

  public getCurrentState(): RouterState {
    return this.history[this.currentIndex];
  }

  // public getCurrentRoute(): Route<string, Record<string,unknown>, Record<string,unknown>> | undefined {
  //   const matchedRoute = findMatchingRoute(
  //     this.getCurrentState().currentPath,
  //     this.routes
  //   );
  //   return matchedRoute || this.routes[this.routes.length - 1];
  // }

  public getCurrentRoute(): Route<InferredPaths, SearchParamsForPath<InferredPaths>, any> {
    const matchedRoute = findMatchingRoute(
      this.getCurrentState().currentPath,
      this.routes
    );
    return matchedRoute || this.routes[this.routes.length - 1];
  }

  public isActive(path: string): boolean {
    const currentPath = this.getCurrentState().currentPath;
    const currentPathOnly = currentPath.split("?")[0];
    return currentPathOnly === path;
  }
}

// public async navigate(
//   path: string,
//   options?: NavigateOptions
// ): Promise<RouterState> {
//   const matchedRoute = findMatchingRoute(path, this.routes);
//   if (!matchedRoute) {
//     throw new Error(`No route found for path: ${path}`);
//   }

//   const match = extractRouteMatch(path, matchedRoute);
//   const searchParams = new URLSearchParams(window.location.search);

//   const newState: RouterState = {
//     currentPath: path,
//     previousPath: this.getCurrentState().currentPath,
//     params: match.params,
//     searchParams: Object.fromEntries(searchParams.entries()),
//     isLoading: true,
//   };

//   try {
//     if (matchedRoute.loader) {
//       newState.data = await matchedRoute.loader(match.params);
//     }

//     newState.isLoading = false;

//     if (options?.replace) {
//       this.history[this.currentIndex] = newState;
//       window.history.replaceState(null, "", path);
//     } else {
//       // this.history.splice(this.currentIndex + 1);/
//       this.history.push(newState);
//       this.currentIndex++;
//       window.history.pushState(null, "", path);
//     }
//     return newState;
//   } catch (error) {
//     return {
//       ...newState,
//       isLoading: false,
//       error: error as Error,
//     };
//   }
// }
