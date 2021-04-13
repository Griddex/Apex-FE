import { IInputWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import { InputStateType } from "./InputStateTypes";

const inputWorkflowProcesses: Array<IInputWorkflowProcess["wkPs"]> = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",

  "forecastInputDeckSaveAutogenerate",
  "forecastInputDeckSaveManualgenerate",

  "productionInputDataExcel",
  "productionInputDataDatabase",

  //Manage economics input from economics module
];

const generateImportState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowName) => {
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

        savedMatchObjectAll: {},

        inputDeckId: "",
        status: 0,
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
  "economicsCostsRevenuesDeckExisting",
  "economicsParametersDeckExisting",
  "networkExisting",
];
const generateExistingDataState = () => {
  const wf = existingDataWorkflowNames.reduce((acc, workflowName) => {
    return {
      ...acc,
      [workflowName]: {
        // existingData: [],

        // existingDataId: "",
        // status: 0,
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

const inputDataState = generateImportState();
const existingDataState = generateExistingDataState();
const InputState: InputStateType = {
  currentWorkflowProcess: "",
  headerType: "",
  facilitiesInputHeaders: [],
  forecastInputHeaders: [],
  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,

  facilitiesInputDeckId: "",
  facilitiesInputDeckTitle: "",
  facilitiesInputDeckDescription: "",
  forecastInputDeckId: "",
  forecastInputDeckTitle: "",
  forecastInputDeckDescription: "",
};

export default InputState;
