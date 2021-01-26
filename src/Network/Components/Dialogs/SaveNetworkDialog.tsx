import { DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import React from "react";
import { useDispatch } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import dialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import SaveNetworkNameAndDescription from "../../Routes/SaveNetworkNameAndDescription";
import SaveNetworkDialogButtons from "../DialogBottons/SaveNetworkDialogButtons";
import SaveNetworkForm from "../Forms/SaveNetworkForm";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    width: "5%",
    height: "100%",
    padding: 0,
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    color: theme.palette.primary.main,
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {dialogIcons[iconType ? iconType : "select"]}
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={onClose}
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

const SaveNetworkDialog = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType } = props;
  const [isSaveNetworkValid, setIsSaveNetworkValid] = React.useState(true);
  console.log(
    "Logged output --> ~ file: SaveNetworkDialog.tsx ~ line 120 ~ SaveNetworkDialog ~ isSaveNetworkValid",
    isSaveNetworkValid
  );

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column" }}
      >
        <SaveNetworkForm>
          {(props) => (
            <SaveNetworkNameAndDescription
              {...props}
              setIsSaveNetworkValid={setIsSaveNetworkValid}
            />
          )}
        </SaveNetworkForm>
      </DialogContent>
      <DialogActions>
        <SaveNetworkDialogButtons isSaveNetworkValid={isSaveNetworkValid} />
      </DialogActions>
    </Dialog>
  );
};

export default SaveNetworkDialog;
