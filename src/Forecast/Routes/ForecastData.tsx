import { ClickAwayListener } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import groupBy from "lodash.groupby";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import Select, {
  components,
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
  Props as SelectProps,
} from "react-select";
import { SizeMe } from "react-sizeme";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../Application/Components/Selects/SelectItemsType";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import {
  getForecastDataByIdRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IForecastRoutes } from "./ForecastRoutesTypes";

const rowGrouper = groupBy;
const useStyles = makeStyles((theme) => ({
  rootStoredData: {
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
    justifyContent: "center",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  apexSelectRS: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: 30,
    width: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedTableDataSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedTableData,
  (data) => data
);

const selectedForecastingResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedForecastingResultsTitle,
  (data) => data
);

export default function ForecastData({
  wrkflwCtgry,
  wrkflwPrcss,
  containerStyle,
}: IForecastRoutes) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const wp = wrkflwPrcss as NonNullable<IStoredDataProps["wkPs"]>;
  const selectedTableData = useSelector(selectedTableDataSelector);

  const snSelectedForecastData = selectedTableData.map(
    (row: any, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  let forecastDataWithTimeKeys = [] as string[];
  let forecastDataWithTimeColumns = [] as Column<IRawRow>[];
  if (forecastDataWithTimeKeys.length > 0) {
    forecastDataWithTimeKeys = Object.keys(snSelectedForecastData[0]).filter(
      (key) => key.trim().toLowerCase().startsWith("y")
    );

    forecastDataWithTimeColumns = forecastDataWithTimeKeys.map((k) => ({
      key: k,
      name: k,
      editable: false,
      resizable: true,
      width: 100,
    }));
  } else {
    forecastDataWithTimeColumns = [];
  }

  /*  const generateColumns = () => {
    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <ApexFlexContainer>
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
          </ApexFlexContainer>
        ),
        width: 100,
      },
      {
        // key: "scenario",
        key: "Scenario",
        name: "SCENARIO",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        // key: "field",
        key: "Field",
        name: "FIELD",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        // key: "reservoir",
        key: "Reservoir",
        name: "RESERVOIR",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        // key: "drainagePoint",
        key: "Drainage Point",
        name: "DRAINAGE POINT",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        // key: "module",
        key: "Module",
        name: "MODULE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        // key: "hydrocarbonStream",
        key: "Hydrocarbon Stream",
        name: "HYDROCARBON STREAM",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        // key: "hydrocarbonType",
        key: "Hydrocarbon Type",
        name: "HYDROCARBON TYPE",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        // key: "flowstation",
        key: "FlowStation",
        name: "FLOWSTATION",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        // key: "profileType",
        key: "Profile Type",
        name: "PROFILE TYPE",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        // key: "np",
        key: "Np",
        name: "Np",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        // key: "gp",
        key: "Gp",
        name: "Gp",
        editable: false,
        resizable: true,
        width: 100,
      },
      // {
      //   key: "reserves",
      //   name: "Reserves",
      //   editable: false,
      //   resizable: true,
      //   width: 300,
      // },
      ...forecastDataWithTimeColumns,
      {
        // key: "projectcode",
        key: "Project Code",
        name: "PROJECT CODE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        // key: "projectname",
        key: "Project",
        name: "PROJECT NAME",
        editable: false,
        resizable: true,
        width: 300,
      },
    ];

    return columns;
  };
  */

  let columnKeys = ["SN"];
  if (snSelectedForecastData.length > 0) {
    const originalColumnKeys = Object.keys(snSelectedForecastData[0]);
    columnKeys = [...originalColumnKeys];
  }

  const columns = columnKeys.map((k) => {
    const column = {
      key: k,
      name: k,
      editable: false,
      resizable: true,
      width: k.toLowerCase().trim() === "sn" ? 50 : "auto",
    };
    return column;
  });

  const tableRows = React.useRef<any>(snSelectedForecastData);

  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SortableMultiValue = SortableElement((props: any) => {
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  });

  const SortableSelect = SortableContainer<SelectProps<ISelectOption, true>>(
    // ts-expect-error typescript quirkiness
    Select
  );
  // const options: OptionsType<ISelectOption> = [];
  const options: OptionsOrGroups<any, GroupBase<any>> = [
    // { value: "Scenario", label: "Scenario" },
    // { value: "Feld", label: "Field" },
    // { value: "FlowStation", label: "Flowstation" },
    // { value: "Hydrocarbon Type", label: "Hydrocarbon Type" },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState<
    OnChangeValue<ISelectOption, true>
  >([]);
  // const [selectedOptions, setSelectedOptions] = React.useState<
  //   OnChangeValue<ISelectOption, true>
  // >([options[0]]);

  const [expandedGroupIds, setExpandedGroupIds] = React.useState(
    () => new Set<unknown>([])
  );

  const groupBy = React.useMemo(
    () =>
      Array.isArray(selectedOptions)
        ? selectedOptions.map((o: ISelectOption) => o.value)
        : undefined,
    [selectedOptions]
  );

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (!Array.isArray(selectedOptions)) return;
    const newOptions: ISelectOption[] = [...selectedOptions];
    newOptions.splice(
      newIndex < 0 ? newOptions.length + newIndex : newIndex,
      0,
      newOptions.splice(oldIndex, 1)[0]
    );
    setSelectedOptions(newOptions);
    setExpandedGroupIds(new Set());
  };

  const wc = "storedDataWorkflows";
  const forecastResultsStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.forecastReducer[wc]["forecastResultsStored"],
    (stored) => stored
  );

  const forecastResultsStored = useSelector(forecastResultsStoredSelector);
  const selectedForecastingResultsTitle = useSelector(
    selectedForecastingResultsTitleSelector
  );

  const forecastRunTitleOptions = forecastResultsStored.map((row) => ({
    value: row.title,
    label: row.title,
    id: row.id,
  })) as IExtendedSelectOption[];

  forecastRunTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
  });

  const selectedForecastTitleOption =
    selectedForecastingResultsTitle !== ""
      ? {
          value: selectedForecastingResultsTitle,
          label: selectedForecastingResultsTitle,
          id: (forecastRunTitleOptions as IExtendedSelectOption[]).filter(
            (o) => o.label === selectedForecastingResultsTitle
          )[0].id,
        }
      : forecastRunTitleOptions[0];

  const [forecastRunOption, setForecastRunOption] =
    React.useState<IExtendedSelectOption>(
      selectedForecastTitleOption as IExtendedSelectOption
    );

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IRawRow>["columns"];

  const exportTableProps = {
    fileName: "ForecastData",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    tableButtons: tableButtons as ITableButtonsProps,
    newTableRowHeight: 35,
    selectedRows: selectedRows,
    setSelectedRows: setSelectedRows,
    selectedRow: sRow,
    onSelectedRowChange: setSRow,
    onRowsChange: setRows,
    size: size,
    groupBy: groupBy as readonly string[],
    rowGrouper: rowGrouper,
    expandedGroupIds: expandedGroupIds,
    onExpandedGroupIdsChange: setExpandedGroupIds,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  return (
    <div className={classes.rootStoredData} style={containerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <AnalyticsComp
          title="Forecast Run"
          direction="Vertical"
          containerStyle={{ width: "100%" }}
          content={
            <ApexSelectRS<IExtendedSelectOption>
              valueOption={forecastRunOption}
              data={forecastRunTitleOptions}
              handleSelect={(
                option: OnChangeValue<IExtendedSelectOption, false>
              ) => {
                setForecastRunOption(option as IExtendedSelectOption);

                dispatch(
                  updateForecastResultsParameterAction(
                    "selectedForecastingResultsId",
                    (option as IExtendedSelectOption).id
                  )
                );
                dispatch(
                  getForecastDataByIdRequestAction("forecastResultsData", false)
                );
              }}
              isSelectOptionType={true}
              menuPortalTarget={document.body}
              containerWidth={300}
              containerHeight={40}
            />
          }
        />
        <AnalyticsComp
          title="Group by  (drag to sort)"
          direction="Vertical"
          containerStyle={{ width: "100%" }}
          content={
            <SortableSelect
              // react-sortable-hoc props
              axis="xy"
              onSortEnd={onSortEnd}
              distance={4}
              getHelperDimensions={({ node }) => node.getBoundingClientRect()}
              // react-select props
              isMulti
              value={selectedOptions}
              onChange={(options) => {
                setSelectedOptions(options);
                setExpandedGroupIds(new Set());
              }}
              options={options}
              components={{
                MultiValue: SortableMultiValue,
              }}
              closeMenuOnSelect={false}
            />
          }
        />
      </div>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.workflowBody}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
          </SizeMe>
        </div>
      </ClickAwayListener>
    </div>
  );
}
