import { IInputWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IStoredDataProps } from "../../../Application/Types/ApplicationTypes";
import { InputStateType } from "./InputStateTypes";

export const initialInputWorkflowParameters = {
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
  validationErrorsData: [],

  chosenAppHeadersWithNone: [],
  chosenAppHeadersWithoutNone: [],

  chosenApplicationUnitsWithoutNone: [],
  fileUnitsWithoutNone: [],
  fileAppHeaderExcludeWithNoneMap: {},
  currentAppHeaderNameMap: {},
  fileHeadersUnitsAppHeadersWithoutNoneMap: {},

  savedMatchObjectAll: {},
  appHeaderNameUnitsMap: {},

  inputDeckId: "",
  status: 0,
  message: "",
  errors: { message: "" },
  success: false,
};

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
      [workflowName]: initialInputWorkflowParameters,
    };
  }, {});
};

//This like stored network, DCA parameters, etc will be
//created
const storedDataWorkflowNames: Array<NonNullable<IStoredDataProps["wkPs"]>> = [
  "facilitiesInputDeckStored",
  "forecastInputDeckStored",
  "productionInputDataStored",
  "economicsCostsRevenuesDeckStored",
  "economicsParametersDeckStored",
  "networkStored",
];
const generateStoredDataState = () => {
  const wf = storedDataWorkflowNames.reduce((acc, workflowName) => {
    return {
      ...acc,
      [workflowName]: [],
    };
  }, {});

  return wf as InputStateType["storedDataWorkflows"];
};

const inputDataState = generateInputState();
const storedDataState = generateStoredDataState();
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
  selectedForecastInputDeck: [],

  forecastInputDeckId: "",
  forecastInputdeckTitle: "",
  forecastInputDeckDescription: "",

  currentAppHeaderOptions: [],

  facilitiesAppHeaders: [],
  forecastAppHeaders: [],
  facilitiesHeadersSelectOptions: [],
  forecastHeadersSelectOptions: [],
  facilitiesHeadersNameMap: {},
  forecastHeadersNameMap: {},
  inputDataWorkflows: inputDataState,
  storedDataWorkflows: storedDataState,

  noneColumnIndices: {},
  matchHeadersRows: [],
  matchUnitsRows: [],
};

export default InputState;
