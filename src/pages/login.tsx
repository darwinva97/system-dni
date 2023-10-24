import type { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { FormEventHandler, useState } from "react";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      ...credentials,
      callbackUrl: "/admin",
      redirect: true,
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 h-[100vh]"
      onSubmit={handleSubmit}
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
      <button type="submit" className="btn btn-primary">Sign In</button>
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
