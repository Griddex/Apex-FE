const importState = {
  fileLastModified: "",
  filePath: "",
  fileType: "",
  fileName: "",
  fileSize: "",
  fileAuthor: "",
  fileCreated: "",

  fileAccepted: false,
  dnDDisabled: false,
  file: null,

  workSheetNames: [],
  selectedWorksheetName: "",
  selectedWorksheetData: [],
  selectedWorksheetDataForTable: [],

  tableHeaderData: [],
  tableBodyData: [],
  extrudeParseTable: false,

  message: "",
  errors: [],

  fileHeaders: [],
  fileHeadersMatch: [],
  selectedHeaderRowIndex: 0,
  selectedHeaderOptionIndex: 0,
  fileUnits: [],
  tableRoles: [],
  tableData: [],
};

export default importState;
