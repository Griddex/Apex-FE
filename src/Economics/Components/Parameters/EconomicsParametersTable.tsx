import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import omit from "lodash.omit";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsText from "../../../Application/Components/Basic/AnalyticsText";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TVariableNameTitleData } from "../../../Application/Types/ApplicationTypes";
import swapVariableNameTitleForISelectOption from "../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { IEconomicsParametersTable } from "./IParametersType";

const useStyles = makeStyles(() => ({
  economicsParametersTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90%",
    marginTop: 40,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const costsRevenuesAppHeadersSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.costsRevenuesAppHeaders,
  (data) => data
);

const EconomicsParametersTable = ({
  isRoyalty,
  toggleSwitch,
  setToggleSwitch,
  columnsObjKeys,
  row,
  rows,
  setRows,
  genericCustomAddtnlColumnsObj,
}: IEconomicsParametersTable) => {
  const currentVariable = row.parameterName as string;

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const rootRef = React.useRef<HTMLDivElement>(null);

  const basedOnVariablesSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer["inputDataWorkflows"][
        "economicsParametersDeckManual"
      ]["basedOnVariables"],
    (data) => data
  );

  const costsRevenuesAppHeaders = useSelector(costsRevenuesAppHeadersSelector);
  const basedOnVariables = useSelector(basedOnVariablesSelector);

  const dataOptions = React.useRef(
    swapVariableNameTitleForISelectOption(
      costsRevenuesAppHeaders["oilNAGDevelopment"] as TVariableNameTitleData
    )
  );

  const [basedOnOption, setBasedOnOption] = React.useState<ISelectOption>(
    Object.entries(basedOnVariables).length > 0 &&
      basedOnVariables[currentVariable] &&
      basedOnVariables[currentVariable] !== ""
      ? dataOptions.current.filter(
          (opt) => opt.value === basedOnVariables[currentVariable]
        )[0]
      : dataOptions.current[0]
  );

  const additionalColumns = columnsObjKeys.map((k) => ({
    key: k,
    name: genericCustomAddtnlColumnsObj[k],
    editable: true,
    editor: TextEditor,
    resizable: true,
  }));

  const columns: Column<IRawRow>[] = React.useMemo(
    () => [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 70 },
      {
        key: "from",
        name: "FROM",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 100,
      },
      {
        key: "to",
        name: "TO",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 100,
      },
      ...additionalColumns,
    ],
    [toggleSwitch]
  );

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IRawRow>["columns"];

  const exportTableProps = {
    fileName: "EconomicsParametersTable",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex", height: 28 }}>
        {isRoyalty && (
          <ApexMuiSwitch
            name="genericCustomSwitch"
            handleChange={(event) => {
              const { checked } = event.target;
              setToggleSwitch(checked);
            }}
            checked={toggleSwitch}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Generic"
            rightLabel="Custom"
          />
        )}
        <Tooltip
          key={"addRowToolTip"}
          title={"Add Row"}
          placement="bottom-end"
          arrow
        >
          <IconButton
            style={{
              height: "28px",
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              marginLeft: 4,
            }}
            onClick={() => {
              const lastSn = rows.length;
              const emptyRow = Object.keys(omit(rows[0], "sn")).reduce(
                (acc, v) => {
                  acc[v] = "";
                  return acc;
                },
                {} as Record<string, string>
              );
              const newRows = [...rows, { sn: lastSn + 1, ...emptyRow }];

              setRows(newRows);
            }}
            size="large"
          >
            <AddOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          key={"removeRowToolTip"}
          title={"Remove Row"}
          placement="bottom-end"
          arrow
        >
          <IconButton
            style={{
              height: "28px",
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              marginLeft: 5,
            }}
            onClick={() => {
              const lastSn = rows.length;
              const newRows = rows.slice(0, lastSn - 1);

              setRows(newRows);
            }}
            size="large"
          >
            <RemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ExcelExportTable<IRawRow> {...exportTableProps} />
      </div>
    ),
  };

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    onRowsChange: setRows,
    tableButtons: tableButtons,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  const BaseVariable = () => (
    <ApexSelectRS
      valueOption={basedOnOption}
      data={dataOptions.current}
      handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
        setBasedOnOption(option as ISelectOption)
      }
      menuPortalTarget={rootRef.current as HTMLDivElement}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.economicsParametersDeckManual.basedOnVariables.${row["parameterName"]}`,
        basedOnOption.value
      )
    );
  }, [basedOnOption.value]);

  return (
    <ApexFlexContainer
      ref={rootRef}
      flexDirection="column"
      alignItems="flex-start"
    >
      <ApexFlexContainer
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        height={60}
      >
        <AnalyticsText
          title="Current Variable"
          text={row.parameter as string}
          direction="Vertical"
          containerStyle={{ alignItems: "flex-start" }}
          textStyle={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            paddingLeft: 0,
          }}
        />
        <AnalyticsComp
          title="Base Variable"
          direction="Vertical"
          content={<BaseVariable />}
          containerStyle={{ width: 400 }}
        />
      </ApexFlexContainer>
      <div className={classes.economicsParametersTable}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </div>
    </ApexFlexContainer>
  );
};

export default EconomicsParametersTable;
