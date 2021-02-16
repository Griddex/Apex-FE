import { makeStyles, TextField } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import SelectItem from "../../Application/Components/Selects/SelectItem";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { GenericObjectSType } from "../../Application/Layout/LayoutTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { INewProjectWorkflowProps } from "../../Project/Redux/State/ProjectStateTypes";
import DateFormatter from "../Components/Dates/DateFormatter";
import { updateFirstLevelUnitSettingsAction } from "../Redux/Actions/UnitSettingsActions";
import {
  IUnit,
  IUnitSettingsData,
  IUnitsRow,
} from "../Redux/State/UnitSettingsStateTypes";
import getGlobalUnitGroup from "../Utils/GetGlobalUnitGroup";
import { SelectOptionsType } from "./UnitSettingsTypes";

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

export default function UnitSettings({
  errors,
  touched,
  handleChange,
  isValid,
}: INewProjectWorkflowProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    pressureAddend,
    dayFormat,
    monthFormat,
    yearFormat,
    unitGroup,
    variableUnits: unitsData,
  } = useSelector(
    (state: RootState) => state.unitSettingsReducer["unitSettingsData"]
  ) as IUnitSettingsData;

  const unitGroups = ["Field", "Metric", "Mixed"];
  const dayDateFormats = ["d", "dd", "ddd", "dddd"];
  const monthDateFormats = ["m", "mm", "mmm", "mmmm"];
  const yearDateFormats = ["yy", "yyyy"];

  const [unitGroupName, setGlobalUnitGroupName] = React.useState(unitGroup);
  const [day, setDay] = React.useState(dayFormat);
  const [month, setMonth] = React.useState(monthFormat);
  const [year, setYear] = React.useState(yearFormat);
  const [pressAddend, setPressAddend] = React.useState(pressureAddend);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const handleFirstLevelSettingsChange = (event: ChangeEvent<any>) => {
    const name = event.target.name;
    const value = event.target.value;
    // if (name === "unitGroupName") {
    //   switch (value) {
    //     case "Field":
    //       dispatch(updateUnitGroupAction("Metric"));
    //       break;
    //     case "Metric":
    //       dispatch(updateUnitGroupAction("Field"));
    //       break;
    //     default:
    //       break;
    //   }
    // } else {
    //   handleChange && handleChange(event);
    //   dispatch(updateFirstLevelUnitSettingsAction(name, value));
    // }
    handleChange && handleChange(event);
    dispatch(updateFirstLevelUnitSettingsAction(name, value));
  };

  const snUnits = unitsData.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));

  //Application Units
  const unitOptions: SelectOptionsType = snUnits.reduce(
    (acc, row: IUnitsRow) => {
      const fieldOptions = row.units.filter(
        (v) => v.group.toLowerCase() === "field"
      );
      const metricOptions = row.units.filter(
        (v) => v.group.toLowerCase() === "metric"
      );

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
    }, {}); //{oilRate: "Field",gasRate: "Metric"}
  const [variableUnitsGroup, setVariableUnitsGroup] = React.useState(
    initVariableUnitsGroupObj
  );

  const initUnitDisplayIds = (): GenericObjectSType =>
    snUnits.reduce((acc: Record<string, string>, row: IUnitsRow) => {
      const { variableName, units, displayUnitId } = row;
      return { ...acc, [variableName]: displayUnitId };
    }, {}); //[{oilRate: "stb/day"},{gasRate: "m3/day"}]
  const [, setUnitDisplayIds] = React.useState(initUnitDisplayIds);

  const generateColumns = () => {
    const columns: Column<IUnitsRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "variableTitle",
        name: "VARIABLE",
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
                  setGlobalUnitGroupName(newUnitGroup);

                  return newAllAppUnits;
                });

                setUnitDisplayIds((prev) => {
                  return {
                    ...prev,
                    [variableName]: selecteddisplayUnitId,
                  };
                });

                modifyTableRows(variableName, selecteddisplayUnitId);
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
          const unitsObj = unitsData.find(
            (u) => u.variableName === variableName
          );

          const selectedUnit =
            unitsObj &&
            unitsObj.units &&
            (unitsObj.units.find(
              (u) => u.unitId === row.displayUnitId
            ) as IUnit);

          return <div>{selectedUnit?.group}</div>;
        },
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);
  const tableRows = React.useRef<IUnitsRow[]>(snUnits);

  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedVariableName: string,
    selecteddisplayUnitId: string
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.variableName === selectedVariableName) {
        return { ...row, displayUnitId: selecteddisplayUnitId };
      } else return row;
    });

    tableRows.current = modifiedRows as IUnitsRow[];
  };

  const rows = tableRows.current;

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
            name="unitGroupName"
            currentItem={unitGroupName}
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
          <AnalyticsComp
            title="Date Format"
            direction="Vertical"
            containerStyle={{ marginBottom: 20, marginTop: 20 }}
            content={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <SelectItem
                  name="dayFormat"
                  currentItem={day}
                  itemData={dayDateFormats}
                  handleChange={handleFirstLevelSettingsChange}
                  selectItemStyle={{ minWidth: 80 }}
                />
                <SelectItem
                  name="monthFormat"
                  currentItem={month}
                  itemData={monthDateFormats}
                  handleChange={handleFirstLevelSettingsChange}
                  selectItemStyle={{ minWidth: 80 }}
                />
                <SelectItem
                  name="yearFormat"
                  currentItem={year}
                  itemData={yearDateFormats}
                  handleChange={handleFirstLevelSettingsChange}
                  selectItemStyle={{ minWidth: 80 }}
                />
                <DateFormatter
                  dayFormat={day}
                  monthFormat={month}
                  yearFormat={year}
                  dateFormatterStyle={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: 200,
                    marginLeft: 10,
                  }}
                />
              </div>
            }
          />
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
      <ApexGrid<IUnitsRow, ITableButtonsProps>
        columns={columns}
        rows={rows}
        tableButtons={tableButtons}
      />
    </div>
  );
}
