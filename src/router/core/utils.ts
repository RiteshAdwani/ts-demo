import type { Route, RouteMatch } from "../types";

export function findMatchingRoute(
  path: string,
  routes: readonly Route<any, any, any>[],
): Route<any, any, any> | undefined {
  console.log({path, routes});
  const pathname = path.split("?")[0] ;
  return routes.find((route) => matchRoute(pathname, route.path));
}

export function matchRoute(pathname: string, routePath: string): boolean {
  const pathSegments = pathname.split("/").filter(Boolean);
  const routeSegments = routePath.split("/").filter(Boolean);

  if (pathSegments.length !== routeSegments.length) {
    return false;
  }

  return routeSegments.every((routeSegment, index) => {
    if (routeSegment.startsWith(":")) {
      return true;
    }
    return routeSegment === pathSegments[index];
  });
}

export function extractRouteMatch<TRoute extends Route<any, any, any>>(
  path: string,
  route: TRoute
): RouteMatch<TRoute> {
  const [pathname, search] = path.split("?");
  const pathSegments = pathname.split("/").filter(Boolean);
  const routeSegments = route.path.split("/").filter(Boolean);

  const params: Record<string, string> = {};
  const searchParams: Record<string, string | string[]> = {};

  // Extract route params
  routeSegments.forEach((segment: string, index: number) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      params[paramName] = pathSegments[index];
    }
  });

  // Parse search params
  if (search) {
    const searchPairs = new URLSearchParams(search);
    searchPairs.forEach((value, key) => {
      searchParams[key] = value;
    });
  }

  return { params, searchParams } as RouteMatch<TRoute>;
}
