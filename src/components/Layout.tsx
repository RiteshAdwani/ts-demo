import { Link, useRouter } from "../router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isActive } = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 h-16 items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/")
                  ? "bg-gray-900 text-white"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/users"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/users")
                  ? "bg-gray-900 text-white"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              Users
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/about")
                  ? "bg-gray-900 text-white"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">{children}</main>
    </div>
  );
};

export default Layout;
