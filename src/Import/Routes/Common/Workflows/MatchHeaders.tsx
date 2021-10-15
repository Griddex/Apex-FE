import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import camelCase from "lodash.camelcase";
import findIndex from "lodash.findindex";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { v4 as uuidv4 } from "uuid";
import { dateFormatData } from "../../../../Application/Components/DateFormatPicker/DateFormatData";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  ISelectOption,
  TKeyedSelectOptions,
  TSelectOptions,
} from "../../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateKeyValueMap from "../../../../Application/Utils/GenerateKeyValueMap";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getCurrentApplicationHeaderOptions from "../../../../Application/Utils/GetCurrentApplicationHeaderOptions";
import getCurrentApplicationHeaders from "../../../../Application/Utils/GetCurrentApplicationHeaders";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import getWorkflowClass from "../../../../Application/Utils/GetWorkflowClass";
import { TDevScenarioNames } from "../../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { DoughnutChartAnalytics } from "../../../../Visualytics/Components/Charts/DoughnutChart";
import { updateInputParameterAction } from "../../../Redux/Actions/InputActions";
import computeFileHeaderMatches from "../../../Utils/ComputeFileHeaderMatches";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getInitialRowValueOrDefault from "../../../Utils/GetInitialRowValueOrDefault";
import ApexFlexContainer from "./../../../../Application/Components/Styles/ApexFlexContainer";
import {
  IApplicationHeaders,
  THeader,
  TSingleMatchObject,
  TUserMatchObject,
} from "./MatchHeadersTypes";

const ApexGrid = React.lazy(
  () =>
    import("../../../../Application/Components/Table/ReactDataGrid/ApexGrid")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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

const MatchHeaders = ({ reducer, wrkflwPrcss }: IAllWorkflows) => {
  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const workflowClass = getWorkflowClass(wp);

  const [acceptmatchToggle, setAcceptmatchToggle] = React.useState(false);

  //TODO: Put elsewhere
  const dateFormatOptions = React.useRef(generateSelectOptions(dateFormatData));

  const savedMatchObjectAll: TUserMatchObject = useSelector(
    (state: RootState) => state.applicationReducer["savedMatchObjectAll"],
    (prev, next) => isEqual(prev, next)
  );

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["headers"]
  );
  console.log(
    "Logged output --> ~ file: MatchHeaders.tsx ~ line 108 ~ MatchHeaders ~ specificSavedMatchObjectValues",
    specificSavedMatchObjectValues
  );

  const reducerSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer],
    (reducer) => reducer
  );

  const {
    facilitiesAppHeaders,
    forecastAppHeaders,
    facilitiesHeadersSelectOptions,
    forecastHeadersSelectOptions,
    costsRevenuesAppHeaders: cRHeaders,
    economicsParametersAppHeaders,
    cstRevAppHeadersSelectOptions: cRHeaderOptions,
    ecoParAppHeadersSelectOptions,
  } = useSelector(reducerSelector);

  const workflowProcessSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp],
    (wrkflwPrcss) => wrkflwPrcss
  );

  const { fileHeaders, currentDevOption } = useSelector(
    workflowProcessSelector
  );

  //Get headers
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

  //Get header Options
  let allAppHeadersObjOptions = {} as Record<string, ISelectOption[]>;
  if (reducer === "economicsReducer") {
    const currentDevValue = currentDevOption.value as TDevScenarioNames;
    const cstRevAppHeadersSelectOptions = cRHeaderOptions[currentDevValue];

    allAppHeadersObjOptions = {
      cstRevAppHeadersSelectOptions,
      ecoParAppHeadersSelectOptions,
    };
  } else {
    allAppHeadersObjOptions = {
      facilitiesHeadersSelectOptions,
      forecastHeadersSelectOptions,
    };
  }

  const currentAppHeaderOptions = React.useRef(
    getCurrentApplicationHeaderOptions(wp, allAppHeadersObjOptions, false)
  );

  const currentAppHeaderTitleNameMap = generateKeyValueMap(
    "label",
    "value",
    currentAppHeaderOptions.current
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

      const appHeaderTitleMatches = Object.keys(fileHeaderMatch);
      const appHeaderOption = appHeaderTitleMatches.map((t) => {
        const appHeaderName = currentAppHeaderTitleNameMap[t] as string;

        if (appHeaderName) return { value: appHeaderName, label: t };
        else return { value: camelCase(t), label: t };
      });

      return appHeaderOption;
    })
  ) as React.MutableRefObject<TSelectOptions[]>;

  const keyedAppHeaderOptions = React.useRef(
    zipObject(fileHeaders, applicationHeaderOptions.current)
  ) as React.MutableRefObject<TKeyedSelectOptions>;

  const scoreOptions = React.useRef(
    fileHeaders.map((fileHeader: string) => {
      const fileHeaderMatch = keyedFileHeaderMatches.current[fileHeader];

      return generateSelectOptions(
        Object.values(fileHeaderMatch).map((h) => h.toString())
      );
    })
  ) as React.MutableRefObject<TSelectOptions[]>;

  const keyedScoreOptions = React.useRef(
    zipObject(fileHeaders, scoreOptions.current)
  );

  const initialTableRows = React.useRef(
    fileHeaders.map((fileHeader: string, i: number) => {
      const headerOptions = keyedAppHeaderOptions.current[fileHeader];
      const initialAppHeader = headerOptions[0].label;
      const initialHeaderType = getInitialRowValueOrDefault<THeader>(
        initialAppHeader,
        "type",
        specificSavedMatchObjectValues,
        "Text"
      );

      const scoreOpts = keyedScoreOptions.current[fileHeader];
      const score = scoreOpts[0];

      const include = true;
      const acceptMatch = specificSavedMatchObjectValues
        .map((h) => h.header)
        .includes(initialAppHeader)
        ? true
        : false;

      const matchObj = specificSavedMatchObjectValues.find(
        (o) => o.fileHeader === fileHeader
      ) as TSingleMatchObject;
      console.log(
        "Logged output --> ~ file: MatchHeaders.tsx ~ line 273 ~ fileHeaders.map ~ matchObj",
        matchObj
      );

      return {
        sn: i + 1,
        fileHeader,
        applicationHeader: matchObj ? matchObj.header : initialAppHeader,
        type: initialHeaderType,
        match: score.value,
        include,
        acceptMatch,
      };
    })
  );

  const [rows, setRows] = React.useState<IRawRow[]>(initialTableRows.current);

  const snChosenAppHeaderIndices = React.useRef<Record<string, number>>(
    initialTableRows.current.reduce(
      (acc: Record<string, number>, row: IRawRow) => {
        return { ...acc, [row["fileHeader"] as string]: 0 };
      },
      {}
    )
  );
  const [chosenAppHeaderIndices, setChosenAppHeaderIndices] = React.useState(
    snChosenAppHeaderIndices.current
  );

  const [userMatchObject, setUserMatchObject] =
    React.useState<TUserMatchObject>(savedMatchObjectAll);
  console.log(
    "Logged output --> ~ file: MatchHeaders.tsx ~ line 297 ~ MatchHeaders ~ userMatchObject",
    userMatchObject
  );

  const generateColumns = (keyedAppHeaderOptions: TKeyedSelectOptions) => {
    const handleHeaderTypeChange = (
      option: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn } = row;
      const rowSN = sn as number;

      const selectedHeader = option && option.label;
      const selectedHeaderType = selectedHeader as THeader;

      const selectedRow = rows[rowSN - 1];
      rows[rowSN - 1] = {
        ...selectedRow,
        type: selectedHeaderType,
      };

      setRows(rows);
    };

    const handleApplicationHeaderChange = (
      option: ValueType<ISelectOption, false>,
      row: IRawRow,
      headerOptions: ISelectOption[],
      scoreOptions: ISelectOption[]
    ) => {
      const { sn, fileHeader } = row;
      const rowSN = sn as number;
      const fileHeaderDefined = fileHeader as string;

      const selectedHeader = option && option.label;
      const selectedAppHeader = selectedHeader as string;

      const selectedHeaderOptionIndex = findIndex(
        headerOptions,
        (option) => option.label === selectedHeader
      );
      const selectedScore = scoreOptions[selectedHeaderOptionIndex];

      setChosenAppHeaderIndices((prev) => ({
        ...prev,
        [fileHeaderDefined]: selectedHeaderOptionIndex,
      }));

      const selectedRow = rows[rowSN - 1];
      rows[rowSN - 1] = {
        ...selectedRow,
        applicationHeader: selectedAppHeader,
        match: selectedScore.value as string,
        include: selectedAppHeader === "None" ? false : true,
      };

      setRows(rows);
    };

    const handleIncludeSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const fileHeaderDefined = row.fileHeader as string;
      const selectedRowSN = row.sn as number;
      const selectedRow = rows[selectedRowSN - 1];

      const fileHeader = row.fileHeader as string;
      const headerOptions = keyedAppHeaderOptions[fileHeader];
      const currentOptionIndex = chosenAppHeaderIndices[fileHeader];
      const formerHeader = headerOptions[currentOptionIndex];
      const scoreOptions = keyedScoreOptions.current[fileHeader];
      const formerScore = scoreOptions[currentOptionIndex];

      rows[selectedRowSN - 1] = {
        ...selectedRow,
        applicationHeader: isChecked ? formerHeader.label : "None",
        match: isChecked ? 0 : formerScore.label,
        include: isChecked,
      };

      const noneOptionIndex = headerOptions.map((h) => h.label).indexOf("None");
      setChosenAppHeaderIndices((prev) => ({
        ...prev,
        [fileHeaderDefined]: isChecked ? noneOptionIndex : currentOptionIndex,
      }));
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
      const selectedRow = rows[selectedRowSN - 1];

      rows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: isChecked,
      };

      //Update usermatchobject
      if (isChecked) {
        setUserMatchObject((prev) => {
          const next = { ...prev };

          const matchObjectValuesByHeaders = Object.values(
            next[workflowClass]["headers"]
          );
          const matchObj = matchObjectValuesByHeaders.find(
            (o) => o.fileHeader === strFileheader
          ) as TSingleMatchObject;

          let fileHeaderId: string;
          if (matchObj) fileHeaderId = matchObj.id;
          else fileHeaderId = uuidv4();

          next[workflowClass]["headers"][fileHeaderId] = {
            ...matchObj,
            id: fileHeaderId,
            header: strApplicationHeader,
            type: strHeaderType,
            acceptMatch: true,
          };

          return next;
        });
      } else {
        setUserMatchObject((prev) => {
          const specificSavedMatchObjectValues = Object.values(
            prev[workflowClass]["headers"]
          );

          const matchObj = specificSavedMatchObjectValues.find(
            (o) => o.fileHeader === fileHeader
          ) as TSingleMatchObject;

          const matchObject = { ...prev };

          delete matchObject[workflowClass]["headers"][matchObj.id];

          return matchObject;
        });
      }

      setRows(rows);
    };

    const handleDateFormatChange = (
      option: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn } = row;
      const rowSN = sn as number;

      const selectedValue = option && option.label;
      const selectedDateFormat = selectedValue as string;

      const selectedRow = rows[rowSN - 1];
      rows[rowSN - 1] = {
        ...selectedRow,
        applicationHeader: selectedDateFormat,
      };

      setRows(rows);
    };

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 20 },
      {
        key: "fileHeader",
        name: "FILE HEADER",
        editable: false,
        resizable: true,
        minWidth: 250,
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
          const type = row.type as string;
          const fileHeader = row.fileHeader as string;
          const headerOptions = keyedAppHeaderOptions[fileHeader];
          const scoreOptions = keyedScoreOptions.current[fileHeader];
          const appHeader = row.applicationHeader as string;
          const valueOption = generateSelectOptions([appHeader])[0];
          const dateOption = dateFormatOptions.current[0];

          const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

          if (type === "Date")
            return (
              <ApexSelectRS
                valueOption={dateOption}
                data={dateFormatOptions.current}
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
        minWidth: 300,
      },

      {
        key: "match",
        name: "MATCH [%]",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const match = row.match as number;

          return <ApexFlexContainer>{match}</ApexFlexContainer>;
        },
        width: 100,
      },
      {
        key: "include",
        name: "INCLUDE",
        resizable: true,
        formatter: ({ row }) => {
          const checked = row.include as boolean;

          return (
            <ApexFlexContainer>
              <ApexMuiSwitch
                name="include"
                handleChange={(event) => handleIncludeSwitchChange(row, event)}
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
              />
            </ApexFlexContainer>
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
            <ApexFlexContainer>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
              />
            </ApexFlexContainer>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedAppHeaderOptions.current),
    [JSON.stringify(keyedAppHeaderOptions)]
  );

  const chosenAppHeadersWithNone = rows.map((row) => row.applicationHeader);
  const chosenAppHeadersWithoutNone = (
    chosenAppHeadersWithNone as string[]
  ).filter((h: string) => h.toLowerCase() !== "none");

  const fileAppHeaderIncludeWithNoneMap = rows.reduce((acc: any, row) => {
    const { fileHeader, applicationHeader, include } = row;

    return {
      ...acc,
      [fileHeader as string]: { chosenAppHeader: applicationHeader, include },
    };
  }, {} as Record<string, Record<string, React.Key | boolean>>);

  const exportColumns = generateColumns(keyedAppHeaderOptions.current)
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IRawRow>["columns"];

  const exportTableProps = {
    fileName: "MatchHeaders",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
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

              const fileHeaderKeys = rows.map((row) => row.fileHeader);
              for (const fileHeader of fileHeaderKeys) {
                const chosenRow = rows.find(
                  (row) => row.fileHeader === fileHeader
                ) as IRawRow;

                const chosenAppHeader = chosenRow.applicationHeader as string;
                const chosenType = chosenRow.type as THeader;

                const matchObjectValuesByHeaders = Object.values(
                  userMatchObject[workflowClass]["headers"]
                );
                const matchObj = matchObjectValuesByHeaders.find(
                  (o) => o.fileHeader === fileHeader
                ) as TSingleMatchObject;

                let fileHeaderId: string;
                if (matchObj) fileHeaderId = matchObj.id;
                else fileHeaderId = uuidv4();

                userMatchObject[workflowClass]["headers"][fileHeaderId] = {
                  ...matchObj,
                  id: fileHeaderId,
                  header: chosenAppHeader,
                  type: chosenType,
                  acceptMatch: currentAcceptMatchValue,
                };
              }
              setRows(rowsAllAcceptMatch);
              setUserMatchObject(userMatchObject);
              setAcceptmatchToggle(currentAcceptMatchValue);
            }}
            size="large"
          >
            <AllInclusiveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ExcelExportTable<IRawRow> {...exportTableProps} />
      </div>
    ),
  };

  React.useEffect(() => {
    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.matchHeadersTable`,
        rows
      )
    );

    dispatch(
      updateInputParameterAction(
        reducer,
        `inputDataWorkflows.${wp}.fileAppHeaderIncludeWithNoneMap`,
        fileAppHeaderIncludeWithNoneMap
      )
    );

    dispatch(
      updateInputParameterAction(
        reducer,
        `currentAppHeaderOptions`,
        currentAppHeaderOptions.current
      )
    );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [JSON.stringify(rows)]);

  const defs = headerMatchChartData.current.map((match) => ({
    id: match.id,
    background: "inherit",
    color: match.color,
  }));

  const fill = headerMatchChartData.current.map((match) => ({
    match: {
      id: match.label,
    },
    id: match.id,
  }));

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChartAnalytics
          data={headerMatchChartData.current}
          willUseThemeColor={false}
          defs={defs}
          fill={fill}
        />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid
              columns={columns}
              rows={rows}
              onRowsChange={setRows}
              tableButtons={tableButtons}
              mappingErrors={getDuplicates(chosenAppHeadersWithoutNone)}
              size={size}
              autoAdjustTableDim={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
};

export default React.memo(MatchHeaders);
