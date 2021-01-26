import { Checkbox, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import Status from "../../../../Application/Components/Status/Status";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IWorkflowProcessExtra } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { ChartType } from "../../../../Visualytics/Components/ChartTypes";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import { getWorkflowlabel } from "../../../Utils/GetWorkflowLabel";
import { IExistingDataRow } from "../InputLayoutTypes";

const useStyles = makeStyles(() => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "100%",
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

export default function ExistingDataWorkflow<
  TRow extends IExistingDataRow = IExistingDataRow
>({
  workflowProcess,
  snExistingData,
  dataKey,
  dataTitle,
  chartData,
  tableOptions,
}: IWorkflowProcessExtra) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (
    row: TRow,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.persist();
    alert(row);
    setCheckboxSelected(!checkboxSelected);
  };

  const generateColumns = () => {
    const columns: Column<TRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "select",
        name: "",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleCheckboxChange(row, event)}
            checked={checkboxSelected}
          />
        ),
        width: 50,
      },
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
        key: "status",
        name: "STATUS",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Status statusText={row.status} />;
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
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 300,
      },
      {
        key: "approvers",
        name: "APPROVERS",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <Approvers approvers={row.approvers} />;
        },
        width: 300,
      },
      {
        key: "createdOn",
        name: "CREATED",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.createdOn}</div>;
        },
        // width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.modifiedOn}</div>;
        },
        // width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);
  const tableRows = React.useRef<any>(snExistingData);
  const rows = tableRows.current;

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      <div className={classes.chart}>
        <DoughnutChart data={chartData as ChartType} />
      </div>
      <div className={classes.workflowBody}>
        <ApexGrid<TRow, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions as ITableIconsOptions}
          newTableRowHeight={35}
        />
      </div>
    </div>
  );
}
