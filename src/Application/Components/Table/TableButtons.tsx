import makeStyles from "@mui/styles/makeStyles";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import { useScreenshot } from "use-react-screenshot";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../Dialogs/DialogTypes";
import IconButtonWithTooltip from "../IconButtons/IconButtonWithTooltip";
import { ITableButtonsProps } from "./TableButtonsTypes";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const useStyles = makeStyles(() => ({
  tableContentIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
    "& > *": {
      marginLeft: 5,
    },
  },
}));

const TableButtons: React.FC<ITableButtonsProps> = ({
  showExtraButtons,
  extraButtons,
  componentRef,
  rows,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [snapshot, takeSnapshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const getSnapshot = () => takeSnapshot(componentRef && componentRef.current);

  const displaySnapshot = () => {
    const dialogParameters: DialogStuff = {
      name: "Snapshot_Dialog",
      title: "Snapshot",
      type: "snapshotDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "table",
      snapshot,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, () => {}],
          "Download",
          "download",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <div className={classes.tableContentIcons}>
      {showExtraButtons && extraButtons && extraButtons()}
      {/* <IconButtonWithTooltip
        toolTipKey="copyToolTip"
        toolTipTitle="Copy"
        toolTipPlacement="bottom-end"
        icon={() => <ContentCopyOutlinedIcon />}
        icon={() => (
          <CopyToClipboard 
            text={() => <ContentCopyOutlinedIcon />}
            content={() => componentRef && componentRef.current}
          >

          </CopyToClipboard>
        )}
        action={() => {
          getSnapshot();
          displaySnapshot();
        }}
      /> */}
      <IconButtonWithTooltip
        toolTipKey="printToolTip"
        toolTipTitle="Print"
        toolTipPlacement="bottom-end"
        icon={() => (
          <ReactToPrint
            trigger={() => <PrintOutlinedIcon />}
            content={() => componentRef && componentRef.current}
          />
        )}
      />
      <IconButtonWithTooltip
        toolTipKey="snapshotToolTip"
        toolTipTitle="Snapshot"
        toolTipPlacement="bottom-end"
        icon={() => <CameraOutlinedIcon />}
        action={() => {
          getSnapshot();
          displaySnapshot();
        }}
      />
    </div>
  );
};

export default TableButtons;
