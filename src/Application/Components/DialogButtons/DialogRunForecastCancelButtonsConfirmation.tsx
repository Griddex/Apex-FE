import { Button } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { runForecastRequestAction } from "../../../Network/Redux/Actions/NetworkActions";

const DialogRunForecastCancelButtonsConfirmation = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Run",
      variant: "contained",
      color: "primary",
      startIcon: <PlayArrowIcon />,
      handleAction: () => dispatch(runForecastRequestAction()),
    },
  ];

  return (
    <>
      {buttonsData.map((button, i) => (
        <Button
          key={i}
          variant={button.variant}
          color={button.color}
          onClick={button.handleAction}
          startIcon={button.startIcon}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogRunForecastCancelButtonsConfirmation;
