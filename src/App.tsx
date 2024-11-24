import { RouterProvider } from "./router";
import { router } from "./router.config";
import Layout from "./components/Layout";
import { Outlet } from "./components/Outlet";

function App() {
  return (
    <RouterProvider router={router}>
      <Layout>
        <Outlet />
      </Layout>
    </RouterProvider>
  );
}

export default App;
