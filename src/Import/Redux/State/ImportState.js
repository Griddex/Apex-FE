const ImportState = {
  Loading: false,

  IsStepFailed: null,
  IsStepSkipped: null,

  ImportModule: "",
  ContextImportPerspective: "",
  Steps: [],
  OptionalSteps: [],
  ErrorSteps: [],
  Skipped: new Set(),
  ActiveStep: 0,
};

export default ImportState;
