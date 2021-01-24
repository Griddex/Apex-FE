import { Button, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneTwoToneIcon from "@material-ui/icons/DoneTwoTone";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import WarningIcon from "@material-ui/icons/Warning";
import { useSnackbar } from "notistack";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import MainTitle from "../../Application/Components/Basic/MainTitle";
import {
  ButtonProps,
  DialogStuff,
  IDialogData,
} from "../../Application/Components/Dialogs/DialogTypes";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ITableIconsOptions,
} from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideDialogAction } from "../../Application/Redux/Actions/DialogsAction";

const useStyles = makeStyles((theme: Theme) => ({
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
  economicParameterDialogContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  listBorder: {
    height: 200,
    overflow: "overlay",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    color: theme.palette.primary.main,
  },
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
    height: 30,
  },
}));

const icons = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#31BFCC" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#31BFCC" }} />,
  information: <InfoIcon style={{ color: "#31BFCC" }} />,
};

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {icons[iconType ? iconType : "select"]}
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

const EconomicsParametersDialog: React.FC<DialogStuff> = (
  props: DialogStuff
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { title, show, maxWidth, iconType, dialogData } = props;
  const { columns, rows } = dialogData as IDialogData<IRawRow>;

  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };

  const economicsParametersDialogContent = (
    columns: Column<IRawRow>[],
    rows: IRawRow[]
  ) => {
    return (
      <div className={classes.economicParameterDialogContent}>
        <MainTitle title="Economics Parameters 1" />
        <div style={{ width: "100%", height: "500px" }}>
          <ApexGrid<IRawRow, ITableIconsOptions>
            columns={columns}
            rows={rows}
            options={tableOptions}
          />
        </div>
      </div>
    );
  };

  const economicsParametersDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        startIcon={button.startIcon}
        onClick={button.handleAction}
      >
        {button.title}
      </Button>
    ));
  };

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
      <DialogContent dividers>
        {economicsParametersDialogContent(columns, rows)}
        <Divider />
      </DialogContent>
      <DialogActions>{economicsParametersDialogActions()}</DialogActions>
    </Dialog>
  );
};
export default EconomicsParametersDialog;