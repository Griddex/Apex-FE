import {
  ClickAwayListener,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
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
import getRSStyles from "../../Import/Utils/GetRSStyles";
import faker from "faker";

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
}));

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ForecastData({
  wrkflwCtgry,
  wrkflwPrcss,
  containerStyle,
}: IForecastRoutes) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wp = wrkflwPrcss as NonNullable<IExistingDataProps["wkPs"]>;
  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const generateColumns = () => {
    const forecastDataWithTimeColumns = [{ name: "", key: "" }];

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
          </div>
        ),
        width: 100,
      },
      {
        key: "field",
        name: "FIELD",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "reservoir",
        name: "RESERVOIR",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "module",
        name: "MODULE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "hydrocarbonStream",
        name: "HYDROCARBON STREAM",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "flowstation",
        name: "FLOWSTATION",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "profileType",
        name: "PROFILETYPE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "npgp",
        name: "Np/Gp",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "reserves",
        name: "Reserves",
        editable: false,
        resizable: true,
        width: 300,
      },
      ...forecastDataWithTimeColumns,
      {
        key: "projectcode",
        name: "PROJECTCODE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "projectname",
        name: "PROJECTNAME",
        editable: false,
        resizable: true,
        width: 300,
      },
    ];

    return columns;
  };
  function createRows(): readonly IRawRow[] {
    const rows: IRawRow[] = [];
    for (let i = 1; i < 10000; i++) {
      rows.push({
        sn: i,
        field: faker.name.middleName(),
        reservoir: faker.name.firstName(),
        module: faker.name.firstName(),
        hydrocarbonStream: "oil",
        flowstation: "Agbada",
        profileType: "oil/AG",
        npgp: 56,
        reserves: 50000,
        projectcode: "W01_AGBADA",
        projectname: "ARPR",
      });
    }

    return rows;
  }
  const columns = React.useMemo(() => generateColumns(), [selectedRows]);
  const tableRows = React.useRef<any>(createRows());
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
  const options: OptionsType<ISelectOption> = [
    { value: "country", label: "Country" },
    { value: "year", label: "Year" },
    { value: "sport", label: "Sport" },
    { value: "athlete", label: "athlete" },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState<
    ValueType<ISelectOption, true>
  >([options[0], options[1]]);
  const [expandedGroupIds, setExpandedGroupIds] = React.useState(
    () =>
      new Set<unknown>([
        "United States of America",
        "United States of America__2015",
      ])
  );

  const groupBy = React.useMemo(
    () =>
      Array.isArray(selectedOptions)
        ? selectedOptions.map((o: ISelectOption) => o.value)
        : undefined,
    [selectedOptions]
  );

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    if (!Array.isArray(selectedOptions)) return;
    const newOptions: ISelectOption[] = [...selectedOptions];
    newOptions.splice(
      newIndex < 0 ? newOptions.length + newIndex : newIndex,
      0,
      newOptions.splice(oldIndex, 1)[0]
    );
    setSelectedOptions(newOptions);
    setExpandedGroupIds(new Set());
  }
  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);
  const forecastResultTitles = ["Result1", "Result2", "Result3", "Result4"];

  const handleSelect = (value: ValueType<ISelectOption, false>) => {
    if (value) setTitleOption(value);
  };
  const forecastResultTitlesOptions = generateSelectOptions(
    forecastResultTitles
  );
  const initialTitleOption = generateSelectOptions([
    forecastResultTitles[0],
  ])[0];
  const [titleOption, setTitleOption] = React.useState(initialTitleOption);

  return (
    <div className={classes.rootExistingData} style={containerStyle}>
      <Select
        value={titleOption}
        options={forecastResultTitlesOptions}
        styles={RSStyles}
        onChange={handleSelect}
        menuPortalTarget={document.body}
        theme={(thm) => ({
          ...thm,
          borderRadius: 0,
          colors: {
            ...thm.colors,
            primary50: theme.palette.primary.light,
            primary25: theme.palette.primary.main,
            primary: theme.palette.grey[700],
          },
        })}
      />
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
              />
            )}
          </SizeMe>
        </div>
      </ClickAwayListener>
    </div>
  );
}
