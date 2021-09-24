export const parsePasteData = (str: string) =>
  str.split(/\r\n|\n|\r/).map((row) => row.split("\t"));
