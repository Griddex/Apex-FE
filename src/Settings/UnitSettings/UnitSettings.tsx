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
import {
  INewProjectFormValues,
  INewProjectWorkflowProps,
} from "../../Project/Redux/State/ProjectStateTypes";
import DateFormatter from "../Components/Dates/DateFormatter";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../Components/DialogActions/SuccessFailureDialogs";
import { tableOptions } from "../Configurations/SettingsTableOptions";
import {
  fetchUnitSettingsAction,
  updateAllUnitsAction,
  updateFirstLevelUnitSettingsAction,
} from "../Redux/Actions/UnitSettingsActions";
import {
  IUnit,
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
//unitGroup
//units
const unitsData: IUnitSettingsData &
  Pick<INewProjectFormValues, "pressureAddend"> = {
  pressureAddend: 14.7, //convert to g to a and vice versa
  dayFormat: "dd",
  monthFormat: "mm",
  yearFormat: "yyyy",
  unitGroup: "Field",
  units: [
    {
      variableName: "oilRate", //send
      variableTitle: "Oil Rate",
      variableId: "hsajflbshjdbls", //send
      displayUnitId: "shvdhsdvshds", //Send
      units: [
        { title: "bbl Oil/day", group: "field", unitId: "shvdhsdvshds" },
        { title: "stb/day", group: "field", unitId: "shvdhshgmkdvshds" },
        { title: "m3/day", group: "metric", unitId: "aasf" },
        { title: "cm3/day", group: "metric", unitId: "jhkk" },
        { title: "Unit3", group: "metric", unitId: "hfhdd" },
      ],
    },
    {
      variableName: "liquidRate", //send
      variableTitle: "Liquid Rate",
      variableId: "vhcsyefgdvcjhssd", //send
      displayUnitId: "rjbvvbvhdvjl", //Send
      units: [
        { title: "bbl Oil/day", group: "field", unitId: "rjbvvbvhdvjl" },
        { title: "stb/day", group: "field", unitId: "dsgfhgdgv" },
        { title: "m3/day", group: "metric", unitId: "ertghg" },
        { title: "cm3/day", group: "metric", unitId: "aevc" },
        { title: "dm3/day", group: "metric", unitId: "kjhgvc" },
      ],
    },
    {
      variableName: "gasRate", //send
      variableTitle: "Gas Rate",
      variableId: "yfdsyhfsydshlshdl", //send
      displayUnitId: "trowuythfewh", //Send
      units: [
        { title: "MScf/day", group: "field", unitId: "trowuythfewh" },
        { title: "MMScf/day", group: "field", unitId: "isvtu" },
        { title: "m3/day", group: "metric", unitId: "qhgfqq" },
        { title: "cm3/day", group: "metric", unitId: "zzzcfhjk" },
        { title: "Unit3", group: "metric", unitId: "kolohggf" },
      ],
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

  const unitGroups = ["Field", "Metric", "Mixed"];
  const dayDateFormats = ["d", "dd", "ddd", "dddd"];
  const monthDateFormats = ["m", "mm", "mmm", "mmmm"];
  const yearDateFormats = ["yy", "yyyy"];

  const [unitGroup, setGlobalUnitGroup] = React.useState(unitsData.unitGroup);
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

  const snUnits = unitsData.units.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));

  //Application Units
  const unitOptions: AppUnitOptionsType = snUnits.reduce(
    (acc, row: IUnitsRow) => {
      const fieldOptions = row.units.filter((v) => v.group === "field");
      const metricOptions = row.units.filter((v) => v.group === "metric");

      const appFieldUnits = fieldOptions.map((unit) => {
        return {
          value: unit.unitId,
          label: unit.title,
          group: unit.group,
        };
      });

      const appMetricUnits = metricOptions.map((unit) => {
        return {
          value: unit.unitId,
          label: unit.title,
          group: unit.group,
        };
      });

      return { ...acc, [row.variableName]: [appFieldUnits, appMetricUnits] };
    },
    {}
  ); //{oilRate:[fieldOptions,metricOptions], gasRate:[fieldOptions,metricOptions]}

  const initVariableUnitsGroupObj = () =>
    snUnits.reduce((acc: Record<string, string>, row: IUnitsRow) => {
      const { variableName, units, displayUnitId } = row;
      const selectedUnitObj = units.filter((u) => u.unitId === displayUnitId);
      const selectedUnitGroup = selectedUnitObj[0].group;

      return { ...acc, [variableName]: selectedUnitGroup };
    }, {}); //[{oilRate: "Field"},{gasRate: "Metric"}]
  const [variableUnitsGroup, setVariableUnitsGroup] = React.useState(
    initVariableUnitsGroupObj
  );

  const initUnitDisplayIds = () =>
    snUnits.reduce((acc: Record<string, string>, row: IUnitsRow) => {
      const { variableName, units, displayUnitId } = row;
      return { ...acc, [variableName]: displayUnitId };
    }, {}); //[{oilRate: "stb/day"},{gasRate: "m3/day"}]
  const [, setUnitDisplayIds] = React.useState(initUnitDisplayIds);

  const generateColumns = () => {
    const columns: Column<IUnitsRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "name",
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
          const variableName = row.variableName as string;
          const [fieldOptions, metricOptions] = unitOptions[variableName];
          const displayUnitIdValue = row.displayUnitId;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={displayUnitIdValue}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();

                const selecteddisplayUnitId = event.target.value;
                const selectedUnitOptionIndex = findIndex(
                  [...fieldOptions, ...metricOptions],
                  (option) => option.value === selecteddisplayUnitId
                );

                onRowChange({
                  ...row,
                  displayUnitId: selecteddisplayUnitId,
                });

                setVariableUnitsGroup((prev) => {
                  const allAppUnits = [...fieldOptions, ...metricOptions];
                  const selectedAppUnit = allAppUnits[selectedUnitOptionIndex];

                  const newAllAppUnits = {
                    ...prev,
                    [variableName]: selectedAppUnit.group,
                  };

                  const newUnitGroup = getGlobalUnitGroup(
                    Object.values(newAllAppUnits)
                  );
                  setGlobalUnitGroup(newUnitGroup);

                  return newAllAppUnits;
                });
                setUnitDisplayIds((prev) => {
                  return {
                    ...prev,
                    [variableName]: selecteddisplayUnitId,
                  };
                });

                modifyTableRows(variableName, selectedUnitOptionIndex);
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
          const variableName = row.variableName as string;
          const unitsArray = unitsData.units.find(
            (u) => u.variableName === variableName
          );
          const displayUnitId = variableUnitsGroup[variableName];
          const selectedUnit =
            unitsArray &&
            (unitsArray.units.find((u) => u.unitId === displayUnitId) as IUnit);
          return <div>{selectedUnit?.group}</div>;
        },
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const tableRows = React.useRef<IUnitsRow[]>(snUnits);

  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedVariableName: string,
    selectedUnitOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.variableName === selectedVariableName) {
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
            name="unitGroup"
            currentItem={unitGroup}
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
