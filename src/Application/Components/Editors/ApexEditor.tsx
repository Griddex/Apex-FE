import {
  Divider,
  Input,
  makeStyles,
  TextareaAutosize,
  useTheme,
} from "@material-ui/core";
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
  // select:(props:any) => {
  //   return {width:props.width,
  //   height:props.height,}
  // }
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
  editedRow: any;
  dividerPositions: number[];
  rows: any[];
  setRows: TUseState<any[]>;
  shouldUpdate?: boolean;
  setShouldUpdate?: TUseState<boolean>;
  shouldUpdateAction?: () => void;
  isCustomComponent?: boolean;
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
  customComponent,
  shouldUpdateAction,
}: IApexEditor) => {
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
    width: string | number,
    height: string | number,
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
            containerStyle={{ marginTop: 20, width: width, height: height }}
            content={
              <Input
                id="date-picker-input-id-start"
                type="datetime-local"
                margin="dense"
                value={formEditorRow[name as keyof IStoredDataRow]}
                onChange={(event) => {
                  const { value } = event.target;

                  setFormEditorRow((prev: any) => ({
                    ...prev,
                    [name]: value,
                  }));
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
  }, [shouldUpdateAction]);

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
                  value,
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
