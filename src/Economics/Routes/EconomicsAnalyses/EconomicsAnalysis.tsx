import { Button, makeStyles, Typography, useTheme } from "@material-ui/core";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SelectScenariosByButtonsWithForecastCaseEconomics from "../../Components/SelectScenariosByButtons/SelectScenariosByButtonsWithForecastCaseEconomics";
import { developmentScenarioOptions } from "../../Data/EconomicsData";
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
  const { showSensitivitiesTable, selectedSensitivitiesTable } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const selectedAnalysisDefined =
    selectedAnalysis as NonNullable<IEconomicsAnalysis>;
  const {
    name: analysisName,
    title: analysisTitle,
    icon,
  } = selectedAnalysisDefined;

  const devOptions = developmentScenarioOptions;

  const [analysisPerspective, setAnalysisPerspective] = React.useState(false);
  const handleExcludeSwitchChange = (event: React.ChangeEvent<any>) => {
    const { checked } = event.target;
    if (!checked && showSensitivitiesTable) {
      dispatch(
        updateEconomicsParameterAction("selectedSensitivitiesTable", [])
      );
      dispatch(updateEconomicsParameterAction("showSensitivitiesTable", false));
    }
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
      iconType: "create",
      workflowProcess,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveSensitivitiesAction],
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveSensitivitiesAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Sensitivities_Dialog",
      title: "Save Economics Sensitivities",
      type: "saveEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      workflowProcess,
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveSensitivitiesConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveSensitivitiesConfirmation = (titleDesc: Record<string, string>) => {
    const dialogParameters: DialogStuff = {
      name: "Economics_Sensitivities_Save_Confirmation",
      title: "Economics Sensitivities Save Confirmation",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current economics sensitivities?",
      iconType: "confirmation",
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
                analysisName as NonNullable<TEconomicsAnalysesNames>,
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadSensitivities = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Economics_Sensitivities_Dialog",
      title: "Stored Economics Sensitivities",
      type: "storedEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "table",
      workflowProcess,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => {
              dispatch(
                updateEconomicsParameterAction("selectedSensitivitiesTable", [])
              );
              dispatch(
                updateEconomicsParameterAction(
                  `economicsAnalysisWorkflows.${analysisName}.analysisTableTitle`,
                  []
                )
              );
              dispatch(getEconomicsSensitivitiesByIdRequestAction(wp, reducer));
            },
          ],
          "Load",
          "loadOutlined",
          false,
          "All"
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
          "viewDayTwoTone",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const saveeconomicsResultsFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Results_Dialog",
      title: "Save Economics Results",
      type: "saveEconomicsResultsDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  React.useEffect(() => {
    const path = `economicsAnalysisWorkflows.${analysisName}.sensitivities.analysisName`;

    dispatch(updateEconomicsParameterAction(path, analysisName));
  }, []);

  return (
    <ApexFlexContainer
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

      <ApexFlexContainer
        justifyContent="space-between"
        width={"95%"}
        height={40}
      >
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
        <ApexFlexContainer width={"100%"} justifyContent="flex-end">
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
        </ApexFlexContainer>
      </ApexFlexContainer>

      <div
        style={{
          height: 200,
          width: "95%",
          overflow: "auto",
          borderTop: `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        {showSensitivitiesTable && (
          <EconomicsSensitivitiesTable
            analysisName={analysisName}
            selectedSensitivitiesTable={selectedSensitivitiesTable}
          />
        )}
      </div>

      <ApexFlexContainer width={310} height={40} justifyContent="space-between">
        <Button
          className={classes.primaryButton}
          startIcon={<SaveOutlinedIcon />}
          onClick={saveeconomicsResultsFinalAction}
        >
          Save Results
        </Button>
        <Button
          className={classes.primaryButton}
          startIcon={<ViewDayTwoToneIcon />}
          onClick={() =>
            runEconomicsAnalysisConfirmation(analysisName, analysisTitle)
          }
        >
          Calculate
        </Button>
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default EconomicsAnalysis;
