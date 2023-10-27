import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { FormEventHandler, useMemo, useState } from "react";

const EditUser = () => {
  const { mutateAsync: editUser } = api.user.editUser.useMutation();
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query.id]);
  const { data: user, refetch } = api.user.adminGetUserById.useQuery(id);
  const [formData, setFormData] = useState(
    user?.password
      ? {
          id,
          name: user!.name,
          email: user!.email,
          password: user!.password,
          role: user!.role as "admin" | "user",
        }
      : null,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formData?.password) return;
    await editUser(formData);
    await refetch();
    alert("User updated");
  };
  return user && formData ? (
    <div className="flex max-w-full flex-col items-center gap-2">
      <h1 className="text-2xl">Edit User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          label="Usuario"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Correo"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Contraseña"
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div>
          <span>Rol</span>
          <select
            disabled={user?.role === "user"}
            className="select select-bordered w-full max-w-xs"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "admin" | "user",
              })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  ) : (
    <h2>El usuario no se ha encontrado o no tiene permisos para verlo</h2>
  );
};

export default EditUser;
