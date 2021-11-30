import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import {
  oilDevelopmentNames,
  nagDevelopmentNames,
  oilNAGDevelopmentNames,
} from "../../Data/EconomicsData";
import { saveCostsRevenuesRequestAction } from "../../Redux/Actions/EconomicsActions";
import initializeCostRevenuesData from "../../Utils/InitializeCostRevenuesData";

const useStyles = makeStyles(() => ({
  dialogButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    "& > *": {
      height: 200,
      width: "45%",
      margin: 10,
    },
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const subModuleNameSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer.subModuleName,
  (module) => module
);

const forecastEconomicsAggregatedSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.forecastEconomicsAggregated,
  (data) => data
);

export interface ICostsRevenueApexWorkFinalization {
  workflowProcess: TAllWorkflowProcesses;
}

const CostsRevenueApexWorkFinalization = ({
  workflowProcess,
}: ICostsRevenueApexWorkFinalization) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const reducer = "inputReducer";
  const wc = "inputDataWorkflows";
  const wp = workflowProcess;

  const successSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["success"],
    (success) => success
  );

  const success = useSelector(successSelector);
  const subModuleName = useSelector(subModuleNameSelector);
  const forecastEconomicsAggregated = useSelector(
    forecastEconomicsAggregatedSelector
  );

  if (success) {
    enqueueSnackbar(`${subModuleName} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const costsRevenueWorkflowSaveAction = React.useCallback(
    (wp: TAllWorkflowProcesses) => {
      const saveCostsRevenuesInputdeckConfirmation = (
        titleDesc: Record<string, string>
      ) => {
        const confirmationDialogParameters: DialogStuff = {
          name: "Save_CostsRevenue_Dialog_Confirmation",
          title: "Save Costs & Revenues Confirmation",
          type: "textDialog",
          show: true,
          exclusive: false,
          maxWidth: "xs",
          dialogText: `Do you want to save the economics costs schedule?`,
          iconType: "confirmation",
          actionsList: () =>
            DialogOneCancelButtons(
              [true, true],
              [true, true],
              [
                unloadDialogsAction,
                () =>
                  saveCostsRevenuesRequestAction(
                    wp,
                    reducer,
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

        dispatch(showDialogAction(confirmationDialogParameters));
      };

      const dialogParameters: DialogStuff = {
        name: "Save_CostsRevenue_Dialog",
        title: "Save Costs & Revenues",
        type: "saveCostsRevenuesInputDeckDialog",
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
                saveCostsRevenuesInputdeckConfirmation(
                  titleDesc as Record<string, string>
                ),
            ],
            "Save",
            "saveOutlined",
            flag,
            "None"
          ),
      };

      dispatch(showDialogAction(dialogParameters));
    },
    []
  );

  const buttonsData: ButtonProps[] = [
    {
      title: "Reset Table",
      color: "primary",
      variant: "contained",
      startIcon: <SaveOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(hideDialogAction());

        initializeCostRevenuesData(
          forecastEconomicsAggregated,
          10,
          oilDevelopmentNames,
          nagDevelopmentNames,
          oilNAGDevelopmentNames
        );

        enqueueSnackbar(`Reset successful`, {
          persist: false,
          variant: "success",
        });
      },
    },
    {
      title: "Save Deck",
      color: "primary",
      variant: "contained",
      startIcon: <SaveOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(hideDialogAction());

        costsRevenueWorkflowSaveAction(wp);
      },
    },
  ];

  return (
    <div className={classes.dialogButtons}>
      {buttonsData.map((button) => {
        const { startIcon, handleAction, title } = button;

        return (
          <MiniCard
            key={title}
            icon={startIcon as IMiniCardProps["icon"]}
            moduleAction={handleAction as IMiniCardProps["moduleAction"]}
            title={title as IMiniCardProps["title"]}
          />
        );
      })}
    </div>
  );
};

export default CostsRevenueApexWorkFinalization;
