import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { omit } from "lodash";
import capitalize from "lodash.capitalize";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import {
  ISelectOption,
  TSelectOptions,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ApexGridRolesState } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridState";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import addSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateColumnNameInfo from "../../../../Application/Utils/GenerateColumnNameInfo";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import getTableUnits from "../../../../Application/Utils/GetTableUnits";
import {
  persistColumnNameTableDataAction,
  persistFileHeadersAction,
  persistFileUnitsAndUniqueUnitsAction,
  persistTableRoleNamesAction,
} from "../../../Redux/Actions/InputActions";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: theme.breakpoints.values["md"],
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function SelectHeaderUnitData({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
}: IAllWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const workflowProcessSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp],
    (wrkflwPrcss) => wrkflwPrcss
  );

  const { selectedWorksheetData } = useSelector(workflowProcessSelector);

  //Generate actual ColumnHeaders
  const rawTableHeaders = getTableHeaders(selectedWorksheetData);

  //Fill in blank spaces in table data
  const cleanedTableData = cleanTableData(
    selectedWorksheetData,
    rawTableHeaders
  );

  const [rawTableUnits, rawTableUniqueUnits] = getTableUnits(cleanedTableData);
  const [fileHeaders, setFileHeaders] = React.useState(rawTableHeaders);
  const [selectedHeaderRowIndex, setSelectedHeaderRowIndex] = React.useState(0);
  const [fileUnits, setFileUnits] = React.useState(rawTableUnits);
  const [selectedUnitRowIndex, setSelectedUnitRowIndex] = React.useState(1);
  const [fileUniqueUnits] = React.useState(rawTableUniqueUnits);

  //Generate Column name table
  const [columnNameTableHeaders, columnNameTableData] = generateColumnNameInfo(
    rawTableHeaders,
    cleanedTableData
  );

  //TABLE OPTIONS

  const { roleNames } = ApexGridRolesState;
  const roleOptions: TSelectOptions = generateSelectOptions(roleNames);

  const initializeRoleNames = () => {
    const roleNames = [];

    for (let i = 0; i < columnNameTableData.length; i++) {
      if (i === 0) roleNames.push("Headers");
      else if (i === 1) roleNames.push("Units");
      else roleNames.push("Data");
    }

    return roleNames;
  };

  //Need to memoize initial table roles for reset???
  const tableRoleNames = initializeRoleNames();
  const [chosenTableRoleNames, setChosenTableRoleNames] =
    React.useState(tableRoleNames);
  const roleNameTableRows = columnNameTableData.map((row: any, i: number) => ({
    role: tableRoleNames[i],
    ...row,
  }));
  const initialTableRows = addSerialNumberToTable(roleNameTableRows);

  const tableRows = React.useRef<TRawTable>(initialTableRows);
  const [, setRerender] = React.useState(false);
  const guardRolesIntegrity = (value: string, selectedSN: number) => {
    const modifiedRows = [];
    const modifiedRoleNames = [];

    for (let i = 0; i < tableRows.current.length; i++) {
      const row = tableRows.current[i];
      const rowRole = row.role as string;

      if (i === selectedSN - 1) {
        modifiedRows.push({ ...row, role: value });
        modifiedRoleNames.push(value);
      } else {
        switch (value) {
          case "Data":
            modifiedRows.push(row);
            modifiedRoleNames.push("Data");
            break;
          case "Headers":
            if (row.role === "Headers") {
              modifiedRows.push({ ...row, role: "Data" });
              modifiedRoleNames.push("Data");
            } else {
              modifiedRows.push(row);
              modifiedRoleNames.push(rowRole);
            }
            break;
          case "Units":
            if (row.role === "Units") {
              modifiedRows.push({ ...row, role: "Data" });
              modifiedRoleNames.push("Data");
            } else {
              modifiedRows.push(row);
              modifiedRoleNames.push(rowRole);
            }
            break;
          default:
            modifiedRows.push(row);
            modifiedRoleNames.push(rowRole);
            break;
        }
      }
    }

    tableRows.current = modifiedRows;
    setChosenTableRoleNames(modifiedRoleNames);
  };

  const rows = tableRows.current;
  const indexRow = columnNameTableData[0];

  const generateColumns = (roleOptions: TSelectOptions) => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },

      {
        key: "role",
        name: "ROLE",
        resizable: true,
        width: 150,
        formatter: ({ row, onRowChange }) => {
          const selectedSN = row.sn as number;
          const value = row.role as string;
          const valueOption = generateSelectOptions([value])[0];
          const RSStyles = getRSStyles(theme);

          const handleSelect = (value: ValueType<ISelectOption, false>) => {
            const currentValue = value && value.label;

            onRowChange({
              ...row,
              role: currentValue as string,
            });
            if (currentValue === "Headers") {
              const headersObj = omit(row, ["sn", "role"]);
              const fileHeaders = Object.values(headersObj) as string[];
              setFileHeaders(fileHeaders);
              setSelectedHeaderRowIndex(selectedSN - 1);
            }
            if (currentValue === "Units") {
              const unitsObj = omit(row, ["sn", "role"]);
              const fileUnits = Object.values(unitsObj) as string[];
              setFileUnits(fileUnits);
              setSelectedUnitRowIndex(selectedSN - 1);
            }

            guardRolesIntegrity(currentValue as string, selectedSN);
            setRerender((rerender) => !rerender);
          };

          return (
            <Select
              value={valueOption}
              options={roleOptions}
              styles={RSStyles}
              onChange={handleSelect}
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          );
        },
      },
    ];

    const otherColumns = Object.keys(indexRow).map((columnName: string) => ({
      key: capitalize(columnName),
      name: columnName,
      resizable: true,
      width: 200,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };
  const columns = React.useMemo(
    () => generateColumns(roleOptions),
    [roleOptions, rows]
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
    fileName: "SelectHeaderUnitData",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  React.useEffect(() => {
    dispatch(
      persistFileHeadersAction(reducer, selectedHeaderRowIndex, fileHeaders, wp)
    );
    dispatch(
      persistFileUnitsAndUniqueUnitsAction(
        reducer,
        selectedUnitRowIndex,
        fileUnits,
        fileUniqueUnits,
        wp
      )
    );
    dispatch(
      persistColumnNameTableDataAction(reducer, columnNameTableData, wp)
    );
    dispatch(persistTableRoleNamesAction(reducer, chosenTableRoleNames, wp));

    dispatch(hideSpinnerAction());
  }, [rows]);

  return (
    <div className={classes.rootParseTable}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid<IRawRow, ITableButtonsProps>
            columns={columns}
            rows={rows}
            tableButtons={tableButtons}
            size={size}
            autoAdjustTableDim={true}
            showTableHeader={true}
            showTablePagination={true}
          />
        )}
      </SizeMe>
    </div>
  );
}
