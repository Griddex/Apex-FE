import React from "react";

const getDuplicates = (duplicatesArray: React.Key[]) => {
  let duplicates = duplicatesArray.reduce(
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
