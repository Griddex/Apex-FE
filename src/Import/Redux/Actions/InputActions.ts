import {
  IRawRow,
  TRawRowValue,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import {
  IAllWorkflows,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";

export const UPDATE_INPUT = "UPDATE_INPUT";
export const IMPORTFILE_INITIALIZATION = "IMPORTFILE_INITIALIZATION";
export const PERSIST_VARIABLEUNITS = "PERSIST_VARIABLEUNITS";
export const PERSIST_FILE = "PERSIST_FILE";
export const PERSIST_WORKSHEETNAMES = "PERSIST_WORKSHEETNAMES";
export const PERSIST_WORKSHEET = "PERSIST_WORKSHEET";
export const PERSIST_SELECTEDWORKSHEET = "PERSIST_SELECTEDWORKSHEET";
export const PERSIST_WORKSHEETFORTABLE = "PERSIST_WORKSHEETFORTABLE";
export const PERSIST_FILEHEADERS = "PERSIST_FILEHEADERS";
export const PERSIST_FILEHEADERSMATCH = "PERSIST_FILEHEADERSMATCH";
export const PERSIST_CHOSENAPPLICATIONHEADERSINDICES =
  "PERSIST_CHOSENAPPLICATIONHEADERSINDICES";
export const PERSIST_CHOSENAPPLICATIONUNITINDICES =
  "PERSIST_CHOSENAPPLICATIONUNITINDICES";
export const PERSIST_FILEUNITSANDUNIQUEUNITS =
  "PERSIST_FILEUNITSANDUNIQUEUNITS";
export const PERSIST_SELECTEDUNITROWINDEX = "PERSIST_SELECTEDUNITROWINDEX";
export const PERSIST_SELECTEDUNITROWOPTIONINDEX =
  "PERSIST_SELECTEDUNITROWOPTIONINDEX";
export const PERSIST_ROWOPTIONSINDICESMAP = "PERSIST_ROWOPTIONSINDICESMAP";
export const PERSIST_FILEUNITSMATCH = "PERSIST_FILEUNITSMATCH";
export const PERSIST_TABLEROLENAMES = "PERSIST_TABLEROLENAMES";
export const PERSIST_TABLEDATA = "PERSIST_TABLEDATA";
export const PERSIST_COLUMNNAMETABLEDATA = "PERSIST_COLUMNNAMETABLEDATA";
export const PERSIST_TABLEHEADERS = "PERSIST_TABLEHEADERS";
export const PERSIST_OPTIONINDICES = "PERSIST_OPTIONINDICES";
export const SELECTED_ROW = "SELECTED_ROW";
export const PERSIST_CHOSENAPPLICATIONHEADERS =
  "PERSIST_CHOSENAPPLICATIONHEADERS";
export const PERSIST_CHOSENAPPLICATIONUNITS = "PERSIST_CHOSENAPPLICATIONUNITS";
export const SAVEINPUTDECK_REQUEST = "SAVEINPUTDECK_REQUEST";
export const SAVEINPUTDECK_SUCCESS = "SAVEINPUTDECK_SUCCESS";
export const SAVEINPUTDECK_FAILURE = "SAVEINPUTDECK_FAILURE";
export const FETCHAPPLICATIONHEADERS_REQUEST =
  "FETCHAPPLICATIONHEADERS_REQUEST";
export const FETCHAPPLICATIONHEADERS_SUCCESS =
  "FETCHAPPLICATIONHEADERS_SUCCESS";
export const FETCHAPPLICATIONHEADERS_FAILURE =
  "FETCHAPPLICATIONHEADERS_FAILURE";
export const SAVE_USERMATCH_ALL = "SAVE_USERMATCH_ALL";

export const updateInputParameterAction = (
  reducer: ReducersType,
  nameOrPath: string,
  value: any
) => {
  return {
    type: UPDATE_INPUT,
    payload: {
      reducer,
      nameOrPath,
      value,
    },
  };
};

export const persistVariableUnitsAction = (
  reducer: ReducersType,
  variableUnits: Record<string, string>,
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_VARIABLEUNITS,
    payload: {
      reducer,
      workflowProcess,
      variableUnits,
    },
  };
};

export const importFileInitAction = (
  reducer: ReducersType,
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
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: IMPORTFILE_INITIALIZATION,
    payload: {
      reducer,
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
    // meta: { showSpinner: true, message },
  };
};

export const persistFileAction = (
  reducer: ReducersType,
  file: any,
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILE,
    payload: { reducer, inputFile: file, workflowProcess },
  };
};

export const persistWorksheetNamesAction = (
  reducer: ReducersType,
  workSheetNames: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_WORKSHEETNAMES,
    payload: { reducer, workSheetNames, workflowProcess },
  };
};

export const persistWorksheetAction = (
  reducer: ReducersType,
  selectedWorksheetName: string,
  selectedWorksheetData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_WORKSHEET,
    payload: {
      reducer,
      selectedWorksheetName,
      selectedWorksheetData,
      workflowProcess,
    },
  };
};

export const persistFileHeadersAction = (
  reducer: ReducersType,
  selectedHeaderRowIndex: number,
  fileHeaders: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEHEADERS,
    payload: { reducer, selectedHeaderRowIndex, fileHeaders, workflowProcess },
  };
};

export const persistFileHeadersMatchAction = (
  reducer: ReducersType,
  fileHeadersMatch: Record<string, number>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEHEADERSMATCH,
    payload: { reducer, fileHeadersMatch, workflowProcess },
  };
};
export const persistChosenApplicationHeadersIndicesAction = (
  reducer: ReducersType,
  chosenApplicationHeadersIndices: Record<string, number>,
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
    payload: { reducer, chosenApplicationHeadersIndices, workflowProcess },
  };
};
export const persistChosenApplicationUnitIndicesAction = (
  reducer: ReducersType,
  chosenApplicationUnitIndices: Record<string, number | number[]>,
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNITINDICES,
    payload: { reducer, chosenApplicationUnitIndices, workflowProcess },
  };
};

export const persistFileUnitsAndUniqueUnitsAction = (
  reducer: ReducersType,
  selectedUnitRowIndex: number,
  fileUnits: TRawRowValue<IRawRow>[],
  fileUniqueUnits: TRawRowValue<IRawRow>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEUNITSANDUNIQUEUNITS,
    payload: {
      reducer,
      selectedUnitRowIndex,
      fileUnits,
      fileUniqueUnits,
      workflowProcess,
    },
  };
};

export const persistFileUnitsMatchAction = (
  reducer: ReducersType,
  fileUnitsMatch: Record<string, number>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEUNITSMATCH,
    payload: { reducer, fileUnitsMatch, workflowProcess },
  };
};

export const persistChosenApplicationHeadersAction = (
  reducer: ReducersType,
  chosenApplicationHeaders: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERS,
    payload: { reducer, chosenApplicationHeaders, workflowProcess },
  };
};
export const persistChosenApplicationUnitsAction = (
  reducer: ReducersType,
  chosenApplicationUnitsWithoutNone: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNITS,
    payload: { reducer, chosenApplicationUnitsWithoutNone, workflowProcess },
  };
};

export const persistTableRoleNamesAction = (
  reducer: ReducersType,
  tableRoleNames: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEROLENAMES,
    payload: { reducer, tableRoleNames, workflowProcess },
  };
};

export const persistTableDataAction = (
  reducer: ReducersType,
  tableData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { reducer, tableData, workflowProcess },
  };
};

export const persistColumnNameTableDataAction = (
  reducer: ReducersType,
  columnNameTableData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_COLUMNNAMETABLEDATA,
    payload: { reducer, columnNameTableData, workflowProcess },
  };
};

export const persistTableHeadersAction = (
  reducer: ReducersType,
  tableHeaders: string[],
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEHEADERS,
    payload: { reducer, tableHeaders, workflowProcess },
  };
};

export const saveInputDeckRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  let inputDeck;
  const reducer = "inputReducer";

  if (workflowProcess.includes("facilities"))
    inputDeck = "facilities inputdeck";
  else if (workflowProcess.includes("forecast"))
    inputDeck = "forecast inputdeck";

  return {
    type: SAVEINPUTDECK_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { message: `Saving ${inputDeck}...` },
  };
};

export const saveInputDeckSuccessAction = () => {
  return {
    type: SAVEINPUTDECK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveInputDeckFailureAction = () => {
  return {
    type: SAVEINPUTDECK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchApplicationHeadersRequestAction = () => {
  return {
    type: FETCHAPPLICATIONHEADERS_REQUEST,
    meta: { showSpinner: true, message: "Loading application..." },
  };
};
export const fetchApplicationHeadersSuccessAction = () => {
  return {
    type: FETCHAPPLICATIONHEADERS_SUCCESS,
    payload: {
      status: 0,
      headerType: "",
      facilitiesAppHeaders: [],
      forecastAppHeaders: [],
    },
  };
};
export const fetchApplicationHeadersFailureAction = () => {
  return {
    type: FETCHAPPLICATIONHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};
