import type { Dni } from "@prisma/client";
import classes from "../style.module.css";

export type TDniBackProps = Omit<Dni, "document" | "tramitNumber"> & {
  document: number;
  tramitNumber: number;
};
export const DniBack = ({
  document,
  name,
  surname,
  sex,
  nationality,
  exemplar,
  birthDate,
  issueDate,
  expiryDate,
  tramitNumber,
  photoFace,
  photoSignature,
  address,
  birthPlace,
  mechanicalReadingArea,
  photoInteriorMinisterSignature,
}: Dni) => {
  return (
    <>
      <div className={classes.dniAddressInc}>
        <span className={classes.dniAddressIncTitle}>DOMICILIO: </span>
        {address}
      </div>
      <div className={classes.dniPlace}>
        <span className={classes.dniPlaceTitle}>LUGAR DE NACIMIENTO: </span>
        {birthPlace}
      </div>
      <div className={classes.dniMRZ}>{mechanicalReadingArea}</div>
      <img
        className={classes.dniPhotoInteriorMinisterSignature}
        src={photoInteriorMinisterSignature}
      />
    </>
  );
};
