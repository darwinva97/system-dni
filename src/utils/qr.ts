import { Dni } from "@prisma/client";
import PDF417 from "pdf417-generator"

function generateQR({ document, name, surname, sex, tramitNumber, exemplar, birthDate, issueDate }: Dni) {
  let tramite,
    nombre,
    apellido,
    sexo,
    numero,
    ejemplar,
    nacimiento,
    expiracion,
    cuil1,
    cuil2;

  apellido = localStorage.getItem("dni_surname") || "Irala";
  nombre = localStorage.getItem("dni_name") || "Tomas";
  sexo = localStorage.getItem("dni_sex") || "E";
  nacimiento = new Date(localStorage.getItem("dni_birthdate_raw") || null);
  emision = new Date(localStorage.getItem("dni_emission_raw") || null);
  tramite = String(
    localStorage.getItem("dni_tramite_num") || "0123456789012345",
  ).substring(0, 11);
  ejemplar = localStorage.getItem("dni_ejemplar") || "A";
  numero = localStorage.getItem("dni_numero_raw") || "22.333.444";
  cuil1 = localStorage.getItem("dni_cuil_part1") || "00";
  cuil2 = localStorage.getItem("dni_cuil_part2") || "0";

  function formatDateForQR(dateObj) {
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day_number = String(dateObj.getDate()).padStart(2, "0");
    let year = String(dateObj.getFullYear()).padStart(2, "0");
    return `${day_number}/${month}/${year}`;
  }

  let test = `${tramitNumber}@${surname}@${name}@${sex}@${document}@${exemplar}`;
  let qr_text = `${tramitNumber}@${apellido}@${nombre}@${sexo}@${numero}@${ejemplar}@${formatDateForQR(
    nacimiento,
  )}@${formatDateForQR(emision)}@${cuil1}${cuil2}`;

  let canvas = document.getElementById("dni-qr")!;
  PDF417.draw(qr_text, canvas);
}
