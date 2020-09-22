import zipobject from "lodash.zipobject";

const regenerateTableWithActualHeaders = (tableData, tableHeaders) => {
  //Re-create table data by using interim headers
  const regeneratedTableData = tableData.map((row) => {
    const rowValues = Object.values(row);

    return zipobject(tableHeaders, rowValues);
  });

  return regeneratedTableData;
};

export default regenerateTableWithActualHeaders;
