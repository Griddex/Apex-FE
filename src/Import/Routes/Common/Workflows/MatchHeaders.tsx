import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import { Dictionary } from "lodash";
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
import { persistFileHeadersMatchAction } from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";

const useStyles = makeStyles(() => ({
  rootMatchHeaders: {
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
  score: { fontSize: 14 },
}));

//TODO: API saga to get app headers from server
const getApplicationHeaders = () => {
  return [
    "Version",
    "Asset Team",
    "Field Name",
    "Reservoir Identification",
    "Drainage Point Nomenclature",
    "String",
    "Module",
    "PEEP",
    "Activity",
    "Flow station",
    "Hydrocarbon Stream",
    "Resource Category",
    "Change Category",
    "1P Technique",
    "URo 1P/1C",
    "URo Low",
    "URo 2P/2C",
    "URo 3P/3C",
    "Np",
    "URg 1P/1C",
    "URg Low",
    "URg 2P/2C",
    "URg 3P/3C",
    "Gp",
    "Init. Oil/Gas Rate 1P/1C",
    "Init. Oil/Gas Rate Low",
    "Init. Oil/Gas Rate 2P/2C",
    "Init. Oil/Gas Rate 3P/3C",
    "Aband. Oil/Gas Rate 1P/1C",
    "Aband. Oil/Gas Rate 2P/2C",
    "Aband. Oil/Gas Rate 3P/3C",
    "Init. BSW/WGR",
    "Aband. BSW/WGR 1P/1C",
    "Aband. BSW/WGR 2P/2C",
    "Aband. BSW/WGR 3P/3C",
    "Init. GOR/CGR",
    "Aband. GOR/CGR 1P/1C",
    "Aband. GOR/CGR 2P/2C",
    "Aband. GOR/CGR 3P/3C",
    "lift Gas Rate",
    "Plateau [Oil/Gas]",
    "In-year Booking",
    "LE/LV",
    "PRCS",
    "On-stream Date-1P/1C",
    "On-stream Date-2P/2C",
    "On-stream Date-3P/3C",
    "Remarks",
    "TRANCHE",
  ];
};

export default function MatchHeaders() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //File Headers
  const { fileHeaders } = useSelector(
    (state: RootState) => state.importReducer
  );

  //Application headers
  const applicationHeaders = getApplicationHeaders();
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationHeaders, options);

  //Header matching in a useeffect - call backend api
  //Rematch button to call api with new matching method?
  //Replace empty matches with all headers in select control
  //set score to zero and red background
  //Monitor all currently selected to ensure no app header is
  //selected twice
  const fileHeaderMatches: Record<string, number>[] = fileHeaders.map(
    (fileHeader: string) => {
      const searchResult = fuse.search(fileHeader);
      const matchedHeaders = searchResult.map((match) => match["item"]);
      const matchedScores = searchResult.map((match) => match["score"]);

      if (matchedHeaders.length > 0) {
        const cleanedMatchedScores = matchedScores.map(
          (score: number | undefined) => (score ? 0 : score)
        );

        return zipObject(matchedHeaders, cleanedMatchedScores);
      } else {
        const zeroScores: number[] = new Array(applicationHeaders.length).fill(
          1
        );

        return zipObject(applicationHeaders, zeroScores);
      }
    }
  );

  const keyedFileHeaderMatches = zipObject(fileHeaders, fileHeaderMatches);

  const headerMatchChartData = generateMatchData(fileHeaderMatches);

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

  const tableHeaders = [
    "FILE HEADER",
    "APPLICATION HEADER",
    "MATCH",
    "ANCHOR MATCH",
  ];

  type ApplicationHeaderOptionsType = {
    value: string;
    label: string;
  }[];
  type ScoreOptionsType = {
    value: string;
    label: string;
  }[];

  const applicationHeaderOptions: ApplicationHeaderOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      const result = Object.keys(fileHeaderMatch).map(
        (applicationHeader: string) => ({
          value: applicationHeader,
          label: applicationHeader,
        })
      );

      return result;
    }
  );
  const uniqueApplicationHeaderOptions = applicationHeaderOptions.map(
    (options) => uniqBy(options, (v) => v.label)
  );

  const scoreOptions: ScoreOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      const result = Object.values(fileHeaderMatch).map((score: number) => ({
        value: score,
        label: score,
      }));

      return result;
    }
  );
  const uniqueScoreOptions = scoreOptions.map((options) =>
    uniqBy(options, (v) => v.label)
  );

  const keyedUniqueApplicationHeaderOptions = zipObject(
    fileHeaders,
    uniqueApplicationHeaderOptions
  );

  const keyedUniqueScoreOptions = zipObject(fileHeaders, uniqueScoreOptions);

  const generateColumns = (
    keyedUniqueApplicationHeaderOptions: Dictionary<
      {
        value: string;
        label: string;
      }[]
    >
  ) => {
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
        key: "fileHeader",
        name: "FILE HEADER",
        editable: false,
        resizable: true,
      },
      {
        key: "applicationHeader",
        name: "APPLICATION HEADER",
        editable: true,
        resizable: true,
        editor: (p) => (
          <SelectEditor
            value={p.row.applicationHeader as string}
            onChange={(value) => {
              p.onRowChange({ ...p.row, applicationHeader: value }, true);
              // dispatch(selectedRowAction(p.row));
            }}
            options={
              keyedUniqueApplicationHeaderOptions[p.row.fileHeader as string]
            }
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

  const columns = React.useMemo(
    () => generateColumns(keyedUniqueApplicationHeaderOptions),
    [keyedUniqueApplicationHeaderOptions]
  );

  const createTableRows = (fileHeaders: string[]): IRawTable => {
    const rows = fileHeaders.map((fileHeader, i: number) => {
      return {
        sn: i + 1,
        fileHeader: fileHeader,
        applicationHeader: keyedUniqueApplicationHeaderOptions[fileHeader],
        match: keyedUniqueScoreOptions[fileHeader],
      };
    });

    return rows;
  };

  const tableRows = createTableRows(fileHeaders);

  React.useEffect(() => {
    dispatch(persistFileHeadersMatchAction(fileHeaderMatches));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData} />
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
