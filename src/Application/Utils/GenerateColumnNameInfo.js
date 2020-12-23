import zipObject from "lodash/zipObject";

const generateColumnNameInfo = (rawTableHeaders, cleanTableData) => {
  //Generate interim ColumnHeaders
  const columnNameTableHeaders = rawTableHeaders.map((_, i) => `Column_${i}`);

  //Zip ColumnHeaders with keys for the Table API
  const headerRow = zipObject(columnNameTableHeaders, rawTableHeaders);

  //Bundle table headers with Table Data
  const rawHeadersCleanTable = [headerRow, ...cleanTableData];

  //Re-create table data by using interim headers
  const columnNameTable = rawHeadersCleanTable.map((row) => {
    const rowValues = Object.values(row);

    return zipObject(columnNameTableHeaders, rowValues);
  });

  return [columnNameTableHeaders, columnNameTable];
};

export default generateColumnNameInfo;
