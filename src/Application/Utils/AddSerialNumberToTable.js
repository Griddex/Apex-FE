const AddSerialNumberToTable = (table) => {
  const newTable = table.map((row, i) => ({ SN: i + 1, ...row }));
  return newTable;
};

export default AddSerialNumberToTable;
