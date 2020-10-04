import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import Dialogs from "../../../../Application/Components/Dialogs/Dialogs";
import {
  hideDialogAction,
  showDialogAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { workflowNextAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import {
  importFileInitAction,
  persistFileAction,
  persistWorksheetAction,
  persistWorksheetNamesAction,
} from "../../../Redux/Actions/ImportActions";
import { useSnackbar } from "notistack";

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

const UploadFile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dnDDisabled = useSelector((state) => state.importReducer.dnDDisabled);
  const { enqueueSnackbar } = useSnackbar();

  const workSheetNames = useSelector(
    (state) => state.importReducer.workSheetNames
  );

  const selectedWorksheetName = useSelector(
    (state) => state.importReducer.selectedWorksheetName
  );

  const workflowData = useSelector((state) => state.workflowReducer);
  const { skipped, isStepSkipped, activeStep, steps } = workflowData;
  const [selectedListItem, setSelectedListItem] = useState("");

  const [inputDeckWorkbook, setInputDeckWorkbook] = useState([]);

  const SelectWorksheetDialogContent = (
    <div className={classes.listDialogContent}>
      <Typography variant="h6">
        Workbook contains more than one worksheet. Please select the worksheet
        that contains the Facilities Deck
      </Typography>
      <List className={classes.listBorder}>
        {workSheetNames &&
          workSheetNames.map((name, i) => (
            <ListItem
              key={i}
              selected={name === selectedListItem}
              button
              onClick={() => {
                setSelectedListItem(name);
                dispatch(persistWorksheetAction(name, []));
              }}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <DescriptionOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{name}</ListItemText>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const prepareSelectWorksheetRoute = (selectedWorksheetName) => {
    const selectedWorksheetDataXLSX =
      inputDeckWorkbook.Sheets[selectedWorksheetName];
    const selectedWorksheetData = xlsx.utils.sheet_to_json(
      selectedWorksheetDataXLSX
    );

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
    }

    dispatch(
      persistWorksheetAction(selectedWorksheetName, selectedWorksheetData)
    );
    dispatch(workflowNextAction(skipped, isStepSkipped, activeStep, steps));
  };

  const SelectWorksheetDialogActions = (selectedWorksheetName) => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
      {
        title: "Okay",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => {
          if (selectedListItem === "")
            enqueueSnackbar("Select a worksheet", {
              persist: false,
              variant: "error",
            });
          else prepareSelectWorksheetRoute(selectedWorksheetName);
        },
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
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
      <Dialogs
        content={SelectWorksheetDialogContent}
        actions={() => SelectWorksheetDialogActions(selectedWorksheetName)}
      />
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
            const inputWorkbook = xlsx.read(fileData, { type: "array" });
            setInputDeckWorkbook(inputWorkbook);
            dispatch(persistFileAction(inputWorkbook));

            const {
              Author: fileAuthor,
              CreatedDate: fileCreated,
            } = inputWorkbook.Props;

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
                true,
                "Uploading file..."
              )
            );

            const workSheetNames = inputWorkbook.SheetNames;
            dispatch(persistWorksheetNamesAction(workSheetNames));

            if (workSheetNames.length > 1) {
              const dialogParameters = {
                dialogType: "listDialog",
                dialogProps: {
                  name: "Excel_Worksheet_Selection_Dialog",
                  title: "Excel Worksheet Selection",
                  show: true,
                  exclusive: true,
                  maxwidth: "sm",
                  iconClass: "select",
                },
              };

              dispatch(showDialogAction(dialogParameters));
            } else {
              const selectedWorksheetName = workSheetNames && workSheetNames[0];
              const selectedWorksheetDataXLSX =
                inputWorkbook.Sheets[selectedWorksheetName];
              const selectedWorksheetData = xlsx.utils.sheet_to_json(
                selectedWorksheetDataXLSX
              );

              dispatch(
                persistWorksheetAction(
                  selectedWorksheetName,
                  selectedWorksheetData
                )
              );
              dispatch(
                workflowNextAction(skipped, isStepSkipped, activeStep, steps)
              );
            }
          };
          reader.onprogress = (e) => {
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
                className={classes.selectFile}
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

export default UploadFile;
