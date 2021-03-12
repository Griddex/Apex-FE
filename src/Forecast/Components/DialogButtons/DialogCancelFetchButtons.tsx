import { Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import DetailsOutlinedIcon from "@material-ui/icons/DetailsOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import { IFinalAction } from "../../../Application/Layout/LayoutTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const DialogCancelFetchButtons = (
  shouldExecute: IFinalAction["shouldExecute"],
  shouldDispatch: IFinalAction["shouldDispatch"],
  finalActions: IFinalAction["finalActions"]
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
      title: "Fetch",
      variant: "contained",
      color: "primary",
      startIcon: <DetailsOutlinedIcon />,
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

export default DialogCancelFetchButtons;
