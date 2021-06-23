import {
  Divider,
  Input,
  makeStyles,
  TextareaAutosize,
  useTheme,
} from "@material-ui/core";
import { DatePicker, DatePickerInput } from "carbon-components-react";
import React from "react";
import { ValueType } from "react-select";
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
}
export interface IApexEditor {
  editorData: IApexEditorRow[];
  editedRow: any;
  dividerPositions: number[];
  rows: any[];
  setRows: TUseState<any[]>;
  shouldUpdate: boolean;
  setShouldUpdate?: TUseState<boolean>;
  customComponent?: React.FC;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
}

const ApexEditor = ({
  editorData,
  editedRow,
  dividerPositions,
  rows,
  setRows,
  shouldUpdate,
  setShouldUpdate,
  customComponent,
}: IApexEditor) => {
  console.log(
    "Logged output --> ~ file: ApexEditor.tsx ~ line 52 ~ shouldUpdate",
    shouldUpdate
  );
  const theme = useTheme();
  const classes = useStyles();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const indexRef = React.useRef(0);
  const [formEditorRow, setFormEditorRow] = React.useState(editedRow);

  const CustomComponent = customComponent as NonNullable<
    IApexEditor["customComponent"]
  >;

  const renderEditorComponent = (
    i: number,
    name: string,
    title: string,
    value?: any,
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
            containerStyle={{ marginTop: 20, minWidth: 350 }}
            content={
              <Input
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
            contentStyle={{ width: "100%" }}
          />
        );

      case "textArea":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
            containerStyle={{ marginTop: 20, minWidth: 350, minHeight: 500 }}
            content={
              <TextareaAutosize
                name={name}
                style={{ height: "100%", width: "100%" }}
                rowsMin={20}
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
            content={
              <DatePicker
                datePickerType="single"
                onChange={(_, currentDateString) => {
                  setFormEditorRow((prev: any) => ({
                    ...prev,
                    [name]: currentDateString,
                  }));
                }}
              >
                <DatePickerInput
                  id="date-picker-input-id-start"
                  placeholder="DD/MM/yyyy"
                  labelText=""
                />
              </DatePicker>
            }
          />
        );

      case "switch":
        return (
          <AnalyticsComp
            key={i}
            title={title}
            direction="Vertical"
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
            containerStyle={{ marginTop: 20 }}
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
            containerStyle={{ marginTop: 20 }}
            content={<CustomComponent />}
          />
        );

      default:
        <div>No match</div>;
    }
  };

  React.useEffect(() => {
    const sn = editedRow["sn"] as number;
    rows[sn - 1] = formEditorRow;
    console.log(
      "Logged output --> ~ file: ApexEditor.tsx ~ line 201 ~ React.useEffect ~ formEditorRow",
      formEditorRow
    );

    console.log(
      "Logged output --> ~ file: ApexEditor.tsx ~ line 208 ~ React.useEffect ~ rows",
      rows
    );
    setRows(rows);
  }, [shouldUpdate, setShouldUpdate]);

  return (
    <ApexFlexContainer>
      {dividerPositions.map((pos, i) => {
        return (
          <div key={i}>
            <ApexFlexContainer
              flexDirection="column"
              justifyContent="flex-start"
              height={400}
            >
              {editorData.map((row, i) => {
                const {
                  name,
                  title,
                  value,
                  editorType,
                  currentOption,
                  Options,
                } = row;
                indexRef.current = i;

                return renderEditorComponent(
                  i,
                  name,
                  title,
                  value,
                  editorType,
                  currentOption,
                  Options
                );
              })}
            </ApexFlexContainer>
            <div>
              {dividerPositions.includes(indexRef.current) && <Divider />}
            </div>
          </div>
        );
      })}
    </ApexFlexContainer>
  );
};

export default ApexEditor;
