import {
  IRawRow,
  TRawRowValue,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import {
  TReducer,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { TApexData } from "../../../Application/Types/ApplicationTypes";
import { TDevScenarioNames } from "../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { TfinalizationChoice } from "../../Routes/Common/InputLayoutTypes";

export const UPDATE_INPUT = "UPDATE_INPUT";
export const RESET_INPUT = "RESET_INPUT";
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
export const PERSIST_OPTIONINDICES = "PERSIST_OPTIONINDICES";
export const SELECTED_ROW = "SELECTED_ROW";
export const PERSIST_CHOSENAPPLICATIONHEADERS =
  "PERSIST_CHOSENAPPLICATIONHEADERS";
export const PERSIST_CHOSENAPPLICATIONUNITS = "PERSIST_CHOSENAPPLICATIONUNITS";
export const SAVE_INPUTDECK_REQUEST = "SAVE_INPUTDECK_REQUEST";
export const SAVE_INPUTDECK_SUCCESS = "SAVE_INPUTDECK_SUCCESS";
export const SAVE_INPUTDECK_FAILURE = "SAVE_INPUTDECK_FAILURE";
export const FETCH_APPLICATIONHEADERS_REQUEST =
  "FETCH_APPLICATIONHEADERS_REQUEST";
export const FETCH_APPLICATIONHEADERS_SUCCESS =
  "FETCH_APPLICATIONHEADERS_SUCCESS";
export const FETCH_APPLICATIONHEADERS_FAILURE =
  "FETCH_APPLICATIONHEADERS_FAILURE";
export const SAVE_USERMATCH_ALL = "SAVE_USERMATCH_ALL";
export const VALIDATE_FORECASTINPUTDECK_REQUEST =
  "VALIDATE_FORECASTINPUTDECK_REQUEST";
export const VALIDATE_FORECASTINPUTDECK_SUCCESS_NOERROR =
  "VALIDATE_FORECASTINPUTDECK_SUCCESS_NOERROR";
export const VALIDATE_FORECASTINPUTDECK_SUCCESS_ERROR =
  "VALIDATE_FORECASTINPUTDECK_SUCCESS_ERROR";
export const VALIDATE_FORECASTINPUTDECK_FAILURE =
  "VALIDATE_FORECASTINPUTDECK_FAILURE";

export const updateInputParameterAction = (
  reducer: TReducer,
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
  reducer: TReducer,
  appHeaderNameUnitIdsMap: Record<string, string>,
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_VARIABLEUNITS,
    payload: {
      reducer,
      workflowProcess,
      appHeaderNameUnitIdsMap,
    },
  };
};

export const importFileInitAction = (
  reducer: TReducer,
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
  workflowProcess: TAllWorkflowProcesses
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
  reducer: TReducer,
  file: any,
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_FILE,
    payload: { reducer, inputFile: file, workflowProcess },
  };
};

export const persistWorksheetNamesAction = (
  reducer: TReducer,
  workSheetNames: string[],
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_WORKSHEETNAMES,
    payload: { reducer, workSheetNames, workflowProcess },
  };
};

export const persistWorksheetAction = (
  reducer: TReducer,
  selectedWorksheetName: string,
  selectedWorksheetData: Record<string, React.Key>[],
  workflowProcess: TAllWorkflowProcesses
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
  reducer: TReducer,
  selectedHeaderRowIndex: number,
  fileHeaders: string[],
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_FILEHEADERS,
    payload: { reducer, selectedHeaderRowIndex, fileHeaders, workflowProcess },
  };
};

export const persistFileUnitsAndUniqueUnitsAction = (
  reducer: TReducer,
  selectedUnitRowIndex: number,
  fileUnits: TRawRowValue<IRawRow>[],
  fileUniqueUnits: TRawRowValue<IRawRow>[],
  workflowProcess: TAllWorkflowProcesses
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

export const persistTableRoleNamesAction = (
  reducer: TReducer,
  tableRoleNames: string[],
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_TABLEROLENAMES,
    payload: { reducer, tableRoleNames, workflowProcess },
  };
};

export const persistTableDataAction = (
  reducer: TReducer,
  tableData: Record<string, React.Key>[],
  workflowProcess: TAllWorkflowProcesses,
  currentDevValue?: TDevScenarioNames
) => {
  return {
    type: PERSIST_TABLEDATA,
    payload: { reducer, tableData, workflowProcess, currentDevValue },
  };
};

export const persistColumnNameTableDataAction = (
  reducer: TReducer,
  columnNameTableData: TApexData,
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: PERSIST_COLUMNNAMETABLEDATA,
    payload: { reducer, columnNameTableData, workflowProcess },
  };
};

export const saveInputDeckRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  titleDesc: Record<string, string>,
  finalizationChoice: TfinalizationChoice
) => {
  let inputDeck;
  const { title } = titleDesc;
  const reducer = "inputReducer";

  if (workflowProcess.includes("facilities"))
    inputDeck = "facilities inputdeck";
  else if (workflowProcess.includes("forecast"))
    inputDeck = "forecast inputdeck";

  return {
    type: SAVE_INPUTDECK_REQUEST,
    payload: { workflowProcess, reducer, titleDesc, finalizationChoice },
    meta: { message: `Saving ${title}...` },
  };
};

export const saveInputDeckSuccessAction = () => {
  return {
    type: SAVE_INPUTDECK_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveInputDeckFailureAction = () => {
  return {
    type: SAVE_INPUTDECK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchApplicationHeadersRequestAction = () => {
  return {
    type: FETCH_APPLICATIONHEADERS_REQUEST,
    meta: { showSpinner: true, message: "Loading application..." },
  };
};

export const fetchApplicationHeadersSuccessAction = () => {
  return {
    type: FETCH_APPLICATIONHEADERS_SUCCESS,
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
    type: FETCH_APPLICATIONHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const validateForecastInputDeckRequestAction = (
  workflowCategory: TAllWorkflowCategories,
  workflowProcess: TAllWorkflowProcesses
) => {
  return {
    type: VALIDATE_FORECASTINPUTDECK_REQUEST,
    payload: { workflowCategory, workflowProcess },
    meta: { showSpinner: true, message: "Validating forecast inputdeck..." },
  };
};

export const validateForecastInputDeckSuccessNoErrorAction = () => {
  return {
    type: VALIDATE_FORECASTINPUTDECK_SUCCESS_NOERROR,
    payload: {},
  };
};

export const validateForecastInputDeckSuccessErrorAction = () => {
  return {
    type: VALIDATE_FORECASTINPUTDECK_SUCCESS_ERROR,
    payload: {},
  };
};

export const validateForecastInputDeckFailureAction = () => {
  return {
    type: VALIDATE_FORECASTINPUTDECK_FAILURE,
    payload: {
      status: 0,
    },
  };
};

export const resetInputAction = () => {
  return {
    type: RESET_INPUT,
  };
};
