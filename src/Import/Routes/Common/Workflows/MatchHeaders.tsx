import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import findIndex from "lodash.findindex";
import omit from "lodash.omit";
import pullAll from "lodash.pullall";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles } from "react-select";
import { ValueType } from "react-select/src/types";
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
  saveUserMatchAction,
} from "../../../Redux/Actions/InputActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getRSStyles from "../../../Utils/GetRSStyles";
import CenteredStyle from "./../../../../Application/Components/Styles/CenteredStyle";
import getChosenApplicationHeaders from "./../../../Utils/GetChosenApplicationHeaders";
import { IApplicationHeaders, UserMatchObjectType } from "./MatchHeadersTypes";

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

export default function MatchHeaders({
  reducer,
  wrkflwPrcss,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;
  const isFacilitiesWorkflow = wp.includes("facilities");
  let workflowClass = "";
  if (wp.includes("facilities")) workflowClass = "facilities";
  else if (wp.includes("forecast")) workflowClass = "forecast";
  else workflowClass = "forecast";

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
        MMstb: { header: "MMbbl", acceptMatch: true },
        BScf: { header: "Bscf", acceptMatch: true },
      },
    },
  };
  const specificSavedMatchObject =
    savedMatchObjectAll[workflowClass]["headers"];
  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);
  const specificSavedMatchObjectValues = Object.values(
    specificSavedMatchObject
  );

  //File Headers
  const { facilitiesInputHeaders, forecastInputHeaders } = useSelector(
    (state: RootState) => state.inputReducer
  );

  const { fileHeaders } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

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

  const fileHeaderMatches: Record<string, number>[] = [];
  for (const fileHeader of fileHeaders) {
    const searchResult = fuse.search(fileHeader);
    const matchedHeaders = searchResult.map((match) => match["item"]);
    const matchedScores = searchResult.map((match) => match["score"]);

    if (matchedHeaders.length > 0) {
      const mtchdHeaders = matchedHeaders;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round((1 - score) * 100) : 0
      );

      if (!mtchdHeaders.includes("None")) {
        mtchdHeaders.push("None");
        cleanedMatchedScores.push(0);
      }

      if (specificSavedMatchObjectKeys.includes(fileHeader.trim())) {
        const matchHeader = specificSavedMatchObject[fileHeader];
        pullAll(mtchdHeaders, [matchHeader.header]);

        mtchdHeaders.unshift(matchHeader.header);
        cleanedMatchedScores.unshift(100);
      }

      fileHeaderMatches.push(zipObject(mtchdHeaders, cleanedMatchedScores));
    } else {
      const appHeaders = applicationHeaders;
      const zeroScores: number[] = new Array(appHeaders.length).fill(0);

      if (specificSavedMatchObjectKeys.includes(fileHeader.trim())) {
        const matchHeader = specificSavedMatchObject[fileHeader];
        pullAll(appHeaders, [matchHeader.header]);

        appHeaders.unshift(matchHeader.header);
        zeroScores.unshift(100);
      }

      fileHeaderMatches.push(zipObject(appHeaders, zeroScores));
    }
  }

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
    const exclude = false; //TODO: Can enforce columns that must be used in the forecast here
    const acceptMatch = specificSavedMatchObjectValues
      .map((h) => h.header)
      .includes(selectedApplicationHeader.label)
      ? true
      : false;

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
  const rerenderRef = React.useRef<boolean>(false);
  const [rerender, setRerender] = React.useState(rerenderRef.current);

  const [
    chosenApplicationHeaderIndices,
    setChosenApplicationHeaderIndices,
  ] = React.useState(snChosenApplicationHeaderIndices);

  const [
    userMatchObject,
    setUserMatchObject,
  ] = React.useState<UserMatchObjectType>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationHeaderOptions: {
    [index: string]: { value: string; label: string }[];
  }) => {
    const handleApplicationHeaderChange = (
      value: ValueType<ISelectOptions, false>,
      rowSN: number,
      headerOptions: ISelectOptions[],
      scoreOptions: ISelectOptions[]
    ) => {
      const selectedValue = value && value.label;
      const selectedAppHeader = selectedValue as string;

      const selectedHeaderOptionIndex = findIndex(
        headerOptions,
        (option) => option.value === selectedValue
      );
      const selectedScore = scoreOptions[selectedHeaderOptionIndex];

      setChosenApplicationHeaderIndices((prev) => ({
        ...prev,
        [`${rowSN}`]: selectedHeaderOptionIndex,
      }));

      const currentRows = tableRows.current;
      const selectedRow = currentRows[rowSN - 1];
      currentRows[rowSN - 1] = {
        ...selectedRow,
        applicationHeader: selectedAppHeader,
        match: selectedScore.value,
        exclude: selectedAppHeader === "None" ? true : false,
      };

      tableRows.current = currentRows;

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

    const handleExcludeSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const selectedRowSN = row.sn as number;
      const currentRows = tableRows.current;
      const selectedRow = currentRows[selectedRowSN - 1];

      const fileHeader = row.fileHeader as string;
      const currentOptionIndex = chosenApplicationHeaderIndices[selectedRowSN];
      const headerOptions = keyedApplicationHeaderOptions[fileHeader];
      const formerHeader = headerOptions[currentOptionIndex];
      const scoreOptions = keyedScoreOptions[fileHeader];
      const formerScore = scoreOptions[currentOptionIndex];

      currentRows[selectedRowSN - 1] = {
        ...selectedRow,
        applicationHeader: isChecked ? "None" : formerHeader.label,
        match: isChecked ? 0 : formerScore.label,
        exclude: isChecked,
      };

      const noneOptionIndex = headerOptions.map((h) => h.label).indexOf("None");
      setChosenApplicationHeaderIndices((prev) => ({
        ...prev,
        [`${selectedRowSN}`]: isChecked ? noneOptionIndex : currentOptionIndex,
      }));

      tableRows.current = currentRows;

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const { fileHeader, applicationHeader } = row;
      const strFileheader = fileHeader as string;
      const strApplicationHeader = applicationHeader as string;

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
            ["headers"]: {
              ...prev[workflowClass]["headers"],
              [strFileheader]: {
                header: strApplicationHeader,
                acceptMatch: true,
              },
            },
          },
        }));
      } else {
        setUserMatchObject((prev) => {
          const matchObject = prev;
          delete matchObject[workflowClass]["headers"][strFileheader];

          return matchObject;
        });
      }

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
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
          const rowSN = row.sn as number;
          const fileHeader = row.fileHeader as string;
          const headerOptions = keyedApplicationHeaderOptions[fileHeader];
          const scoreOptions = keyedScoreOptions[fileHeader];
          const appHeader = row.applicationHeader as string;
          const valueOption = generateSelectOptions([appHeader])[0];

          const RSStyles: Styles<ISelectOptions, false> = getRSStyles(theme);

          return (
            <Select
              value={valueOption}
              options={headerOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOptions, false>) =>
                handleApplicationHeaderChange(
                  value,
                  rowSN,
                  headerOptions,
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
        key: "match",
        name: "MATCH [%]",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const match = row.match as number;

          return <CenteredStyle>{match}</CenteredStyle>;
        },
        width: 100,
      },
      {
        key: "exclude",
        name: "EXCLUDE",
        resizable: true,
        formatter: ({ row }) => {
          const checked = row.exclude as boolean;

          return (
            <CenteredStyle>
              <ApexMuiSwitch
                name="exclude"
                handleChange={(event) => handleExcludeSwitchChange(row, event)}
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
              />
            </CenteredStyle>
          );
        },
        width: 100,
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
                // notCheckedColor={theme.palette.warning.main}
                notCheckedColor={theme.palette.common.white}
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
    () => generateColumns(keyedApplicationHeaderOptions),
    [keyedApplicationHeaderOptions]
  );

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

    dispatch(
      persistChosenApplicationHeadersAction(chosenApplicationHeaders, wp)
    );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [rerender]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData} />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
              onRowsChange={setRows}
              mappingErrors={getDuplicates(chosenApplicationHeaders)}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
