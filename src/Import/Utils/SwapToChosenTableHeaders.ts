import zipObject from "lodash/zipObject";
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
