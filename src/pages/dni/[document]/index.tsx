import { DniViewer } from "@/components/DniViewer";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { formatDatePublicDni } from "@/utils/parse";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";

const linkHelper =
  "https://www.argentina.gob.ar/interior/renaper/canales-renaper";

const Dni = () => {
  const router = useRouter();
  const document = parseInt(String(router.query.document));
  const { data, isLoading } = api.dni.getDniById.useQuery(document);
  const [isFlipped, setIsFlipped] = useState(false);
  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="pb-4" style={{ background: "rgba(249, 249, 249, 1)" }}>
        <div
          className="cursor-pointer p-4 text-center text-xl text-gray-500"
          onClick={() => void router.reload()}
        >
          Última actualización {formatDatePublicDni(new Date())}
        </div>

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
      </div>
      <div className="flex flex-col gap-6 p-6 text-xl">
        <Link
          href={`/dni/${document}/detail`}
          className="flex items-center gap-6"
        >
          <img src="/img/ic_detalle_dni.png" width={30} alt="" />
          Ver detalle de mi DNI digital
        </Link>
        <Link
          href={linkHelper}
          target="_blank"
          className="flex items-center gap-6"
        >
          <FiPhoneCall fontSize={"1.75rem"} color="gray" />
          <span>Mesa de ayuda</span>
        </Link>
      </div>
    </>
  );
};

const objAllow = {
  props: {},
};

const objNotAllow = {
  redirect: {
    destination: "/admin/me",
    permanent: false,
  },
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const document = Number(ctx.query.document);

  if (!document) return objAllow;

  const session = await getServerAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const isUser = session.user.role === "user";
  if (!isUser) return objAllow;

  const dniData = await db.dni.findFirst({
    where: {
      document,
    },
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!dniData) return objNotAllow;

  const matchUser = dniData.users.find((user) => {
    return user.userId === session.user.id;
  });

  if (matchUser) return objAllow;

  return objNotAllow;
};

export default Dni;
