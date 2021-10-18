import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import ApexEditor, { IApexEditor } from "../Editors/ApexEditor";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
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
    width: "5%",
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
  table: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
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

const TableEditorDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    isCustomComponent,
    apexEditorProps,
    apexEditorComponent,
    workflowProcess,
    reducer,
  } = props;

  const apexEditorPropsDefined = apexEditorProps as NonNullable<IApexEditor>;

  const { editedRow } = apexEditorPropsDefined;
  const [formEditorRow, setFormEditorRow] = React.useState(editedRow);

  const titleDesc = {
    title: formEditorRow["title"],
    description: formEditorRow["description"],
  } as Record<string, string>;

  const ApexEditorComponent = apexEditorComponent as NonNullable<
    DialogStuff["apexEditorComponent"]
  >;

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
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        {(isCustomComponent as boolean) ? (
          <ApexEditorComponent
            formEditorRow={formEditorRow}
            setFormEditorRow={setFormEditorRow}
          />
        ) : (
          <ApexEditor
            {...apexEditorPropsDefined}
            formEditorRow={formEditorRow}
            setFormEditorRow={setFormEditorRow}
          />
        )}
      </DialogContent>
      <DialogActions>{actionsList && actionsList(titleDesc)}</DialogActions>
    </Dialog>
  );
};

export default TableEditorDialog;
