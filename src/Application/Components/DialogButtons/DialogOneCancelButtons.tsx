import { Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";
import HourglassFullOutlinedIcon from "@material-ui/icons/HourglassFullOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

const DialogOneCancelButtons = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"],
  oneButtonName: string,
  oneButtonIconName: string
) => {
  const icons: Record<string, JSX.Element> = {
    saveOutlined: <SaveOutlinedIcon />,
    loadOutlined: <HourglassFullOutlinedIcon />,
    doneOutlined: <DoneOutlinedIcon />,
    proceedOutlined: <DoneOutlinedIcon />,
    viewDayTwoTone: <ViewDayTwoToneIcon />,
    reset: <RotateLeftIcon />,
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
      title: oneButtonName,
      variant: "contained",
      color: "primary",
      startIcon: icons[oneButtonIconName],
      handleAction: () => {
        let i = 0;
        for (const execute of shouldExecute) {
          if (execute) {
            const action = finalActions[i];
            if (shouldDispatch[i]) dispatch(action());
            else action();
          }
          i += 1;
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
          onClick={button.handleAction}
          startIcon={button.startIcon}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogOneCancelButtons;
