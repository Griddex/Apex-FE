import { ImportStateType } from "./ImportStateTypes";

const workflowNames = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",
  "facilitiesInputDeckApproveddeck",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",
  "forecastInputDeckApproveddeck",

  "productionDataExcel",
  "productionDataDatabase",
  "productionDataApproved",

  "economicsDataExcel",
  "economicsDataDatabase",
  "economicsDataManual",
  "economicsDataApproved",

  "economicsWorkflow",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastParametersWorkflow",
];

const generateImportState = () => {
  return workflowNames.reduce((acc, workflowName: string) => {
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

        message: "",
        errors: [],

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
        definedTableData: [],
        selectedRow: null,

        chosenApplicationHeaders: [],
        chosenApplicationUnits: [],
      },
    };
  }, {});
};

const state = generateImportState();
const importState: ImportStateType = {
  currentImportProcess: "",
  allWorkflows: { ...state },
};

export default importState;
