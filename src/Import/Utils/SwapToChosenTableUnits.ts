import { TRawTable } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import zipObject from "lodash.zipobject";

const swapToChosenTableUnits = (tableData: TRawTable, newUnits: string[]) => {
  const newTable = tableData.map((row) => {
    const tableValues = Object.values(row);
    const newRow = zipObject(newUnits, tableValues);

    return newRow;
  });
  return newTable;
};

export default swapToChosenTableUnits;
