import { Dni } from "@prisma/client";
import classes from "./style.module.css";

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
}: TDniFrontProps) => {
  return (
    <>
      <img
        src={`/img/faces/${photoFace}`}
        className={classes.dniImage}
        alt=""
      />
      <img
        className={classes.dniFirma}
        src={`/img/signatures/${photoSignature}`}
      ></img>
      <div className={classes.dniNumberTitle}>Documento / Document</div>
      <div className={classes.dniNumber}>
        {String(document).slice(0, 2)}.{String(document).slice(2, 5)}.
        {String(document).slice(5)}
      </div>
      <div className={classes.dniSurnameTitle}>Apellido / Surname</div>
      <div className={classes.dniSurname}>{surname}</div>
      <div className={classes.dniNameTitle}>Nombre / Name</div>
      <div className={classes.dniName}>{name}</div>
      <div className={classes.dniSexTitle}>Sexo / Sex</div>
      <div className={classes.dniSex}>{sex}</div>
      <div className={classes.dniNationalityTitle}>
        Nacionalidad / Nationality
      </div>
      <div className={classes.dniNationality}>{nationality}</div>
      <div className={classes.dniEjemplarTitle}>Ejemplar</div>
      <div className={classes.dniEjemplar}>{exemplar}</div>
      <div className={classes.dniBirthTitle}>
        Fecha de nacimiento / Date of birth
      </div>
      <div className={classes.dniBirth}>{birthDate}</div>
      <div className={classes.dniIssueTitle}>
        Fecha de emisión / Date of issue
      </div>
      <div className={classes.dniIssue}>{issueDate}</div>
      <div className={classes.dniExpirationTitle}>
        Fecha de vencimiento / Date of expiry
      </div>
      <div className={classes.dniExpiration}>{expiryDate}</div>
      <div className={classes.dniTramiteNumTitle}>Tramite No / Of. ident.</div>
      <div className={classes.dniTramiteNum}>{tramitNumber}</div>
      <div className={classes.dniSignatureTitle}>
        FIRMA IDENTIFICADO / SIGNATURE
      </div>
    </>
  );
};
