import { Button, makeStyles, Typography, useTheme } from "@material-ui/core";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import swapVariableNameTitleForISelectOption from "../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import SelectScenariosByButtonsWithForecastCaseEconomics from "../../Components/SelectScenariosByButtons/SelectScenariosByButtonsWithForecastCaseEconomics";
import {
  developmentScenarioOptions,
  developmentScenarios,
} from "../../Data/EconomicsData";
import {
  getEconomicsSensitivitiesByIdRequestAction,
  runEconomicsAnalysisRequestAction,
  saveEconomicsSensitivitiesRequestAction,
  updateEconomicsParameterAction,
} from "../../Redux/Actions/EconomicsActions";
import {
  IEconomicsAnalysis,
  IEconomicsParametersSensitivitiesProps,
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "./EconomicsAnalysesTypes";
import EconomicsDecksSelectionTable from "./EconomicsDecksSelectionTable";
import EconomicsSensitivitiesTable from "./EconomicsParametersSensitivities/EconomicsSensitivitiesTable";

const useStyles = makeStyles((theme) => ({
  npvImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    height: 90,
    padding: 5,
    border: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: 20,
  },
  button: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  primaryButton: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 150,
    marginTop: 20,
  },
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
    width: 150,
    marginTop: 20,
    marginLeft: 20,
  },
}));

const EconomicsAnalysis = ({
  workflowProcess,
  selectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "economicsAnalysisWorkflows";
  const wp = workflowProcess as NonNullable<
    IEconomicsParametersSensitivitiesProps["workflowProcess"]
  >;
  const reducer = "economicsReducer";
  const { showSensitivitiesTable, selectedDevScenarioNamesCostsRevenues } =
    useSelector((state: RootState) => state.economicsReducer);

  const selectedAnalysisDefined =
    selectedAnalysis as NonNullable<IEconomicsAnalysis>;
  const {
    name: analysisName,
    title: analysisTitle,
    icon,
  } = selectedAnalysisDefined;

  //TODO: filter devoptions based on costs/revenues data input
  //Send all filtered dev options to backend

  //TODO Pick data from Gift
  // const devOptions = developmentScenarioOptions.filter((opts) =>
  // selectedDevScenarioNamesCostsRevenues.includes(opts.value)
  // );

  const devOptions = developmentScenarioOptions;

  const [analysisPerspective, setAnalysisPerspective] = React.useState(false);
  const handleExcludeSwitchChange = (event: React.ChangeEvent<any>) => {
    const { checked } = event.target;

    setAnalysisPerspective(checked);
  };

  const createSensitivities = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_Economics_Sensitivities_Dialog",
      title: "Create Economics Sensitivities",
      type: "economicsParametersSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
      workflowProcess,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveSensitivitiesAction]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveSensitivitiesAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_Economics_Sensitivities_Dialog",
      title: "Create Economics Sensitivities",
      type: "saveEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
      workflowProcess,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, economicsSensitivitiesConfirmation]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const economicsSensitivitiesConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Economics_Sensitivities_Save_Confirmation",
      title: "Economics Sensitivities Save Confirmation",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xs",
      dialogText: "Do you want to save the current economics sensitivities?",
      iconType: "information",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsSensitivitiesRequestAction(
                wp,
                reducer,
                analysisName as NonNullable<TEconomicsAnalysesNames>
              ),
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadSensitivities = () => {
    const dialogParameters: DialogStuff = {
      name: "Existing_Economics_Sensitivities_Dialog",
      title: "Existing Economics Sensitivities",
      type: "existingEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "information",
      workflowProcess,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () => getEconomicsSensitivitiesByIdRequestAction(wp, reducer),
          ],
          "Load",
          "loadOutlined"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

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
          "viewDayTwoTone"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  React.useEffect(() => {
    const path = `economicsAnalysisWorkflows.${analysisName}.sensitivities.analysisName`;

    dispatch(updateEconomicsParameterAction(path, analysisName));
  }, []);

  return (
    <ApexFlexStyle
      flexDirection="column"
      justifyContent="space-around"
      height={"95%"}
    >
      <div className={classes.npvImage}>
        <div style={{ width: 40, height: 40 }}>{icon}</div>
        <Typography>{analysisTitle}</Typography>
      </div>

      <EconomicsDecksSelectionTable />

      <SelectScenariosByButtonsWithForecastCaseEconomics
        width={"95%"}
        height={50}
        analysisProcess={analysisName}
        workflowCategory={wc}
        devOptions={
          devOptions as ISelectOption<TDevScenarioNames, TDevScenarioTitles>[]
        }
      />

      <ApexFlexStyle justifyContent="space-between" width={"95%"} height={40}>
        <ApexMuiSwitch
          name="sensitivitiesSwitch"
          handleChange={handleExcludeSwitchChange}
          checked={analysisPerspective}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="No Sensitivities Input"
          rightLabel="Sensitivities input"
        />
        <ApexFlexStyle width={"100%"} justifyContent="flex-end">
          {analysisPerspective && (
            <Button
              className={classes.button}
              startIcon={<AddBoxTwoToneIcon />}
              onClick={createSensitivities}
            >
              Create
            </Button>
          )}
          {analysisPerspective && (
            <Button
              style={{ marginLeft: 10 }}
              className={classes.button}
              startIcon={<HourglassFullTwoToneIcon />}
              onClick={loadSensitivities}
            >
              Load
            </Button>
          )}
        </ApexFlexStyle>
      </ApexFlexStyle>

      <div
        style={{
          height: 200,
          width: "95%",
          overflow: "auto",
          borderTop: `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        {showSensitivitiesTable && (
          <EconomicsSensitivitiesTable analysisName={analysisName} />
        )}
      </div>

      <ApexFlexStyle width={400} height={40} justifyContent="center">
        <Button
          className={classes.primaryButton}
          startIcon={<ViewDayTwoToneIcon />}
          onClick={() =>
            runEconomicsAnalysisConfirmation(analysisName, analysisTitle)
          }
        >
          Calculate
        </Button>
      </ApexFlexStyle>
    </ApexFlexStyle>
  );
};

export default EconomicsAnalysis;
