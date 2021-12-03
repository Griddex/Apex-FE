export const parsePasteData = (str: string) => {
  const data = str.split(/\r\n|\n|\r/).map((row) => row.split("\t"));
  const lastElement = data[data.length - 1];

  if (lastElement[0] === "") return data.slice(0, data.length - 1);
  else return data;
};
