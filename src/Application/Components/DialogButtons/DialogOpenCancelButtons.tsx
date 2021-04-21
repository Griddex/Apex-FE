import { Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";
import OpenInBrowserOutlinedIcon from "@material-ui/icons/OpenInBrowserOutlined";

const DialogOpenCancelButtons = (
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
      startIcon: <ClearOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Open",
      variant: "contained",
      color: "primary",
      startIcon: <OpenInBrowserOutlinedIcon />,
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

export default DialogOpenCancelButtons;
