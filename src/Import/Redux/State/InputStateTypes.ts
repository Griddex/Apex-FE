import { FormikErrors, FormikTouched } from "formik";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";
import { UserMatchObjectType } from "../../Routes/Common/Workflows/MatchHeadersTypes";

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
  selectedWorksheetDataForTable: Record<string, React.Key>[];
  tableHeaderData: Record<string, React.Key>[];
  tableBodyData: Record<string, React.Key>[];
  extrudeParseTable: false;

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

  chosenApplicationHeaders: string[];
  chosenApplicationUnits: string[];

  savedMatchObjectAll: UserMatchObjectType;
  variableUnits: Record<string, string>;

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
  facilitiesInputDeckId: string;
  forecastInputDeckId: string;
  facilitiesInputHeaders: Record<string, string>[];
  forecastInputHeaders: Record<string, string>[];
  inputDataWorkflows: Record<string, IInputState>;
  existingDataWorkflows: Record<
    NonNullable<IExistingDataProps["wkPs"]>,
    IExistingDataRow[]
  >;
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
}
export interface INewForecastInputDeckFormValues {
  forecastInputDeckTitle: string;
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
}
