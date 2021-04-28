const generateSelectOptions = (
  arr: any[],
  hasNames?: boolean,
  names?: any[]
) => {
  const namesDefined = names as string[];
  const result = arr.map((s: string, i: number) => ({
    value: hasNames ? namesDefined[i] : s,
    label: s,
  }));

  return result;
};

export default generateSelectOptions;
