import { Button } from "@material-ui/core";
import React from "react";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import { useDispatch } from "react-redux";
import {
  hideDialogAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { Dispatch } from "redux";

const saveForecastingParametersActions = (dispatch: Dispatch<any>) => {
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
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        console.log("Save");
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

const SaveForecastParametersExtrude = () => {
  const dispatch = useDispatch();

  const dialogParameters: DialogStuff = {
    name: "Save_Forecast_Parameters_Dialog",
    title: "Save Forecast Parameters",
    type: "saveForecastingParametersWorkflowDialog",
    show: true,
    exclusive: true,
    maxWidth: "md",
    iconType: "select",
    actionsList: () => saveForecastingParametersActions(dispatch),
  };

  dispatch(showDialogAction(dialogParameters));
};

export default SaveForecastParametersExtrude;
