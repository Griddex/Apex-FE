import { toNumber } from "number-string";

export const parsePasteData = (str: string) => {
  const data = str.split(/\r\n|\n|\r/).map((row) => row.split("\t"));

  const lastElement = data[data.length - 1];

  let slicedData = [];
  if (lastElement[0] === "") slicedData = data.slice(0, data.length - 1);
  else slicedData = data;

  const finalData = slicedData.map((v) => {
    if (v[0].includes("E+")) return [parseFloat(v[0])];
    else return [toNumber(v[0])];
  });

  return finalData;
};
