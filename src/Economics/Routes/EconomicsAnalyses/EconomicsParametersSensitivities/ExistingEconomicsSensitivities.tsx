import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import apexCheckbox from "../../../../Application/Components/Checkboxes/ApexCheckbox";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import addSerialNumberToTable from "../../../../Application/Utils/AddSerialNumberToTable";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { IExistingEconomicsSensitivitiesRow } from "./EconomicsParametersSensitivitiesTypes";
import { IApplicationExistingDataRow } from "./../../../../Application/Types/ApplicationTypes";
import { economicsAnalysesNameTitlesObj } from "../../../Data/EconomicsData";
import { TEconomicsAnalysesNames } from "../EconomicsAnalysesTypes";

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

  const transExistingSensitivitiesData = (existingSensitivitiesData as IApplicationExistingDataRow[]).map(
    (row, i) => ({
      sn: i + 1,
      economicsSensitivitiesId: row.id,
      status: "Not Started",
      title: row.title,
      analysisName: row.analysisName,
      description: row.description,
      author: "---",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
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
            <CenteredStyle>
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
            </CenteredStyle>
          );
        },
        width: 120,
      },
      {
        key: "title",
        name: "SENSITIVITY TITLE",
        editable: false,
        resizable: true,
        width: 250,
      },
      {
        key: "analysisName",
        name: "ANALYSIS TITLE",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const analysisName = row.analysisName as TEconomicsAnalysesNames;
          console.log(
            "Logged output --> ~ file: ExistingEconomicsSensitivities.tsx ~ line 184 ~ generateColumns ~ analysisName",
            analysisName
          );
          const analysisTitle = economicsAnalysesNameTitlesObj[analysisName];
          console.log(
            "Logged output --> ~ file: ExistingEconomicsSensitivities.tsx ~ line 186 ~ generateColumns ~ economicsAnalysesNameTitlesObj",
            economicsAnalysesNameTitlesObj
          );
          console.log(
            "Logged output --> ~ file: ExistingEconomicsSensitivities.tsx ~ line 186 ~ generateColumns ~ analysisTitle",
            analysisTitle
          );

          return <CenteredStyle>{analysisTitle}</CenteredStyle>;
        },
        width: 150,
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
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

  const tableRows = React.useRef<IExistingEconomicsSensitivitiesRow[]>(
    transExistingSensitivitiesData
  );
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

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
