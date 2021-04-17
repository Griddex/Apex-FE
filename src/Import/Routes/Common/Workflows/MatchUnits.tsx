import { makeStyles, useTheme } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import findIndex from "lodash.findindex";
import zipObject from "lodash.zipobject";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import {
  ISelectOption,
  SelectOptionsType,
} from "../../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  IRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { SelectEditor } from "../../../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationUniqueUnitIndicesAction,
  persistChosenApplicationUnitsAction,
  persistFileUnitsMatchAction,
  saveUserMatchAction,
} from "../../../Redux/Actions/InputActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";
import getRSStyles from "../../../Utils/GetRSStyles";
import Select, { OptionsType, Styles, ValueType } from "react-select";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import {
  IUnit,
  IUnitSettingsData,
} from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import uniqBy from "lodash.uniqby";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { UserMatchObjectType } from "./MatchHeadersTypes";
import pullAll from "lodash.pullall";
import { updateUnitsSettingsParameterAction } from "../../../../Settings/Redux/Actions/UnitSettingsActions";
import uniq from "lodash.uniq";

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

export default function MatchUnits({
  reducer,
  wrkflwPrcss,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  let workflowClass = "";
  if (wp.includes("facilities")) workflowClass = "facilities";
  else if (wp.includes("forecast")) workflowClass = "forecast";
  else workflowClass = "forecast";

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const {
    savedMatchObjectAll,
  }: { savedMatchObjectAll: UserMatchObjectType } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];
  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);
  const specificSavedMatchObjectValues = Object.values(
    specificSavedMatchObject
  );

  const { fileUnits, fileUniqueUnits } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  //Application units
  const { variableUnits } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  //Get units list from Gift
  //[{unitTitle:"bbl/D", group:"Field"}, {unitTitle:"psi", group:"Field"}]
  //TODO: Memoize for performance boost
  const applicationUnitsCollection = variableUnits.reduce(
    (acc: IUnit[], row) => {
      const units = row.units.map((u) => ({
        title: u.title,
        group: u.group,
        unitId: u.unitId,
      }));

      return [...acc, ...units];
    },
    []
  );
  const applicationUnitsUniqueCollection = uniqBy(
    applicationUnitsCollection,
    (o) => o.title
  );
  const applicationUnitsUniqueCollectionFinal: Record<
    string,
    string
  > = applicationUnitsUniqueCollection.reduce(
    (acc, u) => ({ ...acc, [u.title]: u.group }),
    {}
  );
  const applicationUnits = Object.keys(applicationUnitsUniqueCollectionFinal);

  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationUnits, options);

  const fileUnitMatches: Record<string, number>[] = [];
  const fileUniqueUnitsClean = fileUniqueUnits.filter((u: string) => u != "");
  for (const fileUnit of fileUniqueUnitsClean) {
    const searchResult = fuse.search(fileUnit);
    const matchedUnits = searchResult.map((match) => match["item"]);
    const matchedScores = searchResult.map((match) => match["score"]);

    if (matchedUnits.length > 0) {
      const mtchdUnits = matchedUnits;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round((1 - score) * 100) : 0
      );

      if (!mtchdUnits.includes("None")) {
        mtchdUnits.push("None");
        cleanedMatchedScores.push(0);
      }

      if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
        const matchUnit = specificSavedMatchObject[fileUnit];

        pullAll(mtchdUnits, [matchUnit.header]);
        mtchdUnits.unshift(matchUnit.header);
        cleanedMatchedScores.unshift(100);
      }

      fileUnitMatches.push(zipObject(mtchdUnits, cleanedMatchedScores));
    } else {
      const appUnits = applicationUnits;
      const zeroScores: number[] = new Array(applicationUnits.length).fill(0);

      if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
        const matchUnit = specificSavedMatchObject[fileUnit];
        pullAll(appUnits, [matchUnit.header]);

        appUnits.unshift(matchUnit.header);
        zeroScores.unshift(100);
      }

      appUnits.push("Date");
      zeroScores.push(0);

      fileUnitMatches.push(zipObject(appUnits, zeroScores));
    }
  }

  const keyedFileUnitMatches = zipObject(fileUniqueUnits, fileUnitMatches);
  const unitsMatchChartData = generateMatchData(fileUnitMatches);

  //Application Unit
  const appUnitOptions: SelectOptionsType[] = fileUniqueUnits.map(
    (fileUnit: string) => {
      const unitMatch = keyedFileUnitMatches[fileUnit];

      return generateSelectOptions(Object.keys(unitMatch));
    }
  );
  const keyedApplicationUnitOptions = zipObject(
    fileUniqueUnits,
    appUnitOptions
  );

  //Score match
  const scoreOptions: SelectOptionsType[] = fileUniqueUnits.map(
    (fileUnit: string) => {
      const fileUnitMatch = keyedFileUnitMatches[fileUnit];

      return generateSelectOptions(
        Object.values(fileUnitMatch).map((u) => u.toString())
      );
    }
  );
  const keyedScoreOptions = zipObject(fileUniqueUnits, scoreOptions);

  //{"MMstb":0,...}
  const snChosenApplicationUniqueUnitIndices = fileUniqueUnits.reduce(
    (acc: Record<string, number>, unit: string) => {
      return { ...acc, [unit]: 0 };
    },
    {}
  );

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const initialTableRows = fileUniqueUnits.map(
    (fileUnit: string, i: number) => {
      const unitOptions = keyedApplicationUnitOptions[fileUnit];
      const selectedApplicationUnit = unitOptions[0];
      const selectedUnitClassification =
        applicationUnitsUniqueCollectionFinal[selectedApplicationUnit.label];
      const scoreOpts = keyedScoreOptions[fileUnit];
      const score = scoreOpts[0];
      const acceptMatch = specificSavedMatchObjectValues
        .map((h) => h.header)
        .includes(selectedApplicationUnit.label)
        ? true
        : false;

      return {
        sn: i + 1,
        fileUnit: fileUnit,
        unitType: "Single",
        applicationUnit: selectedApplicationUnit.value,
        unitClassification: selectedUnitClassification,
        match: score.value,
        acceptMatch,
      };
    }
  );

  const tableRows = React.useRef<IRawTable>(initialTableRows);
  const rerenderRef = React.useRef<boolean>(false);
  const [rerender, setRerender] = React.useState(rerenderRef.current);

  const [
    chosenApplicationUniqueUnitIndices,
    setChosenApplicationUniqueUnitIndices,
  ] = React.useState<Record<string, number | number[]>>(
    snChosenApplicationUniqueUnitIndices
  );

  //{1:0, ...}
  const snChosenAppUniqueUnitIndices = fileUniqueUnits.reduce(
    (acc: Record<string, number>, _: any, i: number) => {
      return { ...acc, [`${i + 1}`]: 0 };
    },
    {}
  );
  const [
    chosenAppUniqueUnitIndices,
    setChosenAppUniqueUnitIndices,
  ] = React.useState<Record<string, number | number[]>>(
    snChosenAppUniqueUnitIndices
  );

  const [
    userMatchObject,
    setUserMatchObject,
  ] = React.useState<UserMatchObjectType>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationUnitOptions: {
    [index: string]: SelectOptionsType;
  }) => {
    const handleUnitTypeChange = (
      value: ValueType<ISelectOption, false>,
      rowSN: number
    ) => {
      const selectedValue = value && value.label;
      const selectedUnitType = selectedValue as string;

      //TODO: From Gift Need an object with unit:group pairs
      const currentRows = tableRows.current;
      const selectedRow = currentRows[rowSN - 1];
      currentRows[rowSN - 1] = {
        ...selectedRow,
        unitType: selectedUnitType,
      };

      tableRows.current = currentRows;

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

    const handleApplicationHeaderChange = <T extends boolean>(
      value: NonNullable<ValueType<ISelectOption, T>>,
      rowSN: number,
      fileUnit: string,
      unitType: "Single" | "Multiple",
      unitOptions: ISelectOption[],
      scoreOptions: ISelectOption[]
    ) => {
      if (unitType === "Multiple") {
        const selectedAppUnitsOptions = value
          ? (value as OptionsType<ISelectOption>)
          : [];
        const selectedAppUnits = selectedAppUnitsOptions.map((u) => u.label);
        const selectedUnitGroupArr = selectedAppUnits.map(
          (u) => applicationUnitsUniqueCollectionFinal[u]
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

        setChosenApplicationUniqueUnitIndices((prev) => ({
          ...prev,
          [`${fileUnit}`]: selectedUnitOptionIndices,
        }));
        setChosenAppUniqueUnitIndices((prev) => ({
          ...prev,
          [`${rowSN}`]: selectedUnitOptionIndices,
        }));

        //TODO: From Gift Need an object with unit:group pairs
        const currentRows = tableRows.current;
        const selectedRow = currentRows[rowSN - 1];
        currentRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnits,
          unitClassification: selectedUnitGroup,
          match: selectedScore,
        };
      } else {
        const selectedValue = value && (value as ISelectOption).label;
        const selectedAppUnit = selectedValue as string;

        const selectedUnitGroup =
          applicationUnitsUniqueCollectionFinal[selectedAppUnit];
        const selectedUnitOptionIndex = findIndex(
          unitOptions,
          (option) => option.value === selectedValue
        );
        const selectedScore = scoreOptions[selectedUnitOptionIndex];

        setChosenApplicationUniqueUnitIndices((prev) => ({
          ...prev,
          [`${fileUnit}`]: selectedUnitOptionIndex,
        }));
        setChosenAppUniqueUnitIndices((prev) => ({
          ...prev,
          [`${rowSN}`]: selectedUnitOptionIndex,
        }));

        //TODO: From Gift Need an object with unit:group pairs
        const currentRows = tableRows.current;
        const selectedRow = currentRows[rowSN - 1];
        currentRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnit,
          unitClassification: selectedUnitGroup,
          match: selectedScore.value,
        };

        tableRows.current = currentRows;

        rerenderRef.current = !rerenderRef.current;
        setRerender(rerenderRef.current);
      }
    };
    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const { fileUnit, applicationUnit } = row;
      const strFileUnit = fileUnit as string;
      const strApplicationUnit = applicationUnit as string;

      const selectedRowSN = row.sn as number;
      const currentRows = tableRows.current;
      const selectedRow = currentRows[selectedRowSN - 1];

      currentRows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: isChecked,
      };
      tableRows.current = currentRows;

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

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
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
        key: "unitType",
        name: "TYPE",
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const unitType = row.unitType as string;
          const unitTypeOptions = generateSelectOptions(["Single", "Multiple"]);
          const valueOption = generateSelectOptions([unitType])[0];

          const RSStyles = getRSStyles(theme);
          type IsMulti = false;

          return (
            <Select<ISelectOption, IsMulti>
              value={valueOption}
              options={unitTypeOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, IsMulti>) => {
                handleUnitTypeChange(value, rowSN);
              }}
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
          );
        },
        width: 250,
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const fileUnit = row.fileUnit as string;
          const unitType = row.unitType as "Single" | "Multiple";

          const unitOptions = keyedApplicationUnitOptions[fileUnit];
          const scoreOptions = keyedScoreOptions[fileUnit];

          let appUnit: string | string[];
          let valueOption: ISelectOption | ISelectOption[];
          let IsMulti: boolean;
          if (unitType === "Single") {
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
                handleApplicationHeaderChange<IsMultiType>(
                  value as NonNullable<ValueType<ISelectOption, IsMultiType>>,
                  rowSN,
                  fileUnit,
                  unitType,
                  unitOptions,
                  scoreOptions
                )
              }
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
              isMulti={IsMulti}
            />
          );
        },
        width: 300,
      },
      {
        key: "unitClassification", //appUnit match selection will define this using units package
        name: "UNIT CLASSIFICATION",
        resizable: true,
        formatter: ({ row }) => {
          const unitClassification = row.unitClassification as number;

          return <CenteredStyle>{unitClassification}</CenteredStyle>;
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

          return <CenteredStyle>{match}</CenteredStyle>;
        },
        //Look at his a lot more
        headerRenderer: ({ column }) => {
          const header = column.name;

          return <CenteredStyle>{header}</CenteredStyle>;
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
            <CenteredStyle>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.warning.main}
              />
            </CenteredStyle>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationUnitOptions),
    [keyedApplicationUnitOptions]
  );

  const [rows, setRows] = React.useState(tableRows.current);
  const chosenApplicationUnits = getChosenApplicationUnits(
    fileUnits,
    keyedFileUnitMatches,
    chosenApplicationUniqueUnitIndices
  );

  const chosenApplicationUnitsUniqueSingle = chosenApplicationUnits.filter(
    (u: string) => u !== "unitless" && u !== "Date" && !u.includes("&|&")
  );

  const chosenApplicationUnitsNoneExcluded = chosenApplicationUnits.filter(
    (h: string) => h.toLowerCase() !== "none"
  );

  React.useEffect(() => {
    dispatch(
      updateUnitsSettingsParameterAction(
        "applicationUnitsCollection",
        applicationUnitsUniqueCollection
      )
    );
    dispatch(persistFileUnitsMatchAction(fileUniqueUnitsClean, wp));
    dispatch(
      persistChosenApplicationUniqueUnitIndicesAction(
        chosenApplicationUniqueUnitIndices,
        wp
      )
    );

    dispatch(
      persistChosenApplicationUnitsAction(
        chosenApplicationUnitsNoneExcluded,
        wp
      )
    );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [rerender]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart data={unitsMatchChartData} />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
              onRowsChange={setRows}
              mappingErrors={getDuplicates(chosenApplicationUnitsUniqueSingle)}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
