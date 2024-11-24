import { createContext } from "react";
import type { RouterContextType } from "./types";
import { InferredPaths } from "../routes";

export const RouterContext = createContext<RouterContextType<InferredPaths> | null>(null);
