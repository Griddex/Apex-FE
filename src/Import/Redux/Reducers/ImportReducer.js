import { IMPORT_EXCEL_LOADING } from "../Actions/ImportLoadingAction";
import {
  IMPORT_WORKFLOW_INITIALIZE,
  IMPORT_WORKFLOW_RESET,
  IMPORT_WORKFLOW_NEXT,
  IMPORT_WORKFLOW_BACK,
  IMPORT_WORKFLOW_SKIP,
  IMPORT_WORKFLOW_SAVE,
} from "../Actions/SetStepperActions";
import ImportState from "./../State/ImportState";

export const ImportReducer = (state = ImportState, action) => {
  const { ActiveStep, Steps, Skipped, ErrorSteps, OptionalSteps } = state;

  function isStepOptional(step) {
    return OptionalSteps.includes(step);
  }

  function isStepFailed(step) {
    return ErrorSteps.includes(step);
  }

  function isStepSkipped(step) {
    return Skipped.has(step);
  }

  switch (action.type) {
    case IMPORT_EXCEL_LOADING:
      return { ...state, Loading: action.payload.Loading };
    case IMPORT_WORKFLOW_INITIALIZE:
      return {
        ...state,
        ImportModule: action.payload.ImportModule,
        ContextImportPerspective: action.payload.ContextImportPerspective,
        Steps: action.payload.Steps,
        ActiveStep: action.payload.ActiveStep,
      };
    case IMPORT_WORKFLOW_RESET:
      return {
        ...state,
        ImportModule: action.payload.ImportModule,
        ActiveStep: action.payload.ActiveStep,
      };
    case IMPORT_WORKFLOW_NEXT:
      const newSkipped = state.Skipped;

      if (isStepSkipped(ActiveStep)) {
        newSkipped = new Set(Skipped.values());
        newSkipped.delete(ActiveStep);
      }
      if (ActiveStep === Steps.length - 1) {
      }

      return {
        ...state,
        ImportModule: action.payload.ImportModule,
        ActiveStep: action.payload.ActiveStep,
        Skipped: newSkipped,
      };
    case IMPORT_WORKFLOW_BACK:
      return {
        ...state,
        ImportModule: action.payload.ImportModule,
        ActiveStep: action.payload.ActiveStep,
      };
    case IMPORT_WORKFLOW_SKIP:
      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const newSkippedSet = new Set(state.Skipped.values());
      newSkippedSet.add(ActiveStep);

      return {
        ...state,
        ImportModule: action.payload.ImportModule,
        ActiveStep: action.payload.ActiveStep,
        Skipped: newSkippedSet,
      };
    case IMPORT_WORKFLOW_SAVE:
      return { ...state };
    default:
      return state;
  }
};
