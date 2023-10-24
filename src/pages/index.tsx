import { useSession } from "next-auth/react";
import React from "react";

const Index = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-center text-3xl">456 Documents created!</h1>
      {session && <pre>{JSON.stringify(session, null, 3)}</pre>}
    </div>
  );
};

export default Index;
