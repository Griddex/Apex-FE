import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { DialogStuff } from "./DialogTypes";

const useDialogTitleStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
    cursor: "all-scroll",
    width: "100%",
  },
  dialogHeader: {
    display: "flex",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    height: "100%",
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  draggablePanel: {
    cursor: "all-scroll",
  },
}));

const DraggableDialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useDialogTitleStyles(props);
  const dispatch = useDispatch();
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.titleContainer} {...other}>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>{children}</div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={() => {
              dispatch(hideSpinnerAction());
              onClose();
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

const DraggableDialog: React.FC<DialogStuff> = ({
  title,
  iconType,
  actionsList,
  onClose,
  children,
}) => {
  const theme = useTheme();

  return (
    <ApexFlexContainer
      aria-labelledby="customized-dialog-title"
      flexDirection="column"
      moreStyles={{
        padding: 0,
        backgroundColor: "white",
        boxShadow: theme.shadows[8],
        width: "auto",
      }}
    >
      <DraggableDialogTitle onClose={onClose} iconType={iconType}>
        <Typography variant="h6">{title}</Typography>
      </DraggableDialogTitle>
      <DialogContent dividers>
        {children}
        <Divider />
      </DialogContent>
      <DialogActions style={{ width: "100%" }}>
        {actionsList && actionsList()}
      </DialogActions>
    </ApexFlexContainer>
  );
};
export default DraggableDialog;
