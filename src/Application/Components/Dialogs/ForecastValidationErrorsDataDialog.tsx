import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import startCase from "lodash.startcase";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { SizeMe } from "react-sizeme";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import DeckValidation from "../DeckValidation/DeckValidation";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../Export/ExcelExportTable";
import ApexGrid from "../Table/ReactDataGrid/ApexGrid";
import { IRawRow, ISize } from "../Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../Table/TableButtonsTypes";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const ForecastValidationErrorsDataDialog: React.FC<DialogStuff> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    validationErrorsData,
    dialogText,
  } = props;

  const validationErrorsDataDefined = validationErrorsData as any[];
  const getColumnWidth = (column: string) => {
    switch (column) {
      case "sn":
        return 50;
      case "module":
        return 150;
      case "class":
        return 100;
      default:
        return null;
    }
  };
  const columns = ["sn", "module", "class", "description"].map((k) => {
    return {
      key: k,
      name: startCase(k).toUpperCase(),
      editable: false,
      resizable: true,
      ...(k === "class" && {
        formatter: ({ row }: any) => (
          <DeckValidation deckValidationText={row.class} />
        ),
      }),
      width: getColumnWidth(k),
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
        data: validationErrorsDataDefined,
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
    rows: validationErrorsDataDefined.map((row, i) => {
      row["sn"] = i + 1;
      return row;
    }) as IRawRow[],
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
          <Typography variant="body1">{dialogText}</Typography>
          <br />
          <br />
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
          </SizeMe>
        </div>
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default ForecastValidationErrorsDataDialog;
