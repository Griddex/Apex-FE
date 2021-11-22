import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  saveEconomicsResultsRequestAction,
  updateEconomicsParameterAction,
} from "../../../Economics/Redux/Actions/EconomicsActions";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";
import DialogOneCancelButtons from "./DialogOneCancelButtons";

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
      iconType: "save",
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsResultsConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          flag,
          "None"
        ),
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const saveEconomicsResultsConfirmation = (
    titleDesc: Record<string, string>
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Results_Dialog",
      title: "Save Economics Results Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current economics results?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsResultsRequestAction(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
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
    // {
    //   title: "View",
    //   variant: "contained",
    //   color: "inherit",
    //   startIcon: <VisibilityOutlinedIcon />,
    //   handleAction: () => {
    //     dispatch(
    //       updateEconomicsParameterAction("loadEconomicsResultsWorkflow", false)
    //     ),
    //       history.replace("/apex/economics/viewresults");
    //     dispatch(hideDialogAction());
    //   },
    // },
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
