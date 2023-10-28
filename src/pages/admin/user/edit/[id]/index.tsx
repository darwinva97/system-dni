import { Input } from "@/components/Input";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { checkIsAdminOrOwner } from "@/utils/checks";
import { Dni } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState, type FormEvent, useEffect } from "react";
import Select from "react-select";

const EditUser = () => {
  const { data: session } = useSession();
  const { mutateAsync: editUser, isLoading } =
    api.user.editUserWithDnis.useMutation();
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query.id]);
  const { data: user, refetch } = api.user.adminGetUserById.useQuery(id);
  const { data: allDnis } = api.dni.getAll.useQuery();
  const [dnis, setDnis] = useState<Dni[]>(
    user?.dnis.map((dni) => dni.dni) || [],
  );
  const [formData, setFormData] = useState(
    user?.password
      ? {
          id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role as "admin" | "user" | "owner",
        }
      : null,
  );

  useEffect(() => {
    if (user?.password) {
      setFormData({
        id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role as "admin" | "user",
      });
      setDnis(user.dnis.map((dni) => dni.dni));
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData?.password) return;
    const data = {
      user: formData,
      dnis: dnis.map((dni) => dni.document),
    };
    await editUser(data);
    await refetch();
    alert("User updated");
  };

  const options = (allDnis ?? []).map((dni) => ({
    label: `${dni.document} (${dni.name} ${dni.surname})`,
    value: dni.document,
  }));

  return user && formData ? (
    <div className="flex max-w-full flex-col items-center gap-2">
      <h1 className="text-2xl">Edit User</h1>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex max-w-[300px] flex-col gap-2"
      >
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
            disabled={!(session && session.user.role === "owner")}
            className="select select-bordered w-full max-w-xs"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "admin" | "user" | "owner",
              })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {session?.user?.role === "owner" && (
              <option value="owner">Propietario</option>
            )}
          </select>
        </div>

        <div>
          <span>DNI's</span>
          <p>
            (Esto sólo se aplicará si el usuario no es administrador o
            propietario)
          </p>
          <Select
            defaultValue={dnis.map((dni) => ({
              value: dni.document,
              label: `${dni.document} (${dni.name} ${dni.surname})`,
            }))}
            onChange={(newDnis) => {
              allDnis &&
                setDnis(
                  allDnis.filter((dni) =>
                    newDnis.find((newDni) => newDni.value === dni.document),
                  ),
                );
            }}
            isMulti
            options={[{ options }]}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  ) : (
    <h2>El usuario no se ha encontrado o no tiene permisos para verlo</h2>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  const isAdminOrOwner = checkIsAdminOrOwner(session.user.role);
  if (!isAdminOrOwner)
    return {
      redirect: {
        destination: "/admin/me",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};

export default EditUser;
