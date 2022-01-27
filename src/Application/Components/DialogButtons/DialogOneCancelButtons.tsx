import { Button } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
  unloadDialogsByNumberAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";
import HourglassFullOutlinedIcon from "@mui/icons-material/HourglassFullOutlined";
import ViewDayTwoToneIcon from "@mui/icons-material/ViewDayTwoTone";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";

const DialogOneCancelButtons = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"],
  oneButtonTitle: string,
  oneButtonIconTitle: string,
  isFinalButtonDisabled?: boolean,
  dialogPresence?: "All" | "Some" | "Current" | "None",
  noOfDialogs?: number
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
    finalize: <DoneAllOutlinedIcon />,
    filter: <FilterListIcon />,
  };

  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <ClearOutlinedIcon />,
      handleAction: () => {
        finalActions[0]();
        dispatch(hideDialogAction());
      },
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
            case "Some":
              dispatch(unloadDialogsByNumberAction(noOfDialogs as number));
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
