import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import findIndex from "lodash.findindex";
import omit from "lodash.omit";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import { dateFormatData } from "../../../../Application/Components/DateFormatPicker/DateFormatData";
import {
  TDayOnlyRows,
  TMonthOnlyRows,
  TYearOnlyRows,
} from "../../../../Application/Components/DateFormatPicker/DateFormatPickerTypes";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  ISelectOption,
  SelectOptionsType,
} from "../../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getCurrentApplicationHeaders from "../../../../Application/Utils/GetCurrentApplicationHeaders";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import getWorkflowClass from "../../../../Application/Utils/GetWorkflowClass";
import { TDevScenarioNames } from "../../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import {
  persistChosenApplicationHeadersIndicesAction,
  persistFileHeadersMatchAction,
  persistTableHeadersAction,
  updateInputParameterAction,
} from "../../../Redux/Actions/InputActions";
import computeFileHeaderMatches from "../../../Utils/ComputeFileHeaderMatches";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getInitialRowValueOrDefault from "../../../Utils/GetInitialRowValueOrDefault";
import ApexFlexStyle from "./../../../../Application/Components/Styles/ApexFlexStyle";
import getChosenApplicationHeaders from "./../../../Utils/GetChosenApplicationHeaders";
import {
  IApplicationHeaders,
  THeader,
  TUserMatchObject,
} from "./MatchHeadersTypes";

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

  const workflowClass = getWorkflowClass(wp);

  const [acceptmatchToggle, setAcceptmatchToggle] = React.useState(false);

  //TODO: Put elsewhere
  const dateFormatOptions = generateSelectOptions(dateFormatData);

  //TODO: Gift to provide complete match object with
  //object to store matched economics headers
  const { savedMatchObjectAll }: { savedMatchObjectAll: TUserMatchObject } =
    useSelector((state: RootState) => state.applicationReducer);

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["headers"]
  );

  //TODO: Gift to provide the economics headers
  const {
    facilitiesAppHeaders,
    forecastAppHeaders,
    costsRevenuesAppHeaders: cRHeaders,
    economicsParametersAppHeaders,
  } = useSelector((state: RootState) => state[reducer]);

  const { fileHeaders, currentDevOption } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  let allAppHeadersObj = {} as Record<string, IApplicationHeaders[]>;
  if (reducer === "economicsReducer") {
    const currentDevValue = currentDevOption.value as TDevScenarioNames;
    const costsRevenuesAppHeaders = cRHeaders[currentDevValue];

    allAppHeadersObj = {
      costsRevenuesAppHeaders,
      economicsParametersAppHeaders,
    };
  } else {
    allAppHeadersObj = { facilitiesAppHeaders, forecastAppHeaders };
  }

  const applicationHeaders = React.useRef(
    getCurrentApplicationHeaders(wp, allAppHeadersObj, true)
  );

  const fileHeaderMatches = React.useRef(
    computeFileHeaderMatches(
      fileHeaders,
      applicationHeaders.current as string[],
      savedMatchObjectAll,
      workflowClass
    )
  );

  const keyedFileHeaderMatches = React.useRef(
    zipObject(fileHeaders, fileHeaderMatches.current)
  );

  const headerMatchChartData = React.useRef(
    generateMatchData(fileHeaderMatches.current, theme)
  );

  const applicationHeaderOptions = React.useRef(
    fileHeaders.map((fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches.current[fileHeader];

      return generateSelectOptions(Object.keys(fileHeaderMatch));
    })
  ) as React.MutableRefObject<SelectOptionsType[]>;

  const keyedApplicationHeaderOptions = React.useRef(
    zipObject(fileHeaders, applicationHeaderOptions.current)
  );

  const scoreOptions = React.useRef(
    fileHeaders.map((fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches.current[fileHeader];

      return generateSelectOptions(
        Object.values(fileHeaderMatch).map((h) => h.toString())
      );
    })
  ) as React.MutableRefObject<SelectOptionsType[]>;

  const keyedScoreOptions = React.useRef(
    zipObject(fileHeaders, scoreOptions.current)
  );

  const snChosenApplicationHeaderIndices = React.useRef(
    fileHeaderMatches.current.reduce(
      (acc: Record<string, number>, _, i: number) => {
        return { ...acc, [`${i + 1}`]: 0 };
      },
      {}
    )
  );

  const initialTableRows = React.useRef(
    fileHeaders.map((fileHeader: string, i: number) => {
      const headerOptions = keyedApplicationHeaderOptions.current[fileHeader];
      const initialAppHeader = headerOptions[0];
      const initialHeaderType = getInitialRowValueOrDefault<THeader>(
        initialAppHeader.label,
        "type",
        specificSavedMatchObjectValues,
        "Text"
      );
      const scoreOpts = keyedScoreOptions.current[fileHeader];
      const score = scoreOpts[0];
      const exclude = false; //TODO: Can enforce columns that must be used in the forecast here
      const acceptMatch = specificSavedMatchObjectValues
        .map((h) => h.header)
        .includes(initialAppHeader.label)
        ? true
        : false;

      return {
        sn: i + 1,
        fileHeader: fileHeader,
        applicationHeader: initialAppHeader.value,
        type: initialHeaderType,
        match: score.value,
        exclude,
        acceptMatch,
      };
    })
  );

  const tableRows = React.useRef<TRawTable>(initialTableRows.current);
  const rerenderRef = React.useRef<boolean>(false);
  const [rerender, setRerender] = React.useState(rerenderRef.current);

  const [chosenApplicationHeaderIndices, setChosenApplicationHeaderIndices] =
    React.useState(snChosenApplicationHeaderIndices.current);

  const initialFileHeaderChosenAppHeaderMap: Record<string, string> =
    initialTableRows.current.reduce(
      (acc: Record<string, string>, row: Record<string, string>) => {
        return { ...acc, [row.fileHeader]: row.applicationHeader };
      },
      {}
    );

  const [fileHeaderChosenAppHeaderMap, setFileHeaderChosenAppHeaderMap] =
    React.useState(initialFileHeaderChosenAppHeaderMap);

  const initialFileHeaderChosenHeaderTypeMap: Record<string, string> =
    initialTableRows.current.reduce(
      (acc: Record<string, string>, row: Record<string, string>) => {
        return { ...acc, [row.fileHeader]: row.type };
      },
      {}
    );
  const [fileHeaderChosenHeaderTypeMap, setFileHeaderChosenHeaderTypeMap] =
    React.useState(initialFileHeaderChosenHeaderTypeMap);

  const [userMatchObject, setUserMatchObject] =
    React.useState<TUserMatchObject>(savedMatchObjectAll);

  const [DayOnlyRows, setDayOnlyRows] = React.useState({} as TDayOnlyRows);
  const [MonthOnlyRows, setMonthOnlyRows] = React.useState(
    {} as TMonthOnlyRows
  );
  const [YearOnlyRows, setYearOnlyRows] = React.useState({} as TYearOnlyRows);

  const generateColumns = (keyedApplicationHeaderOptions: {
    [index: string]: { value: string; label: string }[];
  }) => {
    const handleHeaderTypeChange = (
      value: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn, fileHeader } = row;
      const rowSN = sn as number;
      const fileHeaderDefined = fileHeader as string;

      const selectedValue = value && value.label;
      const selectedHeaderType = selectedValue as THeader;

      setFileHeaderChosenHeaderTypeMap((prev) => ({
        ...prev,
        [fileHeaderDefined]: selectedHeaderType,
      }));

      //TODO: From Gift Need an object with unit:group pairs
      const currentRows = tableRows.current;
      const selectedRow = currentRows[rowSN - 1];
      currentRows[rowSN - 1] = {
        ...selectedRow,
        type: selectedHeaderType,
      };

      tableRows.current = currentRows;

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

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

      setFileHeaderChosenAppHeaderMap((prev) => ({
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
      const scoreOptions = keyedScoreOptions.current[fileHeader];
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

      const { fileHeader, type, applicationHeader } = row;
      const strFileheader = fileHeader as string;
      const strApplicationHeader = applicationHeader as string;
      const strHeaderType = type as THeader;

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
                type: strHeaderType,
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

    const handleDateFormatChange = (
      value: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn, fileHeader } = row;
      const rowSN = sn as number;
      const fileHeaderDefined = fileHeader as string;

      const selectedValue = value && value.label;
      const selectedDateFormat = selectedValue as string;

      // setFileHeaderChosenHeaderTypeMap((prev) => ({
      //   ...prev,
      //   [fileHeaderDefined]: selectedHeaderType,
      // }));

      //TODO: From Gift Need an object with unit:group pairs
      const currentRows = tableRows.current;
      const selectedRow = currentRows[rowSN - 1];
      currentRows[rowSN - 1] = {
        ...selectedRow,
        applicationHeader: selectedDateFormat,
      };

      tableRows.current = currentRows;

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
        key: "type",
        name: "TYPE",
        resizable: true,
        formatter: ({ row }) => {
          const type = row.type as string;
          const typeOptions = generateSelectOptions(["Text", "Number", "Date"]);
          const valueOption = generateSelectOptions([type])[0];

          const RSStyles = getRSStyles(theme);
          type IsMulti = false;

          return (
            <Select<ISelectOption, IsMulti>
              value={valueOption}
              options={typeOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, IsMulti>) => {
                handleHeaderTypeChange(value, row);
              }}
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          );
        },
        width: 150,
      },
      {
        key: "applicationHeader",
        name: "APPLICATION HEADER",
        resizable: true,
        formatter: ({ row }) => {
          const sn = row.sn as string;
          const type = row.type as string;
          const fileHeader = row.fileHeader as string;
          const headerOptions = keyedApplicationHeaderOptions[fileHeader];
          const scoreOptions = keyedScoreOptions.current[fileHeader];
          const appHeader = row.applicationHeader as string;
          const valueOption = generateSelectOptions([appHeader])[0];
          const dateOption = dateFormatOptions[0];

          const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

          if (type === "Date")
            return (
              <ApexSelectRS
                valueOption={dateOption}
                data={dateFormatOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleDateFormatChange(value, row)
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else
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
                theme={(thm) => getRSTheme(thm, theme)}
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

          return <ApexFlexStyle>{match}</ApexFlexStyle>;
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
            <ApexFlexStyle>
              <ApexMuiSwitch
                name="exclude"
                handleChange={(event) => handleExcludeSwitchChange(row, event)}
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
              />
            </ApexFlexStyle>
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
            <ApexFlexStyle>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
              />
            </ApexFlexStyle>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationHeaderOptions.current),
    [keyedApplicationHeaderOptions]
  );

  const [rows, setRows] = React.useState(tableRows.current);

  const chosenApplicationHeadersWithNone = getChosenApplicationHeaders(
    fileHeaderMatches.current,
    chosenApplicationHeaderIndices
  );

  const chosenApplicationHeadersWithoutNone =
    chosenApplicationHeadersWithNone.filter(
      (h: string) => h.toLowerCase() !== "none"
    );

  const initialNoneColumnIndices = (
    chosenApplicationHeadersWithNone as string[]
  ).reduce((acc, _, i) => {
    return { ...acc, [i]: false };
  }, {});
  const [noneColumnIndices, setNoneColumnIndices] = React.useState(
    initialNoneColumnIndices
  );

  //chosenApplicationHeadersWithNone
  const noneColumnsBoolean = Object.values(noneColumnIndices);
  const fileHeadersChosenAppHeadersWithNone = fileHeaders.reduce(
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
        title={"Toggle Accept All Matches"}
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
            const currentAcceptMatchValue = !acceptmatchToggle;
            const rowsAllAcceptMatch = rows.map((row) => {
              const rowAccept = {
                ...row,
                acceptMatch: currentAcceptMatchValue,
              };
              return rowAccept;
            });

            const fileHeaderKeys = Object.keys(fileHeaderChosenAppHeaderMap);
            for (const header of fileHeaderKeys) {
              const chosenAppHeader = fileHeaderChosenAppHeaderMap[header];
              const chosenHeaderType = fileHeaderChosenHeaderTypeMap[
                header
              ] as THeader;

              userMatchObject[workflowClass]["headers"][header] = {
                header: chosenAppHeader,
                type: chosenHeaderType,
                acceptMatch: currentAcceptMatchValue,
              };
            }
            setRows(rowsAllAcceptMatch);
            setUserMatchObject(userMatchObject);
            setAcceptmatchToggle(currentAcceptMatchValue);
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
    dispatch(persistTableHeadersAction(reducer, tableHeaders, wp));
  }, []);

  React.useEffect(() => {
    //Any need?
    dispatch(
      persistFileHeadersMatchAction(reducer, fileHeaderMatches.current, wp)
    );
    dispatch(
      persistChosenApplicationHeadersIndicesAction(
        reducer,
        chosenApplicationHeaderIndices,
        wp
      )
    );

    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.chosenApplicationHeadersWithNone`,
        chosenApplicationHeadersWithNone
      )
    );
    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.chosenApplicationHeadersWithoutNone`,
        chosenApplicationHeadersWithoutNone
      )
    );
    dispatch(
      updateInputParameterAction(
        reducer,
        `noneColumnIndices`,
        noneColumnIndices
      )
    );
    dispatch(
      updateInputParameterAction(
        reducer,
        `fileHeadersChosenAppHeadersWithNone`,
        fileHeadersChosenAppHeadersWithNone
      )
    );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [rerender]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData.current} />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              onRowsChange={setRows}
              tableButtons={tableButtons}
              mappingErrors={getDuplicates(chosenApplicationHeadersWithoutNone)}
              size={size}
              adjustTableDimAuto={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
