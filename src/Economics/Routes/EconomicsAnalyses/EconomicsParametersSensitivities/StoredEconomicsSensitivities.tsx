import { makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Author from "../../../../Application/Components/Author/Author";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../../Application/Types/ApplicationTypes";
import { economicsAnalysesNameTitlesObj } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { TEconomicsAnalysesNames } from "../EconomicsAnalysesTypes";
import { IStoredEconomicsSensitivitiesRow } from "./EconomicsParametersSensitivitiesTypes";

const useStyles = makeStyles((theme) => ({
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

export default function StoredEconomicsSensitivities() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const wc = "storedDataWorkflows";
  const wp = "economicsSensitivitiesStored";

  //TODO: Maybe a transformation from Gift's end
  const storedSensitivitiesData = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  ) as IStoredEconomicsSensitivitiesRow[];

  const transStoredSensitivitiesData = (
    storedSensitivitiesData as IApplicationStoredDataRow[]
  ).map((row, i) => ({
    sn: i + 1,
    economicsSensitivitiesId: row.id,
    approval: "Not Started",
    title: row.title,
    analysisName: row.analysisName,
    description: row.description,
    author: { avatarUrl: "", name: "None" },
    createdOn: row.createdAt,
    modifiedOn: row.createdAt,
  })) as IStoredEconomicsSensitivitiesRow[];

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredEconomicsSensitivitiesRow) => {
    const name = "selectedEconomicsSensitivitiesId";
    const value = row.economicsSensitivitiesId;

    dispatch(updateEconomicsParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IStoredEconomicsSensitivitiesRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const { sn } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <ApexFlexContainer>
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
            </ApexFlexContainer>
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
          const analysisTitle = economicsAnalysesNameTitlesObj[analysisName];

          return <ApexFlexContainer>{analysisTitle}</ApexFlexContainer>;
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

  const tableRows = React.useRef<IStoredEconomicsSensitivitiesRow[]>(
    transStoredSensitivitiesData
  );
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  return (
    <div className={classes.rootStoredData}>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IStoredEconomicsSensitivitiesRow, ITableButtonsProps>
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
              autoAdjustTableDim={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}