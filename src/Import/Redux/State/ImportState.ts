import { InputStateType } from "./ImportStateTypes";

const importWorkflowProcesses = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",
  // "facilitiesInputDeckApproveddeck",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",
  // "forecastInputDeckApproveddeck",

  "productionInputDataExcel",
  "productionInputDataDatabase",
  "productionInputDataApproved",

  "economicsInputDataExcel",
  "economicsInputDataDatabase",
  "economicsInputDataManual",
  // "economicsInputDataApproved",
];

const generateImportState = () => {
  return importWorkflowProcesses.reduce((acc, workflowName: string) => {
    return {
      ...acc,
      [workflowName]: {
        fileLastModified: "",
        filePath: "",
        fileType: "",
        fileName: "",
        fileSize: "",
        fileAuthor: "",
        fileCreated: "",

        fileAccepted: false,
        dnDDisabled: false,
        inputFile: null,

        workSheetNames: [],
        selectedWorksheetName: "",
        selectedWorksheetData: [],
        selectedWorksheetDataForTable: [],
        tableHeaderData: [],
        tableBodyData: [],
        extrudeParseTable: false,

        tableHeaders: [],
        fileHeaders: [],
        fileHeadersMatch: [],
        selectedHeaderRowIndex: 0,
        selectedHeaderOptionIndex: 0,
        chosenApplicationHeadersIndices: [],
        headerRowOptionsIndices: [],
        fileUnits: [],
        fileUniqueUnits: [],
        fileUnitsMatch: [],
        fileUnitsMatchUnique: [],
        selectedUnitRowIndex: 0,
        selectedUnitOptionIndex: 0,
        unitRowOptionsIndices: [],
        tableRoleNames: [],
        optionIndices: [],
        tableData: [],
        columnNameTableData: [],
        inputDeckData: [],
        selectedRow: null,

        chosenApplicationHeaders: [],
        chosenApplicationUnits: [],

        inputDeckId: "",
        statusCode: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

//This like existing network, DCA parameters, etc will be
//created
const existingDataWorkflowNames = [
  "facilitiesInputDeckApproveddeck",
  "forecastInputDeckApproveddeck",
  "economicsInputDataApproved",
  "productionInputDataApproved",
  "networkApproved",
];
const generateExistingDataState = () => {
  return existingDataWorkflowNames.reduce((acc, workflowName: string) => {
    return {
      ...acc,
      [workflowName]: {
        existingData: [],

        existingDataId: "",
        statusCode: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

const importDataState = generateImportState();
const existingDataState = generateExistingDataState();
const InputState: InputStateType = {
  currentWorkflowProcess: "",
  importDataWorkflows: importDataState,
  existingDataWorkflows: existingDataState,
};

export default InputState;
