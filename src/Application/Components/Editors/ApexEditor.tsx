import {
  Divider,
  Input,
  makeStyles,
  TextareaAutosize,
  useTheme,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IUnitSettingsData } from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IStoredDataRow, TUseState } from "../../Types/ApplicationTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexSelectRS from "../Selects/ApexSelectRS";
import { ISelectOption } from "../Selects/SelectItemsType";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import ApexMuiSwitch from "../Switches/ApexMuiSwitch";
import { TAllWorkflowProcesses } from "../Workflows/WorkflowTypes";

const useStyles = makeStyles({
  input: {
    width: "100%",
    fontSize: 14,
  },
});

export type TApexEditorType =
  | "input"
  | "textArea"
  | "date"
  | "switch"
  | "select"
  | "custom";

export interface IApexEditorRow {
  name: string;
  title: string;
  value?: any;
  editorType: TApexEditorType;
  currentOption?: ISelectOption;
  Options?: ISelectOption[];
  width: string | number;
  height: string | number;
}
export interface IApexEditor {
  editorData: IApexEditorRow[];
  dividerPositions: number[];
  editedRow?: any;
  formEditorRow: any;
  setFormEditorRow: TUseState<any>;
  isCustomComponent?: boolean;
  customComponent?: React.FC;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
}

const ApexEditor = ({
  editorData,
  formEditorRow,
  setFormEditorRow,
  dividerPositions,
  customComponent,
}: IApexEditor) => {
  const theme = useTheme();
  const classes = useStyles();

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const editorRef = React.useRef<HTMLDivElement>(null);
  const indexRef = React.useRef(0);

  const CustomComponent = customComponent as NonNullable<
    IApexEditor["customComponent"]
  >;

  const renderEditorComponent = (
    i: number,
    name: string,
    title: string,
    width: string | number,
    height: string | number,
    editorType?: TApexEditorType,
    currentOption?: ISelectOption,
    Options?: ISelectOption[]
  ) => {
    switch (editorType) {
      case "input":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <Input
                style={{ width: width, height: height }}
                className={classes.input}
                value={formEditorRow[name as keyof IStoredDataRow]}
                margin="dense"
                onChange={(event) => {
                  const { value } = event.target;
                  setFormEditorRow((prev: any) => {
                    return { ...prev, [name]: value };
                  });
                }}
              />
            }
          />
        );

      case "textArea":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <TextareaAutosize
                name={name}
                style={{ width: width, height: height }}
                minRows={20}
                value={formEditorRow[name as keyof IStoredDataRow] as string}
                onChange={(event) => {
                  const { value } = event.target;
                  setFormEditorRow((prev: any) => {
                    return { ...prev, [name]: value };
                  });
                }}
              />
            }
          />
        );

      case "date":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                //TODO Date format not flexible enough
                //User should have ability to change position
                //of day, month and year
                format={`${dayFormat} ${monthFormat} ${yearFormat}`}
                value={formEditorRow[name as keyof IStoredDataRow]}
                onChange={(date: MaterialUiPickersDate) => {
                  setFormEditorRow((prev: any) => ({
                    ...prev,
                    [name]: date,
                  }));
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ width: width, height: height }}
              />
            }
          />
        );

      case "switch":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <ApexMuiSwitch
                name={name}
                handleChange={(event) => {
                  const { checked } = event.target;
                  setFormEditorRow((prev: any) => {
                    return { ...prev, [name]: checked };
                  });
                }}
                checked={Boolean(formEditorRow[name as keyof IStoredDataRow])}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
                hasLabels={true}
                leftLabel="Disable"
                rightLabel="Enable"
              />
            }
          />
        );

      case "select":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <ApexSelectRS
                valueOption={currentOption as ISelectOption}
                data={Options as ISelectOption[]}
                handleSelect={(option: ValueType<ISelectOption, false>) => {
                  setFormEditorRow((prev: any) => {
                    return { ...prev, [name]: (option as ISelectOption).label };
                  });
                }}
                menuPortalTarget={editorRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
            }
          />
        );

      case "custom":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={<CustomComponent />}
          />
        );

      default:
        <div>No match</div>;
    }
  };

  return (
    <ApexFlexContainer alignItems="flex-start">
      {dividerPositions.map((pos, i) => {
        return (
          <ApexFlexContainer key={i} alignItems="flex-start">
            <ApexFlexContainer
              flexDirection="column"
              justifyContent="flex-start"
              height="100%"
            >
              {editorData.map((row, i) => {
                const {
                  name,
                  title,
                  value,
                  width,
                  height,
                  editorType,
                  currentOption,
                  Options,
                } = row;

                indexRef.current = i;

                return renderEditorComponent(
                  i,
                  name,
                  title,
                  width,
                  height,
                  editorType,
                  currentOption,
                  Options
                );
              })}
            </ApexFlexContainer>
            {dividerPositions.includes(indexRef.current) && <Divider />}
          </ApexFlexContainer>
        );
      })}
    </ApexFlexContainer>
  );
};

export default ApexEditor;
