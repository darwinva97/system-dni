import type { Dni } from "@prisma/client";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

export const BackDniForm = ({
  dni,
  setDni,
}: {
  dni: Dni;
  setDni: (dni: Dni) => void;
}) => {
  return (
    <>
      <Input
        label="Dirección"
        value={dni.address}
        onChange={(e) => setDni({ ...dni, address: e.target.value })}
      />

      <Input
        label="Dirección Nacimiento"
        value={dni.birthPlace}
        onChange={(e) => setDni({ ...dni, birthPlace: e.target.value })}
      />

      <Input
        label="CUIL"
        value={dni.cuil}
        onChange={(e) => setDni({ ...dni, cuil: e.target.value })}
      />

      <Input
        label="Nombre del Ministro"
        value={dni.interiorMinisterName}
        onChange={(e) =>
          setDni({ ...dni, interiorMinisterName: e.target.value })
        }
      />

      <Textarea
        label="Area de lectura mecanica"
        style={{ fontFamily: "SourceCodePro" }}
        placeholder="mechanicalReadingArea"
        value={dni.mechanicalReadingArea}
        cols={30}
        rows={3}
        onChange={(e) =>
          setDni({ ...dni, mechanicalReadingArea: e.target.value })
        }
      />
    </>
  );
};
