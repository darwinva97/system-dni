import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { FormEventHandler, useMemo, useState } from "react";

const EditUser = () => {
  const { mutateAsync: editUser } = api.user.editUser.useMutation();
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query.id]);
  const { data: user, refetch } = api.user.getUserById.useQuery(id);
  const [formData, setFormData] = useState({
    id,
    name: user!.name,
    email: user!.email,
    password: user!.password,
    role: user!.role as "admin" | "user",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editUser(formData);
    await refetch();
    alert("User updated");
  };
  return user ? (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <select
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <h2>User not found</h2>
  );
};

export default EditUser;
