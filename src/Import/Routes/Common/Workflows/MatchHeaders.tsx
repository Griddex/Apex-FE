import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import findIndex from "lodash.findindex";
import omit from "lodash.omit";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles } from "react-select";
import { ValueType } from "react-select/src/types";
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
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationHeadersAction,
  persistChosenApplicationHeadersIndicesAction,
  persistFileHeadersMatchAction,
  persistTableHeadersAction,
} from "../../../Redux/Actions/ImportActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getRoleRSStyles from "../../../Utils/GetRoleRSStyles";
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
  const theme = useTheme();

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

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const applicationHeaderOptions: SelectOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      return generateSelectOptions(Object.keys(fileHeaderMatch));
    }
  );

  const scoreOptions: SelectOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      return generateSelectOptions(
        Object.values(fileHeaderMatch).map((h) => h.toString())
      );
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
    const exclude = false;
    const acceptMatch = false;

    return {
      sn: i + 1,
      fileHeader: fileHeader,
      applicationHeader: selectedApplicationHeader.value,
      match: score.value,
      exclude,
      acceptMatch,
    };
  });

  const tableRows = React.useRef<IRawTable>(initialTableRows);
  const [, setRerender] = React.useState(false);

  const [
    chosenApplicationHeaderIndices,
    setChosenApplicationHeaderIndices,
  ] = React.useState(snChosenApplicationHeaderIndices);

  const [, setExcludeSwitchChecked] = React.useState(false);
  const [, setAcceptMatchSwitchChecked] = React.useState(false);

  const generateColumns = (keyedApplicationHeaderOptions: {
    [index: string]: { value: string; label: string }[];
  }) => {
    const handleExcludeSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setExcludeSwitchChecked(event.target.checked);

      const selectedRowSN = row.sn as number;
      const currentRows = tableRows.current;
      const selectedRow = currentRows[selectedRowSN - 1];

      currentRows[selectedRowSN - 1] = {
        ...selectedRow,
        exclude: event.target.checked,
      };
      tableRows.current = currentRows;
    };

    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log(
        "Logged output --> ~ file: MatchHeaders.tsx ~ line 214 ~ MatchHeaders ~ row",
        row
      );
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
        resizable: true,
        formatter: ({ row, onRowChange }) => {
          const rowSN = row.sn;
          const fileHeader = row.fileHeader as string;
          const headerOptions = keyedApplicationHeaderOptions[fileHeader];
          const appHeader = row.applicationHeader as string;
          const valueOption = generateSelectOptions([appHeader])[0];

          const colorStyles: Styles<ISelectOptions, false> = getRoleRSStyles(
            theme
          );

          const handleSelect = (value: ValueType<ISelectOptions, false>) => {
            const selectedValue = value && value.label;

            onRowChange({
              ...row,
              applicationHeader: selectedValue as string,
            });

            const selectedHeaderOptionIndex = findIndex(
              headerOptions,
              (option) => option.value === selectedValue
            );

            setChosenApplicationHeaderIndices((prev) => ({
              ...prev,
              [`${rowSN}`]: selectedHeaderOptionIndex,
            }));

            updateTableBySelectedOption(fileHeader, selectedHeaderOptionIndex);
            setRerender((rerender) => !rerender);
          };

          return (
            <Select
              value={valueOption}
              options={headerOptions}
              styles={colorStyles}
              onChange={handleSelect}
              menuPortalTarget={document.body}
            />
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
                name="exclude"
                handleChange={(event) => handleExcludeSwitchChange(row, event)}
                checked={checked}
                checkedColor={theme.palette.secondary.main}
                notCheckedColor={theme.palette.common.white}
              />
            </div>
          );
        },
        width: 100,
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
    () => generateColumns(keyedApplicationHeaderOptions),
    [keyedApplicationHeaderOptions]
  );

  const updateTableBySelectedOption = (
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
          exclude: row.exclude,
          acceptMatch: row.acceptMatch,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };

  const [rows, setRows] = React.useState(tableRows.current);

  const chosenApplicationHeaders = getChosenApplicationHeaders(
    fileHeaderMatches,
    chosenApplicationHeaderIndices
  );

  //Run once after 1st render
  React.useEffect(() => {
    const columnNames: string[] = columns.map(
      (column) => column.name as string
    );
    const tableHeaders = omit(columnNames, ["SN", "NAMES"]) as string[];
    dispatch(persistTableHeadersAction(tableHeaders, wp));
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
  }, [dispatch, rows]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData} />
      </div>
      <div className={classes.table}>
        <ApexGrid<IRawRow, ITableButtonsProps>
          columns={columns}
          rows={rows}
          tableButtons={tableButtons}
          onRowsChange={setRows}
          mappingErrors={getDuplicates(chosenApplicationHeaders)}
        />
      </div>
    </div>
  );
}
