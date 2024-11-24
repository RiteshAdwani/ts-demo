import { useContext } from "react";
import { RouterContext } from "../context";

// Hook to access router state and methods
export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}
