import { api } from "@/utils/api";
import { useMemo } from "react";
import { DniForm } from "@/components/DniForm";
import type { Dni, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const EditDni = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const meAsUser = session?.user?.role === "user";
  const document = useMemo(() => Number(router.query.id), [router.query.id]);
  const { data: dni } = api.dni.getDniById.useQuery(document);
  const editDni = api.dni.edit.useMutation();
  const userEditDni = api.dni.userEDitDni.useMutation();
  const saveDni = async (dni: Dni, users: Omit<User, "password">[]) => {
    if (meAsUser) {
      const dniUpdated = await userEditDni.mutateAsync({
        prevDocument: document,
        dni,
      });
      return dniUpdated;
    } else {
      const dniUpdated = await editDni.mutateAsync({
        prevDocument: document,
        dni,
        users: users.map((user) => user.id),
      });
      return dniUpdated;
    }
  };
  const postSave = async (dniUpdated: Dni) => {
    if (dniUpdated.document !== document) {
      await router.push(`/admin/dni/edit/${dniUpdated.document}`);
    }
  };
  return (
    <div>
      <h2 className="mb-2 text-center text-2xl">Editar DNI</h2>
      {dni && (
        <DniForm
          initialDni={dni}
          initialUsers={dni.users.map(({ user }) => user)}
          saveDni={saveDni}
          postSave={postSave}
        />
      )}
    </div>
  );
};

export default EditDni;
