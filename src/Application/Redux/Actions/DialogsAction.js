import { checkPropTypes } from "prop-types";

export const PERSIST_STORE = "PERSIST_STORE";
export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";
export const HIDE_OTHERDIALOGS = "HIDE_OTHERDIALOGS";

export const persistToStoreAction = (name, value) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const showDialogAction = (args, exclusive) => {
  return {
    type: SHOW_DIALOG,
    payload: {
      dialogData: {
        ...args,
      },
    },
    meta: { exclusive },
  };
};

export const hideDialogAction = (name) => {
  return {
    type: HIDE_DIALOG,
    payload: {
      dialogData: {
        name,
        show: false,
      },
    },
  };
};

export const hideOtherDialogsAction = (name) => {
  return {
    type: HIDE_OTHERDIALOGS,
    payload: {
      name,
      show: false,
    },
  };
};
