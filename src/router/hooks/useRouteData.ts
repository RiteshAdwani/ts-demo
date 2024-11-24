import { InferredRouteData } from '../types';
import { useRouter } from './useRouter';

// Hook to access route data
export function useRouteData() {
  const { state, getCurrentRoute } = useRouter();
  const route = getCurrentRoute();
  return state.data as InferredRouteData<typeof route.path>;
}
