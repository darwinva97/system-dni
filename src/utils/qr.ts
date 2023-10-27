import { Dni } from "@prisma/client";
import PDF417 from "pdf417-generator";
import { parseDocument } from "./parse";

export function generateQR(
  {
    name,
    surname,
    document,
    exemplar,
    birthDate,
    issueDate,
    sex,
    tramitNumber,
    cuil,
  }: Dni,
  canvas: HTMLCanvasElement,
) {
  surname = surname || "Irala";
  name = name || "Tomas";
  sex = sex || "E";
  birthDate = new Date(birthDate || null);
  issueDate = new Date(issueDate || null);
  tramitNumber = String(
    localStorage.getItem("dni_tramite_num") || "0123456789012345",
  ).substring(0, 11);
  exemplar = exemplar || "A";
  const strDocument = parseDocument(document) || "22.333.444";
  const cuil1 = /* localStorage.getItem('dni_cuil_part1') || */ cuil || "00";
  const cuil2 = /* localStorage.getItem('dni_cuil_part2') || */ "0";

  function formatDateForQR(dateObj: Date) {
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day_number = String(dateObj.getDate()).padStart(2, "0");
    let year = String(dateObj.getFullYear()).padStart(2, "0");
    return `${day_number}/${month}/${year}`;
  }

  let qr_text = `${tramitNumber}@${surname}@${name}@${sex}@${strDocument}@${exemplar}@${formatDateForQR(
    birthDate,
  )}@${formatDateForQR(issueDate)}@${cuil1}${cuil2}`;

  PDF417.draw(qr_text, canvas);
}
