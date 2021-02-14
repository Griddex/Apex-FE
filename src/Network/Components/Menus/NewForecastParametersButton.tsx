import { Button, Tooltip, useTheme } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const NewForecastParametersButton = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const saveForecastParametersWorkflow = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_Parameters_Dialog",
      title: "Manage Forecasting Parameters",
      type: "saveForecastingParametersWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "information",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <Tooltip
      key={"newForecastParametersToolTip"}
      title={"Add new forecast parameters"}
      placement="bottom-end"
      arrow
    >
      <Button
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 0,
        }}
        onClick={saveForecastParametersWorkflow}
        startIcon={<AddOutlinedIcon />}
      >
        {"New"}
      </Button>
    </Tooltip>
  );
};

export default NewForecastParametersButton;
