import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
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
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  runEconomicsAnalysisRequestAction,
  saveEconomicsResultsRequestAction,
} from "../../Redux/Actions/EconomicsActions";
import {
  IEconomicsParametersSensitivitiesProps,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "./EconomicsAnalysesTypes";

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

export interface IEconomicsAnalysesFinalization {
  workflowProcess: TAllWorkflowProcesses;
}

const EconomicsAnalysesFinalization = ({
  workflowProcess,
}: IEconomicsAnalysesFinalization) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const wc = "economicsAnalysisWorkflows";
  const wp = workflowProcess as NonNullable<
    IEconomicsParametersSensitivitiesProps["workflowProcess"]
  >;

  const selectedAnalysisSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc]["selectedAnalysis"],
    (data) => data
  );

  const selectedAnalysis = useSelector(selectedAnalysisSelector);
  const { name: analysisName, title: analysisTitle } = selectedAnalysis;

  const runEconomicsAnalysisConfirmation = (
    analysisName: TEconomicsAnalysesNames,
    analysisTitle: TEconomicsAnalysesTitles
  ) => {
    const confirmationDialogParameters: DialogStuff = {
      name: `Calculate_${analysisTitle}_Confirmation`,
      title: `Calculate ${analysisTitle} Confirmation`,
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: `Do you want to calculate ${analysisTitle} with the current parameters?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              runEconomicsAnalysisRequestAction(
                wp,
                analysisName,
                analysisTitle
              ),
          ],
          "Calculate",
          "viewDayTwoTone",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const saveEconomicsResultsAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Results_Dialog",
      title: "Save Economics Results",
      type: "saveEconomicsResultsDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsResultsConfirmation(
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
  };

  const saveEconomicsResultsConfirmation = (
    titleDesc: Record<string, string>
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Results_Dialog",
      title: "Save Economics Results Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current economics results?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsResultsRequestAction(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer: "economicsReducer",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const buttonsData: ButtonProps[] = [
    {
      title: "Calculate",
      color: "primary",
      variant: "contained",
      startIcon: <SaveOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () =>
        runEconomicsAnalysisConfirmation(analysisName, analysisTitle),
    },
    {
      title: "Save Results",
      color: "primary",
      variant: "contained",
      startIcon: <SaveOutlinedIcon fontSize="large" color="primary" />,
      handleAction: saveEconomicsResultsAction,
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

export default EconomicsAnalysesFinalization;
