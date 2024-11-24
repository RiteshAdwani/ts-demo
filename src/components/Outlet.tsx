import { useEffect } from "react";
import { useRouter } from "../router";
import LoadingSpinner from "../components/LoadingSpinner";

export function Outlet() {
  const { state, getCurrentRoute, navigate } = useRouter();
  const route = getCurrentRoute();

  useEffect(() => {
    navigate(window.location.pathname);
  }, []);

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  if (!route) {
    return <div>404 - Not Found</div>;
  }

  const Component = route.component;
  return <Component />;
}
