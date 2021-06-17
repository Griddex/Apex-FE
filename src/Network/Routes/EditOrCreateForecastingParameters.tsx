import { Button, Input } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import { DatePicker, DatePickerInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
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
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { TUseState } from "../../Application/Types/ApplicationTypes";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import {
  defermentOptions,
  realtimeOptions,
  timeFrequencyOptions,
} from "../Data/NetworkData";
import {
  getDeclineParametersByIdRequestAction,
  getProductionPrioritizationByIdRequestAction,
  saveDeclineParametersRequestAction,
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
  currentRow?: Partial<IForecastParametersStoredRow>;
  rows: IForecastParametersStoredRow[];
  setRows: TUseState<IForecastParametersStoredRow[]>;
  shouldUpdate: boolean;
  setShouldUpdate?: TUseState<boolean>;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
  forecastParametersIndex?: number;
}

const EditOrCreateForecastingParameters = ({
  currentRow,
  rows,
  setRows,
  shouldUpdate,
  setShouldUpdate,
  workflowProcess,
  forecastParametersIndex,
}: IEditOrCreateForecastingParameters) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const dialogRef = React.useRef<HTMLElement>(null);
  const [formEditorRow, setFormEditorRow] = React.useState(
    currentRow as IForecastParametersStoredRow
  );

  const handleChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormEditorRow((prev) => ({ ...prev, [name]: value }));
  };

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
          [unloadDialogsAction, saveDeclineParametersRequestAction]
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
      exclusive: true,
      maxWidth: "lg",
      iconType: "table",
      workflowProcess,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              getDeclineParametersByIdRequestAction(
                formEditorRow["wellDeclineParameterId"]
              ),
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
      maxWidth: "xl",
      iconType: "create",
      workflowProcess,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveProductionPrioritizationRequestAction]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const loadPrioritization = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Load_Prioritization_Dialog",
      title: "Stored Prioritization Parameters",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "table",
      workflowProcess,
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              getProductionPrioritizationByIdRequestAction(
                formEditorRow["wellPrioritizationId"]
              ),
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
    const forecastParametersIndexDefined = forecastParametersIndex as number;
    rows[forecastParametersIndexDefined] = formEditorRow;

    setRows(rows);
  }, [shouldUpdate]);
  // }, [shouldUpdate, setShouldUpdate]);

  return (
    <div className={classes.root}>
      <AnalyticsComp
        title="FORECAST PARAMETERS TITLE"
        direction="Vertical"
        content={
          <Input
            name="title"
            value={formEditorRow["title"]}
            margin="dense"
            onChange={handleChange}
            fullWidth
          />
        }
        containerStyle={{ width: "100%", height: 50 }}
      />

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
          title="Add Deferment"
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
          />
        }
        containerStyle={{ width: "100%", height: 50 }}
      />

      <ApexFlexContainer justifyContent="space-between" height={50}>
        <AnalyticsComp
          title="Start Forecast Date"
          direction="Vertical"
          content={
            <DatePicker datePickerType="single">
              <DatePickerInput
                id="date-picker-input-id-start"
                placeholder="DD/MM/yyyy"
                labelText=""
                disabled
              />
            </DatePicker>
          }
        />
        <AnalyticsComp
          title="End Forecast Date"
          direction="Vertical"
          content={
            <DatePicker
              datePickerType="single"
              onChange={(dates: Date[], currentDateString: string) => {
                setFormEditorRow((prev) => ({
                  ...prev,
                  endForecast: currentDateString,
                }));
              }}
            >
              <DatePickerInput
                id="date-picker-input-id-end"
                placeholder="DD/MM/yyyy"
                labelText=""
              />
            </DatePicker>
          }
        />
      </ApexFlexContainer>
    </div>
  );
};

export default EditOrCreateForecastingParameters;
