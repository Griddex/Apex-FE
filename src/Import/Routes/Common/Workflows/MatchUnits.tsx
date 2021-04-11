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
  ISelectOptions,
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
} from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";
import getRSStyles from "../../../Utils/GetRSStyles";
import Select, { Styles, ValueType } from "react-select";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import { IUnitSettingsData } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import uniqBy from "lodash.uniqby";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { UserMatchObjectType } from "./MatchHeadersTypes";
import pullAll from "lodash.pullall";

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

export default function MatchUnits({ wrkflwPrcss }: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "importDataWorkflows";
  const wp = wrkflwPrcss;

  // const isFacilitiesWorkflow = wp.includes("facilities");
  let workflowClass = "";
  if (wp.includes("facilities")) workflowClass = "facilities";
  else if (wp.includes("forecast")) workflowClass = "forecast";
  else workflowClass = "forecast";

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO: Get from Gift
  const savedMatchObjectAll: UserMatchObjectType = {
    facilities: {
      headers: {
        Liquid_Capacity_1P: {
          header: "Liquid Capacity 1P",
          acceptMatch: true,
        },
        Gas_Capacity_1P: { header: "Gas Capacity 1P", acceptMatch: true },
      },
      units: {
        "MMstb/d": { header: "MMbbl/d", acceptMatch: true },
        MMScf: { header: "MMscf", acceptMatch: true },
      },
    },
    forecast: {
      headers: {
        "Version Name": { header: "Forecast Version", acceptMatch: true },
        "Activity Entity": { header: "Project Name", acceptMatch: true },
        "URg 1P/1C": { header: "Gas UR/1P1C", acceptMatch: true },
        "URg 2P/2C": { header: "Gas UR/2P2C", acceptMatch: true },
        "URg 3P/3C": { header: "Gas UR/3P3C", acceptMatch: true },
      },
      units: {
        "[MMstb]": { header: "MMbbl", acceptMatch: true },
        "[Bscf]": { header: "Bscf", acceptMatch: true },
      },
    },
  };
  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];
  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);
  const specificSavedMatchObjectValues = Object.values(
    specificSavedMatchObject
  );

  const { fileUnits, fileUniqueUnits } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );

  //Application units
  const { variableUnits } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  //Get units list from Gift
  //[{unitTitle:"bbl/D", group:"Field"}, {unitTitle:"psi", group:"Field"}]
  //TODO: Memoize for performance boost
  const applicationUnitsCollection = variableUnits.reduce(
    (acc: { title: string; group: string }[], row) => {
      const units = row.units.map((u) => ({ title: u.title, group: u.group }));

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
  ] = React.useState<Record<string, number>>(
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
  ] = React.useState<Record<string, number>>(snChosenAppUniqueUnitIndices);

  const [
    userMatchObject,
    setUserMatchObject,
  ] = React.useState<UserMatchObjectType>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationUnitOptions: {
    [index: string]: { value: string; label: string }[];
  }) => {
    const handleApplicationHeaderChange = (
      value: ValueType<ISelectOptions, false>,
      rowSN: number,
      fileUnit: string,
      unitOptions: ISelectOptions[],
      scoreOptions: ISelectOptions[]
    ) => {
      const selectedValue = value && value.label;
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
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const fileUnit = row.fileUnit as string;
          const unitOptions = keyedApplicationUnitOptions[fileUnit];
          const scoreOptions = keyedScoreOptions[fileUnit];
          const appUnit = row.applicationUnit as string;

          const valueOption = generateSelectOptions([appUnit])[0];

          const RSStyles: Styles<ISelectOptions, false> = getRSStyles(theme);

          return (
            <Select
              value={valueOption}
              options={unitOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOptions, false>) =>
                handleApplicationHeaderChange(
                  value,
                  rowSN,
                  fileUnit,
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
            />
          );
        },
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
        name: "MATCH",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const match = row.match as number;

          return <CenteredStyle>{match}</CenteredStyle>;
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

  React.useEffect(() => {
    dispatch(persistFileUnitsMatchAction(fileUniqueUnitsClean, wp));
    dispatch(
      persistChosenApplicationUniqueUnitIndicesAction(
        chosenApplicationUniqueUnitIndices,
        wp
      )
    );

    dispatch(persistChosenApplicationUnitsAction(chosenApplicationUnits, wp));

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
              mappingErrors={getDuplicates(chosenApplicationUnits)}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
