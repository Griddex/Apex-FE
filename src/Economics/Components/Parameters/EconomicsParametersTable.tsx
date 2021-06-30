import {
  ClickAwayListener,
  IconButton,
  makeStyles,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import omit from "lodash.omit";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsText from "../../../Application/Components/Basic/AnalyticsText";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TVariableNameTitleData } from "../../../Application/Types/ApplicationTypes";
import swapVariableNameTitleForISelectOption from "../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import { IEconomicsParametersTable } from "./IParametersType";

const useStyles = makeStyles((theme) => ({
  economicsParametersTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90%",
    marginTop: 40,
  },
}));

const EconomicsParametersTable = ({
  row,
  additionalColumnsObj,
}: IEconomicsParametersTable) => {
  const classes = useStyles();
  const theme = useTheme();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reducer = "economicsReducer";

  const { costsRevenuesAppHeaders, economicsParametersAppHeaders } =
    useSelector((state: RootState) => state[reducer]);

  const additionalColumnsObjKeys = Object.keys(additionalColumnsObj);

  const createInitialRows = (numberOfRows = 3): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        from: "",
        to: "",
        ...additionalColumnsObjKeys.reduce(
          (acc, k) => ({ ...acc, [k]: "" }),
          {}
        ),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };

  const initialRows = createInitialRows(3);
  const [rows, setRows] = React.useState(initialRows);
  const [sRow, setSRow] = React.useState(-1);

  const additionalColumns = additionalColumnsObjKeys.map((k) => ({
    key: k,
    name: additionalColumnsObj[k],
    editable: true,
    editor: TextEditor,
    resizable: true,
  }));

  const generateColumns = () => {
    const columns: Column<IRawRow>[] = [
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
    ];

    return columns;
  };

  const exportColumns = generateColumns()
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
      <div style={{ display: "flex" }}>
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
            }}
            onClick={() => {
              const lastSn = rows.length;
              const emptyRow = Object.keys(omit(rows[0], "sn")).reduce(
                (acc, v) => ({ ...acc, [v]: "" }),
                {}
              );
              const newRows = [...rows, { sn: lastSn + 1, ...emptyRow }];

              setRows(newRows);
            }}
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
          >
            <RemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ExcelExportTable<IRawRow> {...exportTableProps} />
      </div>
    ),
  };

  const dataOptions = swapVariableNameTitleForISelectOption(
    costsRevenuesAppHeaders as TVariableNameTitleData
  );
  const valueOption = dataOptions[0];

  const handleBasedOnVariableChange = (
    value: ValueType<ISelectOption, false>,
    headerName: string
  ) => {
    const selectedValue = value && value.label;
    const selectedAppUnit = selectedValue as string;

    // setAppHeaderChosenAppUnitObj((prev) => ({
    //   ...prev,
    //   [headerName]: selectedAppUnit,
    // }));
  };

  return (
    <ApexFlexContainer
      ref={rootRef}
      flexDirection="column"
      alignItems="flex-start"
    >
      <ApexFlexContainer
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={60}
      >
        <AnalyticsText
          title="Current Variable"
          text={row.parameter as string}
          direction="Vertical"
          containerStyle={{ alignItems: "flex-start" }}
          textStyle={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        />
        <AnalyticsComp
          title="Select Base Variable"
          direction="Vertical"
          content={
            <ApexSelectRS
              valueOption={valueOption}
              data={dataOptions}
              handleSelect={(value: ValueType<ISelectOption, false>) =>
                handleBasedOnVariableChange(value, "oilRate")
              }
              menuPortalTarget={rootRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
          containerStyle={{ width: 400 }}
        />
      </ApexFlexContainer>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.economicsParametersTable}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={generateColumns()}
                rows={rows}
                onRowsChange={setRows}
                tableButtons={tableButtons}
                size={size}
                autoAdjustTableDim={true}
                showTableHeader={true}
                showTablePagination={true}
              />
            )}
          </SizeMe>
        </div>
      </ClickAwayListener>
    </ApexFlexContainer>
  );
};

export default EconomicsParametersTable;
