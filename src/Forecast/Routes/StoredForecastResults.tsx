import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../Application/Components/Approval/Approval";
import Author from "../../Application/Components/Author/Author";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { IApexEditorRow } from "../../Application/Components/Editors/ApexEditor";
import Saved from "../../Application/Components/Saved/Saved";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import {
  IApplicationStoredForecastResultsRow,
  IStoredDataProps,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { updateNetworkParameterAction } from "../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchStoredForecastingResultsRequestAction,
  fetchTreeviewKeysRequestAction,
  getForecastDataByIdRequestAction,
  runForecastEconomicsAggregationRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IStoredForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";
import { IApexEditor } from "./../../Application/Components/Editors/ApexEditor";

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

//TODO: Calculate classification data from collection
export default function StoredForecastResults({
  showChart,
  showBaseButtons,
  shouldRunAggregation,
}: IStoredDataProps) {
  const reducer = "forecastReducer";
  const mainUrl = `${getBaseForecastUrl()}`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "storedDataWorkflows";
  const wp = "forecastResultsStored";

  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const chartData = [
    { id: "A", value: 10, color: theme.palette.primary.main },
    { id: "B", value: 20, color: theme.palette.success.main },
    { id: "C", value: 30, color: theme.palette.secondary.main },
  ];

  const componentRef = React.useRef();

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const { forecastResultsStored } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
    componentRef,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredForecastResultsRow) => {
    const id = row.forecastResultsId as string;
    const title = row.forecastResultsTitle as string;
    const saved = row.saved as string;
    const isSaved = saved === "Saved" ? true : false;
    const networkId = row.networkId as string;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("forecastReducer", {
          selectedForecastingResultsId: id,
          selectedForecastingResultsTitle: title,
        })
      );

    dispatch(
      updateForecastResultsParameterAction("isForecastResultsSaved", isSaved)
    );

    dispatch(updateNetworkParameterAction("selectedNetworkId", networkId));

    setCheckboxSelected(!checkboxSelected);
  };

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const dividerPositions = [50];

  const generateColumns = () => {
    const columns: Column<IStoredForecastResultsRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const sn = row.sn as number;
          const title = row.forecastResultsTitle as string;
          const id = row.forecastResultsId as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editedRow = rows[sn - 1];
          const editorData = [
            {
              name: "title",
              title: "FORECAST RESULTS TITLE",
              value: row["forecastResultsTitle"],
              editorType: "input",
            },
            {
              name: "description",
              title: "Description",
              value: row["description"],
              editorType: "textArea",
            },
          ] as IApexEditorRow[];

          const apexEditorProps = {
            editorData,
            editedRow,
            dividerPositions,
            rows,
            setRows,
            shouldUpdate,
            // } as IApexEditor<IStoredForecastResultsRow>;
          } as IApexEditor;

          return (
            <ApexFlexContainer>
              <EditOutlinedIcon
                onClick={() => {
                  const dialogParameters: DialogStuff = {
                    name: "Edit_Table_Dialog",
                    title: "Edit Table",
                    type: "tableEditorDialog",
                    show: true,
                    exclusive: true,
                    maxWidth: "xs",
                    iconType: "edit",
                    apexEditorProps,
                    actionsList: () =>
                      DialogOneCancelButtons(
                        [true, true],
                        [true, false],
                        [
                          unloadDialogsAction,
                          //Captured variable
                          //solve with componentRef
                          () => setShouldUpdate(!shouldUpdate),
                        ],
                        "Update",
                        "updateOutlined"
                      ),
                  };

                  dispatch(showDialogAction(dialogParameters));
                }}
              />
              <DeleteOutlinedIcon
                onClick={() =>
                  dispatch(
                    showDialogAction(
                      confirmationDialogParameters(
                        "Delete_Table_Data_Dialog",
                        title,
                        "deleteDataDialog",
                        "",
                        false,
                        true,
                        () =>
                          deleteDataByIdRequestAction(
                            reducer as ReducersType,
                            deleteUrl as string,
                            title as string,
                            () =>
                              fetchStoredForecastingResultsRequestAction(
                                currentProjectId
                              )
                          ),
                        "Delete",
                        "deleteOutlined",
                        "delete"
                      )
                    )
                  )
                }
              />
              <MenuOpenOutlinedIcon
                onClick={() =>
                  dispatch(
                    getTableDataByIdRequestAction(
                      reducer as ReducersType,
                      `${mainUrl}/${row.id}`,
                      row.forecastParametersTitle as string
                    )
                  )
                }
              />
            </ApexFlexContainer>
          );
        },
        width: 120,
      },
      {
        key: "approval",
        name: "APPROVAL",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Approval approvalText={row.approval} />;
        },
        width: 100,
      },
      {
        key: "saved",
        name: "SAVED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Saved savedText={row.saved} />;
        },
        width: 100,
      },
      {
        key: "forecastResultsTitle",
        name: "FORECAST RESULTS TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastInputDeckTitle",
        name: "FORECAST INPUTDECK TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastParametersTitle",
        name: "FORECAST PARAMETERS TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "author",
        name: "AUTHOR",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 200,
      },
      {
        key: "createdOn",
        name: "CREATED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return (
            <div>
              {formatDate(
                new Date(row.createdOn),
                dayFormat,
                monthFormat,
                yearFormat
              )}
            </div>
          );
        },
        width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return (
            <div>
              {formatDate(
                new Date(row.modifiedOn),
                dayFormat,
                monthFormat,
                yearFormat
              )}
            </div>
          );
        },
        width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

  const snStoredData = forecastResultsStored.map(
    (row: IApplicationStoredForecastResultsRow, i: number) => ({
      sn: i + 1,
      forecastResultsId: row.id,
      forecastResultsTitle: row.title,
      description: row.description,
      saved: row.saved,
      approval: "Not Started",
      networkId: row.networkId,
      forecastInputDeckTitle: row.forecastInputDeckTitle,
      forecastParametersTitle: row.forecastingParametersGroupTitle,
      author: { avatarUrl: "", name: "None" },
      approvers: "---",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  ) as IStoredForecastResultsRow[];

  const [rows, setRows] = React.useState(snStoredData);

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  React.useEffect(() => {
    setRows(snStoredData as IStoredForecastResultsRow[]);
  }, [snStoredData]);

  const [sRow, setSRow] = React.useState(-1);

  return (
    <div className={classes.rootStoredData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} willUseThemeColor={false} />
        </div>
      )}
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IStoredForecastResultsRow, ITableButtonsProps>
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
      </ClickAwayListener>
      {showBaseButtons && (
        <ApexFlexContainer
          justifyContent="space-between"
          height={50}
          moreStyles={{ marginBottom: 4, width: 270 }}
        >
          <BaseButtons
            buttonTexts={["View Table", "Plot Chart"]}
            variants={["contained", "contained"]}
            colors={["secondary", "primary"]}
            startIcons={[
              <TableChartOutlinedIcon key={1} />,
              <InsertPhotoOutlinedIcon key={2} />,
            ]}
            disableds={[sRow === -1, sRow === -1]}
            shouldExecute={[true, true]}
            shouldDispatch={[false, false]}
            finalActions={[
              () => {
                dispatch(
                  getForecastDataByIdRequestAction(
                    "forecastResultsVisualytics",
                    true,
                    "/apex/forecast/forecastdata"
                  )
                );
              },
              () => dispatch(fetchTreeviewKeysRequestAction()),
            ]}
          />
        </ApexFlexContainer>
      )}
    </div>
  );
}
