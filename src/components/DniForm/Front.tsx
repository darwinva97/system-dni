import type { Dni } from "@prisma/client";
import { Input } from "../Input";

export const FrontDniForm = ({
  dni,
  setDni,
}: {
  dni: Dni;
  setDni: (dni: Dni) => void;
}) => {
  return (
    <>
      <Input
        label="DNI"
        type="number"
        placeholder="document(8)"
        value={dni.document}
        onChange={(e) => setDni({ ...dni, document: parseInt(e.target.value) })}
      />

      <Input
        label="Nombre"
        value={dni.name}
        onChange={(e) => setDni({ ...dni, name: e.target.value })}
      />
      <Input
        label="Apellido"
        value={dni.surname}
        onChange={(e) => setDni({ ...dni, surname: e.target.value })}
      />

      <Input
        label="Sexo"
        value={dni.sex}
        onChange={(e) => setDni({ ...dni, sex: e.target.value })}
      />

      <Input
        label="Nacionalidad"
        value={dni.nationality}
        onChange={(e) => setDni({ ...dni, nationality: e.target.value })}
      />

      <Input
        label="Ejemplar"
        value={dni.exemplar}
        onChange={(e) => setDni({ ...dni, exemplar: e.target.value })}
      />

      <Input
        type="date"
        label="Fecha Nacimiento"
        value={new Date(dni.birthDate).toISOString().split("T")[0]}
        onChange={(e) =>
          setDni({ ...dni, birthDate: new Date(e.target.value) })
        }
      />

      <Input
        type="date"
        label="Fecha Emisión"
        value={new Date(dni.issueDate).toISOString().split("T")[0]}
        onChange={(e) =>
          setDni({ ...dni, issueDate: new Date(e.target.value) })
        }
      />

      <Input
        label="Fecha vencimiento"
        value={new Date(dni.expiryDate).toISOString().split("T")[0]}
        onChange={(e) =>
          setDni({ ...dni, expiryDate: new Date(e.target.value) })
        }
      />

      <Input
        label={"Número de Tramite (15)"}
        placeholder="tramitNumber(15)"
        value={dni.tramitNumber || ""}
        onChange={(e) => setDni({ ...dni, tramitNumber: e.target.value })}
      />

      <Input
        label="codePDF417"
        placeholder="codePDF417"
        value={dni.codePDF417}
        onChange={(e) => setDni({ ...dni, codePDF417: e.target.value })}
      />

      <Input
        label="Donador"
        placeholder="donor"
        value={dni.donor}
        onChange={(e) => setDni({ ...dni, donor: e.target.value })}
      />

      <Input
        label="Número de Oficina"
        placeholder="officeNumber"
        value={dni.officeNumber}
        onChange={(e) => setDni({ ...dni, officeNumber: e.target.value })}
      />
    </>
  );
};
