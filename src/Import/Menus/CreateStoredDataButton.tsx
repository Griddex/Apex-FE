import { Button, Tooltip, useTheme } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import {
    IStoredDataRow,
  } from "../../Application/Types/ApplicationTypes";
import { extrudeStoredDataDPs } from "../../Network/Components/DialogParameters/EditDeclineParametersDialogParameters";

export interface ICreateStoredDataButton {
    currentRow: IStoredDataRow;
    storedDataIndex: number;
    buttonToolTip: string;
    butttonTitle: string;
    dialogTitle:string;
}

const CreateStoredDataButton = ({
    currentRow,
    storedDataIndex,
    buttonToolTip,
    butttonTitle,
    dialogTitle
}: ICreateStoredDataButton) => {
  const theme = useTheme();
  const dispatch = useDispatch();
    

  console.log("buttonToolTip: ", buttonToolTip);
  console.log("butttonTitle: ", butttonTitle);
  return (
    <Tooltip
      key={buttonToolTip}
      title={butttonTitle}
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
        /* onClick={() =>
          dispatch(
            showDialogAction(
                extrudeStoredDataDPs(
                    dialogTitle,
                  currentRow,
                  storedDataIndex,
                  "createForecastingParametersWorkflow" 
                )
              )
          ) 
        } */
        startIcon={<AddOutlinedIcon />}
      >
        {"Create"}
      </Button>
    </Tooltip>
  );
};

export default CreateStoredDataButton;
