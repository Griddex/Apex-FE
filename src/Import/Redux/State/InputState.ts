import { IInputWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import { InputStateType } from "./InputStateTypes";

const inputWorkflowProcesses: Array<IInputWorkflows["wkPs"]> = [
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

const generateInputState = () => {
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

        chosenAppHeadersWithNone: [],
        chosenAppHeadersWithoutNone: [],

        chosenApplicationUnitsWithoutNone: [],
        fileUnitsWithoutNone: [],
        fileAppHeaderExcludeWithNoneMap: {},

        savedMatchObjectAll: {},
        variableUnits: {},

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

const inputDataState = generateInputState();
const existingDataState = generateExistingDataState();
const InputState: InputStateType = {
  currentWorkflowProcess: "",
  headerType: "",

  selectedTableData: [],

  facilitiesInputDeckId: "",
  facilitiesInputDeckTitle: "",
  facilitiesInputDeckDescription: "",

  selectedFacilitiesInputDeckId: "",
  selectedFacilitiesInputDeckTitle: "",
  selectedFacilitiesInputDeckDescription: "",

  selectedForecastInputDeckId: "",
  selectedForecastInputDeckTitle: "",
  selectedForecastInputDeckDescription: "",

  forecastInputDeckId: "",
  forecastInputDeckTitle: "",
  forecastInputDeckDescription: "",

  currentAppHeaderOptions: [],

  facilitiesAppHeaders: [],
  forecastAppHeaders: [],
  facilitiesHeadersSelectOptions: [],
  forecastHeadersSelectOptions: [],
  facilitiesHeadersNameMap: {},
  forecastHeadersNameMap: {},
  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,

  noneColumnIndices: {},
  matchHeadersTable: [],
  matchUnitsTable: [],
};

export default InputState;
