//Robust algorithm to figure out what the keys are regardless of data shape

import { IRawRow } from "../Components/Table/ReactDataGrid/ApexGridTypes";

//Find object in AoOs with highest number of keys?
const cleanTableData = (tableData: IRawRow[], tableHeaders: string[]) => {
  const tempCleanTableData = tableData.map((row) => {
    const dataObj = {} as IRawRow;

    for (const header of tableHeaders) {
      dataObj[header] = row[header] ? row[header] : "";
    }

    return dataObj;
  });

  return tempCleanTableData;
};

export default cleanTableData;
