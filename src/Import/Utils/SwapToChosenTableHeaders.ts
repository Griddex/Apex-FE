import zipObject from "lodash.zipobject";
import { TRawTable } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

const swapToChosenTableHeaders = (
  tableData: TRawTable,
  fileHeadersChosenAppHeadersWithNone: Record<string, Record<string, string>>,
  appHeaderTitleNameObj: Record<string, string>
) => {
  const headerRow = tableData[0];
  const fileHeaders = Object.values(headerRow) as string[];

  //Convert columnname to fileheader
  const firstTable = tableData.map((row) => {
    const tableValues = Object.values(row) as React.Key[];
    const newRow = zipObject(fileHeaders, tableValues);

    return newRow;
  });

  const secondTable = [];
  for (const row of firstTable) {
    const headerNames = [];
    const rowValues = [];
    for (const fileHeader of Object.keys(row)) {
      const { chosenAppHeader, exclude } = fileHeadersChosenAppHeadersWithNone[
        fileHeader
      ];
      const chosenHeaderName = appHeaderTitleNameObj[chosenAppHeader];

      if (!exclude) {
        headerNames.push(chosenHeaderName);
        rowValues.push(row[fileHeader]);
      }
    }

    const chosenHeaderRow = zipObject(headerNames, rowValues);
    secondTable.push(chosenHeaderRow);
  }

  return secondTable;
};

export default swapToChosenTableHeaders;
