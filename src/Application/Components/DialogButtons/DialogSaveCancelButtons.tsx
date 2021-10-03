import { Button } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogSaveCancelButtons = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"],
  isFinalButtonDisabled?: boolean,
  dialogPresence?: "All" | "Current" | "None"
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
      title: "Save",
      variant: "contained",
      color: "primary",
      startIcon: <SaveOutlinedIcon />,
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
              return;
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
          disabled={button.title === "Save" && isFinalButtonDisabled}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogSaveCancelButtons;
