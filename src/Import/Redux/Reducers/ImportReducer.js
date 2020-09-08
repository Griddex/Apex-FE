import {
  IMPORT_EXCEL_LOADING,
  IMPORT_EXCEL_MATCHING,
  IMPORT_FILE_SAVE,
  IMPORT_EXCELWORKSHEETNAME_SET,
  IMPORT_EXCELWORKSHEETDATA_SET,
  IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
} from "../Actions/ImportAction";
import {
  INITIALIZE_WORKFLOW,
  RESET_WORKFLOW,
  NEXT_WORKFLOW,
  BACK_WORKFLOW,
  SKIP_WORKFLOW,
  SAVE_WORKFLOW,
} from "../Actions/SetStepperActions";
import ImportState from "./../State/ImportState";

const importReducer = (state = ImportState, action) => {
  const { activeStep, steps, skipped, errorSteps, OptionalSteps } = state;

  function isStepOptional(step) {
    return OptionalSteps.includes(step);
  }

  function isStepFailed(step) {
    return errorSteps.includes(step);
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  switch (action.type) {
    case IMPORT_EXCEL_LOADING:
      return { ...state, Loading: action.payload.Loading };
    case IMPORT_EXCEL_MATCHING:
      return { ...state, Loading: action.payload.Matching };
    case INITIALIZE_WORKFLOW:
      return {
        ...state,
        moduleName: action.payload.moduleName,
        workflowName: action.payload.workflowName,
        steps: action.payload.steps,
        activeStep: action.payload.activeStep,
      };
    case RESET_WORKFLOW:
      return {
        ...state,
        moduleName: action.payload.moduleName,
        activeStep: action.payload.activeStep,
      };
    case NEXT_WORKFLOW:
      const newSkipped = state.skipped;

      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(skipped.values());
        newSkipped.delete(activeStep);
      }
      if (activeStep === steps.length - 1) {
      }

      return {
        ...state,
        moduleName: action.payload.moduleName,
        activeStep: action.payload.activeStep,
        skipped: newSkipped,
      };
    case BACK_WORKFLOW:
      return {
        ...state,
        moduleName: action.payload.moduleName,
        activeStep: action.payload.activeStep,
      };
    case SKIP_WORKFLOW:
      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const newSkippedSet = new Set(state.skipped.values());
      newSkippedSet.add(activeStep);

      return {
        ...state,
        moduleName: action.payload.moduleName,
        activeStep: action.payload.activeStep,
        skipped: newSkippedSet,
      };
    case SAVE_WORKFLOW:
      return { ...state };
    case IMPORT_FILE_SAVE:
      return { ...state, AcceptedFile: action.payload.AcceptedFile };
    case IMPORT_EXCELWORKSHEETNAME_SET:
      return {
        ...state,
        SelectedWorksheetName: action.payload.SelectedWorksheetName,
      };
    case IMPORT_EXCELWORKSHEETDATA_SET:
      return {
        ...state,
        SelectedWorksheetData: action.payload.SelectedWorksheetData,
      };
    case IMPORT_EXCELWORKSHEETPARSE_NAVIGATE:
      return {
        ...state,
        ExtrudeParseTable: action.payload.ExtrudeParseTable,
      };
    default:
      return state;
  }
};

export default importReducer;
