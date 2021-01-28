import { makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import { omit } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ApexGridRolesState } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridState";
import {
  IRawRow,
  IRawTable,
  ITableIconsOptions,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import AddSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateColumnNameInfo from "../../../../Application/Utils/GenerateColumnNameInfo";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import getTableUnits from "../../../../Application/Utils/GetTableUnits";
import ToTitleCase from "../../../../Application/Utils/ToTitleCase";
import {
  persistColumnNameTableDataAction,
  persistFileHeadersAction,
  persistFileUnitsAndUniqueUnitsAction,
  persistTableHeadersAction,
  persistTableRoleNamesAction,
} from "../../../Redux/Actions/ImportActions";

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
  workflowProcess,
}: {
  workflowProcess: IAllWorkflowProcesses["workflowProcess"];
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowCategory = "importDataWorkflows";

  const { selectedWorksheetData } = useSelector(
    (state: RootState) =>
      state.inputReducer[workflowCategory][
        workflowProcess as IAllWorkflowProcesses["workflowProcess"]
      ]
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
  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };
  type RoleOptionsType = {
    value: string;
    label: string;
  }[];
  const { roleNames } = ApexGridRolesState;
  const roleOptions: RoleOptionsType = roleNames.map((name) => ({
    value: name,
    label: name,
  }));

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
  const generateColumns = (roleOptions: RoleOptionsType) => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "actions",
        name: "Actions",
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
        name: "Role",
        editable: true,
        resizable: true,
        width: 150,
        formatter: ({ row, onRowChange }) => {
          const selectedSN = row.sn as number;
          const value = row.role;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={value as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();
                // event.nativeEvent.stopImmediatePropagation();
                const currentValue = event.target.value;

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

                guardRolesIntegrity(currentValue, selectedSN);
                setRerender((rerender) => !rerender);
              }}
            >
              {roleOptions.map((option, i: number) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        },
      },
    ];

    const otherColumns = Object.keys(indexRow).map((columnName: string) => ({
      key: ToTitleCase(columnName),
      name: columnName,
      editable: true,
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

  //Run once after 1st render
  React.useEffect(() => {
    dispatch(
      persistTableHeadersAction(columnNameTableHeaders, workflowProcess)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Run everytime rows or columns change
  React.useEffect(() => {
    dispatch(
      persistFileHeadersAction(
        selectedHeaderRowIndex,
        fileHeaders,
        workflowProcess
      )
    );
    dispatch(
      persistFileUnitsAndUniqueUnitsAction(
        selectedUnitRowIndex,
        fileUnits,
        fileUniqueUnits,
        workflowProcess
      )
    );
    dispatch(
      persistColumnNameTableDataAction(columnNameTableData, workflowProcess)
    );
    dispatch(
      persistTableRoleNamesAction(chosenTableRoleNames, workflowProcess)
    );

    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rows]);

  return (
    <div className={classes.rootParseTable}>
      <ApexGrid<IRawRow, ITableIconsOptions>
        columns={columns}
        rows={rows}
        options={tableOptions}
      />
    </div>
  );
}
