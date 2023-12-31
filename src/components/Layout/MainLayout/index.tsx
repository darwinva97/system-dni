import { checkIsAdminOrOwner } from "@/utils/checks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const isAdminOrOwner = session && checkIsAdminOrOwner(session?.user.role);
  return (
    <div>
      <header>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/admin/me">Dashboard</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/admin/dni">DNI{`'`}s</Link>
              </li>
              {isAdminOrOwner && (
                <li>
                  <Link href="/admin/user">Users</Link>
                </li>
              )}
              <li>
                <button onClick={() => void signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="p-2">{children}</main>
    </div>
  );
};
