import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { updateDataByIdRequestAction } from "../../../Application/Redux/Actions/ApplicationActions";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { fetchStoredForecastingParametersRequestAction } from "../../Redux/Actions/NetworkActions";
import StoredForecastingParameters from "../../Routes/StoredForecastingParameters";

const StoredForecastingParametersDialog: React.FC<DialogStuff> = (props) => {
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;
  const reducer = "networkReducer";

  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, actionsList } = props;

  const updateTableActionConfirmation =
    (id: string) => (titleDesc: Record<string, string>) => {
      const updateDataUrl = `${mainUrl}/${id}`;

      const confirmationDialogParameters: DialogStuff = {
        name: "Update_Data_Dialog_Confirmation",
        title: `Update Confirmation`,
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to proceed with this update?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () =>
                updateDataByIdRequestAction(
                  reducer,
                  updateDataUrl as string,
                  titleDesc,
                  fetchStoredForecastingParametersRequestAction as () => IAction
                ),
            ],
            "Update",
            "updateOutlined",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{
          display: "flex",
          flexDirection: "column",
          height: 650,
        }}
      >
        <StoredForecastingParameters
          showChart={true}
          isAllForecastParameters={true}
          updateTableActionConfirmation={updateTableActionConfirmation}
        />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default StoredForecastingParametersDialog;
