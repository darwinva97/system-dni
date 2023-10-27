import { CanvasQR } from "@/components/CanvasQR";
import { api } from "@/utils/api";
import { formatDatePublicDetail } from "@/utils/parse";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const baseStyles = {
  fontSize: "16px",
  fontFamily: "Roboto, sans-serif",
};

const Title = ({ children }: { children: ReactNode }) => {
  return <p style={{ ...baseStyles, fontWeight: 600 }}>{children}</p>;
};

const Value = ({ children }: { children: ReactNode }) => {
  return <p style={{ ...baseStyles }}>{children}</p>;
};

const Content = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div>
      <Title>{label}</Title>
      <Value>{value}</Value>
    </div>
  );
};

const DetailDni = () => {
  const router = useRouter();
  const document = parseInt(String(router.query.document));
  const { data, isLoading } = api.dni.getDniById.useQuery(document);

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <div className="p-[20px]">
        <img
          style={{
            height: "calc(143px * 1.2)",
            width: "calc(115px * 1.2)",
            objectFit: "cover",
            borderRadius: "8px",
            margin: "15px auto 25px",
          }}
          src={data.photoFace}
        />
        <CanvasQR
          dni={data}
          style={{ width: "224px", height: "64px", margin: "auto" }}
        />
      </div>
      <div className="m-[32px] flex flex-col gap-4">
        <Content label="Número de DNI" value={data.document} />
        <Content label="Número de trámite" value={data.tramitNumber} />
        <Content label="Apellido" value={data.surname} />
        <Content label="Nombre" value={data.name} />
        <Content label="Sexo" value={data.sex} />
        <Content label="Nacionalidad" value={data.nationality.slice(0, 3)} />
        <Content label="Ejemplar" value={data.exemplar} />
        <Content label="Número de oficina" value={data.officeNumber} />{" "}
        <Content
          label="Fecha de nacimiento"
          value={formatDatePublicDetail(data.birthDate)}
        />
        <Content
          label="Fecha de emisión"
          value={formatDatePublicDetail(data.issueDate)}
        />
        <Content
          label="Fecha de vencimiento"
          value={formatDatePublicDetail(data.expiryDate)}
        />
        <Content label="Domicilio" value={data.address || "None"} />
        <Content label="Lugar de nacimiento" value={data.birthPlace || "-"} />
        <Content
          label="Firma"
          value={
            <img
              style={{
                height: "90px",
                width: "169.625px",
                margin: "auto",
              }}
              src={data.photoSignature}
            />
          }
        />
      </div>
    </div>
  );
};

export default DetailDni;
