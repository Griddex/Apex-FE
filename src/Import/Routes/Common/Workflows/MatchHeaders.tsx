import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import { Dictionary, findIndex, findLastIndex, omit } from "lodash";
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
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationHeadersAction,
  persistChosenApplicationHeadersIndicesAction,
  persistFileHeadersMatchAction,
  persistTableHeadersAction,
} from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationHeaders from "./../../../Utils/GetChosenApplicationHeaders";
import { IApplicationHeaders } from "./MatchHeadersTypes";

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

export default function MatchHeaders({ wrkflwPrcss }: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = "importDataWorkflows";
  const wp = wrkflwPrcss;

  //File Headers
  const { facilitiesInputHeaders, forecastInputHeaders } = useSelector(
    (state: RootState) => state.inputReducer
  );

  const { fileHeaders } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );

  const isFacilitiesWorkflow = wp.includes("facilities");
  let applicationHeaders: string[] = [];
  if (isFacilitiesWorkflow)
    applicationHeaders = facilitiesInputHeaders.map(
      (header: IApplicationHeaders) => header.variableTitle
    );
  else
    applicationHeaders = forecastInputHeaders.map(
      (header: IApplicationHeaders) => header.variableTitle
    );

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
          (score: number | undefined) =>
            score !== undefined ? Math.round((1 - score) * 100) : 0
        );

        if (!matchedHeaders.includes("None")) {
          matchedHeaders.push("None");
          cleanedMatchedScores.push(0);
        }

        return zipObject(matchedHeaders, cleanedMatchedScores);
      } else {
        const zeroScores: number[] = new Array(applicationHeaders.length).fill(
          0
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
          value: applicationHeader.toString(),
          label: applicationHeader.toString(),
        })
      );

      return result;
    }
  );

  const scoreOptions: ScoreOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      const result = Object.values(fileHeaderMatch).map((score: number) => ({
        value: score.toString(),
        label: score.toString(),
      }));

      return result;
    }
  );

  const keyedApplicationHeaderOptions = zipObject(
    fileHeaders,
    applicationHeaderOptions
  );

  const keyedScoreOptions = zipObject(fileHeaders, scoreOptions);

  const snChosenApplicationHeaderIndices = fileHeaderMatches.reduce(
    (acc: Record<string, number>, _, i: number) => {
      return { ...acc, [`${i + 1}`]: 0 };
    },
    {}
  );

  const initialTableRows = fileHeaders.map((fileHeader: string, i: number) => {
    const headerOptions = keyedApplicationHeaderOptions[fileHeader];
    const selectedApplicationHeader = headerOptions[0];
    const scoreOpts = keyedScoreOptions[fileHeader];
    const score = scoreOpts[0];

    return {
      sn: i + 1,
      fileHeader: fileHeader,
      applicationHeader: selectedApplicationHeader.value,
      match: score.value,
    };
  });

  const tableRows = React.useRef<IRawTable>(initialTableRows);
  const [, setRerender] = React.useState(false);

  const [
    chosenApplicationHeaderIndices,
    setChosenApplicationHeaderIndices,
  ] = React.useState(snChosenApplicationHeaderIndices);

  const [
    acceptMatchCheckboxSelected,
    setAcceptMatchCheckboxSelected,
  ] = React.useState(false);
  const [excludeCheckboxSelected, setExcludeCheckboxSelected] = React.useState(
    false
  );
  const generateColumns = (
    keyedApplicationHeaderOptions: Dictionary<
      {
        value: string;
        label: string;
      }[]
    >
  ) => {
    const handleExcludeCheckboxChange = (
      row: IRawRow,
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const selectedFileHeader = row.fileHeader as string;
      const headerOptions = keyedApplicationHeaderOptions[selectedFileHeader];
      const selectedOptionIndex = findLastIndex(
        headerOptions,
        (u: { value: string; label: string }) => u.label === "None"
      );
      console.log(
        "Logged output --> ~ file: MatchHeaders.tsx ~ line 233 ~ MatchHeaders ~ selectedOptionIndex",
        selectedOptionIndex
      );
      modifyTableRows(selectedFileHeader, selectedOptionIndex);
      setExcludeCheckboxSelected(
        (excludeCheckboxSelected) => !excludeCheckboxSelected
      );

      setRerender((rerender) => !rerender);
    };

    const handleAcceptMatchCheckboxChange = (
      row: IRawRow,
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      alert(row);
      setAcceptMatchCheckboxSelected(!acceptMatchCheckboxSelected);
    };

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 20 },
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
        formatter: ({ row, onRowChange }) => {
          const rowSN = row.sn;
          const fileHeader = row.fileHeader as string;
          const options = keyedApplicationHeaderOptions[fileHeader];
          const appHeader = row.applicationHeader as string;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={appHeader as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();
                const selectedValue = event.target.value;

                onRowChange({
                  ...row,
                  applicationHeader: selectedValue as string,
                });

                const selectedHeaderOptionIndex = findIndex(
                  options,
                  (option) => option.value === selectedValue
                );

                setChosenApplicationHeaderIndices((prev) => ({
                  ...prev,
                  [`${rowSN}`]: selectedHeaderOptionIndex,
                }));

                modifyTableRows(fileHeader, selectedHeaderOptionIndex);
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
      },
      {
        key: "match",
        name: "MATCH",
        editable: false,
        resizable: true,
        width: 100,
      },

      {
        key: "exclude",
        name: "EXCLUDE",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleExcludeCheckboxChange(row, event)}
            checked={excludeCheckboxSelected}
          />
        ),
        width: 100,
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleAcceptMatchCheckboxChange(row, event)}
            checked={acceptMatchCheckboxSelected}
          />
        ),
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationHeaderOptions),
    [keyedApplicationHeaderOptions]
  );

  const modifyTableRows = (
    selectedFileHeader: string,
    selectedHeaderOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.fileHeader === selectedFileHeader) {
        const headerOptions = keyedApplicationHeaderOptions[selectedFileHeader];
        const selectedApplicationHeader =
          headerOptions[selectedHeaderOptionIndex];
        const scoreOpts = keyedScoreOptions[selectedFileHeader];
        const score = scoreOpts[selectedHeaderOptionIndex];

        return {
          sn: i + 1,
          fileHeader: selectedFileHeader,
          applicationHeader: selectedApplicationHeader.value,
          match: score.value,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };

  const rows = tableRows.current;
  console.log(
    "Logged output --> ~ file: MatchHeaders.tsx ~ line 405 ~ MatchHeaders ~ rows",
    rows
  );

  //Run once after 1st render
  React.useEffect(() => {
    const columnNames: string[] = columns.map(
      (column) => column.name as string
    );
    const tableHeaders = omit(columnNames, ["SN", "NAMES"]) as string[];
    dispatch(persistTableHeadersAction(tableHeaders, wp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    //Any need?
    dispatch(persistFileHeadersMatchAction(fileHeaderMatches, wp));
    dispatch(
      persistChosenApplicationHeadersIndicesAction(
        chosenApplicationHeaderIndices,
        wp
      )
    );

    const chosenApplicationHeaders = getChosenApplicationHeaders(
      fileHeaderMatches,
      chosenApplicationHeaderIndices
    );

    dispatch(
      persistChosenApplicationHeadersAction(chosenApplicationHeaders, wp)
    );

    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rows]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData} />
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
