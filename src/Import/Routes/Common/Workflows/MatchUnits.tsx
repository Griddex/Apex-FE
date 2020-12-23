import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import uniqBy from "lodash/uniqBy";
import zipObject from "lodash/zipObject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  IRawTable,
  ITableIconsOptions,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { SelectEditor } from "../../../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/RootReducer";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import { persistFileUnitsMatchAction } from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";

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

export default function MatchUnits() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //File Headers

  const { fileUnitsUnique } = useSelector(
    (state: RootState) => state.importReducer
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

  const unitMatches: Record<string, number>[] = fileUnitsUnique.map(
    (fileUnit: string) => {
      const searchResult = fuse.search(fileUnit);
      const matchedUnits = searchResult.map((match) => match["item"]);
      const matchedScores = searchResult.map((match) => match["score"]);

      if (matchedUnits.length > 0) {
        const cleanedMatchedScores = matchedScores.map(
          (score: number | undefined) => (score ? 0 : score)
        );

        return zipObject(matchedUnits, cleanedMatchedScores);
      } else {
        const zeroScores: number[] = new Array(applicationUnits.length).fill(0);
        return zipObject(applicationUnits, zeroScores);
      }
    }
  );

  const keyedFileUnitMatches = zipObject(fileUnitsUnique, unitMatches);

  const unitsMatchChartData = generateMatchData(unitMatches);

  const unitClassificationData = ["FIELD", "SI", "CUSTOM"];

  const actualColumnHeaders = [
    "FILE UNIT",
    "APPLICATION UNIT",
    "UNIT CLASSIFICATION",
    "MATCH",
    "ANCHOR MATCH",
  ];

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

  type ApplicationUnitOptionsType = {
    value: string;
    label: string;
  }[];
  type UnitClassificationOptionsType = {
    value: string;
    label: string;
  }[];
  type ScoreOptionsType = {
    value: string;
    label: string;
  }[];

  //Application Unit
  const applicationUnitOptions: ApplicationUnitOptionsType[] = fileUnitsUnique.map(
    (fileUnit: string) => {
      const unitMatch = keyedFileUnitMatches[fileUnit];

      const result = Object.keys(unitMatch).map((applicationUnit: string) => ({
        value: applicationUnit,
        label: applicationUnit,
      }));

      return result;
    }
  );
  const uniqueApplicationUnitOptions = applicationUnitOptions.map((options) =>
    uniqBy(options, (v) => v.label)
  );
  const keyedUniqueApplicationUnitOptions = zipObject(
    fileUnitsUnique,
    uniqueApplicationUnitOptions
  );

  //Unit Classification
  const unitClassificationOptions: UnitClassificationOptionsType = unitClassificationData.map(
    (unitClass: string) => ({ value: unitClass, label: unitClass })
  );

  //Score match
  const scoreOptions: ScoreOptionsType[] = fileUnitsUnique.map(
    (fileUnit: string) => {
      const fileUnitMatch = keyedFileUnitMatches[fileUnit];

      const result = Object.values(fileUnitMatch).map((score: number) => ({
        value: score,
        label: score,
      }));

      return result;
    }
  );
  const uniqueScoreOptions = scoreOptions.map((options) =>
    uniqBy(options, (v) => v.label)
  );
  const keyedUniqueScoreOptions = zipObject(
    fileUnitsUnique,
    uniqueScoreOptions
  );

  const generateColumns = () => {
    const [checkboxSelected, setCheckboxSelected] = React.useState(false);
    const handleCheckboxChange = (event: { persist: () => void }) => {
      event.persist();

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
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        editable: true,
        resizable: true,
        editor: (p) => (
          <SelectEditor
            value={p.row.applicationUnit as string}
            onChange={(value) => {
              p.onRowChange({ ...p.row, applicationUnit: value }, true);
              // dispatch(selectedRowAction(p.row));
            }}
            options={
              keyedUniqueApplicationUnitOptions[p.row.fileUnit as string]
            }
            rowHeight={p.rowHeight}
            menuPortalTarget={p.editorPortalTarget}
          />
        ),
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
            options={unitClassificationOptions}
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
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        editable: true,
        resizable: true,
        editor: (p) => (
          <Checkbox onClick={handleCheckboxChange} checked={checkboxSelected} />
        ),
      },
    ];

    return columns;
  };

  const columns = generateColumns();

  const createTableRows = (fileUnits: string[]): IRawTable => {
    const rows = fileUnits.map((fileUnit, i: number) => {
      return {
        sn: i + 1,
        fileUnit: fileUnit,
        applicationUnit: keyedUniqueApplicationUnitOptions[fileUnit],
        unitClassification: unitClassificationOptions,
        match: keyedUniqueScoreOptions[fileUnit],
      };
    });

    return rows;
  };

  const tableRows = createTableRows(fileUnitsUnique);

  React.useEffect(() => {
    dispatch(persistFileUnitsMatchAction(unitMatches));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart data={unitsMatchChartData} />
      </div>
      <div className={classes.table}>
        <ApexGrid<IRawRow, ITableIconsOptions>
          columns={columns}
          rows={tableRows}
          options={tableOptions}
        />
      </div>
    </div>
  );
}
