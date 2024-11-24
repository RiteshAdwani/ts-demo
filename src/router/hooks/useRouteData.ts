import { useRouter } from './useRouter';

// Hook to access route data
export function useRouteData<TData = unknown>() {
  const { state } = useRouter();
  return state.data as TData;
}
