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
};

export default ImportState;
