import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import React from "react";
import { useDispatch } from "react-redux";
import { IFinalAction } from "../../Layout/LayoutTypes";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogGenerateNetworkButton = (
  shouldExecute: IFinalAction["shouldExecute"],
  shouldDispatch: IFinalAction["shouldDispatch"],
  finalActions: IFinalAction["finalActions"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Generate",
      variant: "outlined",
      color: "primary",
      startIcon: <AccountTreeIcon />,
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

export default DialogGenerateNetworkButton;
