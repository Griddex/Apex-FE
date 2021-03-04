import pick from "lodash.pick";

const generateActualTable = (
  addedColumnHeaders,
  addedActionColumn,
  addedRoleColumn = undefined,
  actualColumnHeaders,
  cleanTableDataWithSN
) => {
  const noAddedColumnTableData = cleanTableDataWithSN;

  //Update table data with Serial number and any other column data
  const headers = Object.keys(noAddedColumnTableData[0]);
  const snArray = [headers.shift()];
  const restArray = headers;
  const tableData = noAddedColumnTableData.map((row, i) => {
    const actionColumn = addedActionColumn[i];
    const roleColumn = addedRoleColumn && addedRoleColumn[i];

    const snObj = pick(row, snArray);
    const restObj = pick(row, restArray);

    return {
      ...snObj,
      ...actionColumn,
      ...roleColumn,
      ...restObj,
    };
  });

  const tableHeaders = ["SN", ...addedColumnHeaders, ...actualColumnHeaders];

  return { tableHeaders, noAddedColumnTableData, tableData };
};

export default generateActualTable;
