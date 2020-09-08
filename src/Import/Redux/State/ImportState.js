const ImportState = {
  Loading: false,
  Matching: false,
  IsStepFailed: null,
  IsStepSkipped: null,

  moduleName: "",
  workflowName: "",
  steps: [],
  OptionalSteps: [],
  errorSteps: [],
  skipped: new Set(),
  activeStep: 0,

  AcceptedFile: null,
  SelectedWorksheetName: "",
  SelectedWorksheetData: [],
  TableHeaderData: [],
  TableBodyData: [],
  ExtrudeParseTable: false,
};

export default ImportState;
