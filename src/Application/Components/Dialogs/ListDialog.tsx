import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { DialogStuff } from "./DialogTypes";
import InfoIcon from "@material-ui/icons/Info";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/ImportActions";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

const icons = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#31BFCC" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#31BFCC" }} />,
  information: <InfoIcon style={{ color: "#31BFCC" }} />,
};

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
    // backgroundColor: (props) => props.iconColor,
    // color: (props: DialogStuff) => {
    //   return props.iconColor;
    // },
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
  },
  closeButton: {
    // position: "absolute",
    // right: theme.spacing(1),
    // top: theme.spacing(1),
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
    backgroundColor: theme.palette.primary.main,
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

const ListDialog: React.FC<DialogStuff> = (props: DialogStuff) => {
  const {
    title,
    show,
    maxWidth,
    iconType,
    contentText,
    contentList,
    actionsList,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedListItem, setSelectedListItem] = React.useState<ReactNode>("");

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
        {/* {content && content} */}
        <Typography variant="h6">{contentText && contentText}</Typography>
        <List className={classes.listBorder}>
          {contentList &&
            contentList.map(
              (name: ReactNode, i: string | number | null | undefined) => (
                <ListItem
                  key={i}
                  selected={name === selectedListItem}
                  button
                  onClick={() => {
                    setSelectedListItem(name);
                    dispatch(persistWorksheetAction(name, []));
                  }}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              )
            )}
        </List>
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList}</DialogActions>
    </Dialog>
  );
};
export default ListDialog;
