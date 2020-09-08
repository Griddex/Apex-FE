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

export const showDialogAction = (
  name,
  show,
  maxwidth,
  icon,
  title,
  content,
  actions,
  handleHide,
  exclusive
) => {
  return {
    type: SHOW_DIALOG,
    payload: {
      dialogData: {
        name,
        show,
        maxwidth,
        icon,
        title,
        content,
        actions,
        handleHide,
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
