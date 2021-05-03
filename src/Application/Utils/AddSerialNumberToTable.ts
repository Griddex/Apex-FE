import { TRawTable } from "../Components/Table/ReactDataGrid/ApexGridTypes";

const AddSerialNumberToTable = (table: TRawTable) => {
  const newTable = table.map((row, i) => ({ sn: i + 1, ...row }));

  return newTable;
};

export default AddSerialNumberToTable;
