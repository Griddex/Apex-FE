export const PERSIST_STORE = "PERSIST_STORE";
export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";

export const persistToStoreAction = (name, value) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const showDialogAction = (dialog) => {
  return {
    type: SHOW_DIALOG,
    payload: dialog,
    meta: { exclusive: dialog.exclusive },
  };
};

export const hideDialogAction = () => {
  return {
    type: HIDE_DIALOG,
  };
};
