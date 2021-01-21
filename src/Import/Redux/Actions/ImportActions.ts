export const IMPORTFILE_INITIALIZATION = "IMPORTFILE_INITIALIZATION";
export const PERSIST_FILE = "PERSIST_FILE";
export const PERSIST_WORKSHEETNAMES = "PERSIST_WORKSHEETNAMES";
export const PERSIST_WORKSHEET = "PERSIST_WORKSHEET";
export const PERSIST_SELECTEDWORKSHEET = "PERSIST_SELECTEDWORKSHEET";
export const PERSIST_WORKSHEETFORTABLE = "PERSIST_WORKSHEETFORTABLE";
export const PERSIST_FILEHEADERS = "PERSIST_FILEHEADERS";
export const PERSIST_SELECTEDHEADERROWINDEX = "PERSIST_SELECTEDHEADERROWINDEX";
export const PERSIST_FILEHEADERSMATCH = "PERSIST_FILEHEADERSMATCH";
export const PERSIST_CHOSENAPPLICATIONHEADERSINDICES =
  "PERSIST_CHOSENAPPLICATIONHEADERSINDICES";
export const PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES =
  "PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES";
export const PERSIST_FILEUNITSANDUNIQUEUNITS =
  "PERSIST_FILEUNITSANDUNIQUEUNITS";
export const PERSIST_SELECTEDUNITROWINDEX = "PERSIST_SELECTEDUNITROWINDEX";
export const PERSIST_SELECTEDUNITROWOPTIONINDEX =
  "PERSIST_SELECTEDUNITROWOPTIONINDEX";
export const PERSIST_ROWOPTIONSINDICESMAP = "PERSIST_ROWOPTIONSINDICESMAP";
export const PERSIST_FILEUNITSMATCH = "PERSIST_FILEUNITSMATCH";
export const PERSIST_TABLEROLENAMES = "PERSIST_TABLEROLENAMES";
export const PERSIST_TABLEDATA = "PERSIST_TABLEDATA";
export const PERSIST_DEFINEDTABLEDATA = "PERSIST_DEFINEDTABLEDATA";
export const PERSIST_COLUMNNAMETABLEDATA = "PERSIST_COLUMNNAMETABLEDATA";
export const PERSIST_TABLEHEADERS = "PERSIST_TABLEHEADERS";
export const PERSIST_OPTIONINDICES = "PERSIST_OPTIONINDICES";
export const SELECTED_ROW = "SELECTED_ROW";
export const PERSIST_CHOSENAPPLICATIONHEADERS =
  "PERSIST_CHOSENAPPLICATIONHEADERS";
export const PERSIST_CHOSENAPPLICATIONUNITS = "PERSIST_CHOSENAPPLICATIONUNITS";

export const importFileInitAction = (
  fileLastModified: number,
  filePath: string,
  fileType: string,
  fileName: string,
  fileSize: number,
  fileAuthor: string,
  fileCreated: Date,
  fileAccepted: boolean,
  dnDDisabled: boolean,
  message: string,
  workflowProcess: string
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
      workflowProcess,
    },
    meta: { showSpinner: true, message },
  };
};

export const persistFileAction = (file: any, workflowProcess: string) => {
  return {
    type: PERSIST_FILE,
    payload: { inputFile: file, workflowProcess },
  };
};

export const persistWorksheetNamesAction = (
  workSheetNames: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_WORKSHEETNAMES,
    payload: { workSheetNames, workflowProcess },
  };
};

export const persistWorksheetAction = (
  selectedWorksheetName: string,
  selectedWorksheetData: Record<string, React.Key>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_WORKSHEET,
    payload: { selectedWorksheetName, selectedWorksheetData, workflowProcess },
  };
};
///////////////////////////////
export const persistFileHeadersAction = (
  selectedHeaderRowIndex: number,
  fileHeaders: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_FILEHEADERS,
    payload: { selectedHeaderRowIndex, fileHeaders, workflowProcess },
  };
};

export const persistFileHeadersMatchAction = (
  fileHeadersMatch: Record<string, number>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_FILEHEADERSMATCH,
    payload: { fileHeadersMatch, workflowProcess },
  };
};
export const persistChosenApplicationHeadersIndicesAction = (
  chosenApplicationHeadersIndices: Record<string, number>,
  workflowProcess: string
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
    payload: { chosenApplicationHeadersIndices, workflowProcess },
  };
};
export const persistChosenApplicationUniqueUnitIndicesAction = (
  chosenApplicationUniqueUnitIndices: Record<string, number>,
  workflowProcess: string
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES,
    payload: { chosenApplicationUniqueUnitIndices, workflowProcess },
  };
};

export const persistFileUnitsAndUniqueUnitsAction = (
  selectedUnitRowIndex: number,
  fileUnits: (
    | string
    | number
    | Record<string, React.Key>
    | Record<string, React.Key>[]
  )[],
  fileUniqueUnits: (
    | string
    | number
    | Record<string, React.Key>
    | Record<string, React.Key>[]
  )[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_FILEUNITSANDUNIQUEUNITS,
    payload: {
      selectedUnitRowIndex,
      fileUnits,
      fileUniqueUnits,
      workflowProcess,
    },
  };
};

export const persistFileUnitsMatchAction = (
  fileUnitsMatch: Record<string, number>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_FILEUNITSMATCH,
    payload: { fileUnitsMatch, workflowProcess },
  };
};

export const persistChosenApplicationHeadersAction = (
  chosenApplicationHeaders: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERS,
    payload: { chosenApplicationHeaders, workflowProcess },
  };
};
export const persistChosenApplicationUnitsAction = (
  chosenApplicationUnits: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNITS,
    payload: { chosenApplicationUnits, workflowProcess },
  };
};

export const persistTableRoleNamesAction = (
  tableRoleNames: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_TABLEROLENAMES,
    payload: { tableRoleNames, workflowProcess },
  };
};

export const persistTableDataAction = (
  tableData: Record<string, React.Key>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { tableData, workflowProcess },
  };
};

export const persistColumnNameTableDataAction = (
  columnNameTableData: Record<string, React.Key>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_COLUMNNAMETABLEDATA,
    payload: { columnNameTableData, workflowProcess },
  };
};
export const persistDefinedTableDataAction = (
  definedTableData: Record<string, React.Key>[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_DEFINEDTABLEDATA,
    payload: { definedTableData, workflowProcess },
  };
};

export const persistTableHeadersAction = (
  tableHeaders: string[],
  workflowProcess: string
) => {
  return {
    type: PERSIST_TABLEHEADERS,
    payload: { tableHeaders, workflowProcess },
  };
};
