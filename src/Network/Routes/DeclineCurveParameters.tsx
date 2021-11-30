import { ClickAwayListener } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import findIndex from "lodash.findindex";
import React, { ChangeEvent } from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { IDeclineCurveParametersDetail } from "../Components/Dialogs/StoredNetworksDialogTypes";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import generateSelectData from "./../../Application/Utils/GenerateSelectData";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { ISize } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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

const selectedDeclineParametersDataSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedDeclineParametersData,
  (data) => data
);

export default function DeclineCurveParameters({
  workflowProcess,
  containerStyle,
}: IStoredDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedDeclineParametersData = useSelector(
    selectedDeclineParametersDataSelector
  );

  const declineTypes = ["Exponential", "Hyperbolic", "Harmonic"];
  const declineTypeOptions = generateSelectData(declineTypes);

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IDeclineCurveParametersDetail) => {
    alert(row);
    setCheckboxSelected(!checkboxSelected);
  };

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IDeclineCurveParametersDetail>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />

            {/*Both functionalities below are tie-ins to the DCA module in V2 */}
            {/* <VisibilityOutlinedIcon
              onClick={() => alert(`View decline curve:${row}`)}
            />
            <AmpStoriesOutlinedIcon
              onClick={() => alert(`Calculate decline parameters:${row}`)}
            /> */}
          </div>
        ),
        width: 120,
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
        minWidth: 50,
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
        formatter: ({ row, onRowChange }) => {
          const module = row.module as string;
          const declineTypeValue = row.declineMethod as string;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={declineTypeValue as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();
                const selectedValue = event.target.value;

                onRowChange({
                  ...row,
                  declineMethod: selectedValue as string,
                });

                const selectedDeclineTypeOptionIndex = findIndex(
                  declineTypeOptions,
                  (option) => option.value === selectedValue
                );

                // setChosenApplicationDeclineTypeIndices((prev) => ({
                //   ...prev,
                //   [`${module}`]: selectedDeclineTypeOptionIndex,
                // }));

                modifyTableRows(module, selectedDeclineTypeOptionIndex);
                setRerender((rerender) => !rerender);
              }}
            >
              {declineTypeOptions.map((option, i: number) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
        name: "DECLINE RATE (LOW)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "rateofChangeRate2P2C",
        name: "DECLINE RATE (BASE)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "rateofChangeRate3P3C",
        name: "DECLINE RATE (HIGH)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent1P1C",
        name: "DECLINE EXPONENT (LOW)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent2P2C",
        name: "DECLINE EXPONENT (BASE)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
      {
        key: "declineExponent3P3C",
        name: "DECLINE EXPONENT (HIGH)",
        editable: true,
        editor: TextEditor,
        resizable: true,
        width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  const snDeclineCurveParametersList = selectedDeclineParametersData.map(
    (row: any, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );

  const tableRows = React.useRef<IDeclineCurveParametersDetail[]>(
    snDeclineCurveParametersList
  );

  const [, setRerender] = React.useState(false);

  const modifyTableRows = (
    selectedModule: string,
    selectedDeclineTypeOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.module === selectedModule) {
        return {
          ...row,
          sn: i + 1,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };
  const rows = tableRows.current;

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
    dispatch(hideSpinnerAction());

    dispatch(updateNetworkParameterAction("declineParameters", rows));
  }, [dispatch, rows]);

  const [sRow, setSRow] = React.useState(-1);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
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
          <div className={classes.rootStoredData}>
            <ApexGrid<IDeclineCurveParametersDetail, ITableButtonsProps>
              apexGridProps={getApexGridProps(size)}
            />
          </div>
        )}
      </SizeMe>
    </ClickAwayListener>
  );
}
