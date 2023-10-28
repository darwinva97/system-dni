import { api } from "@/utils/api";
import { useMemo } from "react";
import { DniForm } from "@/components/DniForm";
import type { Dni, User } from "@prisma/client";
import { useRouter } from "next/router";

const EditDni = () => {
  const router = useRouter();
  const document = useMemo(() => Number(router.query.id), [router.query.id]);
  const { data: dni } = api.dni.getDniById.useQuery(document);
  const editDni = api.dni.edit.useMutation();
  const saveDni = async (dni: Dni, users: Omit<User, "password">[]) => {
    const dniUpdated = await editDni.mutateAsync({
      prevDocument: document,
      dni,
      users: users.map((user) => user.id),
    });
    return dniUpdated;
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
        <DniForm initialDni={dni} saveDni={saveDni} postSave={postSave} />
      )}
    </div>
  );
};

export default EditDni;
