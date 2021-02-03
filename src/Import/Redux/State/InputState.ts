import { IImportWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import { InputStateType } from "./InputStateTypes";

const importWorkflowProcesses: Array<IImportWorkflowProcess["wkPs"]> = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",

  "productionInputDataExcel",
  "productionInputDataDatabase",

  "economicsInputDataExcel",
  "economicsInputDataDatabase",
  "economicsInputDataManual",
];

const generateImportState = () => {
  return importWorkflowProcesses.reduce((acc, workflowName) => {
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
const existingDataWorkflowNames: Array<
  NonNullable<IExistingDataProps["wkPs"]>
> = [
  "facilitiesInputDeckExisting",
  "forecastInputDeckExisting",
  "productionInputDataExisting",
  "economicsInputDataExisting",
  "networkExisting",
  "economicsParametersExisting",
];
const generateExistingDataState = () => {
  const wf = existingDataWorkflowNames.reduce((acc, workflowName) => {
    return {
      ...acc,
      [workflowName]: {
        // existingData: [],

        // existingDataId: "",
        // statusCode: 0,
        // message: "",
        // errors: { message: "" },
        // success: false,

        sn: 0,
        id: "",
        userId: "",
        status: "Not Started",
        title: "",
        description: "",
        author: "",
        approvers: "",
        createdOn: "",
        modifiedOn: "",
      },
    };
  }, {});

  return wf as InputStateType["existingDataWorkflows"];
};

const importDataState = generateImportState();
const existingDataState = generateExistingDataState();
const InputState: InputStateType = {
  currentWorkflowProcess: "",
  headerType: "",
  facilitiesInputHeaders: [],
  forecastInputHeaders: [],
  importDataWorkflows: importDataState,
  existingDataWorkflows: existingDataState,

  facilitiesInputDeckId: "",
  facilitiesInputDeckTitle: "",
  facilitiesInputDeckDescription: "",
  forecastInputDeckId: "",
  forecastInputDeckTitle: "",
  forecastInputDeckDescription: "",
};

export default InputState;
