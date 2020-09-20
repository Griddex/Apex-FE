const generateActualTable = (
  addedColumnsHeaders,
  addedActionColumn,
  actualColumnHeaders,
  cleanTableData
) => {
  const noAddedColumnTableData = cleanTableData;

  //Update table data with Serial number and any other column data
  const tableData = noAddedColumnTableData.map((row, i) => {
    return {
      SN: i + 1,
      ...addedActionColumn[i],
      ...row,
    };
  });

  const tableHeaders = ["SN", ...addedColumnsHeaders, ...actualColumnHeaders];

  return [tableHeaders, noAddedColumnTableData, tableData];
};

export default generateActualTable;
