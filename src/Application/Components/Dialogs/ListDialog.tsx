import {
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/InputActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../Workflows/WorkflowTypes";
import { DialogStuff } from "./DialogTypes";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";

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
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

const ListDialog: React.FC<DialogStuff> = (props) => {
  const {
    title,
    show,
    maxWidth,
    iconType,
    contentText,
    contentList,
    actionsList,
    dialogContentStyle,
    workflowProcess,
    reducer,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedListItem, setSelectedListItem] = React.useState<ReactNode>("");
  const reducerDefined = reducer as NonNullable<ReducersType>;

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
      <DialogContent dividers style={dialogContentStyle}>
        <Typography variant="body1" style={{ marginTop: 10, marginBottom: 10 }}>
          {contentText && contentText}
        </Typography>
        <List className={classes.listBorder}>
          {contentList &&
            contentList.map((name: string, i: number) => (
              <ListItem
                key={i}
                selected={name === selectedListItem}
                button
                onClick={() => {
                  setSelectedListItem(name);
                  dispatch(
                    persistWorksheetAction(
                      reducerDefined,
                      name,
                      [],
                      workflowProcess as TAllWorkflowProcesses
                    )
                  );
                }}
              >
                <ListItemAvatar>
                  <DescriptionOutlinedIcon color="primary" />
                </ListItemAvatar>
                <ListItemText>{name}</ListItemText>
              </ListItem>
            ))}
        </List>
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList}</DialogActions>
    </Dialog>
  );
};
export default ListDialog;
