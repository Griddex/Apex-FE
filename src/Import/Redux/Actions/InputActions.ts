import {
  IRawRow,
  IRawRowValueType,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { UserMatchObjectType } from "../../Routes/Common/Workflows/MatchHeadersTypes";

export const UPDATE_INPUT = "UPDATE_INPUT";
export const IMPORTFILE_INITIALIZATION = "IMPORTFILE_INITIALIZATION";
export const PERSIST_VARIABLEUNITS = "PERSIST_VARIABLEUNITS";
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

export const updateInputParameterAction = (path: string, value: React.Key) => {
  return {
    type: UPDATE_INPUT,
    payload: {
      path,
      value,
    },
  };
};
export const persistVariableUnitsAction = (
  variableUnits: Record<string, string>,
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_VARIABLEUNITS,
    payload: {
      workflowProcess,
      variableUnits,
    },
  };
};

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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
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

export const persistFileAction = (
  file: any,
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILE,
    payload: { inputFile: file, workflowProcess },
  };
};

export const persistWorksheetNamesAction = (
  workSheetNames: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_WORKSHEETNAMES,
    payload: { workSheetNames, workflowProcess },
  };
};

export const persistWorksheetAction = (
  selectedWorksheetName: string,
  selectedWorksheetData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_WORKSHEET,
    payload: { selectedWorksheetName, selectedWorksheetData, workflowProcess },
  };
};

export const persistFileHeadersAction = (
  selectedHeaderRowIndex: number,
  fileHeaders: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEHEADERS,
    payload: { selectedHeaderRowIndex, fileHeaders, workflowProcess },
  };
};

export const persistFileHeadersMatchAction = (
  fileHeadersMatch: Record<string, number>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEHEADERSMATCH,
    payload: { fileHeadersMatch, workflowProcess },
  };
};
export const persistChosenApplicationHeadersIndicesAction = (
  chosenApplicationHeadersIndices: Record<string, number>,
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
    payload: { chosenApplicationHeadersIndices, workflowProcess },
  };
};
export const persistChosenApplicationUniqueUnitIndicesAction = (
  chosenApplicationUniqueUnitIndices: Record<string, number | number[]>,
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNIQUEUNITINDICES,
    payload: { chosenApplicationUniqueUnitIndices, workflowProcess },
  };
};

export const persistFileUnitsAndUniqueUnitsAction = (
  selectedUnitRowIndex: number,
  fileUnits: IRawRowValueType<IRawRow>[],
  fileUniqueUnits: IRawRowValueType<IRawRow>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_FILEUNITSMATCH,
    payload: { fileUnitsMatch, workflowProcess },
  };
};

export const persistChosenApplicationHeadersAction = (
  chosenApplicationHeaders: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONHEADERS,
    payload: { chosenApplicationHeaders, workflowProcess },
  };
};
export const persistChosenApplicationUnitsAction = (
  chosenApplicationUnits: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_CHOSENAPPLICATIONUNITS,
    payload: { chosenApplicationUnits, workflowProcess },
  };
};

export const persistTableRoleNamesAction = (
  tableRoleNames: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEROLENAMES,
    payload: { tableRoleNames, workflowProcess },
  };
};

export const persistTableDataAction = (
  tableData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { tableData, workflowProcess },
  };
};

export const persistColumnNameTableDataAction = (
  columnNameTableData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_COLUMNNAMETABLEDATA,
    payload: { columnNameTableData, workflowProcess },
  };
};
export const persistDefinedTableDataAction = (
  inputDeckData: Record<string, React.Key>[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_DEFINEDTABLEDATA,
    payload: { inputDeckData, workflowProcess },
  };
};

export const persistTableHeadersAction = (
  tableHeaders: string[],
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) => {
  return {
    type: PERSIST_TABLEHEADERS,
    payload: { tableHeaders, workflowProcess },
  };
};

export const saveInputDeckRequestAction = (
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
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
      facilitiesInputHeaders: [],
      forecastInputHeaders: [],
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

export const saveUserMatchAction = (
  savedMatchObjectAll: UserMatchObjectType
) => {
  return {
    type: SAVE_USERMATCH_ALL,
    payload: { savedMatchObjectAll },
  };
};
