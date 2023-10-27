import type { ReactNode } from "react";
import classes from "./style.module.css";
import { useRouter } from "next/router";
import { IoMdArrowBack } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";

export const DniLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isDetail =
    router.pathname.startsWith("/dni") && router.pathname.endsWith("/detail");
  return (
    <div>
      <div className={`${classes.header} flex items-center justify-between`}>
        <div className="flex items-center">
          <div onClick={() => void router.back()} className="cursor-pointer">
            <IoMdArrowBack fontSize={"1.5rem"} color="white" />
          </div>
          <div
            style={{ fontFamily: "Roboto, sans serif", fontWeight: 500 }}
            className="ml-6 text-[22px] text-white"
          >
            Dni Digital{isDetail ? " - Detalle" : ""}
          </div>
        </div>
        {!isDetail && (
          <div onClick={() => void router.reload()} className="cursor-pointer">
            <TfiReload fontSize={"1.5rem"} color="white" />
          </div>
        )}
      </div>
      <main>{children}</main>
    </div>
  );
};
