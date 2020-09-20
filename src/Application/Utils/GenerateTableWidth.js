const generateTableWidth = (columnMaxWidthsData) => {
  //Initial table widths from all calculated widths
  const tableWidth = columnMaxWidthsData.reduce((a, c) => a + c);
  return tableWidth;
};

export default generateTableWidth;
