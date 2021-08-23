import { Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";
import HourglassFullOutlinedIcon from "@material-ui/icons/HourglassFullOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import OpenInBrowserOutlinedIcon from "@material-ui/icons/OpenInBrowserOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AirplayOutlinedIcon from "@material-ui/icons/AirplayOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";

const DialogOneCancelButtons = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"],
  oneButtonTitle: string,
  oneButtonIconTitle: string,
  isFinalButtonDisabled?: boolean,
  dialogPresence?: "All" | "Current" | "None"
) => {
  const icons: Record<string, JSX.Element> = {
    saveOutlined: <SaveOutlinedIcon />,
    loadOutlined: <HourglassFullOutlinedIcon />,
    doneOutlined: <DoneOutlinedIcon />,
    proceedOutlined: <DoneOutlinedIcon />,
    viewDayTwoTone: <ViewDayTwoToneIcon />,
    reset: <RotateLeftIcon />,
    updateOutlined: <UpdateOutlinedIcon />,
    closeOutlined: <CloseOutlinedIcon />,
    openOutlined: <OpenInBrowserOutlinedIcon />,
    deleteOutlined: <DeleteOutlinedIcon />,
    createOutlined: <AddBoxOutlinedIcon />,
    displayOutlined: <AirplayOutlinedIcon />,
    play: <PlayArrowIcon />,
    closeWithBorder: <CancelPresentationOutlinedIcon />,
    download: <GetAppOutlinedIcon />,
  };

  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <ClearOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: oneButtonTitle,
      variant: "contained",
      color: "primary",
      startIcon: icons[oneButtonIconTitle],
      handleAction: (i?: number) => {
        const iDefined = i as number;
        const sExecute = shouldExecute[iDefined];
        const action = finalActions[iDefined];
        const sDispatch = shouldDispatch[iDefined];
        if (sExecute) {
          if (sDispatch) dispatch(action());
          else action();

          switch (dialogPresence) {
            case "All":
              dispatch(unloadDialogsAction());
              break;
            case "Current":
              dispatch(hideDialogAction());
              break;
            case "None":
            default:
              break;
          }
        }
      },
    },
  ];

  return (
    <>
      {buttonsData.map((button, i) => (
        <Button
          key={i}
          variant={button.variant}
          color={button.color}
          onClick={() =>
            button?.handleAction && button?.handleAction(i as number)
          }
          startIcon={button.startIcon}
          disabled={button.title === oneButtonTitle && isFinalButtonDisabled}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogOneCancelButtons;
