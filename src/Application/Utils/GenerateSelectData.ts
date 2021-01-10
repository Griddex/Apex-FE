const generateSelectData = (data: string[]) => {
  return data.map((v) => ({ value: v.toLowerCase(), label: v }));
};

export default generateSelectData;
