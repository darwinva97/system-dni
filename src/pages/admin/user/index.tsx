import { api } from "@/utils/api";
import Link from "next/link";

const Admin = () => {
  const { data: users, refetch } = api.user.getAll.useQuery();
  const { mutateAsync: deleteUser, isLoading: isDeleteLoading } =
    api.user.delete.useMutation();
  return (
    <div>
      <header>
        <h2>Users</h2>
        <Link href={"/admin/user/create"}>Create</Link>
      </header>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(({ id, name, email, role }, index) => (
              <tr
                className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                key={id}
              >
                <th>{id}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <Link
                    href="/admin/user/edit/[id]"
                    as={`/admin/user/edit/${id}`}
                    className="btn btn-primary btn-xs mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-xs"
                    disabled={isDeleteLoading}
                    onClick={async () => {
                      const goNext = confirm(
                        `Are you sure you want to delete to ${name}?`,
                      );
                      if (!goNext) return;
                      const result = await deleteUser(id);
                      console.log(result, "result");
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
