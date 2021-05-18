import { ClickAwayListener, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import { ChartType } from "../../../../Visualytics/Components/ChartTypes";
import apexCheckbox from "./../../../../Application/Components/Checkboxes/ApexCheckbox";

const useStyles = makeStyles((theme) => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "98%",
    height: "90%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[3],
    padding: 10,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center", //around, between
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
}));

export default function ExistingDataRoute<
  TRow extends IExistingDataRow = IExistingDataRow
>({
  snExistingData,
  dataKey,
  dataTitle,
  chartData,
  tableButtons,
  wkPs,
  showChart,
  containerStyle,
  handleCheckboxChange,
}: IExistingDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wp = wkPs as NonNullable<IExistingDataProps["wkPs"]>;

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const ApexCheckboxColumn = apexCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexCheckboxFxn: handleCheckboxChange as NonNullable<
      IExistingDataProps["handleCheckboxChange"]
    >,
  });

  const generateColumns = () => {
    const columns: Column<TRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
          </div>
        ),
        width: 100,
      },
      {
        key: "approval",
        name: "APPROVAL",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Approval approvalText={row.status} />;
        },
        width: 100,
      },
      {
        key: `${dataKey}`,
        name: `${dataTitle}`,
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "author",
        name: "AUTHOR",
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 200,
      },
      {
        key: "approvers",
        name: "APPROVERS",
        resizable: true,
        formatter: ({ row }) => {
          return <Approvers approvers={row.approvers} />;
        },
        width: 200,
      },
      {
        key: "createdOn",
        name: "CREATED",
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.createdOn}</div>;
        },
        // width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.modifiedOn}</div>;
        },
        // width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [selectedRows]);
  const tableRows = React.useRef<any>(snExistingData);
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData} style={containerStyle}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData as ChartType} />
        </div>
      )}

      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.workflowBody}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<TRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                tableButtons={tableButtons as ITableButtonsProps}
                newTableRowHeight={35}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                selectedRow={sRow}
                onSelectedRowChange={setSRow}
                onRowsChange={setRows}
                size={size}
                adjustTableDimAuto={true}
                showTableHeader={true}
                showTablePagination={true}
              />
            )}
          </SizeMe>
        </div>
      </ClickAwayListener>
    </div>
  );
}
