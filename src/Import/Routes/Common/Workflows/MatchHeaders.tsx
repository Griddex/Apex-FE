import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import findIndex from "lodash.findindex";
import omit from "lodash.omit";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles } from "react-select";
import { ValueType } from "react-select";
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
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import getWorkflowClass from "../../../../Application/Utils/GetWorkflowClass";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationHeadersIndicesAction,
  persistFileHeadersMatchAction,
  persistTableHeadersAction,
  updateInputParameterAction,
} from "../../../Redux/Actions/InputActions";
import computeFileHeaderMatches from "../../../Utils/ComputeFileHeaderMatches";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getRSStyles from "../../../Utils/GetRSStyles";
import CenteredStyle from "./../../../../Application/Components/Styles/CenteredStyle";
import getChosenApplicationHeaders from "./../../../Utils/GetChosenApplicationHeaders";
import { IApplicationHeaders, UserMatchObjectType } from "./MatchHeadersTypes";
import { IconButton, Tooltip } from "@material-ui/core";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";

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

  //TODO: Better way to recognize workflow process
  const isFacilitiesWorkflow = wp.includes("facilities");
  const workflowClass = getWorkflowClass(wp);

  const {
    savedMatchObjectAll,
  }: { savedMatchObjectAll: UserMatchObjectType } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["headers"]
  );
  //TODO: File Headers - how to generalize for other input categories?
  const { facilitiesInputHeaders, forecastInputHeaders } = useSelector(
    (state: RootState) => state[reducer]
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

  const fileHeaderMatches = React.useMemo(
    () =>
      computeFileHeaderMatches(
        fileHeaders,
        applicationHeaders,
        savedMatchObjectAll,
        workflowClass
      ),
    []
  );

  const keyedFileHeaderMatches = zipObject(fileHeaders, fileHeaderMatches);
  const headerMatchChartData = generateMatchData(fileHeaderMatches);

  const applicationHeaderOptions: SelectOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      return generateSelectOptions(Object.keys(fileHeaderMatch));
    }
  );
  const keyedApplicationHeaderOptions = zipObject(
    fileHeaders,
    applicationHeaderOptions
  );

  const scoreOptions: SelectOptionsType[] = fileHeaders.map(
    (fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches[fileHeader];

      return generateSelectOptions(
        Object.values(fileHeaderMatch).map((h) => h.toString())
      );
    }
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

  const initialFileHeaderChosenAppHeaderObj: Record<
    string,
    string
  > = initialTableRows.reduce(
    (acc: Record<string, string>, row: Record<string, string>) => {
      return { ...acc, [row.fileHeader]: row.applicationHeader };
    },
    {}
  );
  const [
    fileHeaderChosenAppHeaderObj,
    setFileHeaderChosenAppHeaderObj,
  ] = React.useState(initialFileHeaderChosenAppHeaderObj);

  const [toggleAcceptAllMatch, setToggleAcceptAllMatch] = React.useState(false);
  const [
    userMatchObject,
    setUserMatchObject,
  ] = React.useState<UserMatchObjectType>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationHeaderOptions: {
    [index: string]: { value: string; label: string }[];
  }) => {
    const handleApplicationHeaderChange = (
      value: ValueType<ISelectOption, false>,
      row: IRawRow,
      headerOptions: ISelectOption[],
      scoreOptions: ISelectOption[]
    ) => {
      const { sn, fileHeader, applicationHeader } = row;
      const rowSN = sn as number;
      const fileHeaderDefined = fileHeader as string;
      const applicationHeaderDefined = applicationHeader as string;

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

      setFileHeaderChosenAppHeaderObj((prev) => ({
        ...prev,
        [fileHeaderDefined]: applicationHeaderDefined,
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

      setNoneColumnIndices((prev) => ({
        ...prev,
        [`${selectedRowSN - 1}`]: isChecked ? true : false,
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
        formatter: ({ row }) => {
          const fileHeader = row.fileHeader as string;
          const headerOptions = keyedApplicationHeaderOptions[fileHeader];
          const scoreOptions = keyedScoreOptions[fileHeader];
          const appHeader = row.applicationHeader as string;
          const valueOption = generateSelectOptions([appHeader])[0];

          const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

          return (
            <Select
              value={valueOption}
              options={headerOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, false>) =>
                handleApplicationHeaderChange(
                  value,
                  row,
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

  const chosenApplicationHeadersWithNone = getChosenApplicationHeaders(
    fileHeaderMatches,
    chosenApplicationHeaderIndices
  );

  const chosenApplicationHeadersWithoutNone = chosenApplicationHeadersWithNone.filter(
    (h: string) => h.toLowerCase() !== "none"
  );

  const initialNoneColumnIndices = (chosenApplicationHeadersWithNone as string[]).reduce(
    (acc, _, i) => {
      return { ...acc, [i]: false };
    },
    {}
  );
  const [noneColumnIndices, setNoneColumnIndices] = React.useState(
    initialNoneColumnIndices
  );

  //chosenApplicationHeadersWithNone
  const noneColumnsBoolean = Object.values(noneColumnIndices);
  const fileHeadersChosenAppHeaderWithNone = fileHeaders.reduce(
    (
      acc: Record<string, Record<string, string>>,
      header: string,
      i: number
    ) => {
      return {
        ...acc,
        [header]: {
          chosenAppHeader: chosenApplicationHeadersWithNone[i],
          exclude: noneColumnsBoolean[i],
        },
      };
    },
    {}
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <Tooltip
        key={"acceptAllToolTip"}
        title={"Accept All"}
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
            const rowsAllAcceptMatch = rows.map((row) => {
              const rowAccept = { ...row, acceptMatch: true };
              return rowAccept;
            });

            const fileHeaderKeys = Object.keys(fileHeaderChosenAppHeaderObj);
            for (const header of fileHeaderKeys) {
              const chosenAppHeader = fileHeaderChosenAppHeaderObj[header];
              userMatchObject[workflowClass]["headers"][header] = {
                header: chosenAppHeader,
                acceptMatch: true,
              };
            }
            setRows(rowsAllAcceptMatch);
            setUserMatchObject(userMatchObject);
          }}
        >
          <AllInclusiveOutlinedIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  //TODO: No longer needed
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
      updateInputParameterAction(
        `inputDataWorkflows.${wp}.chosenApplicationHeadersWithNone`,
        chosenApplicationHeadersWithNone
      )
    );
    dispatch(
      updateInputParameterAction(
        `inputDataWorkflows.${wp}.chosenApplicationHeadersWithoutNone`,
        chosenApplicationHeadersWithoutNone
      )
    );
    dispatch(
      updateInputParameterAction(`noneColumnIndices`, noneColumnIndices)
    );
    dispatch(
      updateInputParameterAction(
        `fileHeadersChosenAppHeaderWithNone`,
        fileHeadersChosenAppHeaderWithNone
      )
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
              mappingErrors={getDuplicates(chosenApplicationHeadersWithoutNone)}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
