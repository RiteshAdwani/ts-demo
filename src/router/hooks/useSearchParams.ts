import { InferredPaths, SearchParamsForPath } from "../types";
import { useRouter } from "./useRouter";

// Hook to access search params

export function useSearchParams() {
  const { state, getCurrentRoute } = useRouter();
  const route = getCurrentRoute();
  const path = route.path;
  // console.log({state, route});
  type currentPath = typeof path extends InferredPaths ? InferredPaths : never;

  console.log(route.path);
  console.log(typeof route.path);
  type a = SearchParamsForPath<"/users">;
  return route.searchParams as SearchParamsForPath<currentPath>;
  // return state.searchParams as SearchParamsForPath<typeof route.path>;
}
