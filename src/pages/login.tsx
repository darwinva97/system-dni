import type { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { useState, type FormEvent } from "react";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      ...credentials,
      callbackUrl: "/admin/me",
      redirect: true,
    });
  };

  return (
    <form
      className="flex h-[100vh] flex-col items-center justify-center gap-2"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/admin" } };
  }

  return {
    props: {},
  };
}
