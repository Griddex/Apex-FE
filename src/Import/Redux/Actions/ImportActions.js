export const IMPORTFILE_INITIALIZATION = "IMPORTFILE_INITIALIZATION";
export const PERSIST_FILE = "PERSIST_FILE";
export const PERSIST_WORKSHEETNAMES = "PERSIST_WORKSHEETNAMES";
export const PERSIST_WORKSHEET = "PERSIST_WORKSHEET";
export const PERSIST_SELECTEDWORKSHEET = "PERSIST_SELECTEDWORKSHEET";
export const PERSIST_WORKSHEETFORTABLE = "PERSIST_WORKSHEETFORTABLE";
export const PERSIST_FILEHEADERS = "PERSIST_FILEHEADERS";
export const PERSIST_SELECTEDHEADERROWINDEX = "PERSIST_SELECTEDHEADERROWINDEX";
export const PERSIST_SELECTEDHEADERROWOPTIONINDEX =
  "PERSIST_SELECTEDHEADERROWOPTIONINDEX";
export const PERSIST_FILEHEADERSMATCH = "PERSIST_FILEHEADERSMATCH";
export const PERSIST_FILEUNITS = "PERSIST_FILEUNITS";
export const PERSIST_SELECTEDUNITROWINDEX = "PERSIST_SELECTEDUNITROWINDEX";
export const PERSIST_SELECTEDUNITROWOPTIONINDEX =
  "PERSIST_SELECTEDUNITROWOPTIONINDEX";
export const PERSIST_ROWOPTIONSINDICESMAP = "PERSIST_ROWOPTIONSINDICESMAP";
export const PERSIST_FILEUNITSMATCH = "PERSIST_FILEUNITSMATCH";
export const PERSIST_TABLEROLESINDICES = "PERSIST_TABLEROLESINDICES";
export const PERSIST_TABLEDATA = "PERSIST_TABLEDATA";
export const PERSIST_FINALTABLEDATA = "PERSIST_FINALTABLEDATA";
export const PERSIST_TABLEHEADERS = "PERSIST_TABLEHEADERS";
export const PERSIST_OPTIONINDICES = "PERSIST_OPTIONINDICES";
export const IMPORT_EXCEL_LOADING = "IMPORT_EXCEL_LOADING";
export const IMPORT_EXCEL_MATCHING = "IMPORT_EXCEL_MATCHING";
export const IMPORT_EXCELWORKSHEETNAME_SET = "IMPORT_EXCELWORKSHEETNAME_SET";
export const IMPORT_EXCELWORKSHEETPARSE_NAVIGATE =
  "IMPORT_EXCELWORKSHEETPARSE_NAVIGATE";
export const SELECTED_ROW = "SELECTED_ROW";

export const importFileInitAction = (
  fileLastModified,
  filePath,
  fileType,
  fileName,
  fileSize,
  fileAuthor,
  fileCreated,
  fileAccepted,
  dnDDisabled,
  message
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
    meta: { showSpinner: true, message },
  };
};

export const persistFileAction = (file) => {
  return {
    type: PERSIST_FILE,
    payload: { inputFile: file },
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

export const persistSelectedHeaderRowOptionIndicesAction = (
  selectedHeaderRowIndex,
  selectedHeaderOptionIndex
) => {
  return {
    type: PERSIST_SELECTEDHEADERROWOPTIONINDEX,
    payload: { selectedHeaderRowIndex, selectedHeaderOptionIndex },
  };
};

export const persistFileUnitsAction = (fileUnits, fileUnitsUnique) => {
  return {
    type: PERSIST_FILEUNITS,
    payload: { fileUnits, fileUnitsUnique },
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

export const persistSelectedUnitRowOptionIndicesAction = (
  selectedUnitRowIndex,
  selectedUnitOptionIndex
) => {
  return {
    type: PERSIST_SELECTEDUNITROWOPTIONINDEX,
    payload: { selectedUnitRowIndex, selectedUnitOptionIndex },
  };
};

export const persistRowsOptionsIndicesMapAction = (headerRowOptionsIndices) => {
  return {
    type: PERSIST_ROWOPTIONSINDICESMAP,
    payload: { headerRowOptionsIndices },
  };
};

export const persistTableRolesIndicesAction = (tableRoleIndices) => {
  return {
    type: PERSIST_TABLEROLESINDICES,
    payload: { tableRoleIndices },
  };
};

export const persistTableDataAction = (tableData) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { tableData },
  };
};

export const persistFinalTableDataAction = (finalTableData) => {
  return {
    type: PERSIST_FINALTABLEDATA,
    payload: { finalTableData },
  };
};

export const persistCurrentTableHeadersAction = (currentTableHeaders) => {
  return {
    type: PERSIST_TABLEHEADERS,
    payload: { currentTableHeaders },
  };
};

export const persistOptionIndicesAction = (optionIndices) => {
  return {
    type: PERSIST_OPTIONINDICES,
    payload: { optionIndices },
  };
};

export const selectedRowAction = (selectedRow) => {
  return {
    type: SELECTED_ROW,
    payload: selectedRow,
  };
};
