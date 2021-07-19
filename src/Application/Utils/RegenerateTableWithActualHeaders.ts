import zipobject from "lodash.zipobject";
import { IRawRow } from "../Components/Table/ReactDataGrid/ApexGridTypes";

const regenerateTableWithActualHeaders = (
  tableData: IRawRow[],
  tableHeaders: string[]
) => {
  //Re-create table data by using interim headers
  const regeneratedTableData = tableData.map((row) => {
    const rowValues = Object.values(row);

    return zipobject(tableHeaders, rowValues);
  });

  return regeneratedTableData;
};

export default regenerateTableWithActualHeaders;
