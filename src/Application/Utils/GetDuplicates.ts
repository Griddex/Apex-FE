import React from "react";

const getDuplicates = (duplicatesArray: React.Key[]) => {
  const duplicatesArrayNoNone = duplicatesArray.filter(
    (v) => v.toString().toLowerCase() !== "none"
  );

  const duplicates = duplicatesArrayNoNone.reduce(
    (acc: React.Key[], currentValue, index, array) => {
      if (array.indexOf(currentValue) != index && !acc.includes(currentValue))
        acc.push(currentValue);

      return acc;
    },
    []
  );

  return duplicates;
};

export default getDuplicates;
