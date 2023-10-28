import { type FormEvent, useState } from "react";
import { DniViewer } from "@/components/DniViewer";
import type { Dni, User } from "@prisma/client";
import { defaultDni } from "./data";
import { FrontDniForm } from "./Front";
import { BackDniForm } from "./Back";
import { ImagesDniForm } from "./Images";
import UsersDniForm from "./Users";
import { useSession } from "next-auth/react";

type TTab = "Adelante" | "Atrás" | "Imágenes" | "Users";
const tabs = ["Adelante", "Atrás", "Imágenes", "Users"] as const;

export type TDniFormProps = {
  initialDni?: Dni;
  initialUsers?: Omit<User, "password">[];
  saveDni: (dni: Dni, users: Omit<User, "password">[]) => Promise<Dni | null>;
  postSave?: (dni: Dni) => Promise<Dni | void> | void | Dni;
};

export const DniForm = ({
  initialDni: dni,
  initialUsers: users,
  saveDni,
  postSave,
}: TDniFormProps) => {
  const [tab, setTab] = useState<TTab>(tabs[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newDni, setDni] = useState(dni ?? defaultDni);
  const [newUsers, setUsers] = useState(users ?? []);
  const { data: session } = useSession();
  const meAsUser = session?.user?.role === "user";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dniSaved = await saveDni(newDni, newUsers);
    if (dniSaved) {
      alert("Datos guardados");
    }
    (e.target as HTMLFormElement).reset();
    if (dniSaved) {
      postSave && (await postSave(dniSaved));
    }
  };
  return (
    <div className="flex w-full flex-wrap justify-between gap-2 p-2">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex max-w-[64%] flex-col items-center"
      >
        <div className="tabs">
          {tabs
            .filter((tabItem) => (meAsUser ? tabItem !== "Users" : true))
            .map((tabItem) => (
              <a
                key={tabItem}
                className={`tab tab-bordered ${
                  tab === tabItem ? "tab-active" : ""
                }`}
                onClick={() => setTab(tabItem)}
              >
                {tabItem}
              </a>
            ))}
        </div>
        <div className="flex flex-wrap gap-2 p-2">
          {tab === "Adelante" && <FrontDniForm dni={newDni} setDni={setDni} />}

          {tab === "Atrás" && <BackDniForm dni={newDni} setDni={setDni} />}

          {tab === "Imágenes" && <ImagesDniForm dni={newDni} setDni={setDni} />}

          {!meAsUser && tab === "Users" && (
            <UsersDniForm
              dni={newDni}
              setDni={setDni}
              users={newUsers}
              setUsers={setUsers}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Guardar
        </button>
      </form>
      <DniViewer
        dni={newDni}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
    </div>
  );
};
