import { Button, Tooltip, useTheme } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const CreateNewForecastParametersButton = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const createNewForecastParametersWorkflow = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_Parameters_Dialog",
      title: "Manage Forecasting Parameters",
      type: "createNewForecastingParametersWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "create",
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
        onClick={createNewForecastParametersWorkflow}
        startIcon={<AddOutlinedIcon />}
      >
        {"New"}
      </Button>
    </Tooltip>
  );
};

export default CreateNewForecastParametersButton;
