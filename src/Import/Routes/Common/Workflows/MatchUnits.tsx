import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import findIndex from "lodash.findindex";
import range from "lodash.range";
import uniq from "lodash.uniq";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import Select, { OptionsType, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { v4 as uuidv4 } from "uuid";
import ImportMoreActionsContextMenu from "../../../../Application/Components/ContextMenus/ImportMoreActionsContextMenu";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import FillPopoverComponent from "../../../../Application/Components/PopoverComponents/FillPopoverComponent";
import {
  AppUnitSelectOptionsType,
  IExtendedSelectOption,
  ISelectOption,
  TSelectOptions,
} from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { typeOptions } from "../../../../Application/Data/ApplicationData";
import noEventPropagation from "../../../../Application/Events/NoEventPropagation";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getCurrentAppHeaderTitleNameMap from "../../../../Application/Utils/GetCurrentAppHeaderTitleNameMap";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { TDevScenarioNames } from "../../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { DoughnutChartAnalytics } from "../../../../Visualytics/Components/Charts/DoughnutChart";
import { updateInputParameterAction } from "../../../Redux/Actions/InputActions";
import computeFileUnitMatches from "../../../Utils/ComputeFileUnitMatches";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getInitialRowValueOrDefault from "../../../Utils/GetInitialRowValueOrDefault";
import getWorkflowClass from "./../../../../Application/Utils/GetWorkflowClass";
import {
  TSingleMatchObject,
  TUnit,
  TUserMatchObject,
} from "./MatchHeadersTypes";

const useStyles = makeStyles(() => ({
  rootMatchUnits: {
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
  unitClassification: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const savedMatchObjectAllSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer.savedMatchObjectAll,
  (obj) => obj
);

const variableNameUnitsMapSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.variableNameUnitsMap,
  (data) => data
);

const appUnitsUnitGroupsMapSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.appUnitsUnitGroupsMap,
  (data) => data
);

const MatchUnits = ({ reducer, wrkflwPrcss }: IAllWorkflows) => {
  console.log("Matchunitsssssssssssssssssssssssssssssssssss");
  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const workflowClass = getWorkflowClass(wp);

  const [acceptmatchToggle, setAcceptmatchToggle] = React.useState(false);

  const savedMatchObjectAll: TUserMatchObject = useSelector(
    savedMatchObjectAllSelector
  );

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["units"]
  );

  const variableNameUnitsMap = useSelector(variableNameUnitsMapSelector);
  const appUnitsUnitGroupsMap = useSelector(appUnitsUnitGroupsMapSelector);

  const currentAppHeaderOptionsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["currentAppHeaderOptions"],
    (options) => options
  );

  const currentAppHeaderOptions = useSelector(currentAppHeaderOptionsSelector);

  const fileUnitsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileUnits"],
    (data) => data
  );
  const matchHeadersTableSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["matchHeadersRows"],
    (data) => data
  );

  const fileUnits = useSelector(fileUnitsSelector);
  const matchHeadersRows = useSelector(matchHeadersTableSelector);

  const fileHeadersUnitsWithNoneMap = React.useRef(
    zipObject(
      matchHeadersRows.map((row: IRawRow) => row.fileHeader),
      fileUnits.map((u: string) => (u == "" ? "unitless" : u))
    )
  );

  const fileHeadersUnitsAppHeadersWithoutNoneMap = React.useRef(
    matchHeadersRows.reduce((acc: any, row: IRawRow) => {
      const { fileHeader, applicationHeader, include } = row;
      if (!include) return acc;
      else
        return {
          ...acc,
          [fileHeader as string]: {
            unit: fileHeadersUnitsWithNoneMap.current[fileHeader as string],
            chosenAppHeader: applicationHeader,
          },
        };
    }, {}) as Record<string, Record<string, string>>
  );

  const fileHeadersWithoutNone = React.useRef(
    matchHeadersRows.reduce((acc: string[], row: IRawRow) => {
      if (row.applicationHeader.toString().toLowerCase() !== "none")
        return [...acc, row.fileHeader];
      else return acc;
    }, [])
  );

  const facilitiesHeadersNameMapSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["facilitiesHeadersNameMap"],
    (data) => data
  );
  const forecastHeadersNameMapSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["forecastHeadersNameMap"],
    (data) => data
  );
  const cstRevAppHeadersNameMapsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["cstRevAppHeadersNameMaps"],

    (data) => data
  );
  const ecoParAppHeadersNameMapSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["ecoParAppHeadersNameMap"],
    (data) => data
  );

  const facilitiesHeadersNameMap = useSelector(
    facilitiesHeadersNameMapSelector
  );
  const forecastHeadersNameMap = useSelector(forecastHeadersNameMapSelector);
  const cRHeadersMap = useSelector(cstRevAppHeadersNameMapsSelector);
  const ecoParAppHeadersNameMap = useSelector(ecoParAppHeadersNameMapSelector);

  const currentDevOptionSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["currentDevOption"],
    (data) => data
  );

  const currentDevOption = useSelector(currentDevOptionSelector);

  let allAppHeadersNameMap = {} as Record<string, Record<string, string>>;
  if (reducer === "economicsReducer") {
    const currentDevValue = currentDevOption.value as TDevScenarioNames;
    const costsRevenuesAppHeadersMap = cRHeadersMap[currentDevValue];

    allAppHeadersNameMap = {
      costsRevenuesAppHeadersMap,
      ecoParAppHeadersNameMap,
    };
  } else {
    allAppHeadersNameMap = {
      facilitiesHeadersNameMap,
      forecastHeadersNameMap,
    };
  }

  const currentAppHeaderNameMap = React.useRef(
    getCurrentAppHeaderTitleNameMap(wp, allAppHeadersNameMap)
  );

  const getFileUnitsChosenAppHeaderNamesWoutNone = () => {
    const fileUnitsWithoutNone = Object.values(
      fileHeadersUnitsAppHeadersWithoutNoneMap.current
    ).map((o) => o.unit);

    const chosenAppHeadersWithoutNone = Object.values(
      fileHeadersUnitsAppHeadersWithoutNoneMap.current
    ).map((obj) => obj.chosenAppHeader);

    const chosenAppHeaderNamesWithoutNone = [];
    for (const header of chosenAppHeadersWithoutNone) {
      for (const option of currentAppHeaderOptions) {
        if (header === option.label) {
          chosenAppHeaderNamesWithoutNone.push(option.value);
          break;
        }
      }
    }

    return { fileUnitsWithoutNone, chosenAppHeaderNamesWithoutNone };
  };

  const fileUnitsChosenAppHeaderNamesWoutNone = React.useRef(
    getFileUnitsChosenAppHeaderNamesWoutNone()
  );

  const fileUnitMatches = React.useRef(
    computeFileUnitMatches(
      variableNameUnitsMap,
      fileUnitsChosenAppHeaderNamesWoutNone.current.fileUnitsWithoutNone,
      fileUnitsChosenAppHeaderNamesWoutNone.current
        .chosenAppHeaderNamesWithoutNone,
      savedMatchObjectAll,
      workflowClass
    )
  );

  const keyedFileUnitMatches = React.useRef(
    zipObject(fileHeadersWithoutNone.current, fileUnitMatches.current)
  );

  const unitsMatchChartData = React.useRef(
    generateMatchData(
      fileUnitMatches.current.map((matchObj) => {
        const units = Object.keys(matchObj);
        const a = units.reduce((acc: any, unit) => {
          const obj = matchObj[unit];

          return { ...acc, [unit]: obj["score"] };
        }, {});

        return a;
      }),
      theme
    )
  );

  //Application Unit
  const appUnitOptions = React.useRef(
    fileHeadersWithoutNone.current.map((fileHeader: string) => {
      const unitMatch = keyedFileUnitMatches.current[fileHeader];
      const options = generateSelectOptions(Object.keys(unitMatch));

      return options.map((opt) => {
        const valuesObj = unitMatch[opt.label];

        return { ...opt, unitId: valuesObj.unitId };
      });
    })
  ) as React.MutableRefObject<AppUnitSelectOptionsType[]>;

  const keyedApplicationUnitOptions = React.useRef(
    zipObject(fileHeadersWithoutNone.current, appUnitOptions.current)
  );

  //Score match
  const scoreOptions = React.useRef(
    fileHeadersWithoutNone.current.map((fileHeader: string) => {
      const fileUnitMatch = keyedFileUnitMatches.current[fileHeader];

      return generateSelectOptions(
        Object.values(fileUnitMatch).map((u) => u.score.toString())
      );
    })
  ) as React.MutableRefObject<TSelectOptions[]>;

  const keyedScoreOptions = React.useRef(
    zipObject(fileHeadersWithoutNone.current, scoreOptions.current)
  );

  const initialTableRows = React.useRef(
    fileHeadersWithoutNone.current.map((fileHeader: string, i: number) => {
      console.log(
        "🚀 ~ file: MatchUnits.tsx ~ line 371 ~ fileHeadersWithoutNone.current.map ~ fileHeader",
        fileHeader
      );

      const unitOptions = keyedApplicationUnitOptions.current[fileHeader];

      const selectedApplicationUnit = unitOptions[0];
      const initialUnitType = getInitialRowValueOrDefault<TUnit>(
        selectedApplicationUnit.label,
        "type",
        specificSavedMatchObjectValues,
        "Single",
        "appUnit"
      );

      const selectedUnitClassification =
        appUnitsUnitGroupsMap[selectedApplicationUnit.label];

      const scoreOpts = keyedScoreOptions.current[fileHeader];
      const score = scoreOpts[0];

      const matchObj = specificSavedMatchObjectValues.find(
        (o) => o.fileHeader === fileHeader
      ) as TSingleMatchObject;
      console.log(
        "🚀 ~ file: MatchUnits.tsx ~ line 347 ~ fileHeadersWithoutNone.current.map ~ matchObj",
        matchObj
      );

      return {
        sn: i + 1,
        fileHeader,
        fileUnit:
          fileHeadersUnitsAppHeadersWithoutNoneMap.current[fileHeader]["unit"],
        type: matchObj ? matchObj.type : initialUnitType,
        applicationUnit: matchObj
          ? matchObj.appUnit
          : selectedApplicationUnit.value,
        unitClassification: matchObj
          ? matchObj.unitGroup
          : selectedUnitClassification
          ? selectedUnitClassification
          : "General",
        match: matchObj ? matchObj.match : score.value,
        acceptMatch: matchObj ? matchObj.acceptMatch : false,
        unitId: matchObj ? matchObj.unitId : selectedApplicationUnit.unitId,
        appUnitOptionIndex: matchObj ? matchObj.optionIndex : 0,
      };
    })
  );

  const [rows, setRows] = React.useState(initialTableRows.current);

  const [userMatchObject, setUserMatchObject] =
    React.useState<TUserMatchObject>(savedMatchObjectAll);

  const generateColumns = (
    keyedApplicationUnitOptions: {
      [index: string]: AppUnitSelectOptionsType;
    },
    rows: any
  ) => {
    const handleUnitTypeChange = (
      option: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn, unitId, fileHeader, fileUnit, applicationUnit } = row;
      const rowSN = sn as number;

      const selectedValue = option && option.label;
      const selectedUnitType = selectedValue as TUnit;

      const selectedUnitId =
        (option?.value as string).toLowerCase() === "multiple"
          ? [unitId]
          : unitId;

      const newRows = [...rows];
      const selectedRow = newRows[rowSN - 1];
      newRows[rowSN - 1] = {
        ...selectedRow,
        type: selectedUnitType,
        unitId: selectedUnitId,
      };

      setRows(newRows);
      setUserMatchObject((prev) => {
        const next = { ...prev };

        const matchObjectValuesByUnits = Object.values(
          next[workflowClass]["units"]
        );

        const matchObj = matchObjectValuesByUnits.find(
          (o) => o.fileHeader === fileHeader
        ) as TSingleMatchObject;

        let fileUnitId: string;
        if (matchObj) fileUnitId = matchObj.id;
        else fileUnitId = uuidv4();

        let unitType: string;
        if (matchObj) unitType = matchObj.type;
        else unitType = selectedUnitType;

        next[workflowClass]["units"][fileUnitId] = {
          ...matchObj,
          fileUnit: fileUnit as string,
          type: selectedUnitType,
          appUnit:
            unitType === "Multiple"
              ? ([applicationUnit] as string[])
              : (applicationUnit as string),
          unitId: selectedUnitId as string | string[],
        };

        return next;
      });
    };

    const handleApplicationUnitChange = <T extends boolean>(
      option: NonNullable<ValueType<IExtendedSelectOption, T>>,
      row: IRawRow,
      type: TUnit,
      unitOptions: IExtendedSelectOption[],
      scoreOptions: IExtendedSelectOption[]
    ) => {
      const { sn, fileHeader } = row;
      const rowSN = sn as number;

      if (type === "Multiple") {
        const selectedAppUnitsOptions = option
          ? (option as OptionsType<IExtendedSelectOption>)
          : [];

        const selectedAppUnits = selectedAppUnitsOptions.map((u) => u.label);

        //Unit group
        const selectedUnitGroupArr = selectedAppUnits.map(
          (u) => appUnitsUnitGroupsMap[u]
        );
        const selectedUnitGroupUniqueArr = uniq(selectedUnitGroupArr);

        let selectedUnitGroup = "";
        if (selectedUnitGroupUniqueArr.length === 1)
          selectedUnitGroup = selectedUnitGroupUniqueArr[0];
        else if (selectedUnitGroupUniqueArr.length === 0)
          selectedUnitGroup = "";
        else selectedUnitGroup = "Mixed";

        //option indices
        const selectedUnitOptionIndices: number[] = [];
        for (const unit of selectedAppUnits) {
          const selectedUnitOptionIndex = findIndex(
            unitOptions,
            (option) => option.label === unit
          );
          selectedUnitOptionIndices.push(selectedUnitOptionIndex);
        }

        //Highest score
        const selectedScore = selectedUnitOptionIndices.reduce(
          (highestScore, posIdx) => {
            const score = parseInt(scoreOptions[posIdx].value as string);
            if (score > highestScore) return score;
            else return highestScore;
          },
          0
        );

        const newRows = [...rows];
        const selectedRow = newRows[rowSN - 1];
        const selectedUnitIds = selectedAppUnitsOptions.map((u) => u.unitId);

        newRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnits,
          unitClassification: selectedUnitGroup,
          match: selectedScore.toString(),
          unitId: selectedUnitIds,
          appUnitOptionIndex: selectedUnitOptionIndices,
        };

        setRows(newRows);
        setUserMatchObject((prev) => {
          const next = { ...prev };

          const matchObjectValuesByUnits = Object.values(
            next[workflowClass]["units"]
          );

          const matchObj = matchObjectValuesByUnits.find(
            (o) => o.fileHeader === (fileHeader as string)
          ) as TSingleMatchObject;

          let fileUnitId: string;
          if (matchObj) fileUnitId = matchObj.id;
          else fileUnitId = uuidv4();

          next[workflowClass]["units"][fileUnitId] = {
            ...matchObj,
            unitId: selectedUnitIds as string[],
            optionIndex: selectedUnitOptionIndices,
          };

          return next;
        });
      } else {
        const selectedValue = option && (option as IExtendedSelectOption).label;
        const selectedAppUnit = selectedValue as string;

        const selectedUnitGroup = appUnitsUnitGroupsMap[selectedAppUnit];
        const selectedUnitOptionIndex = findIndex(
          unitOptions,
          (option) => option.value === selectedValue
        );
        const selectedScore = scoreOptions[selectedUnitOptionIndex];

        const selectedUnitId = option
          ? (option as IExtendedSelectOption).unitId
          : "";

        const newRows = [...rows];
        const selectedRow = newRows[rowSN - 1];
        newRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnit,
          unitClassification: selectedUnitGroup,
          match: selectedScore.value,
          unitId: selectedUnitId,
          appUnitOptionIndex: selectedUnitOptionIndex,
        };

        setRows(newRows);
        setUserMatchObject((prev) => {
          const next = { ...prev };

          const matchObjectValuesByUnits = Object.values(
            next[workflowClass]["units"]
          );

          const matchObj = matchObjectValuesByUnits.find(
            (o) => o.fileHeader === (fileHeader as string)
          ) as TSingleMatchObject;

          let fileUnitId: string;
          if (matchObj) fileUnitId = matchObj.id;
          else fileUnitId = uuidv4();

          next[workflowClass]["units"][fileUnitId] = {
            ...matchObj,
            unitId: selectedUnitId as string,
            optionIndex: selectedUnitOptionIndex,
          };

          return next;
        });
      }
    };

    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const { fileUnit, type, applicationUnit } = row;
      const strFileUnit = fileUnit as string;
      const strApplicationUnit = applicationUnit as string;
      const strUnitType = type as TUnit;

      const newRows = [...rows];
      const selectedRowSN = row.sn as number;
      const selectedRow = newRows[selectedRowSN - 1];

      newRows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: isChecked,
      };

      setRows(newRows);

      //Update usermatchobject
      if (isChecked) {
        setUserMatchObject((prev) => {
          const next = { ...prev };

          const matchObjectValuesByUnits = Object.values(
            next[workflowClass]["headers"]
          );
          const matchObj = matchObjectValuesByUnits.find(
            (o) => o.fileHeader === strFileUnit
          ) as TSingleMatchObject;

          let fileUnitId: string;
          if (matchObj) fileUnitId = matchObj.id;
          else fileUnitId = uuidv4();

          next[workflowClass]["units"][fileUnitId] = {
            ...matchObj,
            id: fileUnitId,
            fileHeader: strFileUnit,
            appHeader: strApplicationUnit,
            type: strUnitType,
            acceptMatch: true,
          };

          return next;
        });
      } else {
        setUserMatchObject((prev) => {
          const specificSavedMatchObjectValues = Object.values(
            prev[workflowClass]["units"]
          );

          const matchObj = specificSavedMatchObjectValues.find(
            (o) => o.appHeader === strFileUnit
          ) as TSingleMatchObject;

          const matchObject = { ...prev };

          delete matchObject[workflowClass]["units"][matchObj.id];

          return matchObject;
        });
      }
    };

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const currentSN = row.sn as number;
          const currentRow = row;
          const columnTitleOptions = [
            {
              value: "type",
              label: "Type",
            },
            {
              value: "applicationUnit",
              label: "Application Unit",
            },
            {
              value: "acceptMatch",
              label: "Accept Match",
            },
          ];

          const upToOptions = range(0, currentSN).map((n: number) => ({
            value: n.toString(),
            label: n.toString(),
          }));

          const downToOptions = range(currentSN, rows.length + 1).map(
            (n: number) => ({ value: n.toString(), label: n.toString() })
          );

          const props = {
            columnTitleOptions,
            upToOptions,
            downToOptions,
            currentRow,
            rows,
            setRows,
          };

          const data = [
            {
              title: "Accept Match",
              nestedData: [
                {
                  title: "Yes",
                  action: () => {
                    rows[currentSN - 1] = {
                      ...currentRow,
                      acceptMatch: true,
                    };

                    setRows(rows);
                  },
                },
                {
                  title: "No",
                  action: () => {
                    rows[currentSN - 1] = {
                      ...currentRow,
                      acceptMatch: false,
                    };

                    setRows(rows);
                  },
                },
              ],
            },
            {
              title: "Fill",
              component: <FillPopoverComponent {...props} />,
            },
          ];

          return (
            <ApexFlexContainer>
              <ImportMoreActionsContextMenu data={data}>
                <MenuOpenOutlinedIcon />
              </ImportMoreActionsContextMenu>
            </ApexFlexContainer>
          );
        },

        width: 100,
      },
      {
        key: "fileHeader",
        name: "FILE HEADER",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "fileUnit",
        name: "FILE UNIT",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "type",
        name: "TYPE",
        resizable: true,
        formatter: ({ row }) => {
          const type = row.type as string;

          const valueOption = {
            value: type,
            label: type,
          };

          const RSStyles = getRSStyles(theme);
          type IsMulti = false;

          return (
            <div
              style={{ width: "100%", height: "100%" }}
              {...noEventPropagation()}
            >
              <Select<ISelectOption, IsMulti>
                value={valueOption}
                options={typeOptions}
                styles={RSStyles}
                onChange={(value: ValueType<ISelectOption, IsMulti>) => {
                  handleUnitTypeChange(value, row);
                }}
                menuPortalTarget={document.body}
                theme={(thm) => getRSTheme(thm, theme)}
              />
            </div>
          );
        },
        width: 150,
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        resizable: true,
        formatter: ({ row }) => {
          const fileHeader = row.fileHeader as string;
          const type = row.type as TUnit;

          const unitOptions = keyedApplicationUnitOptions[fileHeader];

          const scoreOptions = keyedScoreOptions.current[fileHeader];

          let appUnit: string | string[];
          let valueOption: IExtendedSelectOption | IExtendedSelectOption[];
          let IsMulti: boolean;
          if (type === "Single") {
            appUnit = row.applicationUnit as string | string[];

            if (Array.isArray(appUnit)) {
              appUnit = appUnit[0];
            }

            valueOption = unitOptions.find(
              (option) =>
                (option.value as string).toLowerCase() ===
                (appUnit as string).toLowerCase()
            ) as IExtendedSelectOption;

            IsMulti = false;
          } else {
            const multiAppUnit = row.applicationUnit;

            if (Array.isArray(multiAppUnit)) {
              valueOption = (multiAppUnit as string[]).reduce(
                (acc: any, u: string) => {
                  const vOpt = unitOptions.find(
                    (option) =>
                      (option.value as string).toLowerCase() === u.toLowerCase()
                  ) as IExtendedSelectOption;

                  return [...acc, vOpt];
                },
                []
              );
            } else {
              const vOpt = unitOptions.find(
                (option) =>
                  (option.value as string).toLowerCase() ===
                  (multiAppUnit as string).toLowerCase()
              ) as IExtendedSelectOption;

              valueOption = [vOpt];
            }

            IsMulti = true;
          }

          const RSStyles = getRSStyles(theme);

          type IsMultiType = typeof IsMulti;

          return (
            <div
              style={{ width: "100%", height: "100%" }}
              {...noEventPropagation()}
            >
              <Select<IExtendedSelectOption, IsMultiType>
                value={valueOption}
                options={unitOptions}
                styles={RSStyles}
                onChange={(
                  option: ValueType<IExtendedSelectOption, IsMultiType>
                ) =>
                  handleApplicationUnitChange<IsMultiType>(
                    option as NonNullable<
                      ValueType<IExtendedSelectOption, IsMultiType>
                    >,
                    row,
                    type,
                    unitOptions,
                    scoreOptions
                  )
                }
                menuPortalTarget={document.body}
                theme={(thm) => getRSTheme(thm, theme)}
                isMulti={IsMulti}
              />
            </div>
          );
        },
        width: 300,
      },
      {
        key: "unitClassification", //appUnit match selection will define this using units package
        name: "UNIT GROUP",
        resizable: true,
        formatter: ({ row }) => {
          const unitClassification = row.unitClassification as number;

          // return <div>{unitClassification}</div>;
          return <ApexFlexContainer>{unitClassification}</ApexFlexContainer>;
        },
        width: 200,
      },
      {
        key: "match",
        name: "MATCH [%]",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const match = row.match as number;

          return <ApexFlexContainer>{match}</ApexFlexContainer>;
        },
        //TODO: Look at this a lot more
        headerRenderer: ({ column }) => {
          const header = column.name;

          return <ApexFlexContainer>{header}</ApexFlexContainer>;
        },
        width: 150,
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        resizable: true,
        formatter: ({ row }) => {
          const checked = row.acceptMatch as boolean;

          return (
            <ApexFlexContainer>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.warning.main}
              />
            </ApexFlexContainer>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationUnitOptions.current, rows),
    [JSON.stringify(keyedApplicationUnitOptions.current), JSON.stringify(rows)]
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
    fileName: "MatchUnits",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
        <Tooltip
          key={"acceptAllToolTip"}
          title={"Toggle Accept All Matches"}
          placement="bottom-end"
          arrow
        >
          <IconButton
            style={{
              height: "28px",
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
            }}
            onClick={() => {
              const currentAcceptMatchValue = !acceptmatchToggle;
              const rowsAllAcceptMatch = rows.map((row: IRawRow) => {
                const rowAccept = {
                  ...row,
                  acceptMatch: currentAcceptMatchValue,
                };
                return rowAccept;
              });

              const fileHeaderKeys = rows.map((row: IRawRow) => row.fileHeader);
              for (const fileHeader of fileHeaderKeys) {
                const chosenRow = rows.find(
                  (row: IRawRow) => row.fileHeader === fileHeader
                ) as IRawRow;
                const chosenAppUnit = chosenRow.applicationUnit as string;
                const chosenUnitType = chosenRow.type as TUnit;
                const chosenUnitGroup = chosenRow.unitClassification as string;
                const chosenMatchScore = chosenRow.match as string;
                const chosenUnitId = chosenRow.unitId as string | string[];

                const matchObjectValuesByUnits = Object.values(
                  userMatchObject[workflowClass]["headers"]
                );

                const matchObj = matchObjectValuesByUnits.find(
                  (o) => o.fileHeader === fileHeader
                ) as TSingleMatchObject;

                let fileUnitId: string;
                if (matchObj) fileUnitId = matchObj.id;
                else fileUnitId = uuidv4();

                userMatchObject[workflowClass]["units"][fileUnitId] = {
                  ...matchObj,
                  id: fileUnitId,
                  type: chosenUnitType,
                  appUnit: chosenAppUnit,
                  unitId: chosenUnitId,
                  unitGroup: chosenUnitGroup,
                  match: chosenMatchScore,
                  acceptMatch: currentAcceptMatchValue,
                };
              }

              setRows(rowsAllAcceptMatch);
              setUserMatchObject(userMatchObject);
              setAcceptmatchToggle(currentAcceptMatchValue);
            }}
            size="large"
          >
            <AllInclusiveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ExcelExportTable<IRawRow> {...exportTableProps} />
      </div>
    ),
  };

  React.useEffect(() => {
    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.matchUnitsRows`,
        rows
      )
    );
  }, [JSON.stringify(rows)]);

  React.useEffect(() => {
    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.currentAppHeaderNameMap`,
        currentAppHeaderNameMap.current
      )
    );
  }, [JSON.stringify(currentAppHeaderNameMap.current)]);

  React.useEffect(() => {
    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.fileHeadersUnitsAppHeadersWithoutNoneMap`,
        fileHeadersUnitsAppHeadersWithoutNoneMap
      )
    );
  }, [JSON.stringify(fileHeadersUnitsAppHeadersWithoutNoneMap)]);

  React.useEffect(() => {
    dispatch(saveUserMatchAction(userMatchObject));
  }, [JSON.stringify(userMatchObject)]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChartAnalytics
          data={unitsMatchChartData.current}
          willUseThemeColor={false}
          colors={unitsMatchChartData.current.map((d: any) => d.color)}
        />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid
              columns={columns}
              rows={rows}
              onRowsChange={setRows}
              tableButtons={tableButtons}
              size={size}
              autoAdjustTableDim={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
};

export default React.memo(MatchUnits);
