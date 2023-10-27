import { api } from "@/utils/api";
import { DniForm } from "@/components/DniForm";
import { Dni } from "@prisma/client";

const CreateDni = () => {
  const createDni = api.dni.create.useMutation();
  const saveDni = async (dni: Dni) => {
    const dniCreated = await createDni.mutateAsync(dni);
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
