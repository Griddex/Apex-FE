import { makeStyles, TextField } from "@material-ui/core";
import findIndex from "lodash.findindex";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import theme from "../../Application/Theme/Theme";
import { INewProjectWorkflowProps } from "../../Project/Redux/State/ProjectStateTypes";
import DateFormatter from "../Components/Dates/DateFormatter";
import {
  dayDateFormatOptions,
  monthDateFormatOptions,
  numberFormatOptions,
  unitGroupOptions,
  yearDateFormatOptions,
} from "../Data/UnitSettingsData";
import {
  updateSelectedVariableUnitsAction,
  updateUnitsSettingsParameterAction,
} from "../Redux/Actions/UnitSettingsActions";
import {
  IUnit,
  IUnitSettingsData,
  IUnitsRow,
  SelectedVariablesType,
} from "../Redux/State/UnitSettingsStateTypes";
import getGlobalUnitGroup from "../Utils/GetGlobalUnitGroup";

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

  const { variableUnits } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;
  console.log(
    "Logged output --> ~ file: UnitSettings.tsx ~ line 85 ~ variableUnits",
    variableUnits
  );

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [unitGroupOption, setUnitGroupOption] = React.useState(
    unitGroupOptions[0]
  );
  const [dayOption, setDayOption] = React.useState(dayDateFormatOptions[2]);
  const [monthOption, setMonthOption] = React.useState(
    monthDateFormatOptions[3]
  );
  const [yearOption, setYearOption] = React.useState(yearDateFormatOptions[3]);
  const [numberFormatOption, String] = React.useState(numberFormatOptions[0]);
  const [numberFormatStringValue, setNumberFormatStringValue] =
    React.useState("0.0");

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO use Unit group to do global units change
  const handleFirstLevelSettingsChange = (event: ChangeEvent<any>) => {
    const name = event.target.name;
    const value = event.target.value;
    // if (name === "unitGroupOption") {
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
    ); //[{oilRate: "stb/dayOption"},{gasRate: "m3/dayOption"}]
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
                    setUnitGroupOption({
                      value: newUnitGroup.toLowerCase(),
                      label: newUnitGroup,
                    });

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
                    setUnitGroupOption({
                      value: newUnitGroup.toLowerCase(),
                      label: newUnitGroup,
                    });

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
        key: "unitGroupOptions",
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

          <ApexSelectRS
            valueOption={unitGroupOption}
            data={unitGroupOptions}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              dispatch(
                updateUnitsSettingsParameterAction("unitGroup", option?.label)
              );

              setUnitGroupOption(option as ISelectOption);
            }}
            menuPortalTarget={dialogRef.current as HTMLDivElement}
            isSelectOptionType={true}
            containerHeight={40}
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
                <ApexSelectRS
                  valueOption={dayOption}
                  data={dayDateFormatOptions}
                  handleSelect={(option: ValueType<ISelectOption, false>) => {
                    dispatch(
                      updateUnitsSettingsParameterAction(
                        "dayFormat",
                        option?.label
                      )
                    );
                    setDayOption(option as ISelectOption);
                  }}
                  menuPortalTarget={dialogRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
                <ApexSelectRS
                  valueOption={monthOption}
                  data={monthDateFormatOptions}
                  handleSelect={(option: ValueType<ISelectOption, false>) => {
                    dispatch(
                      updateUnitsSettingsParameterAction(
                        "monthFormat",
                        option?.label
                      )
                    );
                    setMonthOption(option as ISelectOption);
                  }}
                  menuPortalTarget={dialogRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
                <ApexSelectRS
                  valueOption={yearOption}
                  data={yearDateFormatOptions}
                  handleSelect={(option: ValueType<ISelectOption, false>) => {
                    dispatch(
                      updateUnitsSettingsParameterAction(
                        "yearFormat",
                        option?.label
                      )
                    );
                    setYearOption(option as ISelectOption);
                  }}
                  menuPortalTarget={dialogRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />

                <DateFormatter
                  dayFormat={dayOption.label}
                  monthFormat={monthOption.label}
                  yearFormat={yearOption.label}
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
          <AnalyticsComp
            title="Number Format"
            direction="Vertical"
            content={
              <ApexFlexContainer>
                <ApexSelectRS
                  valueOption={numberFormatOption}
                  data={numberFormatOptions}
                  handleSelect={(option: ValueType<ISelectOption, false>) => {
                    dispatch(
                      updateUnitsSettingsParameterAction(
                        "numberFormatString",
                        option?.label
                      )
                    );
                    String(option as ISelectOption);
                  }}
                  menuPortalTarget={dialogRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
                <TextField
                  name="numberFormatString"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={numberFormatStringValue}
                  onChange={(event: React.ChangeEvent<any>) => {
                    const { value } = event.target;
                    dispatch(
                      updateUnitsSettingsParameterAction(
                        "numberFormatString",
                        value
                      )
                    );
                    setNumberFormatStringValue(value);
                  }}
                  required
                  autoFocus
                  fullWidth
                />
              </ApexFlexContainer>
            }
          />
        </div>
      </div>

      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid<IUnitsRow, ITableButtonsProps>
            columns={columns}
            rows={rows}
            tableButtons={tableButtons}
            size={size}
            autoAdjustTableDim={true}
            showTableHeader={true}
            showTablePagination={true}
          />
        )}
      </SizeMe>
    </div>
  );
}
