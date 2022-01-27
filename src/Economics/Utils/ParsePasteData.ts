import { toNumber } from "number-string";

export const parsePasteData = (str: string) => {
  const data = str.split(/\r\n|\n|\r/).map((row) => row.split("\t"));
  const lastRowArray = data[data.length - 1];

  const letters = /[a-zA-Z]+/g;

  let slicedData = [];
  if (lastRowArray[0] === "") {
    slicedData = data.slice(0, data.length - 1);
  } else {
    slicedData = data;
  }

  const finalData = slicedData.map((vArray) => {
    const newArray = vArray.map((v) => {
      if (v.search(letters) !== -1) return v;
      else if (v.includes("E+")) return parseFloat(v);
      else return toNumber(v);
    });

    return newArray;
  });

  return finalData;
};
