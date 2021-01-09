import { makeStyles, MenuItem, TextField } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { INewProjectWorkflowProps } from "../../Project/Redux/State/ProjectState";
import { persistChosenApplicationUniqueUnitIndicesAction } from "../../Import/Redux/Actions/ImportActions";
import { IUnitsData, IUnitsRow } from "../Redux/State/UnitSettingsState";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";

const useStyles = makeStyles(() => ({
  rootUnitSettingsGrid: {
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
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: 250,
    fontSize: 14,
  },
  unitGroups: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

//TODO: API saga to get entire units object from server
const unitsData: IUnitsData = {
  globalUnitGroup: "Field",
  allUnits: [
    {
      key: "oilRate",
      parameter: "Oil Rate",
      appUnitOptions: [
        { Unit4: "field" },
        { Unit5: "field" },
        { Unit1: "metric" },
        { Unit2: "metric" },
        { Unit3: "metric" },
      ],
      selectedAppUnitIndex: 0,
    },
    {
      key: "gasRate",
      parameter: "Gas Rate",
      appUnitOptions: [
        { Unit4: "field" },
        { Unit1: "metric" },
        { Unit3: "metric" },
      ],
      selectedAppUnitIndex: 0,
    },
    {
      key: "pressure",
      parameter: "Pressure",
      appUnitOptions: [
        { Unit4: "field" },
        { Unit5: "field" },
        { Unit1: "metric" },
      ],
      selectedAppUnitIndex: 0,
    },
  ],
};

interface ISelectItem {
  currentItem: string;
  itemData: string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  label?: string;
  selectItemStyle?: CSSProperties;
}

export default function UnitSettings({
  dateFormat,
  pressureAddend,
  errors,
  touched,
  handleChange,
  isValid,
}: INewProjectWorkflowProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Unit Classification
  const unitGroups = ["Field", "Metric", "Mixed"];
  const dayDateFormats = ["d", "dd", "ddd", "dddd"];
  const monthDateFormats = ["m", "mm", "mmm", "mmmm"];
  const yearDateFormats = ["yy", "yyyy"];

  const [globalUnitGroup, setGlobalUnitGroup] = React.useState(
    unitsData.globalUnitGroup
  );
  const [day, setDay] = React.useState(dayDateFormats[0]);
  const [month, setMonth] = React.useState(monthDateFormats[0]);
  const [year, setYear] = React.useState(yearDateFormats[0]);
  const [date, setDate] = React.useState(dateFormat); //Not correct, initialize with what?
  const handleGlobalUnitGroupChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setGlobalUnitGroup(item);
  };
  const handleDayChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setDay(item);
  };
  const handleMonthChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setMonth(item);
  };
  const handleYearChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setYear(item);
  };
  const handleDateChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setYear(item);
  };

  const SelectItem = ({
    currentItem,
    itemData,
    handleChange,
    label,
    selectItemStyle,
  }: ISelectItem) => {
    return (
      <TextField
        style={selectItemStyle}
        id="outlined-select-worksheet"
        select
        label={label}
        value={currentItem}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        {itemData.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };

  type UnitOptionsType = {
    value: string;
    label: string;
    group: "field" | "metric";
  }[];
  interface AppUnitOptionsType {
    [key: string]: [UnitOptionsType, UnitOptionsType];
  }

  //Application Units
  const appUnitOptions: AppUnitOptionsType = unitsData.allUnits.reduce(
    (acc, row: IUnitsRow) => {
      const fieldOptions = row.appUnitOptions.filter(
        (v) => v.field === "field"
      );
      const metricOptions = row.appUnitOptions.filter(
        (v) => v.metric === "metric"
      );

      const appFieldUnits = fieldOptions.map((unitObj) => {
        const unit = Object.keys(unitObj)[0];
        const unitGroup = Object.values(unitObj)[0];
        return {
          value: unit.toLowerCase(),
          label: unit,
          group: unitGroup,
        };
      });

      const appMetricUnits = metricOptions.map((unitObj) => {
        const unit = Object.keys(unitObj)[0];
        const unitGroup = Object.values(unitObj)[0];
        return {
          value: unit.toLowerCase(),
          label: unit,
          group: unitGroup,
        };
      });

      return { ...acc, [row.parameter]: [appFieldUnits, appMetricUnits] };
    },
    {}
  );

  const snChosenAppUnitIndices = unitsData.allUnits.reduce(
    (acc: Record<string, number>, row: IUnitsRow) => {
      return { ...acc, [row.key]: row.selectedAppUnitIndex };
    },
    {}
  );
  const [chosenAppUnitIndices, setChosenAppUnitIndices] = React.useState<
    Record<string, number>
  >(snChosenAppUnitIndices);

  //React.ComponentType<FormatterProps<TRow, TSummaryRow>>
  const generateColumns = () => {
    const columns: Column<IUnitsRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "parameter",
        name: "PARAMETER",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        editable: true,
        resizable: true,
        formatter: ({ row, onRowChange }) => {
          console.log(
            "Logged output --> ~ file: UnitSettings.tsx ~ line 253 ~ generateColumns ~ row",
            row
          );
          //   const rowSN = row.sn;
          const parameter = row.parameter as string;
          const index = row.selectedAppUnitIndex as number;
          const appUnit = row.appUnitOptions[index];
          console.log(
            "Logged output --> ~ file: UnitSettings.tsx ~ line 261 ~ generateColumns ~ appUnit",
            appUnit
          );
          const value = Object.keys(appUnit)[0];
          console.log(
            "Logged output --> ~ file: UnitSettings.tsx ~ line 263 ~ generateColumns ~ value",
            value
          );
          const [fieldOptions, metricOptions] = appUnitOptions[parameter];
          console.log(
            "Logged output --> ~ file: UnitSettings.tsx ~ line 265 ~ generateColumns ~ appUnitOptions",
            appUnitOptions
          );

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={value as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();

                const selectedValue = event.target.value;
                const selectedUnitOptionIndex = findIndex(
                  [...fieldOptions, ...metricOptions],
                  (option) => option.value === selectedValue
                );

                onRowChange({
                  ...row,
                  selectedAppUnitIndex: selectedUnitOptionIndex as number,
                });

                setChosenAppUnitIndices((prev) => ({
                  ...prev,
                  [parameter]: selectedUnitOptionIndex,
                }));

                modifyTableRows(parameter, selectedUnitOptionIndex);
                setRerender((rerender) => !rerender);
              }}
            >
              <optgroup label="Field Units">
                {[
                  { value: "unit1", label: "Unit1" },
                  { value: "unit2", label: "Unit2" },
                ].map((option, i: number) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Metric Units">
                {[
                  { value: "unit3", label: "Unit3" },
                  { value: "unit4", label: "Unit4" },
                ].map((option, i: number) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            </select>
          );
        },
        width: 300,
      },
      {
        key: "unitGroups",
        name: "UNIT GROUP",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return (
            // <div style={{ width: "100%", height: "95%" }}>{row.parameter}</div>
            <div>{row.parameter}</div>
          );
        },
      },
    ];

    return columns;
  };

  const columns = React.useMemo(() => generateColumns(), []);

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const tableRows = React.useRef<IUnitsRow[]>(unitsData.allUnits);

  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedParameter: string,
    selectedUnitOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.key === selectedParameter) {
        const appUnitOptions = row.appUnitOptions;
        const selectedAppUnitObj = appUnitOptions[selectedUnitOptionIndex];
        const selectedAppUnit = Object.keys(selectedAppUnitObj)[0];
        const selectedAppUnitGroup = Object.values(selectedAppUnitObj)[0];

        return {
          sn: i + 1,
          key: row.key,
          parameter: selectedParameter,
          applicationUnit: selectedAppUnit,
          unitGroups: selectedAppUnitGroup,
        };
      } else return row;
    });

    tableRows.current = modifiedRows as IUnitsRow[];
  };

  const rows = tableRows.current;

  React.useEffect(() => {
    // dispatch(persistFileUnitsMatchAction(fileUniqueUnitMatches));
    dispatch(
      persistChosenApplicationUniqueUnitIndicesAction(chosenAppUnitIndices)
    );

    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rows]);

  const helperText =
    touched && touched.pressureAddend ? errors && errors.pressureAddend : "";

  return (
    <div className={classes.rootUnitSettingsGrid}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          <AnalyticsTitle title="Global Units Group" />
          <SelectItem
            currentItem={globalUnitGroup}
            itemData={unitGroups}
            handleChange={handleGlobalUnitGroupChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            <AnalyticsTitle
              title="Date Format"
              titleStyle={{ minWidth: 120 }}
            />
            <SelectItem
              currentItem={day}
              itemData={dayDateFormats}
              handleChange={handleDayChange}
              selectItemStyle={{ minWidth: 100 }}
            />
            <SelectItem
              currentItem={month}
              itemData={monthDateFormats}
              handleChange={handleMonthChange}
              selectItemStyle={{ minWidth: 100 }}
            />
            <SelectItem
              currentItem={year}
              itemData={yearDateFormats}
              handleChange={handleYearChange}
              selectItemStyle={{ minWidth: 100 }}
            />
          </div>
          <AnalyticsComp
            title="Pressure Addend"
            direction="Vertical"
            content={
              <TextField
                name="pressureAddend"
                variant="outlined"
                style={{ width: "100%" }}
                helperText={helperText}
                error={Boolean(helperText)}
                value={pressureAddend}
                onChange={handleChange}
                required
                autoFocus
                fullWidth
              />
            }
          />
        </div>
      </div>
      <ApexGrid<IUnitsRow, ITableIconsOptions>
        columns={columns}
        rows={rows}
        options={tableOptions}
      />
    </div>
  );
}
