const getTableHeaders = (tableData) => {
  const headerRowIndex = tableData.reduce((maxNumber, row, i) => {
    const rowKeysLength = Object.keys(row).length;

    return rowKeysLength > maxNumber ? i : i;
  });
  return Object.keys(tableData[headerRowIndex]);
};

export default getTableHeaders;
