import { makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import uniqBy from "lodash/uniqBy";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ApexGridRolesState } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridState";
import {
  IRawRow,
  ITableIconsOptions,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { SelectEditor } from "../../../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/RootReducer";
import AddSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateColumnNameInfo from "../../../../Application/Utils/GenerateColumnNameInfo";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import ToTitleCase from "../../../../Application/Utils/ToTitleCase";
import {
  persistFileHeadersAction,
  persistTableHeadersAction,
  selectedRowAction,
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

export default function SelectHeaderUnitData() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { selectedWorksheetData } = useSelector(
    (state: RootState) => state.importReducer
  );

  //Generate actual ColumnHeaders
  const rawTableHeaders = getTableHeaders(selectedWorksheetData);

  //Fill in blank spaces in table data
  const cleanedTableData = cleanTableData(
    selectedWorksheetData,
    rawTableHeaders
  );

  //Generate Column name table
  const [columnNameTableHeaders, columnNameTableData] = generateColumnNameInfo(
    rawTableHeaders,
    cleanedTableData
  );

  //ROWS
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
  const [tableRoleNames, setTableRoleNames] = React.useState(
    initializeRoleNames()
  );

  const roleColumnNameTableData = columnNameTableData.map(
    (row: any, i: number) => ({
      role: tableRoleNames[i],
      ...row,
    })
  );
  const completeTableRows = AddSerialNumberToTable(roleColumnNameTableData);

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
  const indexRow = columnNameTableData[0];

  const { roleNames } = ApexGridRolesState;
  const roleOptions: RoleOptionsType = roleNames.map((name) => ({
    value: name,
    label: name,
  }));

  const [fileHeaders, setFileHeaders] = React.useState(rawTableHeaders);

  //COLUMNS
  const guardRolesIntegrity = (
    value: string,
    tableRoleNames: string[],
    sn: number
  ) => {
    console.log(
      "Logged output --> ~ file: SelectHeaderUnitData.tsx ~ line 123 ~ SelectHeaderUnitData ~ tableRoleNames",
      tableRoleNames
    );
    const finalRoles = [];

    for (let i = 0; i < tableRoleNames.length; i++) {
      if (i === sn - 1) finalRoles.push(value);
      else {
        if (value === "Data") {
          finalRoles.push(tableRoleNames[i]);
        } else if (value === "Headers") {
          if (tableRoleNames[i] === "Headers") finalRoles.push("Data");
          else finalRoles.push(tableRoleNames[i]);
        } else if (value === "Units") {
          // console.log(`${value} --> ${tableRoleNames[i]} --> ${i}`);
          if (tableRoleNames[i] === "Units") finalRoles.push("Data");
          else finalRoles.push(tableRoleNames[i]);
        } else {
          finalRoles.push(tableRoleNames[i]);
        }
      }
    }

    return finalRoles;
  };

  const generateColumns = (
    roleOptions: RoleOptionsType,
    tableRoleNames: string[]
  ) => {
    console.log(
      "Logged output --> ~ file: SelectHeaderUnitData.tsx ~ line 157 ~ SelectHeaderUnitData ~ tableRoleNames",
      tableRoleNames
    );
    const roles = tableRoleNames;
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
        editor: (p) => (
          <SelectEditor
            value={p.row.role as string}
            onChange={(value) => {
              // dispatch(selectedRowAction(p.row)); //why???
              p.onRowChange({ ...p.row, role: value }, true);
              dispatch(persistFileHeadersAction(fileHeaders));

              const sn = p.row.sn as number;
              const modifiedRoles = guardRolesIntegrity(value, roles, sn);
              console.log(
                "Logged output --> ~ file: SelectHeaderUnitData.tsx ~ line 183 ~ generateColumns ~ modifiedRoles",
                modifiedRoles
              );

              setTableRoleNames(modifiedRoles);
            }}
            options={roleOptions}
            rowHeight={p.rowHeight}
            menuPortalTarget={p.editorPortalTarget}
          />
        ),
        // editorOptions: { editOnClick: true },
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

  const columns = React.useMemo(
    () => generateColumns(roleOptions, tableRoleNames),
    [roleOptions, tableRoleNames]
  );

  React.useEffect(() => {
    dispatch(persistTableHeadersAction(columnNameTableHeaders));
    dispatch(persistFileHeadersAction(fileHeaders));
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootParseTable}>
      <ApexGrid<IRawRow, ITableIconsOptions>
        columns={columns}
        rows={completeTableRows}
        options={tableOptions}
        setRowsChange={setTableRoleNames}
      />
    </div>
  );
}
