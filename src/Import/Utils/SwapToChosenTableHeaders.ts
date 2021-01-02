import { IRawTable } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import zipObject from "lodash/zipObject";

const swapToChosenTableHeaders = (
  tableData: IRawTable,
  chosenHeaders: string[]
) => {
  const newTable = tableData.map((row) => {
    const tableValues = Object.values(row);
    const newRow = zipObject(chosenHeaders, tableValues);

    return newRow;
  });
  return newTable;
};

export default swapToChosenTableHeaders;
