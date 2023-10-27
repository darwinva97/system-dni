export const parseDocument = (document: number) => {
  return `${String(document).slice(0, 2)}.${String(document).slice(
    2,
    5,
  )}.${String(document).slice(5)}`;
};

export function formatDate(fecha: Date) {
  const meses = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OCT",
    "NOV",
    "DIC",
  ];

  fecha.setUTCHours(fecha.getUTCHours() + 5);

  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = meses[fecha.getMonth()];
  const ano = fecha.getFullYear();

  return `${dia} ${mes}/ ${mes} ${ano}`;
}

export function formatDatePublicDni(fecha: Date) {
  // Formatear la fecha en el formato deseado
  let dia: string | number = fecha.getDate();
  let mes: string | number = fecha.getMonth() + 1; // Meses en JavaScript comienzan desde 0
  const anio: string | number = fecha.getFullYear();
  let horas: string | number = fecha.getHours();
  let minutos: string | number = fecha.getMinutes();

  // Agregar ceros iniciales si es necesario
  if (mes < 10) {
    mes = "0" + mes;
  }
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }

  const formatoDeseado =
    dia + "/" + mes + "/" + anio + " " + horas + ":" + minutos + " hs";

  return formatoDeseado;
}

export function formatDatePublicDetail(fecha: Date) {
  // Crear un array con los nombres de los meses en inglés
  const meses = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Obtener el día, mes y año
  let dia: number | string = fecha.getDate();
  const mes = fecha.getMonth(); // El mes es un número entre 0 y 11

  // Obtener el año
  const anio = fecha.getFullYear();

  // Formatear el mes en el formato deseado
  const mesFormateado = meses[mes];

  // Agregar ceros iniciales al día si es necesario
  if (dia < 10) {
    dia = "0" + dia;
  }

  // Crear la cadena en el formato deseado
  const formatoDeseado = dia + "/" + mesFormateado + "/" + anio;
  return formatoDeseado;
}
