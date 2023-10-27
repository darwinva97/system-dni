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
  var dia: string | number = fecha.getDate();
  var mes: string | number = fecha.getMonth() + 1; // Meses en JavaScript comienzan desde 0
  var anio: string | number = fecha.getFullYear();
  var horas: string | number = fecha.getHours();
  var minutos: string | number = fecha.getMinutes();

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

  var formatoDeseado =
    dia + "/" + mes + "/" + anio + " " + horas + ":" + minutos + " hs";

  return formatoDeseado;
}

export function formatDatePublicDetail(fecha: Date) {
  // Crear un array con los nombres de los meses en inglés
  var meses = [
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
  var dia: number | string = fecha.getDate();
  var mes = fecha.getMonth(); // El mes es un número entre 0 y 11

  // Obtener el año
  var anio = fecha.getFullYear();

  // Formatear el mes en el formato deseado
  var mesFormateado = meses[mes];

  // Agregar ceros iniciales al día si es necesario
  if (dia < 10) {
    dia = "0" + dia;
  }

  // Crear la cadena en el formato deseado
  var formatoDeseado = dia + "/" + mesFormateado + "/" + anio;
  return formatoDeseado;
}
