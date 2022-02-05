import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import {
  IWorkflowDataProps,
  TReducer,
} from "../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import { updateDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import {
  unloadDialogsAction,
  showDialogAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { fetchStoredForecastingParametersRequestAction } from "../Redux/Actions/NetworkActions";
import StoredForecastingParameters from "../Routes/StoredForecastingParameters";
import StoredNetworks from "../Routes/StoredNetworks";

const useStyles = makeStyles(() => ({
  rootWorkflow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

const RunForecastWorkflow = (workflowProps: IWorkflowDataProps) => {
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;
  const reducerNetwork = "networkReducer";

  const classes = useStyles();
  const dispatch = useDispatch();

  const { activeStep } = workflowProps;
  const reducer = "inputReducer" as TReducer;
  const workflowProcess = "networkStored" as NonNullable<
    IStoredDataProps["wkPs"]
  >;

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
                  reducerNetwork,
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

  const props = {
    reducer,
    workflowProcess,
    containerStyle: { boxShadow: "none", width: "100%", height: "100%" },
    showChart: false,
    updateTableActionConfirmation,
    finalAction: () => {},
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StoredNetworks
            workflowProcess={workflowProcess}
            containerStyle={props.containerStyle}
          />
        );
      case 1:
        return <StoredForecastingParameters {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <div className={classes.rootWorkflow}>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {renderImportStep()}
      </div>
    </div>
  );
};

export default RunForecastWorkflow;
