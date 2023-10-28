import { getServerAuthSession } from "@/server/auth";
import { checkIsAdminOrOwner } from "@/utils/checks";
import { CreateUser } from "@/views/admin/CreateUser";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  const isAdminOrOwner = checkIsAdminOrOwner(session.user.role);
  if (!isAdminOrOwner)
    return {
      redirect: {
        destination: "/admin/me",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};

export default CreateUser;
