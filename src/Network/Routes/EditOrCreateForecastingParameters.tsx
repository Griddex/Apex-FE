import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Button, Input, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { TAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TUseState } from "../../Application/Types/ApplicationTypes";
import { newUserForecastParametersRow } from "../../Forecast/Data/ForecastData";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import {
  defermentOptions,
  realtimeOptions,
  timeFrequencyOptions,
} from "../Data/NetworkData";
import {
  saveDeclineParametersRequestActionForFP,
  saveProductionPrioritizationRequestAction,
} from "../Redux/Actions/NetworkActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  button: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
}));

export interface IEditOrCreateForecastingParameters {
  currRow?: Partial<IForecastParametersStoredRow>;
  setCurrRow?: TUseState<IForecastParametersStoredRow>;
  currentRow?: Partial<IForecastParametersStoredRow>;
  setCurrentRow?: TUseState<IForecastParametersStoredRow>;
  shouldUpdate: boolean;
  setShouldUpdate?: TUseState<boolean>;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
  forecastParametersIndex?: number;
  setNextDisableds?: TUseState<Record<number, boolean>>;
}

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const dayFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.dayFormat,
  (data) => data
);
const monthFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.monthFormat,
  (data) => data
);
const yearFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.yearFormat,
  (data) => data
);

const selectedDeclineParametersIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedDeclineParametersId,
  (data) => data
);
const selectedDeclineParametersTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedDeclineParametersTitle,
  (data) => data
);
const selectedProductionPrioritizationIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedProductionPrioritizationId,
  (data) => data
);
const selectedProductionPrioritizationTitleSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.networkReducer.selectedProductionPrioritizationTitle,
  (data) => data
);

const EditOrCreateForecastingParameters = ({
  currentRow,
  setCurrentRow,
  workflowProcess,
  activeStep,
  setNextDisableds,
}: IEditOrCreateForecastingParameters) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const currentDateFormat = `${dayFormat}/${monthFormat}/${yearFormat}`;

  const dialogRef = React.useRef<HTMLElement>(null);
  const [formEditorRow, setFormEditorRow] = React.useState(
    workflowProcess === "createForecastingParametersWorkflow"
      ? (newUserForecastParametersRow as IForecastParametersStoredRow)
      : (currentRow as IForecastParametersStoredRow)
  );

  const selectedDeclineParametersId = useSelector(
    selectedDeclineParametersIdSelector
  );

  const selectedDeclineParametersTitle = useSelector(
    selectedDeclineParametersTitleSelector
  );

  const selectedProductionPrioritizationId = useSelector(
    selectedProductionPrioritizationIdSelector
  );

  const selectedProductionPrioritizationTitle = useSelector(
    selectedProductionPrioritizationTitleSelector
  );

  const createDCATable = () => {
    const dialogParameters: DialogStuff = {
      name: "Extrude_Decline_Curve_Parameters_Dialog",
      title: "Decline Curve Parameters",
      type: "declineCurveParametersDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "create",
      workflowProcess,
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveDeclineParametersRequestActionForFP],
          "Save",
          "saveOutlined",
          flag,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadDCATable = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Load_DCA_Dialog",
      title: "Stored DCA Parameters",
      type: "storedDeclineCurveParametersDialog",
      show: true,
      exclusive: false,
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
              setFormEditorRow((prev) => ({
                ...prev,
                wellDeclineParameterId: selectedDeclineParametersId,
                wellDeclineParameterTitle: selectedDeclineParametersTitle
                  ? selectedDeclineParametersTitle
                  : "Default",
                wellPrioritizationId: selectedProductionPrioritizationId,
                wellPrioritizationTitle: selectedProductionPrioritizationTitle
                  ? selectedProductionPrioritizationTitle
                  : "Default",
              })),
                dispatch(hideDialogAction());
            },
          ],
          "Load",
          "loadOutlined"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveSelectedProductionPrioritization = () => {
    const productionPrioritizationParametersObj = {};
    return saveProductionPrioritizationRequestAction(
      productionPrioritizationParametersObj
    );
  };

  const createPrioritization = () => {
    const dialogParameters: DialogStuff = {
      name: "Extrude_Prioritization_Parameters_Dialog",
      title: "Production Prioritization Parameters",
      type: "productionStreamPrioritizationDialog",
      show: true,
      exclusive: false,
      maxWidth: "md",
      iconType: "create",
      workflowProcess,
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveSelectedProductionPrioritization],

          "Save",
          "saveOutlined",
          flag,
          "Current"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const updateFormEditor = () => {
    formEditorRow.wellPrioritizationTitle =
      selectedProductionPrioritizationTitle;
    dispatch(hideDialogAction());
  };

  const loadPrioritization = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Load_Prioritization_Dialog",
      title: "Stored Prioritization Parameters",
      type: "storedProductionStreamPrioritizationDialog",
      show: true,
      exclusive: false,
      maxWidth: "md",
      iconType: "table",
      workflowProcess,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, updateFormEditor],
          "Load",
          "loadOutlined"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };
    dispatch(showDialogAction(dialogParameters));
  };

  const TimeFrequency = () => (
    <ApexSelectRS
      valueOption={
        timeFrequencyOptions.find(
          (o) =>
            o.value.toLowerCase() ===
            formEditorRow["timeFrequency"].toLowerCase()
        ) as ISelectOption
      }
      data={timeFrequencyOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        const optionDefined = option as ISelectOption;

        setFormEditorRow((prev) => ({
          ...prev,
          timeFrequency: optionDefined.value as string,
        }));
      }}
      menuPortalTarget={dialogRef.current as HTMLElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const DefermentUtilization = () => (
    <ApexSelectRS
      valueOption={
        defermentOptions.find(
          (o) =>
            o.value.toLowerCase() === formEditorRow["isDefered"].toLowerCase()
        ) as ISelectOption
      }
      data={defermentOptions}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
        const optionDefined = option as ISelectOption;

        setFormEditorRow((prev) => ({
          ...prev,
          isDefered: optionDefined.value as string,
        }));
      }}
      menuPortalTarget={dialogRef.current as HTMLElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  const startForecastDate = new Date(formEditorRow["startForecast"]);
  const endForecastDate = new Date(formEditorRow["endForecast"]);
  const forecastDuration =
    (endForecastDate.getTime() - startForecastDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365.24);

  React.useEffect(() => {
    setCurrentRow && setCurrentRow(formEditorRow);
  }, [formEditorRow]);

  React.useEffect(() => {
    if (forecastDuration < 0) {
      setNextDisableds &&
        setNextDisableds((prev) => ({
          ...prev,
          [activeStep as number]: true,
        }));
    } else {
      setNextDisableds &&
        setNextDisableds((prev) => ({
          ...prev,
          [activeStep as number]: false,
        }));
    }
  }, [forecastDuration]);

  return (
    <div className={classes.root}>
      <ApexFlexContainer justifyContent="space-between" height={50}>
        <AnalyticsComp
          title="DCA Table"
          direction="Vertical"
          content={
            <ApexFlexContainer width={"100%"} justifyContent="flex-end">
              <AnalyticsTitle
                title={
                  formEditorRow["wellDeclineParameterTitle"]
                    ? formEditorRow["wellDeclineParameterTitle"]
                    : "None"
                }
                titleStyle={{ width: "80%", color: theme.palette.primary.main }}
              />
              <Button
                className={classes.button}
                startIcon={<AddBoxTwoToneIcon />}
                onClick={createDCATable}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                className={classes.button}
                startIcon={<HourglassFullTwoToneIcon />}
                onClick={loadDCATable}
              >
                Load
              </Button>
            </ApexFlexContainer>
          }
          containerStyle={{ width: "45%", height: 50 }}
        />

        <AnalyticsComp
          title="Prioritization"
          direction="Vertical"
          content={
            <ApexFlexContainer width={"100%"} justifyContent="flex-end">
              <AnalyticsTitle
                title={
                  formEditorRow["wellPrioritizationTitle"]
                    ? formEditorRow["wellPrioritizationTitle"]
                    : "None"
                }
                titleStyle={{ width: "80%", color: theme.palette.primary.main }}
              />
              <Button
                className={classes.button}
                startIcon={<AddBoxTwoToneIcon />}
                onClick={createPrioritization}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                className={classes.button}
                startIcon={<HourglassFullTwoToneIcon />}
                onClick={loadPrioritization}
              >
                Load
              </Button>
            </ApexFlexContainer>
          }
          containerStyle={{ width: "45%", height: 50 }}
        />
      </ApexFlexContainer>

      <ApexFlexContainer justifyContent="space-between" height={50}>
        <AnalyticsComp
          title="Time Frequency"
          direction="Vertical"
          content={<TimeFrequency />}
          containerStyle={{ width: "45%", height: 50 }}
        />
        <AnalyticsComp
          title="Deferment Utilization"
          direction="Vertical"
          content={<DefermentUtilization />}
          containerStyle={{ width: "45%", height: 50 }}
        />
      </ApexFlexContainer>

      <AnalyticsComp
        title="Realtime Results"
        direction="Vertical"
        content={
          <ApexSelectRS
            valueOption={
              realtimeOptions.find(
                (o) =>
                  o.value.toLowerCase() ===
                  formEditorRow["realtimeResults"].toLowerCase()
              ) as ISelectOption
            }
            data={realtimeOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
              const optionDefined = option as ISelectOption;

              setFormEditorRow((prev) => ({
                ...prev,
                realtimeResults: optionDefined.value as string,
              }));
            }}
            menuPortalTarget={dialogRef.current as HTMLElement}
            isSelectOptionType={true}
            isDisabled={true}
            containerHeight={40}
          />
        }
        containerStyle={{ width: "100%", height: 50 }}
      />

      <ApexFlexContainer justifyContent="space-between" height={50}>
        <AnalyticsComp
          title="Start Forecast Date"
          direction="Vertical"
          content={
            <DesktopDatePicker
              disabled
              //TODO Date format not flexible enough
              //User should have ability to change position
              //of day, month and year
              inputFormat={currentDateFormat}
              value={startForecastDate}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} />}
            />
          }
        />
        <AnalyticsComp
          title="End Forecast Date"
          direction="Vertical"
          content={
            <DesktopDatePicker
              //TODO Date format not flexible enough
              //User should have ability to change position
              //of day, month and year
              inputFormat={currentDateFormat}
              value={endForecastDate}
              onChange={(date: unknown) => {
                setFormEditorRow((prev: any) => ({
                  ...prev,
                  endForecast: date,
                }));
              }}
              //TODO at least one year ahead
              minDate={new Date(formEditorRow["startForecast"])}
              renderInput={(params) => <TextField {...params} />}
            />
          }
        />
        <AnalyticsComp
          title="Forecast Duration (years)"
          direction="Vertical"
          content={
            <>
              <Input
                name="forecastDuration"
                style={{ backgroundColor: theme.palette.grey["200"] }}
                value={forecastDuration.toFixed(0)}
                error={forecastDuration < 0}
                disabled
                required
                fullWidth
              />
              {forecastDuration < 0 && (
                <Typography
                  variant="subtitle2"
                  style={{ color: theme.palette.secondary.main }}
                >
                  {"Duration cannot be negative"}
                </Typography>
              )}
            </>
          }
        />
      </ApexFlexContainer>
    </div>
  );
};

export default EditOrCreateForecastingParameters;
