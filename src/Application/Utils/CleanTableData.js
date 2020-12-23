//Robust algorithm to figure out what the keys are regardless of data shape
//Find object in AoOs with highest number of keys?
const cleanTableData = (tableData, tableHeaders) => {
  const tempCleanTableData = tableData.map((row) => {
    const dataObj = {};

    for (const header of tableHeaders) {
      dataObj[header] = row[header] ? row[header] : "";
    }

    return dataObj;
  });

  return tempCleanTableData;
};

export default cleanTableData;
