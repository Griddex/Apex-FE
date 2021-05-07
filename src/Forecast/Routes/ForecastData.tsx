import {
  ClickAwayListener,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import apexCheckbox from "../../Application/Components/Checkboxes/ApexCheckbox";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";
import { IForecastRoutes } from "./ForecastRoutesTypes";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Select, {
  components,
  OptionsType,
  ValueType,
  Props as SelectProps,
  Styles,
} from "react-select";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import groupBy from "lodash.groupby";
import generateSelectOptions from "../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../Application/Utils/GetRSStyles";
import faker from "faker";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import CenteredStyle from "./../../Application/Components/Styles/CenteredStyle";
import { getForecastDataByIdRequestAction } from "../Redux/Actions/ForecastActions";
import getRSTheme from "../../Application/Utils/GetRSTheme";

const rowGrouper = groupBy;
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
  apexSelectRS: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: 30,
    width: "100%",
  },
}));

export default function ForecastData({
  wrkflwCtgry,
  wrkflwPrcss,
  containerStyle,
}: IForecastRoutes) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wp = wrkflwPrcss as NonNullable<IExistingDataProps["wkPs"]>;
  const { selectedForecastData } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const snSelectedForecastData = selectedForecastData.map((row, i) => ({
    sn: i + 1,
    ...row,
  }));

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const generateColumns = () => {
    const forecastDataWithTimeKeys = Object.keys(
      snSelectedForecastData[0]
    ).filter((key) => key.trim().toLowerCase().startsWith("y"));
    const forecastDataWithTimeColumns = forecastDataWithTimeKeys.map((k) => ({
      key: k,
      name: k,
      editable: false,
      resizable: true,
      width: 100,
    }));

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <CenteredStyle>
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
          </CenteredStyle>
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
        key: "Feld",
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
        key: "Project Name",
        name: "PROJECT NAME",
        editable: false,
        resizable: true,
        width: 300,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(() => generateColumns(), [selectedRows]);
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
    // @ts-expect-error typescript quirkiness
    Select
  );
  // const options: OptionsType<ISelectOption> = [];
  const options: OptionsType<ISelectOption> = [
    // { value: "Scenario", label: "Scenario" },
    // { value: "Feld", label: "Field" },
    // { value: "FlowStation", label: "Flowstation" },
    // { value: "Hydrocarbon Type", label: "Hydrocarbon Type" },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState<
    ValueType<ISelectOption, true>
  >([]);
  // const [selectedOptions, setSelectedOptions] = React.useState<
  //   ValueType<ISelectOption, true>
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

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const wc = "existingDataWorkflows";
  const { forecastResultsExisting } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const { selectedForecastingResultsTitle } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const forecastRuns = forecastResultsExisting.map(
    (row) => row.title
  ) as string[];
  const forecastRunTitleOptions = generateSelectOptions(forecastRuns);
  const selectedForecastTitle =
    selectedForecastingResultsTitle !== ""
      ? selectedForecastingResultsTitle
      : forecastRuns[0];

  const [forecastRun, setForecastRun] = React.useState(selectedForecastTitle);

  const handleSelectForecastRunChange = (
    row: ValueType<ISelectOption, false>
  ) => {
    const forecastRunName = row?.value as string;
    setForecastRun(forecastRunName);

    dispatch(getForecastDataByIdRequestAction());
  };

  const SelectForecastRun = () => {
    const valueOption = generateSelectOptions([forecastRun])[0];
    const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme, 300);

    return (
      <Select
        value={valueOption}
        options={forecastRunTitleOptions}
        styles={RSStyles}
        onChange={handleSelectForecastRunChange}
        menuPortalTarget={document.body}
        theme={(thm) => getRSTheme(thm, theme)}
      />
    );
  };

  return (
    <div className={classes.rootExistingData} style={containerStyle}>
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
        <label className={classes.apexSelectRS}>
          <b>Forecast Run</b>
          <SelectForecastRun />
        </label>
        <label style={{ width: 400 }}>
          <b>Group by</b> (drag to sort)
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
        </label>
      </div>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.workflowBody}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
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
                groupBy={groupBy}
                rowGrouper={rowGrouper}
                expandedGroupIds={expandedGroupIds}
                onExpandedGroupIdsChange={setExpandedGroupIds}
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