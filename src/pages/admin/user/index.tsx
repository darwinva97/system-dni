import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Admin = () => {
  const { data: session } = useSession();
  const { data: users, refetch } = api.user.getAll.useQuery();
  const { mutateAsync: deleteUser, isLoading: isDeleteLoading } =
    api.user.delete.useMutation();

  const meAsUser = session?.user?.role === "user";
  return (
    <div className="flex max-w-full flex-col items-center">
      <header className="mb-4 flex justify-center gap-4">
        <h2 className="text-2xl">Usuarios</h2>
        {!meAsUser && (
          <Link className="btn btn-primary btn-sm" href={"/admin/user/create"}>
            Crear nuevo
          </Link>
        )}
      </header>
      <div className="max-w-full overflow-x-scroll">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {!meAsUser && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users?.map(({ id, name, email, role }, index) => {
              const isOwner = session?.user?.role === "owner";
              const isUser = role === "user";
              const isMatch = session?.user?.id === id;
              const isAllow = isUser || isMatch || isOwner;
              return (
                <tr
                  className={
                    "text-center " +
                    (index % 2 === 0 ? "bg-base-100" : "bg-base-200")
                  }
                  key={id}
                >
                  <th>{id}</th>
                  <td>
                    {name}
                    {isMatch ? " (me)" : ""}
                  </td>
                  <td>{email}</td>
                  <td>{role}</td>
                  {!meAsUser && (
                    <td>
                      {isAllow ? (
                        <>
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
                              refetch();
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
