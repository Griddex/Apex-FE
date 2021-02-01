import { FormikErrors, FormikTouched } from "formik";
import { IImportWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataRow } from "../../../Application/Types/ApplicationTypes";

export interface IImportState {
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

  title: string;
  description: string;
  inputDeckId: string;
  statusCode: number;
  message: string;
  errors: { message: string };
  success: false;
}

export interface InputStateType
  extends INewFacilitiesInputDeckFormValues,
    INewForecastInputDeckFormValues {
  currentWorkflowProcess: IImportWorkflowProcess["workflowProcess"];
  headerType: string;
  facilitiesInputHeaders: Record<string, string>[];
  forecastInputHeaders: Record<string, string>[];
  importDataWorkflows: Record<string, IImportState>;
  existingDataName: Record<string, IExistingDataRow[]>;
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
