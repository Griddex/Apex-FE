import { Button, makeStyles, Typography, useTheme } from "@material-ui/core";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { developmentScenarios } from "../../Data/EconomicsData";
import {
  saveEconomicsSensitivitiesRequestAction,
  updateEconomicsParameterAction,
} from "../../Redux/Actions/EconomicsActions";
import swapVariableNameTitleForISelectOption from "./../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import {
  IEconomicsAnalysis,
  IEconomicsParametersSensitivitiesProps,
  TEconomicsAnalysesNames,
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
    border: "1px solid #A8A8A8",
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

  const {
    name,
    title,
    icon,
  } = selectedAnalysis as NonNullable<IEconomicsAnalysis>;

  const targetVariable = selectedAnalysis?.sensitivities?.targetVariable;
  const targetVariableDefined = targetVariable as TEconomicsAnalysesNames;

  //TODO: filter devoptions based on costs/revenue data input
  //Send all filtered dev options to backend
  const devOptions = swapVariableNameTitleForISelectOption(
    developmentScenarios
  );
  const devValueOption = devOptions[0];

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
          [true, true],
          [
            unloadDialogsAction,
            () => saveEconomicsSensitivitiesRequestAction(wp, reducer),
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadSensitivities = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_Economics_Sensitivities_Dialog",
      title: "Create Economics Sensitivities",
      type: "existingEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
      workflowProcess,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () => saveEconomicsSensitivitiesRequestAction(wp, reducer),
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <CenteredStyle
      flexDirection="column"
      justifyContent="space-around"
      height={"95%"}
    >
      <div className={classes.npvImage}>
        <div style={{ width: 40, height: 40 }}>{icon}</div>
        <Typography>{title}</Typography>
      </div>

      <EconomicsDecksSelectionTable />

      <AnalyticsComp
        title="Development Scenario"
        direction="Vertical"
        containerStyle={{ width: 250 }}
        content={
          <ApexSelectRS
            valueOption={devValueOption}
            data={devOptions}
            handleSelect={(row: ValueType<ISelectOption, false>) => {
              const path = `economicsAnalysisWorkflows.${name}.devScenario`;
              const value = row?.value as string;
              dispatch(updateEconomicsParameterAction(path, value));
            }}
            menuPortalTarget={document.body}
            isSelectOptionType={false}
          />
        }
      />

      <CenteredStyle justifyContent="space-between" width={"95%"}>
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
        <CenteredStyle width={"100%"}>
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
              className={classes.button}
              startIcon={<HourglassFullTwoToneIcon />}
              onClick={loadSensitivities}
            >
              Load
            </Button>
          )}
        </CenteredStyle>
      </CenteredStyle>

      <div
        style={{
          height: 200,
          width: "95%",
          overflow: "auto",
          border: `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        <EconomicsSensitivitiesTable targetVariable={targetVariableDefined} />
      </div>

      <CenteredStyle width={400} height={40} justifyContent="space-between">
        <Button
          className={classes.primaryButton}
          startIcon={<ViewDayTwoToneIcon />}
          onClick={() => alert("sensitivities")}
        >
          Save Sensitivities
        </Button>
        <Button
          className={classes.primaryButton}
          startIcon={<ViewDayTwoToneIcon />}
          onClick={() => alert("calculate")}
        >
          Calculate
        </Button>
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default EconomicsAnalysis;
