import { useState } from "react";
import { Link, useRouteData, useRouter, useSearchParams } from "../router";
import { User } from "../types";

const UserList = () => {
  const { navigate } = useRouter();
  const { users } = useRouteData<{ users: User[] }>();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    searchParams.sort
  );

  const sortedUsers = [...users].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const handleSort = () => {
    const newSortState = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortState);
    navigate(`/users?sort=${newSortState}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Sort {sortOrder === "asc" ? "↓" : "↑"}
        </button>
      </div>
      <div className="space-y-4">
        {sortedUsers.map((user) => (
          <Link
            key={user.id}
            to="/users/:id"
            params={{ id: user.id.toString() }}
            className="block p-4 border rounded hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
