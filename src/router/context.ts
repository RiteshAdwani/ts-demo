import { createContext } from "react";
import type { InferredPaths, RouterContextType, SearchParamsForPath } from "./types";

// Make sure you're passing a valid default value (e.g., `null` or a default object).
export const RouterContext = createContext<RouterContextType<InferredPaths, SearchParamsForPath<InferredPaths>> | null>(null);



