import { IRawRow } from "../Components/Table/ReactDataGrid/ApexGridTypes";

const getTableHeaders = (tableData: IRawRow[]) => {
  if (tableData.length === 0) return [];

  const headerRowIndex = tableData.reduce((maxNumber, row, i) => {
    const rowKeysLength = Object.keys(row).length;

    return rowKeysLength > maxNumber ? i : i;
  }, 0);

  return Object.keys(tableData[headerRowIndex]);
};

export default getTableHeaders;
