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
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import {
  IExistingDataRow,
  IExistingDataProps,
} from "../../../../Application/Types/ApplicationTypes";
import { ChartType } from "../../../../Visualytics/Components/ChartTypes";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import { updateInputAction } from "../../../Redux/Actions/ImportActions";
import { IAuthor } from "./../../../../Application/Components/Author/AuthorTypes";

const useStyles = makeStyles((theme) => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "98%",
    height: "95%",
    minHeight: 525,
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[3],
    padding: 10,
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

const getExistingTitle = (wp: NonNullable<IExistingDataProps["wkPs"]>) => {
  if (wp.includes("facilities")) return "facilitiesInputDeckTitle";
  else if (wp.includes("forecast")) return "forecastInputDeckTitle";
  else return "";
};
const getExistingId = (wp: NonNullable<IExistingDataProps["wkPs"]>) => {
  if (wp.includes("facilities")) return "facilitiesInputDeckId";
  else if (wp.includes("forecast")) return "forecastInputDeckId";
  else return "";
};

export default function ExistingDataRoute<
  TRow extends IExistingDataRow = IExistingDataRow
>({
  snExistingData,
  dataKey,
  dataTitle,
  chartData,
  tableOptions,
  wkPs,
}: IExistingDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wp = wkPs as NonNullable<IExistingDataProps["wkPs"]>;
  // const wp = wkPs

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (
    row: TRow,
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    event: React.ChangeEvent<any>
  ) => {
    // const { name, value } = event.target;
    console.log(
      "Logged output --> ~ file: ExistingDataRoute.tsx ~ line 83 ~ event",
      event
    );

    const existingTitle = getExistingTitle(wp);
    const existingId = getExistingId(wp);
    dispatch(updateInputAction(existingTitle, row.title as string));
    dispatch(updateInputAction(existingId, row.id as string));

    setSelectedRows((prev) => prev.add(row.sn as number));
    setCheckboxSelected(!checkboxSelected);
  };

  const generateColumns = () => {
    const columns: Column<TRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "select",
        name: "SELECT",
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
        width: 200,
      },
      {
        key: "approvers",
        name: "APPROVERS",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <Approvers approvers={row.approvers} />;
        },
        width: 200,
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
  const columns = React.useMemo(() => generateColumns(), [selectedRows]);
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
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}
