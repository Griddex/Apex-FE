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

const storedForecastingParametersActions = (dispatch: Dispatch<any>) => {
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
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        console.log("Run Forecast");
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

const storedForecastingParametersExtrude = () => {
  const dispatch = useDispatch();

  const dialogParameters: DialogStuff = {
    name: "Stored_Forecast_Dialog",
    title: "Stored Forecast",
    type: "createForecastingParametersWorkflowDialog",
    show: true,
    exclusive: true,
    maxWidth: "md",
    iconType: "create",
    actionsList: () => storedForecastingParametersActions(dispatch),
  };

  dispatch(showDialogAction(dialogParameters));
};

export default storedForecastingParametersExtrude;
