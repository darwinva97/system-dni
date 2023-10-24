import { api } from "@/utils/api";
import Link from "next/link";

const Admin = () => {
  const { data: dnis, refetch } = api.dni.getAll.useQuery();
  const { mutateAsync: deleteUser, isLoading: isDeleteLoading } =
    api.user.delete.useMutation();
  return (
    <div>
      <header>
        <h2>DNIs</h2>
        <Link href={"/admin/dni/create"}>Create</Link>
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
            {dnis?.map(({ document }, index) => (
              <tr
                className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                key={document}
              >
                {document}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
