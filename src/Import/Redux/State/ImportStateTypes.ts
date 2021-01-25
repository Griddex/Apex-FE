import { IExistingDataRow } from "../../Routes/Common/InputLayoutTypes";

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

export interface ImportStateType {
  currentInputProcess: string;
  importDataWorkflows: Record<string, IImportState>;
  existingDataWorkflows: Record<string, IExistingDataRow[]>;
}
