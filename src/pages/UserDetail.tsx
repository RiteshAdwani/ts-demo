import { useRouter, useRouteData, useParams } from "../router";
import { User } from "../types";

const UserDetail = () => {
  const { back } = useRouter();
  const data = useRouteData();
  const user = data.user;
  const params = useParams();
  console.log(params);

  if (!user) return <div>User not found</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <button
        onClick={() => back()}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{user.name}</h2>
      <div className="space-y-2">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
