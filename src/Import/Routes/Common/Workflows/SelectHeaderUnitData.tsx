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
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateColumnNameInfo from "../../../../Application/Utils/GenerateColumnNameInfo";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import {
  persistFileHeadersAction,
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

  const generateColumns = () => {
    const indexRow = columnNameTableData[0];

    type RoleOptionsType = {
      value: string;
      label: string;
    }[];

    const { roleNames } = ApexGridRolesState;
    const roleOptions: RoleOptionsType = roleNames.map((name) => ({
      value: name,
      label: name,
    }));
    const uniqueRoleOptions = uniqBy(roleOptions, (v) => v.label);

    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "actions",
        name: "Actions",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
      },
      {
        key: "role",
        name: "Role",
        editable: true,
        resizable: true,
        editor: (p) => (
          <SelectEditor
            value={p.row.role as string}
            onChange={(value) => {
              p.onRowChange({ ...p.row, role: value }, true);
              dispatch(selectedRowAction(p.row));
            }}
            options={uniqueRoleOptions}
            rowHeight={p.rowHeight}
            menuPortalTarget={p.editorPortalTarget}
          />
        ),
      },
    ];

    const otherColumns = Object.keys(indexRow).map((columnName: string) => ({
      key: columnName.toLocaleLowerCase(),
      name: columnName,
      editable: true,
      resizable: true,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };

  const columns = generateColumns();

  React.useEffect(() => {
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);

    dispatch(persistFileHeadersAction(columnNameTableHeaders));
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootParseTable}>
      <ApexGrid<IRawRow, ITableIconsOptions>
        columns={columns}
        rows={cleanedTableData}
        options={tableOptions}
      />
    </div>
  );
}
