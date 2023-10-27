import type { Dni } from "@prisma/client";
import classes from "../style.module.css";
import { parseDocument } from "@/utils/parse";

export type TDniFrontProps = Omit<Dni, "document" | "tramitNumber"> & {
  document: number;
  tramitNumber: number;
};
export const DniFront = ({
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
}: Dni) => {
  return (
    <>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniNumberTitle].join(" ")}>
        Documento / Document
      </div>
      <div className={[classes.dniItem, classes.dniNumber].join(" ")}>
        {parseDocument(document)}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniSurnameTitle].join(" ")}>
        Apellido / Surname
      </div>
      <div className={[classes.dniItem, classes.dniSurname].join(" ")}>
        {surname}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniNameTitle].join(" ")}>
        Nombre / Name
      </div>
      <div className={[classes.dniItem, classes.dniName].join(" ")}>{name}</div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniSexTitle].join(" ")}>
        Sexo / Sex
      </div>
      <div className={[classes.dniItem, classes.dniSex].join(" ")}>{sex}</div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniNationalityTitle].join(" ")}>
        Nacionalidad / Nationality
      </div>
      <div className={[classes.dniItem, classes.dniNationality].join(" ")}>
        {nationality}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniEjemplarTitle].join(" ")}>
        Ejemplar
      </div>
      <div className={[classes.dniItem, classes.dniEjemplar].join(" ")}>
        {exemplar}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniBirthTitle].join(" ")}>
        Fecha de nacimiento / Date of birth
      </div>
      <div className={[classes.dniItem, classes.dniBirth].join(" ")}>
        {birthDate}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniIssueTitle].join(" ")}>
        Fecha de emisión / Date of issue
      </div>
      <div className={[classes.dniItem, classes.dniIssue].join(" ")}>
        {issueDate}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniExpirationTitle].join(" ")}>
        Fecha de vencimiento / Date of expiry
      </div>
      <div className={[classes.dniItem, classes.dniExpiration].join(" ")}>
        {expiryDate}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniTramiteNumTitle].join(" ")}>
        Tramite No / Of. ident.
      </div>
      <div className={[classes.dniItem, classes.dniTramiteNum].join(" ")}>
        {tramitNumber}
      </div>
      <div className={[classes.dniItem, classes.dniSubTitle, classes.dniSignatureTitle].join(" ")}>
        FIRMA IDENTIFICADO / SIGNATURE
      </div>
      <img
        src={photoFace}
        className={[classes.dniItem, classes.dniImage].join(" ")}
      />
      <img
        className={[classes.dniItem, classes.dniFirma].join(" ")}
        src={photoSignature}
      ></img>
    </>
  );
};
