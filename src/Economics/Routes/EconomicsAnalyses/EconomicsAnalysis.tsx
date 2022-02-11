import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";
import { Button, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
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
  saveEconomicsSensitivitiesRequestAction,
  updateEconomicsParameterAction,
} from "../../Redux/Actions/EconomicsActions";
import {
  IEconomicsAnalysis,
  IEconomicsParametersSensitivitiesProps,
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
} from "./EconomicsAnalysesTypes";

const EconomicsDecksSelectionTable = React.lazy(
  () => import("./EconomicsDecksSelectionTable")
);
const EconomicsSensitivitiesTable = React.lazy(
  () => import("./EconomicsParametersSensitivities/EconomicsSensitivitiesTable")
);

const useStyles = makeStyles((theme) => ({
  analysisImage: {
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

const reducer = "economicsReducer";
const wc = "economicsAnalysisWorkflows";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const showSensitivitiesTableSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc]["showSensitivitiesTable"],
  (show) => show
);
const sensitivitiesTableSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc]["sensitivitiesTable"],
  (table) => table
);
const selectedAnalysesNamesSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedAnalysesNames,
  (data) => data
);
const costsRevenueAggregationLevelOptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.costsRevenueAggregationLevelOption,
  (data) => data
);

const EconomicsAnalysis = ({
  economicsAnalyses,
  workflowProcess,
  selectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wp = workflowProcess as NonNullable<
    IEconomicsParametersSensitivitiesProps["workflowProcess"]
  >;

  const selectedAnalysesNames = useSelector(selectedAnalysesNamesSelector);
  const showSensitivitiesTable = useSelector(showSensitivitiesTableSelector);
  const sensitivitiesTable = useSelector(sensitivitiesTableSelector);
  const costsRevenueAggregationLevelOption = useSelector(
    costsRevenueAggregationLevelOptionSelector
  );

  const agg =
    costsRevenueAggregationLevelOption?.value !== "portfolio" ? "Agg" : "Port";

  const [rsltsSensCase, setRsltsSensCase] = React.useState(`noSens|${agg}`);

  const selectedAnalysisDefined =
    selectedAnalysis as NonNullable<IEconomicsAnalysis>;

  const {
    name: analysisName,
    title: analysisTitle,
    icon,
  } = selectedAnalysisDefined;

  const devOptions = developmentScenarioOptions;

  const [analysisPerspective, setAnalysisPerspective] = React.useState(false);

  const handleSensitivitiesSwitchChange = (event: React.ChangeEvent<any>) => {
    const { checked } = event.target;

    if (checked) {
      setRsltsSensCase((prev) => {
        const aggrt = prev.split("|")[1];
        return `sens|${aggrt}`;
      });
    } else {
      dispatch(updateEconomicsParameterAction(`${wc}.sensitivitiesTable`, []));
      dispatch(
        updateEconomicsParameterAction(`${wc}.showSensitivitiesTable`, false)
      );

      setRsltsSensCase((prev) => {
        const aggrt = prev.split("|")[1];
        return `noSens|${aggrt}`;
      });
    }
    setAnalysisPerspective(checked);
  };

  const extrudeSensitivities = () => {
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
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveSensitivities],
          "Save",
          "saveOutlined",
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveSensitivities = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Economics_Sensitivities_Dialog",
      title: "Save Economics Sensitivities",
      type: "saveEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      workflowProcess,
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveSensitivitiesConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          flag,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      selectedAnalysis,
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
                updateEconomicsParameterAction(`${wc}.sensitivitiesTable`, [])
              );
              dispatch(
                updateEconomicsParameterAction(
                  `${wc}.sensitivitiesTableTitle`,
                  []
                )
              );
              dispatch(
                getEconomicsSensitivitiesByIdRequestAction(wp, reducer, true)
              );
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
        DialogOneCancelButtons(
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
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  //TODO check if still necessary
  React.useEffect(() => {
    const path = `${wc}.${analysisName}.name`;

    dispatch(updateEconomicsParameterAction(path, analysisName));
  }, []);

  React.useEffect(() => {
    const path = "economicsResultsCase";
    const senagg = rsltsSensCase.replace("|", "");

    dispatch(updateEconomicsParameterAction(path, senagg));
  }, [rsltsSensCase]);

  return (
    <ApexFlexContainer
      flexDirection="column"
      justifyContent="space-around"
      height={"95%"}
    >
      {selectedAnalysesNames.length > 1 ? (
        <ApexFlexContainer height={90}>
          {selectedAnalysesNames?.map(
            (name: TEconomicsAnalysesNames, i: number) => {
              const analysisObj = economicsAnalyses?.find(
                (a) => a.name === name
              ) as IEconomicsAnalysis;
              const { icon, title } = analysisObj;

              return (
                <div
                  className={classes.analysisImage}
                  key={i}
                  style={{ marginLeft: 5 }}
                >
                  <div style={{ width: 40, height: 40 }}>{icon}</div>
                  <Typography>{title}</Typography>
                </div>
              );
            }
          )}
        </ApexFlexContainer>
      ) : (
        <div className={classes.analysisImage}>
          <div style={{ width: 40, height: 40 }}>{icon}</div>
          <Typography>{analysisTitle}</Typography>
        </div>
      )}

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
          handleChange={handleSensitivitiesSwitchChange}
          checked={analysisPerspective}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="No Sensitivities"
          rightLabel="Use Sensitivities"
          moreStyles={{ width: 500 }}
        />
        <ApexFlexContainer width={"100%"} justifyContent="flex-end">
          {analysisPerspective && (
            <Button
              className={classes.button}
              startIcon={<AddBoxTwoToneIcon />}
              onClick={extrudeSensitivities}
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
            sensitivitiesTable={sensitivitiesTable}
          />
        )}
      </div>
    </ApexFlexContainer>
  );
};

export default EconomicsAnalysis;
