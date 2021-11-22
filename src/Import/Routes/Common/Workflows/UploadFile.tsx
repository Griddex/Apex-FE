import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import * as xlsx from "xlsx";
import {
  IOnlyWorkflows,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { workflowNextAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  importFileInitAction,
  persistWorksheetAction,
  persistWorksheetNamesAction,
} from "../../../Redux/Actions/InputActions";
import { DialogStuff } from "./../../../../Application/Components/Dialogs/DialogTypes";
import { showSpinnerAction } from "./../../../../Application/Redux/Actions/UISpinnerActions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #707070",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
    minWidth: theme.breakpoints.values["sm"],
  },
  selectFile: { width: 200, height: 50, fontWeight: "bold" },
  dndSection: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    minWidth: theme.breakpoints.values["sm"],
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
  },
  dndInput: {
    height: "100%",
    width: "100%",
  },
  dndArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #707070",
    backgroundColor: "#F7F7F7",
    borderRadius: 2,
    height: "100%",
    width: "100%",
    "&:hover": { backgroundColor: theme.palette.primary.light },
  },
  imageDnD: {
    width: 95,
    height: 80,
    color: theme.palette.primary.main,
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const UploadFile = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  setInputWorkbook,
  hasExtraComponent,
  extraComponent,
}: IOnlyWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const ExtraComponent = extraComponent as NonNullable<
    IOnlyWorkflows["extraComponent"]
  >;

  const workflowSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp],
    (wrkflwPrcss) => wrkflwPrcss
  );

  const { skipped, isStepSkipped, activeStep, steps } =
    useSelector(workflowSelector);

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <Container className={classes.container} maxWidth="md" disableGutters>
      <Dropzone
        accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onDropAccepted={(acceptedFiles: FileWithPath[]) => {
          dispatch(showSpinnerAction("Uploading file..."));

          const file: FileWithPath = acceptedFiles[0];

          const {
            lastModified: fileLastModified,
            name: fileName,
            path: filePath,
            type: fileType,
            size: fileSize,
          } = file;

          const reader = new FileReader() as FileReader;
          reader.readAsArrayBuffer(file);

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            const fileData = new Uint8Array(reader.result as ArrayBuffer);
            const inputWorkbook = xlsx.read(fileData, {
              type: "array",
              cellDates: true,
              cellNF: false,
              cellText: false,
            }) as xlsx.WorkBook;

            setInputWorkbook && setInputWorkbook(inputWorkbook);

            const { Author: fileAuthor, CreatedDate: fileCreated } =
              inputWorkbook.Props as xlsx.FullProperties;

            dispatch(
              importFileInitAction(
                reducer,
                fileLastModified,
                filePath as string,
                fileType,
                fileName,
                fileSize,
                fileAuthor as string,
                fileCreated as Date,
                true,
                true,
                "Uploading file...",
                wp
              )
            );

            const workSheetNames = inputWorkbook.SheetNames;
            dispatch(persistWorksheetNamesAction(reducer, workSheetNames, wp));

            if (workSheetNames.length > 1) {
              const dialogParameters: DialogStuff = {
                name: "Excel_Worksheet_Selection_Dialog",
                title: "Select Worksheet",
                type: "selectWorksheetDialog",
                show: true,
                exclusive: true,
                maxWidth: "sm",
                iconType: "select",
                inputWorkbook,
                contentList: workSheetNames,
                workflowProcess: wp,
                workflowCategory: wc,
                reducer,
              };
              dispatch(showDialogAction(dialogParameters));
            } else {
              const selectedWorksheetName = workSheetNames && workSheetNames[0];

              const selectedWorksheetDataXLSX =
                inputWorkbook.Sheets[selectedWorksheetName];

              const selectedWorksheetData = xlsx.utils.sheet_to_json<
                Record<string, React.Key>
              >(selectedWorksheetDataXLSX);

              dispatch(
                persistWorksheetAction(
                  reducer,
                  selectedWorksheetName,
                  selectedWorksheetData,
                  wp
                )
              );

              dispatch(
                workflowNextAction(
                  skipped as Set<number>,
                  isStepSkipped as (step: number) => boolean,
                  activeStep,
                  steps,
                  "Loading...",
                  wp as TAllWorkflowProcesses,
                  wc as TAllWorkflowCategories
                )
              );
            }
          };
          reader.onprogress = () => {};
        }}
        minSize={0}
        maxSize={10485760}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => {
          //TODO: if file is not accepted etc, dispatch dialog
          const ref = getRootProps();
          return (
            <section className={classes.dndSection}>
              {hasExtraComponent && hasExtraComponent ? (
                <ExtraComponent
                  height={70}
                  width={"95%"}
                  moreStyles={{
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                  workflowProcess={wp}
                  workflowCategory={wc}
                />
              ) : (
                <div />
              )}
              <div {...getRootProps()} className={classes.dndInput}>
                <input {...getInputProps()} />
                <div className={classes.dndArea}>
                  <CloudUploadIcon className={classes.imageDnD} />
                  <p>Drag and Drop a file here or Browse a file to upload</p>
                </div>
              </div>
            </section>
          );
        }}
      </Dropzone>
    </Container>
  );
};

export default UploadFile;
