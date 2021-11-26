import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  alpha,
  Divider,
  Input,
  TextareaAutosize,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { IUnitSettingsData } from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IStoredDataRow, TUseState } from "../../Types/ApplicationTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexSelectRS from "../Selects/ApexSelectRS";
import { ISelectOption } from "../Selects/SelectItemsType";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import ApexMuiSwitch from "../Switches/ApexMuiSwitch";
import { TAllWorkflowProcesses } from "../Workflows/WorkflowTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: "100%",
    fontSize: 14,
    border: `1px solid ${grey[500]}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    "&:active": {
      outline: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

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

const unitSettingsPartialSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer,
  (reducer) => reducer
);

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
    unitSettingsPartialSelector
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
                className={classes.input}
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
              <DesktopDatePicker
                label="Date picker dialog"
                //TODO Date format not flexible enough
                //User should have ability to change position
                //of day, month and year
                inputFormat={`${dayFormat} ${monthFormat} ${yearFormat}`}
                value={formEditorRow[name as keyof IStoredDataRow]}
                onChange={(date: unknown) => {
                  setFormEditorRow((prev: any) => ({
                    ...prev,
                    [name]: date,
                  }));
                }}
                renderInput={(params) => <TextField {...params} />}
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
                handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                  setFormEditorRow((prev: any) => {
                    return { ...prev, [name]: (option as ISelectOption).label };
                  });
                }}
                menuPortalTarget={editorRef.current as HTMLDivElement}
                isSelectOptionType={true}
                containerHeight={40}
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
