import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserDetail from "./pages/UserDetail";
import UserList from "./pages/UserList";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/users",
    component: UserList,
    searchParams: {} as { sort?: "asc" | "desc" },
    loader: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users`
      );
      const users = await response.json();
      return { users };
    },
  },
  {
    path: "/users/:id",
    component: UserDetail,
    loader: async ({ id }:{id:string}) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
      );
      const user = await response.json();
      return { user };
    },
  },
  {
    path: "*",
    component: NotFound,
  },
] as const;

// This will infer the exact path literals from the routes array
export type InferredPaths = typeof routes[number]['path'];
// Infer searchParams with proper handling of optional property
type RouteConfig = typeof routes[number];
export type InferredSearchParams = RouteConfig extends { searchParams: infer S } ? S : never;
