import { Button, Tooltip, useTheme } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { extrudeForecastParametersDPs } from "../DialogParameters/EditForecastParametersDialogParameters";
import { IForecastParametersStoredRow } from "../Dialogs/StoredNetworksDialogTypes";

export interface ICreateForecastParametersButton {
  currentRow: IForecastParametersStoredRow;
  rows: IForecastParametersStoredRow[];
  setRows: TUseState<IForecastParametersStoredRow[]>;
  forecastParametersIndex: number;
}

const CreateForecastParametersButton = ({
  currentRow,
  rows,
  setRows,
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
                rows,
                setRows,
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
