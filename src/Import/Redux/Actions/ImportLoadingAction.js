export const IMPORT_EXCEL_LOADING = "IMPORT_EXCEL_LOADING";

export const ImportLoadingAction = () => {
  return {
    type: IMPORT_EXCEL_LOADING,
    payload: { Loading: true },
  };
};
