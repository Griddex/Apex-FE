export const IMPORTFILE_INITIALIZATION = "IMPORTFILE_INITIALIZATION";
export const PERSIST_FILE = "PERSIST_FILE";
export const PERSIST_WORKSHEETNAMES = "PERSIST_WORKSHEETNAMES";
export const PERSIST_WORKSHEET = "PERSIST_WORKSHEET";
export const PERSIST_SELECTEDWORKSHEET = "PERSIST_SELECTEDWORKSHEET";
export const PERSIST_WORKSHEETFORTABLE = "PERSIST_WORKSHEETFORTABLE";
export const PERSIST_FILEHEADERS = "PERSIST_FILEHEADERS";
export const PERSIST_SELECTEDHEADERROWINDEX = "PERSIST_SELECTEDHEADERROWINDEX";
export const PERSIST_SELECTEDHEADEROPTIONINDEX =
  "PERSIST_SELECTEDHEADEROPTIONINDEX";
export const PERSIST_FILEHEADERSMATCH = "PERSIST_FILEHEADERSMATCH";
export const PERSIST_FILEUNITS = "PERSIST_FILEUNITS";
export const PERSIST_SELECTEDUNITROWINDEX = "PERSIST_SELECTEDUNITROWINDEX";
export const PERSIST_SELECTEDUNITOPTIONINDEX =
  "PERSIST_SELECTEDUNITOPTIONINDEX";
export const PERSIST_FILEUNITSMATCH = "PERSIST_FILEUNITSMATCH";
export const PERSIST_TABLEROLESINDICES = "PERSIST_TABLEROLESINDICES";
export const PERSIST_TABLEDATA = "PERSIST_TABLEDATA";
export const IMPORT_EXCEL_LOADING = "IMPORT_EXCEL_LOADING";
export const IMPORT_EXCEL_MATCHING = "IMPORT_EXCEL_MATCHING";
export const IMPORT_EXCELWORKSHEETNAME_SET = "IMPORT_EXCELWORKSHEETNAME_SET";
export const IMPORT_EXCELWORKSHEETPARSE_NAVIGATE =
  "IMPORT_EXCELWORKSHEETPARSE_NAVIGATE";

export const importFileInitAction = (
  fileLastModified,
  filePath,
  fileType,
  fileName,
  fileSize,
  fileAuthor,
  fileCreated,
  fileAccepted,
  dnDDisabled
) => {
  return {
    type: IMPORTFILE_INITIALIZATION,
    payload: {
      fileLastModified,
      filePath,
      fileType,
      fileName,
      fileSize,
      fileAuthor,
      fileCreated,
      fileAccepted,
      dnDDisabled,
    },
  };
};

export const persistFileAction = (file) => {
  return {
    type: PERSIST_FILE,
    payload: { file },
  };
};

export const persistWorksheetNamesAction = (workSheetNames) => {
  return {
    type: PERSIST_WORKSHEETNAMES,
    payload: { workSheetNames },
  };
};

export const persistWorksheetAction = (
  selectedWorksheetName,
  selectedWorksheetData
) => {
  return {
    type: PERSIST_WORKSHEET,
    payload: { selectedWorksheetName, selectedWorksheetData },
  };
};

//remove action and associated reducers and state
export const persistSelectedWorksheetAction = (selectedWorksheetName) => {
  return {
    type: PERSIST_SELECTEDWORKSHEET,
    payload: { selectedWorksheetName },
  };
};

export const persistWorksheetForTableAction = (
  selectedWorksheetDataForTable
) => {
  return {
    type: PERSIST_WORKSHEETFORTABLE,
    payload: { selectedWorksheetDataForTable },
  };
};

export const persistFileHeadersAction = (fileHeaders) => {
  return {
    type: PERSIST_FILEHEADERS,
    payload: { fileHeaders },
  };
};

export const persistFileHeadersMatchAction = (fileHeadersMatch) => {
  return {
    type: PERSIST_FILEHEADERSMATCH,
    payload: { fileHeadersMatch },
  };
};

export const persistSelectedHeaderRowIndexAction = (selectedHeaderRowIndex) => {
  return {
    type: PERSIST_SELECTEDHEADERROWINDEX,
    payload: { selectedHeaderRowIndex },
  };
};

export const persistSelectedHeaderOptionIndexAction = (
  selectedHeaderOptionIndex
) => {
  return {
    type: PERSIST_SELECTEDHEADEROPTIONINDEX,
    payload: { selectedHeaderOptionIndex },
  };
};

export const persistFileUnitsAction = (fileUnits) => {
  return {
    type: PERSIST_FILEUNITS,
    payload: { fileUnits },
  };
};

export const persistFileUnitsMatchAction = (fileUnitsMatch) => {
  return {
    type: PERSIST_FILEUNITSMATCH,
    payload: { fileUnitsMatch },
  };
};

export const persistSelectedUnitRowIndexAction = (selectedUnitRowIndex) => {
  return {
    type: PERSIST_SELECTEDUNITROWINDEX,
    payload: { selectedUnitRowIndex },
  };
};

export const persistSelectedUnitOptionIndexAction = (
  selectedUnitOptionIndex
) => {
  return {
    type: PERSIST_SELECTEDUNITOPTIONINDEX,
    payload: { selectedUnitOptionIndex },
  };
};

export const persistTableRolesIndicesAction = (currentRolesIndices) => {
  return {
    type: PERSIST_TABLEROLESINDICES,
    payload: { currentRolesIndices },
  };
};

export const persistTableDataAction = (tableData) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { tableData },
  };
};

export const ImportLoadingAction = () => {
  return {
    type: IMPORT_EXCEL_LOADING,
    payload: { Loading: true },
  };
};
export const ImportMatchingAction = (state) => {
  return {
    type: IMPORT_EXCEL_MATCHING,
    payload: { Matching: state },
  };
};

export const ImportParseTableAction = (result) => {
  return {
    type: IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
    payload: { extrudeParseTable: result },
  };
};
