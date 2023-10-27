import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MainLayout } from "./MainLayout";
import { DniLayout } from "./DniLayout";

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  if (router.pathname.startsWith("/dni")) {
    return <DniLayout>{children}</DniLayout>;
  }
  return <MainLayout>{children}</MainLayout>;
};
