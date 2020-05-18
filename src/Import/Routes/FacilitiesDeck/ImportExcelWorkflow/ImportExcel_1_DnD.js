import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, { useState, Fragment } from "react";
import Dropzone from "react-dropzone";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PublishIcon from "@material-ui/icons/Publish";
import DragAndDrop from "../../../Images/DragAndDrop.svg";
import MSExcel from "../../../Images/MSExcel.svg";
import FileIconService from "../../../Services/FileIconService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    height: "90%",
    "& > *": { margin: theme.spacing(2) },
  },
  menuIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    height: "24px",
  },
  paper1: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 5,
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
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneParagraph: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  paper2: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(1),
    "& > *": { margin: theme.spacing(2) },
  },
}));

const ImportExcel_1_DnD = (props) => {
  const classes = useStyles();
  let [LastModifiedDate, setLastModifiedDate] = useState(null);
  let [FilePath, setFilePath] = useState(null);
  let [FileType, setFileType] = useState(null);
  let [FileName, setFileName] = useState(null);
  let [FileSize, setFileSize] = useState(null);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper1}>
        <div className={classes.menuIcons}>
          <DeleteOutlineIcon />
          <PublishIcon />
        </div>
        <Dropzone
          onDrop={(acceptedFiles) => {
            const {
              lastModifiedDate,
              name,
              path,
              type,
              size,
            } = acceptedFiles[0];
            setLastModifiedDate(lastModifiedDate);
            setFilePath(path);
            setFileType(type);
            setFileName(name);
            setFileSize(size);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className={classes.dropZone}>
              <div {...getRootProps()} className={classes.dropZoneDiv}>
                <input {...getInputProps()} className={classes.dropZoneInput} />
                <div>
                  <img src={DragAndDrop} height={250} width={250} />
                  <p className={classes.dropZoneParagraph}>
                    Drop Forecast Deck file here or Click to Select file
                    [formats: ".xls", ".csv" or ".txt"]
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </Paper>
      <Paper className={classes.paper2}>
        <div>
          <h6>File Type</h6>
          <img src={FileIconService(FileType)} height={24} width={24} />
        </div>
        <div>
          <h6>File Name</h6>
          <div>{FileName}</div>
        </div>
        <div>
          <h6>File Size</h6>
          <div>{FileSize}</div>
        </div>
        <div>
          <h6>File Last Modified Date</h6>
          <div>{LastModifiedDate ? LastModifiedDate.toString() : null}</div>
        </div>
      </Paper>
    </div>
  );
};

ImportExcel_1_DnD.propTypes = {};

export default ImportExcel_1_DnD;
