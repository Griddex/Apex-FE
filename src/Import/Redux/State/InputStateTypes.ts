import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";
import {
  IStoredDataProps,
  IStoredDataRow,
  TApproval,
} from "../../../Application/Types/ApplicationTypes";
import {
  TVariableName,
  TVariableTitle,
} from "../../../Settings/Redux/State/UnitSettingsStateTypes";

export interface IInputState {
  fileLastModified: string;
  filePath: string;
  fileType: string;
  fileName: string;
  fileSize: string;
  fileAuthor: string;
  fileCreated: string;

  fileAccepted: false;
  dnDDisabled: false;
  inputFile: any;

  workSheetNames: string[];
  selectedWorksheetName: string;
  selectedWorksheetData: Record<string, React.Key>[];

  tableHeaders: string[];
  fileHeaders: string[];
  fileHeadersMatch: [];
  selectedHeaderRowIndex: 0;
  selectedHeaderOptionIndex: 0;
  chosenApplicationHeadersIndices: [];
  headerRowOptionsIndices: [];

  fileUnits: string[];
  fileUniqueUnits: [];
  fileUnitsMatch: [];
  fileUnitsMatchUnique: [];
  selectedUnitRowIndex: 0;
  selectedUnitOptionIndex: 0;
  unitRowOptionsIndices: [];
  tableRoleNames: string[];
  optionIndices: number[];
  tableData: Record<string, React.Key>[];
  columnNameTableData: Record<string, React.Key>[];
  inputDeckData: Record<string, React.Key>[];
  selectedRow: Record<string, React.Key>;
  validationErrorsData: any[];

  chosenAppHeadersWithNone: string[];
  chosenAppHeadersWithoutNone: string[];

  chosenApplicationUnitsWithoutNone: string[];
  fileUnitsWithoutNone: string[];

  appHeaderNameUnitIdsMap: Record<string, string>;
  appHeaderNameUnitTitlesMap: Record<string, string>;
  fileAppHeaderExcludeWithNoneMap: Record<
    string,
    Record<string, React.Key | boolean>
  >;
  currentAppHeaderNameMap: Record<string, React.Key>;
  fileHeadersUnitsAppHeadersWithoutNoneMap: Record<
    string,
    Record<string, string>
  >;

  title: string;
  description: string;
  inputDeckId: string;
  status: number;
  message: string;
  errors: { message: string };
  success: false;
}

export interface InputStateType {
  currentWorkflowProcess: string;
  headerType: string;

  selectedTableData: any;

  facilitiesInputDeckId: string;
  facilitiesInputDeckTitle: string;
  facilitiesInputDeckDescription: string;
  selectedFacilitiesInputDeckId: string;
  selectedFacilitiesInputDeckTitle: string;
  selectedFacilitiesInputDeckDescription: string;

  forecastInputDeckId: string;
  forecastInputdeckTitle: string;
  forecastInputDeckDescription: string;
  selectedForecastInputDeckId: string;
  selectedForecastInputDeckTitle: string;
  selectedForecastInputDeckDescription: string;
  selectedForecastInputDeck: IRawRow[];

  productionDataId: string;
  productionDataTitle: string;
  productionDataDescription: string;
  selectedProductionDataId: string;
  selectedProductionDataTitle: string;
  selectedProductionDataDescription: string;
  serverNameOptions: ISelectOption[];

  currentAppHeaderOptions: ISelectOption[];

  facilitiesAppHeaders: Record<string, string>[];
  forecastAppHeaders: Record<string, string>[];
  facilitiesHeadersSelectOptions: ISelectOption[];
  forecastHeadersSelectOptions: ISelectOption[];
  facilitiesHeadersNameMap: Record<TVariableTitle, TVariableName>;
  forecastHeadersNameMap: Record<TVariableTitle, TVariableName>;

  inputDataWorkflows: Record<string, IInputState>;
  storedDataWorkflows: Record<
    NonNullable<IStoredDataProps["wkPs"]>,
    IStoredDataRow[]
  >;

  noneColumnIndices: Record<number, boolean>;

  matchHeadersRows: IRawRow[];
  matchUnitsRows: IRawRow[];
}

export interface IStoredProductionDataRow {
  sn: number;
  id: string;
  productionDataId: string;
  approval: TApproval;
  title: string;
  description?: string;
  source: "Admin" | "User";
  store: "Database" | "Excel";
  author: IUserDetails | string;
  createdOn: string;
  modifiedOn: string;
}
