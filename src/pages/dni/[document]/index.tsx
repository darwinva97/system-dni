import { DniViewer } from "@/components/DniViewer";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

const Dni = () => {
  const router = useRouter();
  const document = parseInt(String(router.query.document));
  const { data, isLoading } = api.dni.getDniById.useQuery(document);
  const [isFlipped, setIsFlipped] = useState(false);
  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      {data ? (
        <DniViewer
          dni={data}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      ) : (
        <h1>Dni no encontrado</h1>
      )}
    </div>
  );
};

export default Dni;
