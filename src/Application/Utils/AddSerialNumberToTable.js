const AddSerialNumberToTable = (table) => {
  const newTable = table.map((row, i) => ({ sn: i + 1, ...row }));

  return newTable;
};

export default AddSerialNumberToTable;
