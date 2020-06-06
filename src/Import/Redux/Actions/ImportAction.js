export const IMPORT_FILE_SAVE = "IMPORT_FILE_SAVE";
export const IMPORT_EXCEL_LOADING = "IMPORT_EXCEL_LOADING";
export const IMPORT_EXCEL_MATCHING = "IMPORT_EXCEL_MATCHING";
export const IMPORT_EXCELWORKSHEETNAME_SET = "IMPORT_EXCELWORKSHEETNAME_SET";
export const IMPORT_EXCELWORKSHEETDATA_SET = "IMPORT_EXCELWORKSHEETDATA_SET";
export const IMPORT_EXCELWORKSHEETPARSE_NAVIGATE =
  "IMPORT_EXCELWORKSHEETPARSE_NAVIGATE";

export const ImportFileSaveAction = (file) => {
  return {
    type: IMPORT_FILE_SAVE,
    payload: { AcceptedFile: file },
  };
};
export const ImportLoadingAction = () => {
  return {
    type: IMPORT_EXCEL_LOADING,
    payload: { Loading: true },
  };
};
export const ImportMatchingAction = (state) => {
  return {
    type: IMPORT_EXCEL_MATCHING,
    payload: { Matching: state },
  };
};
export const ImportSetWorksheetNameAction = (name) => {
  return {
    type: IMPORT_EXCELWORKSHEETNAME_SET,
    payload: { SelectedWorksheetName: name },
  };
};
export const ImportSetWorksheetDataAction = (data) => {
  return {
    type: IMPORT_EXCELWORKSHEETDATA_SET,
    payload: { SelectedWorksheetData: data },
  };
};
export const ImportParseTableAction = (result) => {
  return {
    type: IMPORT_EXCELWORKSHEETPARSE_NAVIGATE,
    payload: { ExtrudeParseTable: result },
  };
};
