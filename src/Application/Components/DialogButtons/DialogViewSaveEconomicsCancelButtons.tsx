import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEconomicsParameterAction } from "../../../Economics/Redux/Actions/EconomicsActions";
import {
  hideDialogAction,
  showDialogAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";

const DialogViewSaveEconomicsCancelButtons = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const extrudeSaveEconomicsRun = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Economics_Dialog",
      title: "Save Economics Results",
      type: "saveEconomicsResultsDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "confirmation",
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Save",
      variant: "contained",
      color: "primary",
      startIcon: <SaveOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
        extrudeSaveEconomicsRun();
      },
    },
    {
      title: "View",
      variant: "contained",
      color: "default",
      startIcon: <VisibilityOutlinedIcon />,
      handleAction: () => {
        dispatch(
          updateEconomicsParameterAction("loadEconomicsResultsWorkflow", false)
        ),
          history.replace("/apex/economics/viewresults");
        dispatch(hideDialogAction());
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
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogViewSaveEconomicsCancelButtons;
