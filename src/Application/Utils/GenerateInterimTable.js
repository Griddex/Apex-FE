import zipobject from "lodash.zipobject";

const generateInterimTable = (
  rawTableHeaders,
  addedColumnsHeaders,
  addedActionColumn,
  addedRoleColumn,
  cleanTableData
) => {
  //Generate interim ColumnHeaders
  const interimTableHeaders = rawTableHeaders.map((_, i) => `Column_${i}`);

  //Zip ColumnHeaders with keys for the Table API
  const headerRow = zipobject(interimTableHeaders, rawTableHeaders);

  //Bundle table headers with Table Data
  const rawHeadersCleanTableData = [headerRow, ...cleanTableData];

  //Re-create table data by using interim headers
  const noAddedColumnTableData = rawHeadersCleanTableData.map((row) => {
    const rowValues = Object.values(row);

    return zipobject(interimTableHeaders, rowValues);
  });

  //Update table data with Serial number and any other column data
  const tableData = noAddedColumnTableData.map((row, i) => {
    return {
      SN: i + 1,
      ...addedActionColumn[i],
      ...addedRoleColumn[i],
      ...row,
    };
  });

  //Update table headers with Serial number and any other column header
  const tableHeaders = ["SN", ...addedColumnsHeaders, ...interimTableHeaders];

  return [tableHeaders, noAddedColumnTableData, tableData];
};

export default generateInterimTable;
