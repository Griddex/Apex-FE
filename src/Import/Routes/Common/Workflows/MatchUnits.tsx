import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import { Dictionary, findIndex } from "lodash";
import zipObject from "lodash/zipObject";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  IRawTable,
  ITableIconsOptions,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { SelectEditor } from "../../../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationUniqueUnitIndicesAction,
  persistChosenApplicationUnitsAction,
  persistFileUnitsMatchAction,
} from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";

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

//TODO: API saga to get app headers from server
const getApplicationUnits = () => {
  return [
    "(scf/stb)/(stb/scf)",
    "(stb/d)/(MMscf/d)",
    "1/psi",
    "acre",
    "barrel",
    "Bscf",
    "cp",
    "dd/mm/yyyy",
    "fraction",
    "ft",
    "int. Year / fraction",
    "mD",
    "MMscf",
    "MMscf/d",
    "MMstb",
    "psi",
  ];
};

export default function MatchUnits({
  workflowProcess,
}: {
  workflowProcess: IAllWorkflowProcesses["workflowProcess"];
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowCategory = "importDataWorkflows";

  const { fileUnits, fileUniqueUnits } = useSelector(
    (state: RootState) =>
      state.inputReducer[workflowCategory][
        workflowProcess as IAllWorkflowProcesses["workflowProcess"]
      ]
  );

  //Application headers
  const applicationUnits = getApplicationUnits();
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationUnits, options);

  //Header matching in a useeffect - call backend api
  //Rematch button to call api with new matching method?
  //Replace empty matches with all headers in select control
  //set score to zero and red background
  //Monitor all currently selected to ensure no app header is
  //selected twice

  const fileUniqueUnitMatches: Record<string, number>[] = fileUniqueUnits.map(
    (fileUnit: string) => {
      if (fileUnit === "") return {};
      const searchResult = fuse.search(fileUnit);
      const matchedUnits = searchResult.map((match) => match["item"]);
      const matchedScores = searchResult.map((match) => match["score"]);

      if (matchedUnits.length > 0) {
        const cleanedMatchedScores = matchedScores.map(
          (score: number | undefined) =>
            score !== undefined ? Math.round((1 - score) * 100) : 0
        );

        return zipObject(matchedUnits, cleanedMatchedScores);
      } else {
        const zeroScores: number[] = new Array(applicationUnits.length).fill(0);

        return zipObject(applicationUnits, zeroScores);
      }
    }
  );

  const keyedFileUnitMatches = zipObject(
    fileUniqueUnits,
    fileUniqueUnitMatches
  );

  const unitsMatchChartData = generateMatchData(fileUniqueUnitMatches);

  //TODO: Use saga to fetch from server?
  const unitClassificationData = ["FIELD", "SI", "CUSTOM"];

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

  type AppUnitOptionsType = {
    value: string;
    label: string;
  }[];
  type UnitGroupOptionsType = {
    value: string;
    label: string;
  }[];
  type ScoreOptionsType = {
    value: string;
    label: string;
  }[];

  //Application Unit
  const appUnitOptions: AppUnitOptionsType[] = fileUniqueUnits.map(
    (fileUnit: string) => {
      const unitMatch = keyedFileUnitMatches[fileUnit];

      const result = Object.keys(unitMatch).map((applicationUnit: string) => ({
        value: applicationUnit.toString(),
        label: applicationUnit.toString(),
      }));

      return result;
    }
  );
  const keyedApplicationUnitOptions = zipObject(
    fileUniqueUnits,
    appUnitOptions
  );

  //Unit Classification
  const unitGroupOptions: UnitGroupOptionsType = unitClassificationData.map(
    (unitClass: string) => ({ value: unitClass, label: unitClass })
  );

  //Score match
  const scoreOptions: ScoreOptionsType[] = fileUniqueUnits.map(
    (fileUnit: string) => {
      const fileUnitMatch = keyedFileUnitMatches[fileUnit];

      const result = Object.values(fileUnitMatch).map((score: number) => ({
        value: score.toString(),
        label: score.toString(),
      }));

      return result;
    }
  );
  const keyedScoreOptions = zipObject(fileUniqueUnits, scoreOptions);

  const snChosenApplicationUniqueUnitIndices = fileUniqueUnits.reduce(
    (acc: Record<string, number>, unit: string, i: number) => {
      return { ...acc, [unit]: 0 };
    },
    {}
  );
  const [
    chosenApplicationUniqueUnitIndices,
    setChosenApplicationUniqueUnitIndices,
  ] = React.useState<Record<string, number>>(
    snChosenApplicationUniqueUnitIndices
  );

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const generateColumns = (
    keyedApplicationUnitOptions: Dictionary<
      {
        value: string;
        label: string;
      }[]
    >,
    unitGroupOptions: UnitGroupOptionsType
  ) => {
    const handleCheckboxChange = (
      row: IRawRow,
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.persist();
      alert(row);
      setCheckboxSelected(!checkboxSelected);
    };

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "actions",
        name: "Actions",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
      },
      {
        key: "fileUnit",
        name: "FILE UNIT",
        editable: false,
        resizable: true,
        width: 250,
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        editable: true,
        resizable: true,
        formatter: ({ row, onRowChange }) => {
          const rowSN = row.sn;
          const fileUnit = row.fileUnit as string;
          const options = keyedApplicationUnitOptions[fileUnit];
          const value = row.applicationUnit as string;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={value as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();
                const selectedValue = event.target.value;

                onRowChange({
                  ...row,
                  applicationUnit: selectedValue as string,
                });

                const selectedUnitOptionIndex = findIndex(
                  options,
                  (option) => option.value === selectedValue
                );

                setChosenApplicationUniqueUnitIndices((prev) => ({
                  ...prev,
                  [fileUnit]: selectedUnitOptionIndex,
                }));

                modifyTableRows(fileUnit, selectedUnitOptionIndex);
                setRerender((rerender) => !rerender);
              }}
            >
              {options.map((option, i: number) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        },
        width: 250,
      },
      {
        key: "unitClassification",
        name: "UNIT CLASSIFICATION",
        editable: true,
        resizable: true,
        editor: (p) => (
          <SelectEditor
            value={p.row.unitClassification as string}
            onChange={(value) => {
              p.onRowChange({ ...p.row, unitClassification: value }, true);
              // dispatch(selectedRowAction(p.row));
            }}
            options={unitGroupOptions}
            rowHeight={p.rowHeight}
            menuPortalTarget={p.editorPortalTarget}
          />
        ),
      },
      {
        key: "match",
        name: "MATCH",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleCheckboxChange(row, event)}
            checked={checkboxSelected}
          />
        ),
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationUnitOptions, unitGroupOptions),
    [keyedApplicationUnitOptions, unitGroupOptions]
  );

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const initialTableRows = fileUniqueUnits.map(
    (fileUnit: string, i: number) => {
      const unitOptions = keyedApplicationUnitOptions[fileUnit];
      const selectedApplicationUnit = unitOptions[0];
      const selectedUnitClassification = unitGroupOptions[0];
      const scoreOpts = keyedScoreOptions[fileUnit];
      const score = scoreOpts[0];

      return {
        sn: i + 1,
        fileUnit: fileUnit,
        applicationUnit: selectedApplicationUnit.value,
        unitClassification: selectedUnitClassification.value,
        match: score.value,
      };
    }
  );

  const tableRows = React.useRef<IRawTable>(initialTableRows);
  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedFileUnit: string,
    selectedUnitOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.fileUnit === selectedFileUnit) {
        const unitOptions = keyedApplicationUnitOptions[selectedFileUnit];
        const selectedApplicationUnit = unitOptions[selectedUnitOptionIndex];
        //TODO: When you select an app unit, it'll check the classification
        //object from the api and with the value set the select control
        //just have to make sure the value is exactly the same
        const selectedUnitClassification = unitGroupOptions[0];
        const scoreOpts = keyedScoreOptions[selectedFileUnit];
        const score = scoreOpts[selectedUnitOptionIndex];

        return {
          sn: i + 1,
          fileUnit: selectedFileUnit,
          applicationHeader: selectedApplicationUnit.value,
          unitClassification: selectedUnitClassification.value,
          match: score.value,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };

  const rows = tableRows.current;

  React.useEffect(() => {
    dispatch(
      persistFileUnitsMatchAction(fileUniqueUnitMatches, workflowProcess)
    );
    dispatch(
      persistChosenApplicationUniqueUnitIndicesAction(
        chosenApplicationUniqueUnitIndices,
        workflowProcess
      )
    );

    const chosenApplicationUnits = getChosenApplicationUnits(
      fileUnits,
      keyedFileUnitMatches,
      chosenApplicationUniqueUnitIndices
    );

    dispatch(
      persistChosenApplicationUnitsAction(
        chosenApplicationUnits,
        workflowProcess
      )
    );

    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rows]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart data={unitsMatchChartData} />
      </div>
      <div className={classes.table}>
        <ApexGrid<IRawRow, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions}
        />
      </div>
    </div>
  );
}
