import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useSpring } from "react-spring";
import * as xlsx from "xlsx";
import { simpleDialogOpenAction } from "../../../../Application/Redux/Actions/LayoutActions";
import {
  ImportSetWorksheetDataAction,
  ImportSetWorksheetNameAction,
} from "../../../Redux/Actions/ImportAction";
import { ImportFileSaveAction } from "../../../Redux/Actions/ImportAction";

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
  dndSection: {
    display: "flex",
    flexDirection: "column",
    height: "62%",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
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
    height: "100%",
    width: "100%",
  },
  imageDnD: {
    height: 80,
    width: 95,
    color: theme.palette.primary.main,
  },
}));

const ImportExcelDnD = (props) => {
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
    (state) => state.importReducer.ExtrudeParseTable
  );

  const simpleDialogOpen = useSelector(
    (state) => state.layoutReducer.simpleDialogOpen
  );

  const sizeProps = useSpring({
    fileSize: parseFloat((parseFloat(FileSize) / 1024).toFixed()),
    from: { fileSize: 0 },
  });

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <Dropzone
        accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onDrop={(AcceptedFile) => {
          const { lastModifiedDate, name, path, type, size } = AcceptedFile[0];

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
            // console.log("Logged output -->: ImportExcelDnD -> e", e);
          };
          reader.readAsArrayBuffer(file);
        }}
        disabled={isDisabled}
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
            </section>
          );
        }}
      </Dropzone>
    </Container>
  );
};

export default ImportExcelDnD;
