import { makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import zipObject from "lodash/zipObject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ITableIconsOptions,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { persistTableDataAction } from "../../../Redux/Actions/ImportActions";
import swapToChosenTableHeaders from "../../../Utils/SwapToChosenTableHeaders";

const useStyles = makeStyles((theme) => ({
  rootPreviewSave: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: "100%",
    fontSize: 14,
  },
  unitClassification: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

export default function PreviewSave({
  workflowProcess,
}: {
  workflowProcess: IAllWorkflowProcesses["workflowProcess"];
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowCategory = "importDataWorkflows";

  const {
    tableRoleNames,
    chosenApplicationHeaders,
    chosenApplicationUnits,
    columnNameTableData,
    selectedHeaderRowIndex,
    selectedUnitRowIndex,
  } = useSelector(
    (state: RootState) =>
      state.inputReducer[workflowCategory][
        workflowProcess as IAllWorkflowProcesses["workflowProcess"]
      ]
  );

  const unitsRow = zipObject(
    chosenApplicationHeaders,
    chosenApplicationUnits
  ) as IRawRow;
  const newUnitRow = { sn: 1, ...unitsRow };

  const applicationHeadertableData = swapToChosenTableHeaders(
    columnNameTableData,
    chosenApplicationHeaders
  );

  const dataRows = applicationHeadertableData.filter(
    (row: IRawRow, i: number) => {
      const condition = [
        selectedHeaderRowIndex as number,
        selectedUnitRowIndex as number,
      ].includes(i);

      if (!condition) return row;
    }
  );

  const orderedDataRows = dataRows.map((row: IRawRow, i: number) => ({
    sn: i + 2,
    ...row,
  }));

  const tableData = [newUnitRow, ...orderedDataRows];

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
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
        width: 100,
      },
      {
        key: "role",
        name: "Role",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const slicedTableRoleNames = tableRoleNames.slice(
            1,
            tableRoleNames.length
          );

          return (
            <div style={{ width: "100%", height: "95%" }}>
              {slicedTableRoleNames[rowSN - 1]}
            </div>
          );
        },
        width: 150,
      },
    ];

    //TODO: Check for uniqueness of file headers
    //otherwise error is thrown
    const otherColumns = chosenApplicationHeaders.map((columnName: string) => ({
      key: columnName,
      name: columnName.toLocaleUpperCase(),
      editable: true,
      resizable: true,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };

  const columns = generateColumns();

  React.useEffect(() => {
    dispatch(persistTableDataAction(tableData, workflowProcess));
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootPreviewSave}>
      <ApexGrid<IRawRow, ITableIconsOptions>
        columns={columns}
        rows={tableData}
        options={tableOptions}
      />
    </div>
  );
}
