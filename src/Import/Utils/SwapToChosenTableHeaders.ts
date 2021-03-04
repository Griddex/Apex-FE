import zipObject from "lodash.zipobject";
import { IRawTable } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

const swapToChosenTableHeaders = (
  tableData: IRawTable,
  appHeaderNames: string[]
) => {
  const newTable = tableData.map((row) => {
    const tableValues = Object.values(row);
    const newRow = zipObject(appHeaderNames, tableValues);

    return newRow;
  });
  return newTable;
};

export default swapToChosenTableHeaders;
