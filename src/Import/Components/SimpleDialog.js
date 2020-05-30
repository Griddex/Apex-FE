import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { simpleDialogOpenAction } from "../../Application/Redux/Actions/UILayoutActions";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { ImportSetWorksheetNameAction } from "../Redux/Actions/ImportAction";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: green[100],
    color: green[600],
  },
});

export default function SimpleDialog(props) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.UILayoutReducer.simpleDialogOpen);
  const moduleText = useSelector((state) => state.ImportReducer.ImportModule);
  const perspectiveText = useSelector(
    (state) => state.ImportReducer.ContextImportPerspective
  );
  const activeStep = useSelector((state) => state.ImportReducer.ActiveStep);
  const classes = useStyles();
  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { sheetNames, handleNextAction } = props;

  const handleClose = () => {
    dispatch(simpleDialogOpenAction(false));
  };

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
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
            {sheetNames.map((sheet, i) => (
              <ListItem
                key={i}
                button
                onClick={() => {
                  dispatch(ImportSetWorksheetNameAction(sheet));
                  handleClose();
                  dispatch(
                    handleNextAction(moduleText, perspectiveText, activeStep)
                  );
                }}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{sheet}</ListItemText>
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
