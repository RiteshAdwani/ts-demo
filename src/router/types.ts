import { ComponentType } from "react";
import {  routes } from "../routes";

// ============== Search Params ==============
export type SearchParams<T> = {
  [K in keyof T]: string | string[];
};

// ============== Route Params ==============
export type RouteParams<TPath extends string> =
  TPath extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & RouteParams<Rest>
    : TPath extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : Record<string, never>;

// ============== Route ==============
export type Route<
  TPath extends string = string,
  TSearch = unknown,
  TLoaderData = unknown
> = {
  path: TPath;
  component: ComponentType;
  searchParams?: TSearch;
  loader?: (params: RouteParams<TPath>) => Promise<TLoaderData> | TLoaderData;
  beforeEnter?: (params: RouteParams<TPath>) => boolean | Promise<boolean>;
  children?: Route[];
};

// ============== Router Options ==============
export type RouterOptions<TConfig extends readonly Route<any, any, any>[]> = {
  routes: TConfig;
  initialPath?: string;
};

// ============== Router state ==============
export type RouterState = {
  currentPath: string;
  previousPath?: string;
  params: Record<string, string>;
  searchParams: Record<string, string | string[]>;
  isLoading: boolean;
  error?: Error;
  data?: unknown;
};

// ============== Navigate options ==============
export type NavigateOptions = {
  replace?: boolean;
  state?: any;
};

// ============== Link component props ==============
export type LinkProps<
  TRoutes extends readonly Route<any, any, any>[],
  TPath extends RoutePaths<TRoutes> = RoutePaths<TRoutes>
> = {
  to: TPath;
  params?: RouteParams<TPath>;
  searchParams?: SearchParams<
    Extract<TRoutes[number], { path: TPath }>["searchParams"]
  >;
  children: React.ReactNode;
};

// ============== Router context ==============
export type RouterContextType<
TPath extends InferredPaths,
TSearchParams = SearchParamsForPath<TPath>, 
TRouteData = InferredRouteData> = {
  state: RouterState;
  navigate: (path: string, options?: NavigateOptions) => Promise<RouterState>;
  back: () => RouterState;
  forward: () => RouterState;
  getCurrentRoute: () => Route<TPath,TSearchParams, TRouteData>;
  getCurrentState: () => RouterState;
  isActive: (path: string) => boolean;
};


// Helper type to extract route paths
export type RoutePaths<T extends readonly Route<any, any, any>[]> =
  T[number]["path"];

// Helper type to match route paths
export type RouteMatch<T extends Route<any, any, any>> = {
  params: RouteParams<T["path"]>;
  searchParams: T extends Route<any, infer S>
    ? SearchParams<S>
    : Record<string, never>;
  data?: T extends Route<any, any, infer D> ? D : never;
};



// export type ExtractRouteData<T extends Route> = T extends Route
//   ? T extends { loader: (...args: any[]) => Promise<infer U> | infer U }
//     ? U
//     : never
//   : never;

export type RouteConfig = (typeof routes)[number];
export type InferredPaths = typeof routes[number]['path'];
// export type SearchParamsForPath<Path extends string> = Extract<RouteConfig, { path: Path }>["searchParams"];

export type SearchParamsForPath<Path extends InferredPaths> = Extract< RouteConfig, { path: Path  } > extends { searchParams: infer Params }   ? Params  :undefined; 


// // Usage Example for inferring searchParams types
export type UsersSearchParams = SearchParamsForPath<"/users">;
export type AboutSearchParams = SearchParamsForPath<"/about">;




export type InferredRouteData = RouteConfig extends { loader: (...args: any[]) => Promise<infer U> | infer U } ? U : never;


  // =================
  // export class Router<TRoutes extends readonly Route<any, any, any>[]> {
  //   private routes: TRoutes;
  //   private history: RouterState[] = [];
  //   private currentIndex: number = -1;
  
  //   constructor(options: RouterOptions<TRoutes>) {
  //     this.routes = options.routes;
  //     const initialPath = options.initialPath || "/";
  
  //     const matchedRoute = findMatchingRoute(initialPath, this.routes);
  //     const match = matchedRoute
  //       ? extractRouteMatch(initialPath, matchedRoute)
  //       : { params: {}, searchParams: {} };
  //       console.log({match})
  
  //     // Initialize with parsed params from URL
  //     const initialState: RouterState = {
  //       currentPath: initialPath,
  //       params: match.params,
  //       searchParams: match.searchParams,
  //       isLoading: true,
  //     };
  
  //     this.history.push(initialState);
  //     this.currentIndex = 0;
  
  //     // Immediately invoke initial navigation
  //     this.navigate(initialPath, { replace: true });
  //   }
  
  //   public async navigate(
  //     path: string,
  //     options?: NavigateOptions
  //   ): Promise<RouterState> {
  //     const matchedRoute = findMatchingRoute(path, this.routes);
  //     if (!matchedRoute) {
  //       throw new Error(`No route found for path: ${path}`);
  //     }
    
  //     const match = extractRouteMatch(path, matchedRoute);
  //     const newState: RouterState = {
  //       currentPath: path,
  //       previousPath: this.getCurrentState().currentPath,
  //       params: match.params,
  //       searchParams: match.searchParams,
  //       isLoading: true,
  //     };
    
  //     try {
  //       if (matchedRoute.loader) {
  //         newState.data = await matchedRoute.loader(match.params);
  //       }
    
  //       newState.isLoading = false;
    
  //       if (options?.replace) {
  //         this.history[this.currentIndex] = newState;
  //         window.history.replaceState(null, "", path);
  //       } else {
  //         this.history.splice(this.currentIndex + 1);
  //         this.history.push(newState);
  //         this.currentIndex++;
  //         window.history.pushState(null, "", path);
  //       }
  //       return newState;
  //     } catch (error) {
  //       return {
  //         ...newState,
  //         isLoading: false,
  //         error: error as Error,
  //       };
  //     }
  //   }
    
  //   public back(): RouterState {
  //     if (this.currentIndex > 0) {
  //       this.currentIndex--;
  //       const newState = this.history[this.currentIndex];
  //       window.history.pushState(null, "", newState.currentPath);
  //       return newState;
  //     }
  //     return this.getCurrentState();
  //   }
  
  //   public forward(): RouterState {
  //     if (this.currentIndex < this.history.length - 1) {
  //       this.currentIndex++;
  //       const newState = this.history[this.currentIndex];
  //       window.history.pushState(null, "", newState.currentPath);
  //       return newState;
  //     }
  //     return this.getCurrentState();
  //   }
  
  //   public getCurrentState(): RouterState {
  //     return this.history[this.currentIndex];
  //   }
  
  //   public getCurrentRoute(): Route<any, any, any> | undefined {
  //     const matchedRoute = findMatchingRoute(
  //       this.getCurrentState().currentPath,
  //       this.routes
  //     );
  //     return matchedRoute || this.routes[this.routes.length - 1];
  //   }
  
  //   public isActive(path: string): boolean {
  //     const currentPath = this.getCurrentState().currentPath;
  //     const currentPathOnly = currentPath.split("?")[0];
  //     return currentPathOnly === path;
  //   }
  // }

  // ============
  // export function findMatchingRoute(
  //   path: string,
  //   routes: readonly Route<any, any, any>[]
  // ): Route<any, any, any> | undefined {
  //   const pathname = path.split("?")[0];
  //   return routes.find((route) => matchRoute(pathname, route.path));
  // }
  
  // export function matchRoute(pathname: string, routePath: string): boolean {
  //   const pathSegments = pathname.split("/").filter(Boolean);
  //   const routeSegments = routePath.split("/").filter(Boolean);
  
  //   if (pathSegments.length !== routeSegments.length) {
  //     return false;
  //   }
  
  //   return routeSegments.every((routeSegment, index) => {
  //     if (routeSegment.startsWith(":")) {
  //       return true;
  //     }
  //     return routeSegment === pathSegments[index];
  //   });
  // }
  
  // export function extractRouteMatch<TRoute extends Route<any, any, any>>(
  //   path: string,
  //   route: TRoute
  // ): RouteMatch<TRoute> {
  //   const [pathname, search] = path.split("?");
  //   const pathSegments = pathname.split("/").filter(Boolean);
  //   const routeSegments = route.path.split("/").filter(Boolean);
  
  //   const params: Record<string, string> = {};
  //   const searchParams: Record<string, string | string[]> = {};
  
  //   // Extract route params
  //   routeSegments.forEach((segment: string, index: number) => {
  //     if (segment.startsWith(":")) {
  //       const paramName = segment.slice(1);
  //       params[paramName] = pathSegments[index];
  //     }
  //   });
  
  //   // Parse search params
  //   if (search) {
  //     const searchPairs = new URLSearchParams(search);
  //     searchPairs.forEach((value, key) => {
  //       searchParams[key] = value;
  //     });
  //   }
  
  //   return { params, searchParams } as RouteMatch<TRoute>;
  // }

  
  // export function useParams() {
  //   const { state, getCurrentRoute } = useRouter();
  //   const route = getCurrentRoute();
  //   const path = route?.path;
    
  //   type ParamsType = typeof path extends string ? RouteParams<typeof path> : never;
  //   return state.params as ParamsType;
  // }

  // export const routes: readonly Route<any, any, any>[] = [
  //   {
  //     path: "/",
  //     component: Home,
  //   },
  //   {
  //     path: "/about",
  //     component: About,
  //   },
  //   {
  //     path: "/users",
  //     component: UserList,
  //     loader: async () => {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_BASE_URL}/users`
  //       );
  //       const users = await response.json();
  //       return { users };
  //     },
  //   },
  //   {
  //     path: "/users/:id",
  //     component: UserDetail,
  //     loader: async ({ id }) => {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
  //       );
  //       const user = await response.json();
  //       return { user };
  //     },
  //   },
  //   {
  //     path: "*",
  //     component: NotFound,
  //   },
  // ];

  // // UserDetail.tsx:
  // const UserDetail = () => {
  //   const { back } = useRouter();
  //   const { user } = useRouteData<{ user: User }>();
  //   const params = useParams();
  //   console.log(params);
  
  //   if (!user) return <div>User not found</div>;
  
  //   return (
  //     <div className="bg-white shadow rounded-lg p-6">
  //       <button
  //         onClick={() => back()}
  //         className="mb-4 text-gray-600 hover:text-gray-900"
  //       >
  //         ← Back
  //       </button>
  //       <h2 className="text-2xl font-bold text-gray-900 mb-4">{user.name}</h2>
  //       <div className="space-y-2">
  //         <p>
  //           <strong>ID:</strong> {user.id}
  //         </p>
  //         <p>
  //           <strong>Email:</strong> {user.email}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default UserDetail;
  