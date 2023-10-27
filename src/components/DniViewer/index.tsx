import type { Dni } from "@prisma/client";
import CardFlip from "react-card-flip";
import { DniFront } from "./DniFront";
import { DniBack } from "./DniBack";

export type TDniViewer = {
  dni: Dni;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
};

const styles = {
  width: "100%",
  height: "100%",
  borderRadius: "4px",
  backgroundColor: "transparent",
  border: "0.5px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
};

export const DniViewer = ({ dni, isFlipped, setIsFlipped }: TDniViewer) => {
  return (
    <div
      className="inline-flex flex-col items-center justify-center gap-2"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <CardFlip
        isFlipped={isFlipped}
        containerStyle={{
          width: "calc(26rem * var(--dniSizeMultiplier))",
          height: "calc(16.3rem * var(--dniSizeMultiplier))",
        }}
        cardStyles={{
          front: {
            ...styles,
            backgroundImage: `url(${dni.photoBgFront})`,
            backgroundSize: "cover",
          },
          back: {
            ...styles,
            backgroundImage: `url(${dni.photoBgBack})`,
            backgroundSize: "cover",
          },
        }}
        children={[<DniFront {...dni} />, <DniBack {...dni} />]}
      />
      <div className="flex gap-[8px]">
        <div
          style={{ background: isFlipped ? "rgba(0, 0, 0, .75)" : "#1ca4ea" }}
          className="h-[12.5px] w-[12.5px] rounded-full"
        ></div>
        <div
          style={{ background: isFlipped ? "#1ca4ea" : "rgba(0, 0, 0, .75)" }}
          className="h-[12.5px] w-[12.5px] rounded-full"
        ></div>
      </div>
    </div>
  );
};
