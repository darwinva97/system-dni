import { type FormEvent, useState } from "react";
import { DniViewer } from "@/components/DniViewer";
import { Dni } from "@prisma/client";
import { defaultDni } from "./data";
import { FrontDniForm } from "./Front";
import { BackDniForm } from "./Back";
import { ImagesDniForm } from "./Images";

type TTab = "Adelante" | "Atrás" | "Imágenes";
const tabs = ["Adelante", "Atrás", "Imágenes"] as const;

export type TDniFormProps = {
  initialDni?: Dni;
  saveDni: (dni: Dni) => Promise<Dni>;
  postSave?: (dni: Dni) => Promise<Dni | void> | void | Dni;
};

export const DniForm = ({
  initialDni: dni,
  saveDni,
  postSave,
}: TDniFormProps) => {
  const [tab, setTab] = useState<TTab>(tabs[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newDni, setDni] = useState(dni ?? defaultDni);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dniSaved = await saveDni(newDni);
    if (dniSaved) {
      alert("Datos guardados");
    }
    (e.target as HTMLFormElement).reset();
    postSave && (await postSave(dniSaved));
  };
  return (
    <div className="flex flex-wrap gap-2 p-2">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex max-w-[64%] flex-col items-center"
      >
        <div className="tabs">
          {tabs.map((tabItem) => (
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
