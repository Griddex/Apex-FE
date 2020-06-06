import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import DragAndDrop from "../../../Images/DragAndDrop.svg";
import FileIconService from "../../../Services/FileIconService";
import { ImportFileSaveAction } from "./../../../Redux/Actions/ImportAction";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import * as xlsx from "xlsx";
import { simpleDialogOpenAction } from "../../../../Application/Redux/Actions/UILayoutActions";
import SimpleDialog from "./../../../Components/SimpleDialog";
import { stepperNextAction } from "../../../Redux/Actions/SetStepperActions";
import {
  ImportSetWorksheetNameAction,
  ImportSetWorksheetDataAction,
} from "../../../Redux/Actions/ImportAction";
import ImportExcel_2_ParseTable from "./ImportExcel_2_ParseTable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "95%",
    "& > *": { margin: theme.spacing(2) },
  },
  menuIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "30px",
    backgroundColor: "#EEE",
    "& > *": {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  paper1: {
    display: "flex",
    flexDirection: "column",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { display: "flex", alignItems: "center", justifyContent: "center" },
  dropZone: {
    borderStyle: "dotted",
    borderWidth: 0,
    height: "99%",
    width: "99%",
  },
  dropZoneDiv: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneInput: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneParagraph: {
    height: "100%",
    width: "60%",
    textAlign: "center",
  },
  dropZoneImgPDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper2: {
    display: "flex",
    height: "15%",
    padding: 0,
    "& > *": { margin: theme.spacing(2) },
  },
  grid: {
    margin: 8,
  },
  gridItem: {
    display: "flex",
    padding: "0px",
    "& > *": { alignSelf: "center" },
  },
  image: {
    alignSelf: "center",
    height: "36px",
    width: "36px",
  },
  fileAccepted: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ImportExcel_1_DnD = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [LastModified, setLastModified] = useState("");
  let [FilePath, setFilePath] = useState("");
  let [FileType, setFileType] = useState("");
  let [FileName, setFileName] = useState("");
  let [FileSize, setFileSize] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFileAccepted, setIsFileAccepted] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);
  const ExtrudeParseTable = useSelector(
    (state) => state.ImportReducer.ExtrudeParseTable
  );
  const simpleDialogOpen = useSelector(
    (state) => state.UILayoutReducer.simpleDialogOpen
  );

  const sizeProps = useSpring({
    fileSize: parseFloat((parseFloat(FileSize) / 1024).toFixed()),
    from: { fileSize: 0 },
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper1}>
        <div className={classes.menuIcons}>
          <PublishIcon />
          <DeleteOutlineIcon
            onClick={() => {
              setIsDisabled(false);
              setIsFileAccepted(false);
              setLastModified(null);
              setFilePath(null);
              setFileType(null);
              setFileName(null);
              setFileSize(null);
            }}
          />
        </div>
        <Dropzone
          accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onDrop={(AcceptedFile) => {
            const {
              lastModifiedDate,
              name,
              path,
              type,
              size,
            } = AcceptedFile[0];

            setLastModified(lastModifiedDate);
            setFilePath(path);
            setFileType(type);
            setFileName(name);
            setFileSize(size);
          }}
          onDropAccepted={(AcceptedFile) => {
            setIsFileAccepted(true);
            setIsDisabled(true);

            const file = AcceptedFile[0];
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
              const data = new Uint8Array(reader.result);
              const InputDeckWorkbook = xlsx.read(data, { type: "array" });
              dispatch(ImportFileSaveAction(InputDeckWorkbook));

              const sheetsNamesArray = InputDeckWorkbook.SheetNames;
              setSheetNames(sheetsNamesArray);
              if (sheetsNamesArray.length > 1) {
                dispatch(simpleDialogOpenAction(true));
              } else {
                const sheetName = sheetsNamesArray[0];
                dispatch(ImportSetWorksheetNameAction(sheetName));
                const selectedSheetData = InputDeckWorkbook.Sheets[sheetName];
                dispatch(ImportSetWorksheetDataAction(selectedSheetData));
              }
            };
            reader.onprogress = (e) => {
              // console.log("Logged output -->: ImportExcel_1_DnD -> e", e);
            };
            reader.readAsArrayBuffer(file);
          }}
          disabled={isDisabled}
          minSize={0}
          maxSize={10485760}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragReject }) => {
            return (
              <>
                {isFileAccepted ? (
                  <div className={classes.fileAccepted}>
                    <img
                      src={FileIconService(FileType)}
                      height={100}
                      width={100}
                    />
                    <Typography>{FileName}</Typography>
                  </div>
                ) : (
                  <section className={classes.dropZone}>
                    <div>
                      {isDragReject && (
                        <Typography>File type not accepted</Typography>
                      )}
                    </div>
                    <div {...getRootProps()} className={classes.dropZoneDiv}>
                      <input
                        {...getInputProps()}
                        className={classes.dropZoneInput}
                      />
                      <div className={classes.dropZoneImgPDiv}>
                        <img src={DragAndDrop} height={250} width={250} />
                        <p className={classes.dropZoneParagraph}>
                          Drop Forecast Deck file here or Click to Select file
                          [formats: ".xls", ".csv" or ".txt"]
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </>
            );
          }}
        </Dropzone>
      </Paper>
      {simpleDialogOpen && (
        <SimpleDialog
          sheetNames={sheetNames}
          stepperNextAction={stepperNextAction}
        />
      )}
      {ExtrudeParseTable && <ImportExcel_2_ParseTable />}
      <Paper className={classes.paper2}>
        <Grid className={classes.grid} container spacing={2}>
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs={1}
            className={classes.gridItem}
          >
            <Typography variant="overline" align="center">
              Type
            </Typography>
            <img className={classes.image} src={FileIconService(FileType)} />
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs
            className={classes.gridItem}
          >
            <Typography variant="overline" align="center">
              Name
            </Typography>
            <Typography variant="caption">{FileName}</Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs={1}
            className={classes.gridItem}
          >
            <Typography variant="overline" align="center">
              Size
            </Typography>
            <Typography variant="caption">
              <animated.span>
                {sizeProps.fileSize.interpolate((x) => x.toFixed(0))}
              </animated.span>
              {" KB"}
            </Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs
            className={classes.gridItem}
          >
            <Typography variant="overline" align="center">
              Last Modified
            </Typography>
            <Typography variant="caption">
              {LastModified ? LastModified.toString() : null}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

ImportExcel_1_DnD.propTypes = {};

export default ImportExcel_1_DnD;
