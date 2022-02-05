import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import makeStyles from "@mui/styles/makeStyles";
import omit from "lodash.omit";
import startCase from "lodash.startcase";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../Export/ExcelExportTable";
import ApexGrid from "../Table/ReactDataGrid/ApexGrid";
import { IRawRow, ISize } from "../Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../Table/TableButtonsTypes";
import { TReducer } from "../Workflows/WorkflowTypes";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles(() => ({
  table: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const allHeadersNameTitleUniqueMapSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer.allHeadersNameTitleUniqueMap,
  (uniqueMap) => uniqueMap
);

const TableDataDialog: React.FC<DialogStuff> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    setRows,
    reducer,
    workflowProcess,
  } = props;

  const allHeadersNameTitleUniqueMap = useSelector(
    allHeadersNameTitleUniqueMapSelector
  );

  const selectedTableDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer as TReducer]["selectedTableData"],
    (table) => table
  );

  const selectedTableData = useSelector(selectedTableDataSelector);

  const forecastHeadersNameMapSelector = createDeepEqualSelector(
    (state: RootState) => state.inputReducer.forecastHeadersNameMap,
    (uniqueMap) => uniqueMap
  );
  const forecastHeadersNameMap = useSelector(forecastHeadersNameMapSelector);

  let sortedSelectedTableData;
  if (workflowProcess?.toLowerCase().includes("forecast")) {
    const headerNames = Object.values(forecastHeadersNameMap) as string[];

    sortedSelectedTableData = selectedTableData.map(
      (row: Record<string, React.Key>) => {
        const newRow = headerNames.reduce((acc, header) => {
          return { ...acc, [header]: row[header] };
        }, {});

        return newRow;
      }
    );
  }

  const finalSelectedData = sortedSelectedTableData
    ? sortedSelectedTableData
    : selectedTableData;

  const snSelectedTableData = finalSelectedData.map(
    (row: IRawRow, i: number) => {
      const rowFiltered = omit(row, ["id", "_id"]);

      return { sn: i + 1, ...rowFiltered };
    }
  );

  const tData = snSelectedTableData[0] ? snSelectedTableData[0] : {};
  const columnKeys = Object.keys(tData);
  const columns = columnKeys.map((k) => {
    const name = allHeadersNameTitleUniqueMap[k]?.toUpperCase();

    return {
      key: k,
      name: name ? name : startCase(k).toUpperCase(),
      editable: false,
      resizable: true,
      minWidth: k.toLowerCase().trim() === "sn" ? 50 : 150,
    };
  });

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      value: column.key,
      label: column.name,
    })) as IExcelSheetData<IRawRow>["columns"];

  const exportTableProps = {
    fileName: title,
    tableData: {
      Template: {
        data: snSelectedTableData,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  const getApexGridProps = (size: ISize) => ({
    columns: columns as Column<IRawRow>[],
    rows: snSelectedTableData as IRawRow[],
    onRowsChange: setRows,
    tableButtons: tableButtons,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
          </SizeMe>
        </div>
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default TableDataDialog;
