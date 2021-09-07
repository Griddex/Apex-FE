import { DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import omit from "lodash.omit";
import startCase from "lodash.startcase";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../Export/ExcelExportTable";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { ApexGrid } from "../Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../Table/TableButtonsTypes";
import { ReducersType } from "../Workflows/WorkflowTypes";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    height: "100%",
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  table: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={() => {
              dispatch(hideSpinnerAction());
              onClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const TableDataDialog = (props: DialogStuff) => {
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

  const { allHeadersNameTitleUniqueMap } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const { selectedTableData } = useSelector(
    (state: RootState) => state[reducer as ReducersType]
  );

  let sortedSelectedTableData;
  const { forecastHeadersNameMap } = useSelector(
    (state: RootState) => state.inputReducer
  );

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

  const columnKeys = Object.keys(snSelectedTableData[0]);
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
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={columns as Column<IRawRow>[]}
                rows={snSelectedTableData as IRawRow[]}
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
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default TableDataDialog;
