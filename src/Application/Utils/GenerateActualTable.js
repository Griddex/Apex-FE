const generateActualTable = (
  addedColumnHeaders,
  addedActionColumn,
  addedRoleColumn = undefined,
  actualColumnHeaders,
  cleanTableData
) => {
  const noAddedColumnTableData = cleanTableData;

  //Update table data with Serial number and any other column data
  const tableData = noAddedColumnTableData.map((row, i) => {
    const actionColumn = addedActionColumn[i];
    const roleColumn = addedRoleColumn && addedRoleColumn[i];

    return {
      SN: i + 1,
      ...actionColumn,
      ...roleColumn,
      ...row,
    };
  });

  const tableHeaders = ["SN", ...addedColumnHeaders, ...actualColumnHeaders];

  return [tableHeaders, noAddedColumnTableData, tableData];
};

export default generateActualTable;
