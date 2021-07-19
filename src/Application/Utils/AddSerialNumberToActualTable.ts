import { IRawRow } from "../Components/Table/ReactDataGrid/ApexGridTypes";

const addSerialNumberToActualTable = (cleanTableData: IRawRow[]) => {
  const tableData = cleanTableData.map((row, i) => {
    return {
      SN: i + 1,
      ...row,
    };
  });

  return tableData;
};

export default addSerialNumberToActualTable;
