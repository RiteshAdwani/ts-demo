import { useRouter } from "./useRouter";

// Hook to access search params
import { ExtractSearchParams, SearchParams } from '../types';

export function useSearchParams() {
  const { state, getCurrentRoute } = useRouter();
  const route = getCurrentRoute();
  console.log({state, route});
  
  return state.searchParams as ExtractSearchParams<typeof route>;
}
