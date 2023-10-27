import { api } from "@/utils/api";
import { useState, type FormEvent } from "react";

export const CreateUser = () => {
  const createUser = api.user.create.useMutation();
  const [newUser, setUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }>({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCreated = await createUser.mutateAsync(newUser);
    if (userCreated) {
      alert("Nuevo usuario creado");
      setUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl">Crear usuario</h1>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col items-center gap-3"
      >
        <input
          type="text"
          placeholder="name"
          value={newUser.name}
          onChange={(e) => setUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="email"
          value={newUser.email}
          onChange={(e) => setUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="password"
          value={newUser.password}
          onChange={(e) => setUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) =>
            setUser({ ...newUser, role: e.target.value as "admin" | "user" })
          }
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm">
          Crear
        </button>
      </form>
    </div>
  );
};
