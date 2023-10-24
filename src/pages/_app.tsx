import { type Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Link from "next/link";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div>
        <header>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              Dashboard
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="/admin/dni">DNI's</Link>
                </li>
                <li>
                  <Link href="/admin/user">Users</Link>
                </li>
                <li>
                  <button onClick={() => void signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="p-2">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
