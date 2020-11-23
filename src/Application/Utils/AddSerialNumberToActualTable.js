const addSerialNumberToActualTable = (cleanTableData) => {
  const tableData = cleanTableData.map((row, i) => {
    return {
      SN: i + 1,
      ...row,
    };
  });

  return tableData;
};

export default addSerialNumberToActualTable;
