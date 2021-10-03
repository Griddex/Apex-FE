import { Button, Tooltip, useTheme } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { extrudeForecastParametersDPs } from "../DialogParameters/EditForecastParametersDialogParameters";
import { IForecastParametersStoredRow } from "../Dialogs/StoredNetworksDialogTypes";

export interface ICreateForecastParametersButton {
  currentRow: IForecastParametersStoredRow;
  forecastParametersIndex: number;
}

const CreateForecastParametersButton = ({
  currentRow,
  forecastParametersIndex,
}: ICreateForecastParametersButton) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
        onClick={() =>
          dispatch(
            showDialogAction(
              extrudeForecastParametersDPs(
                "Create Forecasting Parameters",
                currentRow,
                forecastParametersIndex,
                "createForecastingParametersWorkflow" 
              )
            )
          )
        }
        startIcon={<AddOutlinedIcon />}
      >
        {"Create"}
      </Button>
    </Tooltip>
  );
};

export default CreateForecastParametersButton;
