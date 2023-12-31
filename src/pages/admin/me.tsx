import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AiFillEdit } from "react-icons/ai";

const useMe = () => {
  const { status, update } = useSession();
  const { data, isLoading, refetch } = api.user.me.useQuery();
  const loading = useMemo(() => {
    return status === "loading" || isLoading;
  }, [status, isLoading]);
  const refetchMe = async () => {
    await update();
    await refetch();
  };
  return { data: data ?? null, isLoading: loading, refetch: refetchMe };
};

const Me = () => {
  const { data, isLoading, refetch } = useMe();
  const [editing, setEditing] = useState(false);
  const [userForm, setUserForm] = useState(data);
  const { mutateAsync: editUser } = api.user.editUser.useMutation();

  useEffect(() => {
    setUserForm(data);
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userForm) return null;
    await editUser(userForm);
    await refetch();
    setEditing(false);
  };

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return data && userForm ? (
    <div>
      <header className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl">Hola {data.name}!</h1>
        <h2 className="text-xl">(rol: {data.role})</h2>
      </header>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <main className="flex flex-col items-center justify-center gap-2">
          <Input
            label="Correo"
            disabled={!editing}
            type="email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
          />
          <Input
            label="Usuario"
            type="name"
            disabled={!editing}
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />
          <Input
            label="Contraseña"
            type="password"
            disabled={!editing}
            value={userForm.password}
            onChange={(e) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
          />
        </main>

        <footer className="flex items-center justify-center gap-2">
          {!editing && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}
              className="btn btn-primary btn-sm"
            >
              Editar
              <AiFillEdit />
            </button>
          )}
          {editing && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(false);
                  setUserForm(data);
                }}
                className="btn btn-primary btn-sm"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Guardar
              </button>
            </>
          )}
        </footer>
      </form>
    </div>
  ) : (
    <div>
      <h1>Debes logearte</h1>
    </div>
  );
};

export default Me;
