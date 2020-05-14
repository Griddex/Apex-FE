export const IMPORT_CONTEXTDRAWER_SET = "IMPORT_CONTEXTDRAWER_SET";

export const SetContextDrawerContentAction = () => {
  return {
    type: IMPORT_CONTEXTDRAWER_SET,
    payload: { contextDrawerContentTrigger: "importexcel" },
  };
};
