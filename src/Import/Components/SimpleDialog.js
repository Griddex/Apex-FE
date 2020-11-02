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
import { simpleDialogOpenAction } from "../../Application/Redux/Actions/LayoutActions";
import {
  persistWorksheetAction,
  persistWorksheetNameAction,
} from "../Redux/Actions/ImportActions";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: green[100],
    color: green[600],
  },
});

export default function SimpleDialog({ workSheetNames, workflowNextAction }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.layoutReducer.simpleDialogOpen);
  const inputDeckWorkbook = useSelector(
    (state) => state.importReducer.acceptedFile
  );
  const moduleName = useSelector((state) => state.importReducer.moduleName);

  const activeStep = useSelector((state) => state.importReducer.activeStep);
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
            {workSheetNames.map((sheetName, i) => (
              <ListItem
                key={i}
                button
                onClick={() => {
                  dispatch(persistWorksheetNameAction(sheetName));

                  const selectedSheetData = inputDeckWorkbook.Sheets[sheetName];
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
                      if (
                        Object.prototype.hasOwnProperty.call(obj, el) &&
                        el in obj
                      )
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

                  dispatch(persistWorksheetAction(finalDataArray));
                  dispatch(workflowNextAction(moduleName, activeStep));
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
