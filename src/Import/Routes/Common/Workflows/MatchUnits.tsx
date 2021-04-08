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
} from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";
import getRSStyles from "../../../Utils/GetRSStyles";
import Select, { Styles, ValueType } from "react-select";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import { IUnitSettingsData } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import uniqBy from "lodash.uniqby";

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
    "DD/MM/yyyy",
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

export default function MatchUnits({ wrkflwPrcss }: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "importDataWorkflows";
  const wp = wrkflwPrcss;

  const { fileUnits, fileUniqueUnits } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );

  //Application units
  const { variableUnits } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  //Get units list from Gift
  //[{unitTitle:"bbl/D", group:"Field"}, {unitTitle:"psi", group:"Field"}]
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

  const applicationUnits = applicationUnitsUniqueCollection.map((u) => u.title);

  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationUnits, options);

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

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

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

  //Unit Classification
  const unitGroupOptions: SelectOptionsType = unitClassificationData.map(
    (unitClass: string) => ({ value: unitClass, label: unitClass })
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

  const [, setAcceptMatchSwitchChecked] = React.useState(false);
  const generateColumns = (
    keyedApplicationUnitOptions: {
      [index: string]: { value: string; label: string }[];
    },
    unitGroupOptions: SelectOptionsType
  ) => {
    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setAcceptMatchSwitchChecked(event.target.checked);

      const selectedRowSN = row.sn as number;
      const currentRows = tableRows.current;
      const selectedRow = currentRows[selectedRowSN - 1];

      currentRows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: event.target.checked,
      };
      tableRows.current = currentRows;
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
        formatter: ({ row, onRowChange }) => {
          const rowSN = row.sn;
          const fileUnit = row.fileUnit as string;
          const unitOptions = keyedApplicationUnitOptions[fileUnit];
          const appUnit = row.applicationUnit as string;

          const valueOption = generateSelectOptions([appUnit])[0];

          const RSStyles: Styles<ISelectOptions, false> = getRSStyles(theme);
          const handleSelect = (value: ValueType<ISelectOptions, false>) => {
            const selectedValue = value && value.label;

            onRowChange({
              ...row,
              applicationUnit: selectedValue as string,
            });

            const selectedUnitOptionIndex = findIndex(
              unitOptions,
              (option) => option.value === selectedValue
            );

            setChosenApplicationUniqueUnitIndices((prev) => ({
              ...prev,
              [fileUnit]: selectedUnitOptionIndex,
            }));

            updateTableBySelectedOption(fileUnit, selectedUnitOptionIndex);
            setRerender((rerender) => !rerender);
          };

          return (
            <Select
              value={valueOption}
              options={unitOptions}
              styles={RSStyles}
              onChange={handleSelect}
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
        width: 200,
      },
      {
        key: "match",
        name: "MATCH",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        resizable: true,
        formatter: ({ row }) => {
          const checked = row.exclude as boolean;

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.warning.main}
              />
            </div>
          );
        },
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
  const updateTableBySelectedOption = (
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
          acceptMatch: row.acceptMatch,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };

  const [rows, setRows] = React.useState(tableRows.current);

  React.useEffect(() => {
    dispatch(persistFileUnitsMatchAction(fileUniqueUnitMatches, wp));
    dispatch(
      persistChosenApplicationUniqueUnitIndicesAction(
        chosenApplicationUniqueUnitIndices,
        wp
      )
    );

    const chosenApplicationUnits = getChosenApplicationUnits(
      fileUnits,
      keyedFileUnitMatches,
      chosenApplicationUniqueUnitIndices
    );

    dispatch(persistChosenApplicationUnitsAction(chosenApplicationUnits, wp));

    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rows]);

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
              // mappingErrors={getDuplicates(chosenApplicationHeaders)}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
