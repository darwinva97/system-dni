import type { Dni } from "@prisma/client";
import { PickImage } from "../PickImage";

export const ImagesDniForm = ({
  dni,
  setDni,
}: {
  dni: Dni;
  setDni: (dni: Dni) => void;
}) => {
  return (
    <>
      <div>
        <span>Fondo Frontal</span>
        <PickImage
          image={dni.photoBgFront}
          setImage={(image) => setDni({ ...dni, photoBgFront: image })}
        />
      </div>

      <div>
        <span>Fondo Trasero</span>
        <PickImage
          image={dni.photoBgBack}
          setImage={(image) => setDni({ ...dni, photoBgBack: image })}
        />
      </div>

      <div>
        <span>Rostro</span>
        <PickImage
          image={dni.photoFace}
          setImage={(image) => setDni({ ...dni, photoFace: image })}
        />
      </div>

      <div>
        <span>Firma</span>
        <PickImage
          image={dni.photoSignature}
          setImage={(image) => setDni({ ...dni, photoSignature: image })}
        />
      </div>

      <div>
        <span>Firma Ministro</span>
        <PickImage
          image={dni.photoInteriorMinisterSignature}
          setImage={(image) =>
            setDni({ ...dni, photoInteriorMinisterSignature: image })
          }
        />
      </div>

      <div>
        <span>Huella</span>
        <PickImage
          image={dni.photoFingerPrint}
          setImage={(image) => setDni({ ...dni, photoFingerPrint: image })}
        />
      </div>
    </>
  );
};
