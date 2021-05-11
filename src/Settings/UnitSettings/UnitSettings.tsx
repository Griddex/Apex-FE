import { makeStyles, TextField } from "@material-ui/core";
import findIndex from "lodash.findindex";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import SelectItem from "../../Application/Components/Selects/SelectItem";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import {
  GenericObjectObjStrType,
  GenericObjectSType,
} from "../../Application/Layout/LayoutTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import theme from "../../Application/Theme/Theme";
import generateSelectOptions from "../../Application/Utils/GenerateSelectOptions";
import { INewProjectWorkflowProps } from "../../Project/Redux/State/ProjectStateTypes";
import DateFormatter from "../Components/Dates/DateFormatter";
import {
  updateUnitsSettingsParameterAction,
  updateSelectedVariableUnitsAction,
} from "../Redux/Actions/UnitSettingsActions";
import {
  IUnit,
  IUnitSettingsData,
  IUnitsRow,
  SelectedVariablesType,
} from "../Redux/State/UnitSettingsStateTypes";
import getGlobalUnitGroup from "../Utils/GetGlobalUnitGroup";
import {
  RSOptionsType,
  SelectOptionsType,
  UnitOptionsType,
} from "./UnitSettingsTypes";
import Select, { ValueType } from "react-select";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import getRSStyles from "../../Application/Utils/GetRSStyles";
import uniqBy from "lodash.uniqby";

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
    unitGroup,
    dayFormat,
    monthFormat,
    yearFormat,
    pressureAddend,
    variableUnits,
  } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;
  console.log(
    "Logged output --> ~ file: UnitSettings.tsx ~ line 96 ~ monthFormat",
    monthFormat
  );

  const unitGroups = ["Field", "Metric", "Mixed"];
  const dayDateFormats = ["d", "do", "dd", "ddd"];
  const monthDateFormats = ["M", "Mo", "MM", "MMM"];
  const yearDateFormats = ["y", "yo", "yy", "yyyy"];

  const dialogRef = React.useRef(null);
  const [unitGroupName, setGlobalUnitGroupName] = React.useState(unitGroup);
  const [day, setDay] = React.useState(dayFormat);
  const [month, setMonth] = React.useState(monthFormat);
  console.log(
    "Logged output --> ~ file: UnitSettings.tsx ~ line 109 ~ month",
    month
  );
  const [year, setYear] = React.useState(yearFormat);
  const [pressAddend, setPressAddend] = React.useState(pressureAddend);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO use Unit group to do global units change
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
    //   dispatch(updateUnitsSettingsParameterAction(name, value));
    // }
    handleChange && handleChange(event);
    dispatch(updateUnitsSettingsParameterAction(name, value));
  };

  const snVariableUnits = variableUnits.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));

  //Application Units
  const unitOptions: Record<string, any[]> = snVariableUnits.reduce(
    (acc, row: IUnitsRow) => {
      if (row.units[0].group.toLowerCase() === "general") {
        const generalOptions = row.units.filter(
          (v) => v.group.toLowerCase() === "general"
        );

        const appGeneralUnits = generalOptions.map((unit) => {
          return {
            value: unit.unitId,
            label: unit.title,
            group: unit.group,
          };
        });
        return { ...acc, [row.variableName]: [appGeneralUnits] };
      } else {
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
      }
    },
    {}
  ); //{oilRate:[fieldOptions,metricOptions], gasRate:[fieldOptions,metricOptions]}

  const initVariableUnitsGroupObj = () =>
    snVariableUnits.reduce((acc: Record<string, any>, row: IUnitsRow) => {
      const { variableName, units, displayUnitId } = row;
      const selectedUnitObj = units.filter((u) => u.unitId === displayUnitId);
      const selectedUnitGroup = selectedUnitObj[0].group;

      return { ...acc, [variableName]: selectedUnitGroup };
    }, {}); //{oilRate: "Field",gasRate: "Metric"}

  const [variableUnitsGroup, setVariableUnitsGroup] = React.useState(
    initVariableUnitsGroupObj
  );

  const initSelectedVariableUnits = () =>
    snVariableUnits.reduce(
      (acc: Record<string, SelectedVariablesType>, row: IUnitsRow) => {
        const { variableId, variableName, displayUnitId, databaseUnitId } = row;
        const variableIdStr = variableId as string;

        return {
          ...acc,
          [variableIdStr]: {
            variableName,
            displayUnitId,
            databaseUnitId,
          },
        };
      },
      {}
    ); //[{oilRate: "stb/day"},{gasRate: "m3/day"}]
  const [selectedVariableUnits, setSelectedVariableUnits] = React.useState(
    initSelectedVariableUnits
  );

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
        resizable: true,
        formatter: ({ row, onRowChange }) => {
          const variableName = row.variableName as string;
          const variableId = row.variableId as string;
          const databaseUnitId = row.databaseUnitId as string;
          const displayUnitIdValue = row.displayUnitId;

          const isGeneral = row.units[0].group.toLowerCase() === "general";

          if (isGeneral) {
            const [generalOptions] = unitOptions[variableName];

            return (
              <select
                style={{ width: "100%", height: "95%" }}
                value={displayUnitIdValue}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  event.stopPropagation();

                  const selecteddisplayUnitId = event.target.value;
                  const selectedUnitOptionIndex = findIndex(
                    [...generalOptions],
                    (option) => option.value === selecteddisplayUnitId
                  );

                  onRowChange({
                    ...row,
                    displayUnitId: selecteddisplayUnitId,
                  });

                  setVariableUnitsGroup((prev) => {
                    const allAppUnits = [...generalOptions];
                    const selectedAppUnit =
                      allAppUnits[selectedUnitOptionIndex];

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

                  setSelectedVariableUnits((prev) => {
                    const newSelectedVariablesDict = {
                      ...prev,
                      [variableId]: {
                        variableName,
                        displayUnitId: selecteddisplayUnitId,
                        databaseUnitId,
                      },
                    };

                    const newSelectedVariables = Object.values(
                      newSelectedVariablesDict
                    );
                    dispatch(
                      updateSelectedVariableUnitsAction(newSelectedVariables)
                    );

                    return newSelectedVariablesDict;
                  });

                  modifyTableRows(variableName, selecteddisplayUnitId);
                  setRerender((rerender) => !rerender);
                }}
              >
                <optgroup label="General Units">
                  {generalOptions.map((option: ISelectOption, i: number) => (
                    <option
                      key={i + generalOptions.length + 1}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            );
          } else {
            const [fieldOptions, metricOptions] = unitOptions[variableName];
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
                    const selectedAppUnit =
                      allAppUnits[selectedUnitOptionIndex];

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

                  setSelectedVariableUnits((prev) => {
                    const newSelectedVariablesDict = {
                      ...prev,
                      [variableId]: {
                        variableName,
                        displayUnitId: selecteddisplayUnitId,
                        databaseUnitId,
                      },
                    };

                    const newSelectedVariables = Object.values(
                      newSelectedVariablesDict
                    );
                    dispatch(
                      updateSelectedVariableUnitsAction(newSelectedVariables)
                    );

                    return newSelectedVariablesDict;
                  });

                  modifyTableRows(variableName, selecteddisplayUnitId);
                  setRerender((rerender) => !rerender);
                }}
              >
                <optgroup label="Field Units">
                  {fieldOptions.map((option: ISelectOption, i: number) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Metric Units">
                  {metricOptions.map((option: ISelectOption, i: number) => (
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
          }
        },
        width: 300,
      },
      {
        key: "unitGroups",
        name: "UNIT GROUP",
        resizable: true,
        formatter: ({ row }) => {
          const variableName = row.variableName as string;
          const unitsObj = variableUnits.find(
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
  const tableRows = React.useRef<IUnitsRow[]>(snVariableUnits);

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
  const RSStyles = getRSStyles(theme);
  // const helperText =
  //   touched && touched.pressureAddend ? errors && errors.pressureAddend : "";

  return (
    <div ref={dialogRef} className={classes.rootUnitSettingsGrid}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 150,
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
            width: "100%",
            height: 100,
          }}
        >
          <AnalyticsComp
            title="Date Format"
            direction="Vertical"
            containerStyle={{ width: "100%" }}
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
                  handleChange={(event) => {
                    setDay(event.target.value);
                    handleFirstLevelSettingsChange(event);
                  }}
                  selectItemStyle={{ minWidth: 80 }}
                />
                {/* <Select
                  value={dayOption}
                  options={dateOptions}
                  styles={RSStyles}
                  onChange={(value: ValueType<ISelectOption, false>) => {
                    console.log(
                      "Logged output --> ~ file: UnitSettings.tsx ~ line 462 ~ value",
                      value
                    );
                  }}
                  // isClearable={false}
                  // isSearchable={false}
                  // menuPortalTarget={document.body}
                  menuPortalTarget={dialogRef.current}
                /> */}
                <SelectItem
                  name="monthFormat"
                  currentItem={month}
                  itemData={monthDateFormats}
                  handleChange={(event) => {
                    setMonth(event.target.value);
                    handleFirstLevelSettingsChange(event);
                  }}
                  selectItemStyle={{ minWidth: 80 }}
                />
                <SelectItem
                  name="yearFormat"
                  currentItem={year}
                  itemData={yearDateFormats}
                  handleChange={(event) => {
                    setYear(event.target.value);
                    handleFirstLevelSettingsChange(event);
                  }}
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
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                />
              </div>
            }
          />
          {/* <AnalyticsComp
            title="Pressure Addend"
            direction="Vertical"
            content={
                  console.log("Logged output --> ~ file: UnitSettings.tsx ~ line 462 ~ value", value);
                  console.log("Logged output --> ~ file: UnitSettings.tsx ~ line 462 ~ value", value);
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
          /> */}
        </div>
      </div>

      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid<IUnitsRow, ITableButtonsProps>
            columns={columns}
            rows={rows}
            tableButtons={tableButtons}
            size={size}
            adjustTableDimAuto={true}
            showTableHeader={true}
            showTablePagination={true}
          />
        )}
      </SizeMe>
    </div>
  );
}
