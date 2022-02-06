import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ClickAwayListener } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { IDeclineCurveParametersDetail } from "../Components/Dialogs/StoredNetworksDialogTypes";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import generateSelectData from "./../../Application/Utils/GenerateSelectData";

const useStyles = makeStyles(() => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  status: {
    height: "100%",
    width: "100%",
    fontSize: 14,
  },
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedDeclineParametersDataSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedDeclineParametersData,
  (data) => data
);

export default function EditOrCreateDeclineParameters({
  currentRow,
  reducer,
  isDialog,
}: IStoredDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tableRef = React.useRef<HTMLDivElement>(null);

  const selectedDeclineParametersData = useSelector(
    selectedDeclineParametersDataSelector
  );

  const declineTypes = ["Exponential", "Hyperbolic", "Harmonic"];
  const declineTypeOptions = generateSelectData(declineTypes);

  const generateColumns = () => {
    const columns: Column<IDeclineCurveParametersDetail>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />

            {/*TODO Both functionalities below are tie-ins to the DCA module in V2 */}
            {/* <VisibilityOutlinedIcon
              onClick={() => alert(`View decline curve:${row}`)}
            />
            <AmpStoriesOutlinedIcon
              onClick={() => alert(`Calculate decline parameters:${row}`)}
            /> */}
          </div>
        ),
        width: 70,
      },
      // {
      //   key: "forecastVersion",
      //   name: "FORECAST VERSION",
      //   editable: false,
      //   resizable: true,
      //   minWidth: 250,
      // },
      // {
      //   key: "asset",
      //   name: "ASSET",
      //   editable: false,
      //   resizable: true,
      //   minWidth: 200,
      // },
      {
        key: "field",
        name: "FIELD",
        editable: false,
        resizable: true,
        minWidth: 200,
      },
      // {
      //   key: "reservoir",
      //   name: "RESERVOIR",
      //   editable: false,
      //   resizable: true,
      //   minWidth: 200,
      // },

      // {
      //   key: "drainagePoint",
      //   name: "DRAINAGE POINT",
      //   editable: false,
      //   resizable: true,
      //   minWidth: 250,
      // },
      {
        key: "string",
        name: "STRING",
        editable: false,
        resizable: true,
        minWidth: 70,
      },
      {
        key: "module",
        name: "MODULE",
        editable: false,
        resizable: true,
        minWidth: 250,
      },
      {
        key: "declineMethod",
        name: "DECLINE METHOD",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const currentSN = row.sn as number;
          const declineTypeOption = declineTypeOptions.find(
            (option) => option.value === row.declineMethod
          );

          return (
            <ApexSelectRS
              valueOption={declineTypeOption as ISelectOption}
              data={declineTypeOptions as ISelectOption[]}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                setRows((prev: any) => {
                  const newRows = [...prev];
                  const currentRow = newRows.find(
                    (row: any) => row.sn === currentSN
                  );

                  currentRow["declineMethod"] = option?.value as string;
                  newRows[currentSN - 1] = currentRow;

                  return newRows;
                });
              }}
              menuPortalTarget={tableRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          );
        },
        width: 150,
      },
      {
        key: "initOilGasRate1P1C",
        name: "INITIAL RATE (LOW)",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "initOilGasRate2P2C",
        name: "INITIAL RATE (BASE)",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "initOilGasRate3P3C",
        name: "INITIAL RATE (HIGH)",
        editable: false,
        resizable: true,
        width: 200,
      },

      {
        key: "rateofChangeRate1P1C",
        name: "DECLINE RATE (LOW)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "rateofChangeRate2P2C",
        name: "DECLINE RATE (BASE)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "rateofChangeRate3P3C",
        name: "DECLINE RATE (HIGH)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent1P1C",
        name: "DECLINE EXPONENT (LOW)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent2P2C",
        name: "DECLINE EXPONENT (BASE)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent3P3C",
        name: "DECLINE EXPONENT (HIGH)*",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(() => {
    if (isDialog) {
      return generateColumns();
    } else {
      return generateColumns().filter((col) => col.key !== "actions");
    }
  }, []);

  const snDeclineCurveParametersList = selectedDeclineParametersData.map(
    (row: any, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );

  const [sRow, setSRow] = React.useState(-1);
  const [rows, setRows] = React.useState(snDeclineCurveParametersList);

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IDeclineCurveParametersDetail>["columns"];

  const exportTableProps = {
    fileName: "DeclineCurveParameters",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IDeclineCurveParametersDetail>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <ExcelExportTable<IDeclineCurveParametersDetail> {...exportTableProps} />
    ),
  };

  React.useEffect(() => {
    dispatch(updateNetworkParameterAction("declineParameters", rows));
  }, [rows]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    onRowsChange: setRows,
    tableButtons: tableButtons,
    newTableRowHeight: 35,
    selectedRow: sRow,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  return (
    <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <div className={classes.rootStoredData} ref={tableRef}>
            <ApexGrid<IDeclineCurveParametersDetail, ITableButtonsProps>
              apexGridProps={getApexGridProps(size)}
            />
          </div>
        )}
      </SizeMe>
    </ClickAwayListener>
  );
}
