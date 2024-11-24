import { Link } from "../router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-6 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="mt-8 p-2 rounded-lg text-white bg-blue-600 text-lg hover:bg-blue-800 transition-colors">
          Return Home
        </button>
      </Link>
    </div>
  );
}
