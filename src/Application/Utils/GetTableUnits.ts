import uniq from "lodash.uniq";
import { IRawTable } from "../Components/Table/ReactDataGrid/ApexGridTypes";

const getTableUnits = (tableData: IRawTable) => {
  if (tableData.length === 0) return [];

  const units = Object.values(tableData[0]);
  const uniqueUnits = uniq(units).filter((v) => v !== "");

  return [units, uniqueUnits];
};

export default getTableUnits;
