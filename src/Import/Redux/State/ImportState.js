const ImportState = {
  Loading: false,
  Matching: false,
  IsStepFailed: null,
  IsStepSkipped: null,

  ImportModule: "",
  ContextImportPerspective: "",
  Steps: [],
  OptionalSteps: [],
  ErrorSteps: [],
  Skipped: new Set(),
  ActiveStep: 0,

  AcceptedFile: null,
  SelectedWorksheetName: "",
  SelectedWorksheetData: [],
  TableHeaderData: [],
  TableBodyData: [],
  ExtrudeParseTable: false,
};

export default ImportState;
