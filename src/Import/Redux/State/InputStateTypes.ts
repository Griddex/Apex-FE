import { FormikErrors, FormikTouched } from "formik";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { TReducer } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import {
  TVariableTitle,
  TVariableName,
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

export interface InputStateType
  extends INewFacilitiesInputDeckFormValues,
    INewForecastInputDeckFormValues {
  currentWorkflowProcess: string;
  headerType: string;

  selectedTableData: any;

  facilitiesInputDeckId: string;
  facilitiesInputDeckTitle: string;
  facilitiesInputDeckDescription: string;

  selectedFacilitiesInputDeckId: string;
  selectedFacilitiesInputDeckTitle: string;
  selectedFacilitiesInputDeckDescription: string;

  selectedForecastInputDeckId: string;
  selectedForecastInputDeckTitle: string;
  selectedForecastInputDeckDescription: string;
  selectedForecastInputDeck: IRawRow[];

  forecastInputDeckId: string;
  forecastInputdeckTitle: string;
  forecastInputDeckDescription: string;

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

export interface INewFacilitiesInputDeckFormValues {
  facilitiesInputDeckTitle: string;
  facilitiesInputDeckDescription: string;
}

export interface INewFacilitiesInputDeckWorkflowProps
  extends Partial<INewFacilitiesInputDeckFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewFacilitiesInputDeckFormValues>;
  touched?: FormikTouched<INewFacilitiesInputDeckFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewFacilitiesInputDeckWorkflowProps
  ) => JSX.Element | JSX.Element[];
  reducer?: TReducer;
}
export interface INewForecastInputDeckFormValues {
  forecastInputdeckTitle: string;
  forecastInputDeckDescription: string;
}
export interface INewForecastInputDeckWorkflowProps
  extends Partial<INewForecastInputDeckFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewForecastInputDeckFormValues>;
  touched?: FormikTouched<INewForecastInputDeckFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewForecastInputDeckWorkflowProps
  ) => JSX.Element | JSX.Element[];
  reducer?: TReducer;
}
