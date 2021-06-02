import React from "react";

const generateSelectOptions = (
  arr: any[],
  hasNames?: boolean,
  names?: any[],
  hasExtraArr?: boolean,
  extraArr?: Record<string, React.Key>[]
) => {
  const namesDefined = names as string[];
  const result = arr.map((s: string, i: number) => {
    let extraObj = {};
    if (hasExtraArr) extraObj = (extraArr as Record<string, React.Key>[])[i];

    return {
      value: hasNames ? namesDefined[i] : s,
      label: s,
      ...extraObj,
    };
  });

  return result;
};

export default generateSelectOptions;
