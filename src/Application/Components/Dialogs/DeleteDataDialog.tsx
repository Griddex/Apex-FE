import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Chip, DialogActions, Input } from "@mui/material";
import grey from "@mui/material/colors/grey";
import Dialog from "@mui/material/Dialog";
import { alpha, Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { getApexIconButtonStyle } from "../../Styles/IconButtonStyles";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: "100%",
    fontSize: 14,
    marginTop: 20,
    border: `1px solid ${grey[500]}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    "&:active": {
      outline: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

const DeleteDataDialog: React.FC<DialogStuff> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    title,
    deleteTitle,
    show,
    maxWidth,
    iconType,
    dialogContentStyle,
    actionsList,
  } = props;

  const [deleteTitleConfirm, setDeleteTitleConfirm] = React.useState("");
  const [counter, setCounter] = React.useState(0);

  const isFinalButtonDisabled =
    (deleteTitleConfirm as string).trim().toLowerCase() ===
    (deleteTitle as string).trim().toLowerCase()
      ? false
      : true;

  const iconBtnStyle = getApexIconButtonStyle(theme);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

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
        style={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          ...dialogContentStyle,
        }}
      >
        <ApexFlexContainer flexDirection="column" alignItems="flex-start">
          <Typography variant="body1">
            {`You are about to delete all data associated with:`}
          </Typography>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <strong
              style={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.secondary.main,
                marginRight: 5,
              }}
            >
              {deleteTitle}
            </strong>
            <CopyToClipboard
              text={deleteTitle as string}
              onCopy={() => setCounter(5)}
            >
              <ContentCopyOutlinedIcon style={iconBtnStyle} />
            </CopyToClipboard>
            {counter > 0 && (
              <Chip
                style={{
                  backgroundColor: theme.palette.success.main,
                  marginLeft: 5,
                  color: "white",
                }}
                size="small"
                label={"Copied"}
              />
            )}
          </div>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <Typography variant="body1">
            {`Confirm this action by copying and pasting the title in the
          input box below`}
          </Typography>
          <span>&nbsp;</span>
          <Input
            className={classes.input}
            value={deleteTitleConfirm}
            margin="dense"
            onChange={(event) => {
              const { value } = event.target;
              setDeleteTitleConfirm(value);
            }}
          />
        </ApexFlexContainer>
      </DialogContent>
      <DialogActions>
        {actionsList && actionsList(isFinalButtonDisabled)}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDataDialog;
