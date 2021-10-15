import makeStyles from "@mui/styles/makeStyles";
import { zipObject } from "lodash";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { persistTableDataAction } from "../../Import/Redux/Actions/InputActions";

const ApexGrid = React.lazy(
  () => import("../../Application/Components/Table/ReactDataGrid/ApexGrid")
);

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export default function VisualyticsPreviewSave({
  reducer,
  wrkflwPrcss,
  wrkflwCtgry,
}: IAllWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const workflowProcessSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp],
    (wrkflwPrcss) => wrkflwPrcss
  );

  const { tableRoleNames, columnNameTableData } = useSelector(
    workflowProcessSelector
  );

  const headersIndex = tableRoleNames.indexOf("Headers");
  const unitsIndex = tableRoleNames.indexOf("Units");
  const headersRow = columnNameTableData[headersIndex];
  const unitsRow = columnNameTableData[unitsIndex];
  const headerTitles = Object.values(headersRow) as string[];
  const columnNames = Object.keys(headersRow) as string[];

  const orderedDataRows = columnNameTableData.filter(
    (row: IRawRow, i: number) => {
      if (![headersIndex, unitsIndex].includes(i)) return row;
    }
  );

  const tableData = [headersRow, unitsRow, ...orderedDataRows];

  const previewtableData = tableData.slice(1).map((row, i) => {
    const values = Object.values(row);
    const headerTitleRow = zipObject(headerTitles, values);

    if (i === 0) return { sn: i + 1, role: "Units", ...headerTitleRow };
    else return { sn: i + 1, role: "Data", ...headerTitleRow };
  });

  const generateColumns = () => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "role",
        name: "ROLE",
        headerRenderer: (props) => <div>{"NEWROLE"}</div>,
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const slicedTableRoleNames = tableRoleNames.slice(1);

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

    const otherColumns = headerTitles.map((header: string) => ({
      key: header,
      name: header.toLocaleUpperCase(),
      resizable: true,
      width: 220,
    }));
    // const otherColumns = columnNames.map((columnName: string) => ({
    //   key: columnName,
    //   name: columnName.toLocaleUpperCase(),
    //   resizable: true,
    //   width: 220,
    // }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };

  const columns = generateColumns();

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
    fileName: "PreviewSave",
    tableData: {
      Template: {
        data: tableData,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  React.useEffect(() => {
    dispatch(persistTableDataAction(reducer, tableData, wp));

    dispatch(hideSpinnerAction());
  }, []);

  return (
    <div className={classes.rootPreviewSave}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid
            columns={columns}
            rows={previewtableData}
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
