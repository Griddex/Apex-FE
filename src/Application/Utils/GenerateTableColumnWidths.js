import zip from "lodash.zip";

const generateTableColumnWidths = (tableData, actionWidth, rolesWidth) => {
  //Determine initial column widths
  const columnWidthsData = tableData.map((row) => {
    const rowWidths = Object.values(row).map((value) => {
      if (value === undefined || value < 0) return 100;
      else return String(value).length * 13;
    });
    return rowWidths;
  });

  const columnWidthsDataZipped = zip(...columnWidthsData);

  const columnMaxWidthsData = columnWidthsDataZipped.map((maxWidths) =>
    Math.max(...maxWidths)
  );

  columnMaxWidthsData[1] = actionWidth;
  columnMaxWidthsData[2] = rolesWidth;

  return columnMaxWidthsData;
};

export default generateTableColumnWidths;
