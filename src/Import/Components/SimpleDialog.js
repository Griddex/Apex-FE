import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { simpleDialogOpenAction } from "../../Application/Redux/Actions/UILayoutActions";
import {
  ImportSetWorksheetDataAction,
  ImportSetWorksheetNameAction,
} from "../Redux/Actions/ImportAction";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: green[100],
    color: green[600],
  },
});

export default function SimpleDialog({ sheetNames, stepperNextAction }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.UILayoutReducer.simpleDialogOpen);
  const InputDeckWorkbook = useSelector(
    (state) => state.ImportReducer.AcceptedFile
  );
  const moduleText = useSelector((state) => state.ImportReducer.ImportModule);
  const perspectiveText = useSelector(
    (state) => state.ImportReducer.ContextImportPerspective
  );
  const activeStep = useSelector((state) => state.ImportReducer.ActiveStep);
  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    dispatch(simpleDialogOpenAction(false));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Workbook contains more than one worksheet. Please select the
            worksheet that contains the Facilities Deck
          </DialogContentText>
          <List>
            {sheetNames.map((sheetName, i) => (
              <ListItem
                key={i}
                button
                onClick={() => {
                  dispatch(ImportSetWorksheetNameAction(sheetName));

                  const selectedSheetData = InputDeckWorkbook.Sheets[sheetName];
                  const selectedSheetDataArray = xlsx.utils.sheet_to_json(
                    selectedSheetData
                  );

                  let maxLength = 0;
                  let finalMaxLength = 0;
                  let index = 0;
                  let finalIndex = 0;
                  for (const obj of selectedSheetDataArray) {
                    maxLength = Object.keys(obj).length;
                    if (maxLength > finalMaxLength) {
                      finalMaxLength = maxLength;
                      finalIndex = index;
                    }
                    index += 1;
                  }

                  const firstDataRowArray = Object.keys(
                    selectedSheetDataArray[finalIndex]
                  );
                  const finalArray = [];
                  for (const obj of selectedSheetDataArray) {
                    const dataRowObj = {};
                    for (const el of firstDataRowArray) {
                      if (obj.hasOwnProperty(el) && el in obj)
                        dataRowObj[el] = obj[el];
                      else dataRowObj[el] = "";
                    }
                    finalArray.push(dataRowObj);
                  }

                  const firstRowObject = {};
                  for (const el of firstDataRowArray) {
                    firstRowObject[el] = el;
                  }

                  const finalDataArray = [firstRowObject, ...finalArray];

                  dispatch(ImportSetWorksheetDataAction(finalDataArray));
                  dispatch(
                    stepperNextAction(moduleText, perspectiveText, activeStep)
                  );
                  handleClose();
                }}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{sheetName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
