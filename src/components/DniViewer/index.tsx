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
    <div className="inline-flex" onClick={() => setIsFlipped(!isFlipped)}>
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
        children={[
          <DniFront {...dni} />,
          <DniBack {...dni} />,
          // <div className="relative h-[180px] w-[300px]">
          //   <p>Card 2</p>
          // </div>,
        ]}
      />
    </div>
  );
};
