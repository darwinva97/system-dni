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
