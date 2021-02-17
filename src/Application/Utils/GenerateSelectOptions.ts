const generateSelectOptions = (arr: string[]) => {
  const result = arr.map((s: string) => ({
    value: s,
    label: s,
  }));

  return result;
};

export default generateSelectOptions;
