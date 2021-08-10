import { Button, Input } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogSaveCancelButtons from "../../Application/Components/DialogButtons/DialogSaveCancelButtons";
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
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import {
  defermentOptions,
  realtimeOptions,
  timeFrequencyOptions,
} from "../Data/NetworkData";
import {
  saveDeclineParametersRequestActionForFP,
  saveProductionPrioritizationRequestAction,
  updateNetworkParameterAction,
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
}

const EditOrCreateForecastingParameters = ({
  currentRow,
  setCurrentRow,
  shouldUpdate,
  workflowProcess,
  forecastParametersIndex,
}: IEditOrCreateForecastingParameters) => {
  const wc = "storedDataWorkflows";

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const currentDateFormat = `${dayFormat}/${monthFormat}/${yearFormat}`;

  const dialogRef = React.useRef<HTMLElement>(null);
  const [formEditorRow, setFormEditorRow] = React.useState(
    currentRow as IForecastParametersStoredRow
  );

  const {
    selectedDeclineParametersId,
    selectedDeclineParametersTitle,
    selectedDeclineParametersDescription,

    selectedProductionPrioritizationId,
    selectedProductionPrioritizationTitle,
    selectedProductionPrioritizationDescription,
  } = useSelector((state: RootState) => state.networkReducer);

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
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveDeclineParametersRequestActionForFP],
          false,
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
            // () =>
            //   getDeclineParametersByIdRequestAction(
            //     formEditorRow["wellDeclineParameterId"]
            //   ),
            () => {
              setFormEditorRow((prev) => ({
                ...prev,
                wellDeclineParameterId: selectedDeclineParametersId,
                wellDeclineParameterTitle: selectedDeclineParametersTitle
                  ? selectedDeclineParametersTitle
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
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveProductionPrioritizationRequestAction],
          false,
          "Current"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadPrioritization = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Load_Prioritization_Dialog",
      title: "Stored Prioritization Parameters",
      type: "productionStreamPrioritizationDialog",
      show: true,
      exclusive: false,
      maxWidth: "md",
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

  console.log(
    "Logged output --> ~ file: EditOrCreateForecastingParameters.tsx ~ line 193 ~ React.useEffect ~ formEditorRow",
    formEditorRow
  );
  React.useEffect(() => {
    setCurrentRow && setCurrentRow(formEditorRow);
  }, [formEditorRow]);

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
             {/*  <Button
                className={classes.button}
                startIcon={<AddBoxTwoToneIcon />}
                onClick={createDCATable}
              >
                Create
              </Button> */}
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
            {/*   <Button
                className={classes.button}
                startIcon={<AddBoxTwoToneIcon />}
                onClick={createPrioritization}
              >
                Create
              </Button> */}
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
          content={
            <ApexSelectRS
              valueOption={
                timeFrequencyOptions.find(
                  (o) =>
                    o.value.toLowerCase() ===
                    formEditorRow["timeFrequency"].toLowerCase()
                ) as ISelectOption
              }
              data={timeFrequencyOptions}
              handleSelect={(option: ValueType<ISelectOption, false>) =>
                setFormEditorRow((prev) => ({
                  ...prev,
                  timeFrequency: (option as ISelectOption).value,
                }))
              }
              menuPortalTarget={dialogRef.current as HTMLElement}
              isSelectOptionType={true}
            />
          }
          containerStyle={{ width: "45%", height: 50 }}
        />
        <AnalyticsComp
          title="Deferment Utilization"
          direction="Vertical"
          content={
            <ApexSelectRS
              valueOption={
                defermentOptions.find(
                  (o) =>
                    o.value.toLowerCase() ===
                    formEditorRow["isDefered"].toLowerCase()
                ) as ISelectOption
              }
              data={defermentOptions}
              handleSelect={(option: ValueType<ISelectOption, false>) =>
                setFormEditorRow((prev) => ({
                  ...prev,
                  isDefered: (option as ISelectOption).value,
                }))
              }
              menuPortalTarget={dialogRef.current as HTMLElement}
              isSelectOptionType={true}
            />
          }
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
            handleSelect={(option: ValueType<ISelectOption, false>) =>
              setFormEditorRow((prev) => ({
                ...prev,
                realtimeResults: (option as ISelectOption).value,
              }))
            }
            menuPortalTarget={dialogRef.current as HTMLElement}
            isSelectOptionType={true}
            isDisabled={true}
          />
        }
        containerStyle={{ width: "100%", height: 50 }}
      />

      <ApexFlexContainer justifyContent="space-between" height={50}>
        <AnalyticsComp
          title="Start Forecast Date"
          direction="Vertical"
          content={
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              variant="dialog"
              disabled
              //TODO Date format not flexible enough
              //User should have ability to change position
              //of day, month and year
              format={currentDateFormat}
              value={new Date(formEditorRow["startForecast"])}
              onChange={() => {}}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          }
        />
        <AnalyticsComp
          title="End Forecast Date"
          direction="Vertical"
          content={
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              variant="dialog"
              //TODO Date format not flexible enough
              //User should have ability to change position
              //of day, month and year
              format={currentDateFormat}
              value={new Date(formEditorRow["endForecast"])}
              onChange={(date: MaterialUiPickersDate) => {
                setFormEditorRow((prev: any) => ({
                  ...prev,
                  endForecast: date,
                }));
              }}
              minDate={new Date(formEditorRow["startForecast"])}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          }
        />
      </ApexFlexContainer>
    </div>
  );
};

export default EditOrCreateForecastingParameters;
