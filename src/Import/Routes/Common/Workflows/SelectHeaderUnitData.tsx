import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import { omit } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  ISelectOption,
  SelectOptionsType,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ApexGridRolesState } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridState";
import {
  IRawRow,
  IRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import AddSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateColumnNameInfo from "../../../../Application/Utils/GenerateColumnNameInfo";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import getTableUnits from "../../../../Application/Utils/GetTableUnits";
import ToTitleCase from "../../../../Application/Utils/ToTitleCase";
import {
  persistColumnNameTableDataAction,
  persistFileHeadersAction,
  persistFileUnitsAndUniqueUnitsAction,
  persistTableHeadersAction,
  persistTableRoleNamesAction,
} from "../../../Redux/Actions/InputActions";
import getRSStyles from "./../../../Utils/GetRSStyles";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";

const useStyles = makeStyles(() => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function SelectHeaderUnitData({
  reducer,
  wrkflwPrcss,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const { selectedWorksheetData } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

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
  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const { roleNames } = ApexGridRolesState;
  const roleOptions: SelectOptionsType = generateSelectOptions(roleNames);

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
  const [chosenTableRoleNames, setChosenTableRoleNames] = React.useState(
    tableRoleNames
  );
  const roleNameTableRows = columnNameTableData.map((row: any, i: number) => ({
    role: tableRoleNames[i],
    ...row,
  }));
  const initialTableRows = AddSerialNumberToTable(roleNameTableRows);

  const tableRows = React.useRef<IRawTable>(initialTableRows);
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

  const generateColumns = (roleOptions: SelectOptionsType) => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        width: 100,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row.sn}`)} />
            <DeleteOutlinedIcon
              onClick={() => alert(`Delete Row is:${row.sn}`)}
            />
            <MenuOpenOutlinedIcon
              onClick={() => alert(`Menu Row is:${row.sn}`)}
            />
          </div>
        ),
      },
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
              theme={(thm) => ({
                ...thm,
                borderRadius: 0,
                colors: {
                  ...thm.colors,
                  primary50: theme.palette.primary.light,
                  primary25: theme.palette.primary.main,
                  primary: theme.palette.grey[700],
                },
              })}
            />
          );
        },
      },
    ];

    const otherColumns = Object.keys(indexRow).map((columnName: string) => ({
      key: ToTitleCase(columnName),
      name: columnName,
      resizable: true,
      width: 200,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };
  const columns = React.useMemo(() => generateColumns(roleOptions), [
    roleOptions,
    rows,
  ]);

  React.useEffect(() => {
    dispatch(persistTableHeadersAction(reducer, columnNameTableHeaders, wp));
  }, []);

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
          />
        )}
      </SizeMe>
    </div>
  );
}
