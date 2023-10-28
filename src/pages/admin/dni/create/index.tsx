import { api } from "@/utils/api";
import { DniForm } from "@/components/DniForm";
import type { Dni, User } from "@prisma/client";

const CreateDni = () => {
  const createDni = api.dni.create.useMutation();
  const saveDni = async (dni: Dni, users: Omit<User, "password">[]) => {
    const dniCreated = await createDni.mutateAsync({
      dni,
      users: users.map((user) => user.id),
    });
    return dniCreated;
  };
  return (
    <div>
      <h2 className="mb-2 text-center text-2xl">Crear DNI</h2>
      <DniForm saveDni={saveDni} />
    </div>
  );
};

export default CreateDni;
