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
  tableRowsRoles: [],
};

export default importState;
