import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import {
  importFileInitAction,
  persistFileAction,
  persistWorksheetNamesAction,
  persistWorksheetAction,
  persistSelectedWorksheetAction,
  persistWorksheetForTableAction,
} from "../../../Redux/Actions/ImportActions";
import {
  showDialogAction,
  hideDialogAction,
} from "./../../../../Application/Redux/Actions/DialogsAction";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { workflowNextAction } from "./../../../../Application/Redux/Actions/WorkflowActions";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #707070",
    backgroundColor: "#FFF",
  },
  workflowButton: { width: 200, height: 50 },
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
}));

const ImportExcelDnD = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dnDDisabled = useSelector((state) => state.importReducer.dnDDisabled);
  const selectedWorksheetData = useSelector(
    (state) => state.importReducer.selectedWorksheetData
  );
  const workSheetNames = useSelector(
    (state) => state.importReducer.workSheetNames
  );
  const workflowData = useSelector((state) => state.workflowReducer);
  const { skipped, isStepSkipped, activeStep, steps } = workflowData;
  const [selected, setListItemSelected] = useState("");

  const SelectWorksheetDialogContent = () => {
    return (
      <>
        <Typography variant="h6">
          Workbook contains more than one worksheet. Please select the worksheet
          that contains the Facilities Deck
        </Typography>
        <List>
          {workSheetNames &&
            workSheetNames.map((worksheetNames, i) => (
              <ListItem
                key={i}
                selected={worksheetNames === selected}
                button
                onClick={() => {
                  setListItemSelected(worksheetNames);
                }}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <DescriptionOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{worksheetNames}</ListItemText>
              </ListItem>
            ))}
        </List>
      </>
    );
  };

  const prepareSelectWorksheetRoute = () => {
    let maxLength = 0;
    let finalMaxLength = 0;
    let index = 0;
    let finalIndex = 0;
    for (const obj of selectedWorksheetData) {
      maxLength = Object.keys(obj).length;
      if (maxLength > finalMaxLength) {
        finalMaxLength = maxLength;
        finalIndex = index;
      }
      index += 1;
    }

    const firstDataRow = Object.keys(selectedWorksheetData[finalIndex]);
    const finalArray = [];
    for (const obj of selectedWorksheetData) {
      const dataRowObj = {};
      for (const el of firstDataRow) {
        if (obj.hasOwnProperty(el) && el in obj) dataRowObj[el] = obj[el];
        else dataRowObj[el] = "";
      }
      finalArray.push(dataRowObj);
    }

    const firstRowObject = {};
    for (const el of firstDataRow) {
      firstRowObject[el] = el;
    }

    const finalDataArray = [firstRowObject, ...finalArray];

    dispatch(persistWorksheetForTableAction(finalDataArray));
    dispatch(workflowNextAction(skipped, isStepSkipped, activeStep, steps));
    dispatch(hideDialogAction("Excel_Worksheet_Selection_Dialog"));
  };

  const SelectWorksheetDialogActions = () => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () =>
          dispatch(hideDialogAction("Excel_Worksheet_Selection_Dialog")),
      },
      {
        title: "Okay",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => prepareSelectWorksheetRoute(),
      },
    ];

    return buttonsData.map((button) => (
      <Button
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <Dropzone
        accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onDropAccepted={(acceptedFile) => {
          const file = acceptedFile[0];
          const {
            lastModifiedDate: fileLastModified,
            name: fileName,
            path: filePath,
            type: fileType,
            size: fileSize,
          } = file;

          const reader = new FileReader();
          reader.readAsArrayBuffer(file);

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            const fileData = new Uint8Array(reader.result);
            const inputDeckWorkbook = xlsx.read(fileData, { type: "array" });

            //dispatch(persistFileAction(inputDeckWorkbook)); //why persist entire file?
            const {
              Author: fileAuthor,
              CreatedDate: fileCreated,
            } = inputDeckWorkbook.Props;

            dispatch(
              importFileInitAction(
                fileLastModified,
                filePath,
                fileType,
                fileName,
                fileSize,
                fileAuthor,
                fileCreated,
                true,
                true
              )
            );

            const workSheetNames = inputDeckWorkbook.SheetNames;
            dispatch(persistWorksheetNamesAction(workSheetNames));

            if (workSheetNames.length > 1) {
              const dialogParameters = {
                name: "Excel_Worksheet_Selection_Dialog",
                show: true,
                maxwidth: "sm",
                icon: <LibraryBooksOutlinedIcon />,
                title: "Excel Worksheet Selection",
                content: () => SelectWorksheetDialogContent(),
                actions: () => SelectWorksheetDialogActions(),
                handleHide: hideDialogAction,
              };

              dispatch(showDialogAction(dialogParameters, false));
            } else {
              const workSheetName = workSheetNames && workSheetNames[0];
              const selectedWorksheetDataInitialState =
                inputDeckWorkbook.Sheets[workSheetName];
              const selectedWorksheetData = xlsx.utils.sheet_to_json(
                selectedWorksheetDataInitialState
              );

              dispatch(persistSelectedWorksheetAction(workSheetName));
              dispatch(
                persistWorksheetAction(workSheetName, selectedWorksheetData)
              );
              dispatch(
                workflowNextAction(skipped, isStepSkipped, activeStep, steps)
              );
            }
          };
          reader.onprogress = (e) => {
            // console.log("Logged output -->: ImportExcelDnD -> e", e);
          };
        }}
        disabled={dnDDisabled}
        minSize={0}
        maxSize={10485760}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => {
          //if file is not accepted etc, dispatch dialog
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
                className={classes.workflowButton}
                color="primary"
                variant="contained"
                {...getRootProps()}
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

export default ImportExcelDnD;
