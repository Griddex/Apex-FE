import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import findIndex from "lodash.findindex";
import uniq from "lodash.uniq";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { OptionsType, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import {
  ISelectOption,
  SelectOptionsType,
} from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../../Application/Components/Styles/ApexFlexStyle";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getCurrentApplicationHeadersMap from "../../../../Application/Utils/GetCurrentApplicationHeadersMap";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { TDevScenarioNames } from "../../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { updateUnitsSettingsParameterAction } from "../../../../Settings/Redux/Actions/UnitSettingsActions";
import {
  IUnit,
  IUnitSettingsData,
} from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import {
  persistChosenApplicationUnitIndicesAction,
  persistChosenApplicationUnitsAction,
  persistFileUnitsMatchAction,
  updateInputParameterAction,
} from "../../../Redux/Actions/InputActions";
import computeFileUnitMatches from "../../../Utils/ComputeFileUnitMatches";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";
import getInitialRowValueOrDefault from "../../../Utils/GetInitialRowValueOrDefault";
import getWorkflowClass from "./../../../../Application/Utils/GetWorkflowClass";
import { TUnit, TUserMatchObject } from "./MatchHeadersTypes";

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

export default function MatchUnits({ reducer, wrkflwPrcss }: IAllWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const workflowClass = getWorkflowClass(wp);

  const [acceptmatchToggle, setAcceptmatchToggle] = React.useState(false);

  const { savedMatchObjectAll }: { savedMatchObjectAll: TUserMatchObject } =
    useSelector((state: RootState) => state.applicationReducer);

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["units"]
  );

  const { variableNameUnitsMap, appUnitsUnitGroupsMap } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  );

  const { currentAppHeaderOptions } = useSelector(
    (state: RootState) => state[reducer]
  );

  const { fileUnits, matchHeadersTable, fileAppHeaderExcludeWithNoneMap } =
    useSelector((state: RootState) => state[reducer][wc][wp]);

  const fileHeadersUnitsWithNoneMap = React.useRef(
    zipObject(
      matchHeadersTable.map((row: IRawRow) => row.fileHeader),
      fileUnits.map((u: string) => (u == "" ? "unitless" : u))
    )
  );
  console.log(
    "Logged output --> ~ file: MatchUnits.tsx ~ line 128 ~ MatchUnits ~ fileHeadersUnitsWithNoneMap",
    fileHeadersUnitsWithNoneMap
  );

  const fileHeadersUnitsWithoutNoneMap = React.useRef(
    Object.keys(fileHeadersUnitsWithNoneMap.current).reduce(
      (acc, fileHeader) => {
        const appHeaderExcludeObj = fileAppHeaderExcludeWithNoneMap[fileHeader];
        if (appHeaderExcludeObj.exclude) return acc;
        else
          return {
            ...acc,
            [fileHeader]: {
              units: fileHeadersUnitsWithNoneMap.current[fileHeader],
              chosenAppHeader: appHeaderExcludeObj.chosenAppHeader,
            },
          };
      },
      {}
    ) as Record<string, Record<string, string>>
  );
  console.log(
    "Logged output --> ~ file: MatchUnits.tsx ~ line 147 ~ MatchUnits ~ fileHeadersUnitsWithoutNoneMap",
    fileHeadersUnitsWithoutNoneMap
  );

  const fileHeadersWithoutNone = React.useRef(
    Object.keys(fileHeadersUnitsWithoutNoneMap)
  );

  //Get current variableNameUnitsMap
  const {
    facilitiesHeadersNameMap,
    forecastHeadersNameMap,
    cstRevAppHeadersNameMaps: cRHeadersMap,
    ecoParAppHeadersNameMap,
  } = useSelector((state: RootState) => state[reducer]);

  const { currentDevOption } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

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

  const applicationHeadersMap = React.useRef(
    getCurrentApplicationHeadersMap(wp, allAppHeadersNameMap)
  );

  const fileUnitMatches = React.useRef(
    computeFileUnitMatches(
      applicationHeadersMap.current,
      variableNameUnitsMap,
      currentAppHeaderOptions,
      fileHeadersUnitsWithoutNoneMap.current,
      savedMatchObjectAll,
      workflowClass
    )
  );
  console.log(
    "Logged output --> ~ file: MatchUnits.tsx ~ line 158 ~ MatchUnits ~ fileUnitMatches",
    fileUnitMatches
  );

  const keyedFileUnitMatches = React.useRef(
    zipObject(fileHeadersWithoutNone.current, fileUnitMatches.current)
  );

  const unitsMatchChartData = React.useRef(
    generateMatchData(
      fileUnitMatches.current.map((arr) => {
        const a = arr.reduce((acc: any, m) => {
          const k = Object.keys(m)[0];

          return { ...acc, [k]: m[k]["score"] };
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

      return generateSelectOptions(Object.keys(unitMatch));
    })
  ) as React.MutableRefObject<SelectOptionsType[]>;

  const keyedApplicationUnitOptions = React.useRef(
    zipObject(fileHeadersWithoutNone.current, appUnitOptions.current)
  );

  //Score match
  const scoreOptions = React.useRef(
    fileHeadersWithoutNone.current.map((fileHeader: string) => {
      const fileUnitMatch = keyedFileUnitMatches.current[fileHeader];

      return generateSelectOptions(
        Object.values(fileUnitMatch).map((u) => u.toString())
      );
    })
  ) as React.MutableRefObject<SelectOptionsType[]>;

  const keyedScoreOptions = React.useRef(
    zipObject(fileHeadersWithoutNone.current, scoreOptions.current)
  );

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const matchObjectHeaders = React.useRef(
    specificSavedMatchObjectValues.map((h) => h.header)
  );
  const initialTableRows = React.useRef(
    fileHeadersWithoutNone.current.map((fileHeader: string, i: number) => {
      const unitOptions = keyedApplicationUnitOptions.current[fileHeader];
      const selectedApplicationUnit = unitOptions[0];
      const initialUnitType = getInitialRowValueOrDefault<TUnit>(
        selectedApplicationUnit.label,
        "type",
        specificSavedMatchObjectValues,
        "Single"
      );
      const selectedUnitClassification =
        appUnitsUnitGroupsMap[selectedApplicationUnit.label];
      const scoreOpts = keyedScoreOptions.current[fileHeader];
      const score = scoreOpts[0];
      const acceptMatch = matchObjectHeaders.current.includes(
        selectedApplicationUnit.label
      )
        ? true
        : false;

      return {
        sn: i + 1,
        fileHeader: fileHeader,
        fileUnit: fileHeadersUnitsWithoutNoneMap.current[fileHeader]["units"],
        type: initialUnitType,
        applicationUnit: selectedApplicationUnit.value,
        unitClassification: selectedUnitClassification,
        match: score.value,
        acceptMatch,
      };
    })
  );

  const [rows, setRows] = React.useState(initialTableRows.current);

  const [chosenApplicationUnitIndices, setChosenApplicationUnitIndices] =
    React.useState<Record<string, number | number[]>>(
      fileHeadersWithoutNone.current.reduce(
        (acc: Record<string, number>, header: string) => {
          return { ...acc, [header]: 0 };
        },
        {}
      )
    );

  const [userMatchObject, setUserMatchObject] =
    React.useState<TUserMatchObject>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationUnitOptions: {
    [index: string]: SelectOptionsType;
  }) => {
    const handleUnitTypeChange = (
      option: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn, fileUnit } = row;
      const rowSN = sn as number;
      const fileUnitDefined = fileUnit as string;

      const selectedValue = option && option.label;
      const selectedUnitType = selectedValue as TUnit;

      const selectedRow = rows[rowSN - 1];
      rows[rowSN - 1] = {
        ...selectedRow,
        type: selectedUnitType,
      };

      setRows(rows);
    };

    const handleApplicationUnitChange = <T extends boolean>(
      option: NonNullable<ValueType<ISelectOption, T>>,
      row: IRawRow,
      fileHeader: string,
      type: TUnit,
      unitOptions: ISelectOption[],
      scoreOptions: ISelectOption[]
    ) => {
      const { sn, applicationUnit } = row;
      const applicationUnitDefined = applicationUnit as string;
      const rowSN = sn as number;

      if (type === "Multiple") {
        const selectedAppUnitsOptions = option
          ? (option as OptionsType<ISelectOption>)
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
            (option) => option.value === unit
          );
          selectedUnitOptionIndices.push(selectedUnitOptionIndex);
        }

        //Highest score
        const selectedScore = selectedUnitOptionIndices.reduce(
          (highestScore, i) => {
            const score = parseInt(scoreOptions[i].value);
            if (score > highestScore) return score;
            else return highestScore;
          },
          0
        );

        setChosenApplicationUnitIndices((prev) => ({
          ...prev,
          [fileHeader]: selectedUnitOptionIndices,
        }));

        const selectedRow = rows[rowSN - 1];
        rows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnits.join("&|&"),
          unitClassification: selectedUnitGroup,
          match: selectedScore.toString(),
        };
      } else {
        const selectedValue = option && (option as ISelectOption).label;
        const selectedAppUnit = selectedValue as string;

        const selectedUnitGroup = appUnitsUnitGroupsMap[selectedAppUnit];
        const selectedUnitOptionIndex = findIndex(
          unitOptions,
          (option) => option.value === selectedValue
        );
        const selectedScore = scoreOptions[selectedUnitOptionIndex];

        setChosenApplicationUnitIndices((prev) => ({
          ...prev,
          [`${fileHeader}`]: selectedUnitOptionIndex,
        }));

        const selectedRow = rows[rowSN - 1];
        rows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnit,
          unitClassification: selectedUnitGroup,
          match: selectedScore.value,
        };
      }
      setRows(rows);
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

      const selectedRowSN = row.sn as number;
      const selectedRow = rows[selectedRowSN - 1];

      rows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: isChecked,
      };

      //Update usermatchobject
      if (isChecked) {
        setUserMatchObject((prev) => ({
          ...prev,
          [workflowClass]: {
            ...prev[workflowClass],
            ["units"]: {
              ...prev[workflowClass]["units"],
              [strFileUnit]: {
                header: strApplicationUnit,
                type: strUnitType,
                acceptMatch: true,
              },
            },
          },
        }));
      } else {
        setUserMatchObject((prev) => {
          const matchObject = prev;
          delete matchObject[workflowClass]["units"][strFileUnit];

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
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
        width: 100,
      },
      {
        key: "fileUnit",
        name: "FILE UNIT",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "fileHeader",
        name: "FILE HEADER",
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
          const typeOptions = generateSelectOptions(["Single", "Multiple"]);
          const valueOption = generateSelectOptions([type])[0];

          const RSStyles = getRSStyles(theme);
          type IsMulti = false;

          return (
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
          );
        },
        width: 250,
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
          let valueOption: ISelectOption | ISelectOption[];
          let IsMulti: boolean;
          if (type === "Single") {
            appUnit = row.applicationUnit as string;
            valueOption = generateSelectOptions([appUnit])[0];
            IsMulti = false;
          } else {
            const multiAppUnit = row.applicationUnit;
            if (Array.isArray(multiAppUnit)) {
              valueOption = generateSelectOptions(multiAppUnit as string[]);
            } else {
              valueOption = generateSelectOptions([multiAppUnit as string]);
            }

            IsMulti = true;
          }

          const RSStyles = getRSStyles(theme);

          type IsMultiType = typeof IsMulti;

          return (
            <Select<ISelectOption, IsMultiType>
              value={valueOption}
              options={unitOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, IsMultiType>) =>
                handleApplicationUnitChange<IsMultiType>(
                  value as NonNullable<ValueType<ISelectOption, IsMultiType>>,
                  row,
                  fileHeader,
                  type,
                  unitOptions,
                  scoreOptions
                )
              }
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
              isMulti={IsMulti}
            />
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

          return <ApexFlexStyle>{unitClassification}</ApexFlexStyle>;
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

          return <ApexFlexStyle>{match}</ApexFlexStyle>;
        },
        //Look at his a lot more
        headerRenderer: ({ column }) => {
          const header = column.name;

          return <ApexFlexStyle>{header}</ApexFlexStyle>;
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
            <ApexFlexStyle>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.warning.main}
              />
            </ApexFlexStyle>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = generateColumns(keyedApplicationUnitOptions.current);

  // const chosenApplicationUnitsWithoutNone = React.useMemo(
  //   () =>
  //     getChosenApplicationUnits(
  //       fileHeadersWithoutNone.current,
  //       keyedFileUnitMatches.current,
  //       chosenApplicationUnitIndices
  //     ),
  //   [chosenApplicationUnitIndices]
  // );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
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
            const rowsAllAcceptMatch = rows.map((row) => {
              const rowAccept = {
                ...row,
                acceptMatch: currentAcceptMatchValue,
              };
              return rowAccept;
            });

            const fileHeaderKeys = rows.map((row) => row.fileHeader);
            for (const header of fileHeaderKeys) {
              const chosenRow = rows.find(
                (row) => row.fileHeader === header
              ) as IRawRow;
              const chosenAppUnit = chosenRow.fileUnit as string;
              const chosenUnitType = chosenRow.type as TUnit;

              userMatchObject[workflowClass]["units"][header] = {
                header: chosenAppUnit as string,
                type: chosenUnitType,
                acceptMatch: currentAcceptMatchValue,
              };
            }

            setRows(rowsAllAcceptMatch);
            setUserMatchObject(userMatchObject);
            setAcceptmatchToggle(currentAcceptMatchValue);
          }}
        >
          <AllInclusiveOutlinedIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  React.useEffect(() => {
    dispatch(
      persistChosenApplicationUnitIndicesAction(
        reducer,
        chosenApplicationUnitIndices,
        wp
      )
    );

    // dispatch(
    //   persistChosenApplicationUnitsAction(
    //     reducer,
    //     chosenApplicationUnitsWithoutNone,
    //     wp
    //   )
    // );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [setRows]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart
          data={unitsMatchChartData.current}
          willUseThemeColor={false}
        />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
              onRowsChange={setRows}
              // mappingErrors={getDuplicates(chosenApplicationUnitsUniqueSingle)}
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
}
