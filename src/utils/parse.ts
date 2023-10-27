export const parseDocument = (document: number) => {
  return `${String(document).slice(0, 2)}.${String(document).slice(
    2,
    5,
  )}.${String(document).slice(5)}`;
};
