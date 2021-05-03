import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import apexCheckbox from "../../../../Application/Components/Checkboxes/ApexCheckbox";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import addSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { IExistingEconomicsSensitivitiesRow } from "./EconomicsParametersSensitivitiesTypes";

const useStyles = makeStyles((theme) => ({
  rootExistingData: {
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
    height: "100%",
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
  dcaTable: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  visibilityOutlinedIcon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function ExistingEconomicsSensitivities() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const wc = "existingDataWorkflows";
  const wp = "economicsSensitivitiesExisting";

  //TODO: Maybe a transformation from Gift's end
  const existingSensitivitiesData = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  ) as IExistingEconomicsSensitivitiesRow[];

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IExistingEconomicsSensitivitiesRow) => {
    const name = "selectedEconomicsSensitivitiesId";
    const value = row.economicsSensitivitiesId;

    dispatch(updateEconomicsParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const ApexCheckboxColumn = apexCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IExistingEconomicsSensitivitiesRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const { sn } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EditOutlinedIcon
                onClick={() => {
                  alert(`Edit Row is:${row}`);
                  // dispatch(
                  //   showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  // );
                }}
              />
              <DeleteOutlinedIcon
                onClick={() => {
                  alert(`Delete Row is:${row}`);
                  // dispatch(
                  //   showDialogAction(deleteDialogParameters(selectedRowIndex))
                  // );
                }}
              />
              <MenuOpenOutlinedIcon
                onClick={() => alert(`Menu Row is:${row}`)}
              />
            </div>
          );
        },
        width: 120,
      },
      {
        key: "sensitivityTitle",
        name: "SENSITIVITY TITLE",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "targetVariable",
        name: "TARGET VARIABLE",
        editable: false,
        resizable: true,
        width: 150,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

  const snExistingSensitivitiesDataData = existingSensitivitiesData.map(
    (row, i) => ({ sn: i + 1, ...row })
  );

  const tableRows = React.useRef<IExistingEconomicsSensitivitiesRow[]>(
    snExistingSensitivitiesDataData
  );
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction("economicsSensitivitiesExisting", rows)
    );
    dispatch(hideSpinnerAction());
  }, [dispatch, rows]);

  return (
    <div className={classes.rootExistingData}>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IExistingEconomicsSensitivitiesRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
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
    </div>
  );
}
