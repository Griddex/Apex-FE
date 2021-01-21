import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { fade, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { workflowNextAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  importFileInitAction,
  persistFileAction,
  persistWorksheetAction,
  persistWorksheetNamesAction,
} from "../../../Redux/Actions/ImportActions";
import { DialogStuff } from "./../../../../Application/Components/Dialogs/DialogTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #707070",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    backgroundColor: "#FFF",
  },
  selectFile: { width: 200, height: 50, fontWeight: "bold" },
  dndSection: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
  },
  dndInput: {
    height: "80%",
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
  },
  imageDnD: {
    width: 95,
    height: 80,
    color: theme.palette.primary.main,
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
}));

const UploadFile = ({ workflowProcess }: { workflowProcess: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dnDDisabled } = useSelector(
    (state: RootState) => state.importReducer["allWorkflows"][workflowProcess]
  );

  const { skipped, isStepSkipped, activeStep, steps } = useSelector(
    (state: RootState) => state.workflowReducer["allWorkflows"][workflowProcess]
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <Dropzone
        accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onDropAccepted={(acceptedFiles: FileWithPath[]) => {
          const file: FileWithPath = acceptedFiles[0];
          const {
            lastModified: fileLastModified,
            name: fileName,
            path: filePath,
            type: fileType,
            size: fileSize,
          } = file;

          const reader: FileReader = new FileReader();
          reader.readAsArrayBuffer(file);

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            const fileData = new Uint8Array(reader.result as ArrayBuffer);
            const inputWorkbook: xlsx.WorkBook = xlsx.read(fileData, {
              type: "array",
            });

            dispatch(persistFileAction(inputWorkbook, workflowProcess));

            const {
              Author: fileAuthor,
              CreatedDate: fileCreated,
            } = inputWorkbook.Props as xlsx.FullProperties;

            dispatch(
              importFileInitAction(
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
                workflowProcess
              )
            );

            const workSheetNames = inputWorkbook.SheetNames;
            dispatch(
              persistWorksheetNamesAction(workSheetNames, workflowProcess)
            );

            if (workSheetNames.length > 1) {
              const dialogParameters: DialogStuff = {
                name: "Excel_Worksheet_Selection_Dialog",
                title: "Excel Worksheet Selection",
                type: "selectWorksheetDialog",
                show: true,
                exclusive: true,
                maxWidth: "sm",
                iconType: "select",
                contentList: workSheetNames,
                workflowProcess: workflowProcess,
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
                  selectedWorksheetName,
                  selectedWorksheetData,
                  workflowProcess
                )
              );
              dispatch(
                workflowNextAction(
                  skipped,
                  isStepSkipped,
                  activeStep,
                  steps,
                  "Loading...",
                  workflowProcess as string
                )
              );
            }
          };
          reader.onprogress = () => {
            // console.log("Logged output -->: UploadFile -> e", e);
          };
        }}
        disabled={dnDDisabled}
        minSize={0}
        maxSize={10485760}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => {
          //TODO: if file is not accepted etc, dispatch dialog
          const ref = getRootProps();
          return (
            <section className={classes.dndSection}>
              <div {...getRootProps()} className={classes.dndInput}>
                <input {...getInputProps()} />
                <div className={classes.dndArea}>
                  <CloudUploadIcon className={classes.imageDnD} />
                  <p>Drag and Drop a file here or Browse a file to upload</p>
                </div>
              </div>
              <Button
                // refKey={ref}
                className={classes.selectFile}
                variant="contained"
                // {...getRootProps()}
              >
                Select File
              </Button>
            </section>
          );
        }}
      </Dropzone>
    </Container>
  );
};

export default UploadFile;
