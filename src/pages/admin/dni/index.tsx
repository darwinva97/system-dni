import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Admin = () => {
  const { data: session } = useSession();
  const meAsUser = session?.user?.role === "user";

  const { data: dnis, refetch } = api.dni.getAll.useQuery();
  const { mutateAsync: deleteDni, isLoading: isDeleteLoading } =
    api.dni.delete.useMutation();
  return (
    <div className="flex max-w-full flex-col items-center">
      <header className="mb-4 flex justify-center gap-4">
        <h2 className="text-2xl">DNIs</h2>
        {!meAsUser && (
          <Link className="btn btn-primary btn-sm" href={"/admin/dni/create"}>
            Crear nuevo
          </Link>
        )}
      </header>

      <div className="max-w-full overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr className="text-center">
              <th>DNI</th>
              <th>Nombres</th>
              <th>Apellido</th>
              {!meAsUser && <th>Opciones</th>}
            </tr>
          </thead>
          <tbody>
            {dnis?.map(({ document, name, surname }, index) => (
              <tr
                className={
                  "hover text-center " +
                  (index % 2 === 0 ? "bg-base-100" : "bg-base-200")
                }
                key={document}
              >
                <td>{document}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>
                  <div className="flex justify-center gap-1">
                    {!meAsUser && (
                      <>
                        <button
                          disabled={isDeleteLoading}
                          onClick={async () => {
                            const confirm = window.confirm(
                              `Estas seguro de ELIMINAR a ${document} (${name} ${surname})?`,
                            );
                            if (confirm) {
                              await deleteDni(document);
                              await refetch();
                            }
                          }}
                          className="btn btn-warning btn-sm"
                        >
                          Eliminar
                        </button>
                        <Link
                          href={`/admin/dni/edit/${document}`}
                          className="btn btn-info btn-sm"
                        >
                          Editar
                        </Link>
                      </>
                    )}
                    <Link
                      href={`/dni/${document}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver
                    </Link>
                  </div>
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
