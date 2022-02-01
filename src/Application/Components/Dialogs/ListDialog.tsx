import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/InputActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../Workflows/WorkflowTypes";
import { DialogStuff } from "./DialogTypes";

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
