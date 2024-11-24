import { InferredPaths } from "../../routes";
import type { RouteParams } from "../types";
import { useRouter } from "./useRouter";

export function useParams() {
  const { state, getCurrentRoute } = useRouter();
  const route = getCurrentRoute();
  const path = route?.path!;
  console.log({ path, type: typeof path });

  type ParamsType = typeof path extends InferredPaths
    ? RouteParams<typeof path & string>
    : never;
  return state.params as ParamsType;
}
