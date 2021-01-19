import { makeStyles, MenuItem, TextField } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import { ISelectItem } from "../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { INewProjectWorkflowProps } from "../../Project/Redux/State/ProjectStateTypes";
import DateFormatter from "../Components/Dates/DateFormatter";
import {
  successDialogParameters,
  failureDialogParameters,
} from "../Components/DialogActions/SuccessFailureDialogs";
import {
  fetchUnitSettingsAction,
  persistChosenAppUniqueUnitSettingsIndicesAction,
  updateAllUnitsAction,
  updateFirstLevelUnitSettingsAction,
} from "../Redux/Actions/UnitSettingsActions";
import {
  IUnitSettingsData,
  IUnitsRow,
} from "../Redux/State/UnitSettingsStateTypes";
import getGlobalUnitGroup from "../Utils/GetGlobalUnitGroup";
import { AppUnitOptionsType } from "./UnitSettingsTypes";

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
const unitsData: IUnitSettingsData = {
  pressureAddend: 14.7,
  dayFormat: "dd",
  monthFormat: "mm",
  yearFormat: "yyyy",
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
      selectedAppUnitIndex: 2,
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

export default function UnitSettings({
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
  const [pressAddend, setPressAddend] = React.useState(pressureAddend);

  const handleFirstLevelSettingsChange = (event: ChangeEvent<any>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(updateFirstLevelUnitSettingsAction(name, value));
  };

  const SelectItem = ({
    name,
    currentItem,
    itemData,
    handleChange,
    label,
    selectItemStyle,
  }: ISelectItem) => {
    return (
      <TextField
        name={name}
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

  const snAllUnits = unitsData.allUnits.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));

  //Application Units
  const appUnitOptions: AppUnitOptionsType = snAllUnits.reduce(
    (acc, row: IUnitsRow) => {
      const fieldOptions = row.appUnitOptions.filter(
        (v) => Object.values(v)[0] === "field"
      );

      const metricOptions = row.appUnitOptions.filter(
        (v) => Object.values(v)[0] === "metric"
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

  const initParameterUnitIndicesObj = () =>
    snAllUnits.reduce(
      (acc: Record<string, number>, row: IUnitsRow) => ({
        ...acc,
        [row.parameter]: row.selectedAppUnitIndex,
      }),
      {}
    );
  const [chosenAppUnitIndices, setChosenAppUnitIndices] = React.useState<
    Record<string, number>
  >(initParameterUnitIndicesObj());
  const chosenUnitIndices = React.useRef<Record<string, number>>(
    chosenAppUnitIndices
  );

  const initUnitsGroupObj = () =>
    snAllUnits.reduce((acc: Record<string, string>, row: IUnitsRow) => {
      const { parameter, appUnitOptions, selectedAppUnitIndex } = row;
      const selectedUnitObj = appUnitOptions[selectedAppUnitIndex];
      const selectedUnitGroup = Object.values(selectedUnitObj)[0];

      return { ...acc, [parameter]: selectedUnitGroup };
    }, {});
  const [, setUnitsGroup] = React.useState(initUnitsGroupObj);

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
          const parameter = row.parameter as string;
          const index = row.selectedAppUnitIndex as number;
          const appUnit = row.appUnitOptions[index];
          const value = Object.keys(appUnit)[0];
          const valueLowCase = value.toLowerCase();

          const [fieldOptions, metricOptions] = appUnitOptions[parameter];

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={valueLowCase}
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

                setChosenAppUnitIndices((prev) => {
                  const updatedIndices = {
                    ...prev,
                    [parameter]: selectedUnitOptionIndex,
                  };
                  chosenUnitIndices.current = updatedIndices;

                  return updatedIndices;
                });

                setUnitsGroup((prev) => {
                  const allAppUnits = [...fieldOptions, ...metricOptions];
                  const selectedAppUnit = allAppUnits[selectedUnitOptionIndex];

                  const newAllAppUnits = {
                    ...prev,
                    [parameter]: selectedAppUnit.group,
                  };

                  const newUnitGroup = getGlobalUnitGroup(
                    Object.values(newAllAppUnits)
                  );
                  setGlobalUnitGroup(newUnitGroup);

                  return newAllAppUnits;
                });

                modifyTableRows(parameter, selectedUnitOptionIndex);
                setRerender((rerender) => !rerender);
              }}
            >
              <optgroup label="Field Units">
                {fieldOptions.map((option, i: number) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Metric Units">
                {metricOptions.map((option, i: number) => (
                  <option
                    key={i + fieldOptions.length + 1}
                    value={option.value}
                  >
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
          const parameter = row.parameter as string;
          const selectedUnitIndex = chosenUnitIndices.current[parameter];
          const appUnit = row.appUnitOptions[selectedUnitIndex];
          const unitGroup = Object.values(appUnit)[0];

          return <div>{unitGroup}</div>;
        },
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const tableRows = React.useRef<IUnitsRow[]>(snAllUnits);

  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedParameter: string,
    selectedUnitOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.parameter === selectedParameter) {
        return { ...row, selectedAppUnitIndex: selectedUnitOptionIndex };
      } else return row;
    });

    tableRows.current = modifiedRows as IUnitsRow[];
  };

  const rows = tableRows.current;

  //Pre-Fetch unit settings collection

  React.useEffect(() => {
    dispatch(
      fetchUnitSettingsAction(successDialogParameters, failureDialogParameters)
    );
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(
      persistChosenAppUniqueUnitSettingsIndicesAction(chosenAppUnitIndices)
    );
    dispatch(updateAllUnitsAction(rows));

    dispatch(hideSpinnerAction());
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
            name="globalUnitGroup"
            currentItem={globalUnitGroup}
            itemData={unitGroups}
            handleChange={handleFirstLevelSettingsChange}
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
          <div style={{ display: "flex", minWidth: 600 }}>
            <AnalyticsTitle
              title="Date Format"
              titleStyle={{ minWidth: 120 }}
            />
            <SelectItem
              name="dayFormat"
              currentItem={day}
              itemData={dayDateFormats}
              handleChange={handleFirstLevelSettingsChange}
              selectItemStyle={{ minWidth: 60 }}
            />
            <SelectItem
              name="monthFormat"
              currentItem={month}
              itemData={monthDateFormats}
              handleChange={handleFirstLevelSettingsChange}
              selectItemStyle={{ minWidth: 60 }}
            />
            <SelectItem
              name="yearFormat"
              currentItem={year}
              itemData={yearDateFormats}
              handleChange={handleFirstLevelSettingsChange}
              selectItemStyle={{ minWidth: 60 }}
            />
            <DateFormatter
              dayFormat={day}
              monthFormat={month}
              yearFormat={year}
              dateFormatterStyle={{ display: "flex", minWidth: 200 }}
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
                value={pressAddend}
                onChange={handleFirstLevelSettingsChange}
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
