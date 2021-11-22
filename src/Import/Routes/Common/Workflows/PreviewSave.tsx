import makeStyles from "@mui/styles/makeStyles";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import getCurrentApplicationHeaders from "../../../../Application/Utils/GetCurrentApplicationHeaders";
import { TDevScenarioNames } from "../../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import {
  persistTableDataAction,
  persistVariableUnitsAction,
  validateForecastInputDeckRequestAction,
} from "../../../Redux/Actions/InputActions";
import swapTitleToNames from "../../../Utils/SwapTitleToNames";
import { IApplicationHeaders } from "./MatchHeadersTypes";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";

const useStyles = makeStyles((theme) => ({
  rootPreviewSave: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: "100%",
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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export default function PreviewSave({
  reducer,
  wrkflwPrcss,
  wrkflwCtgry,
}: IAllWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const currentDevOptionSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["currentDevOption"],
    (data) => data
  );

  const currentAppHeaderNameMapSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["currentAppHeaderNameMap"],
    (data) => data
  );
  const fileHeadersUnitsAppHeadersWithoutNoneMapSelector =
    createDeepEqualSelector(
      (state: RootState) =>
        state[reducer][wc][wp]["fileHeadersUnitsAppHeadersWithoutNoneMap"],
      (data) => data
    );
  const tableRoleNamesSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["tableRoleNames"],
    (data) => data
  );
  const columnNameTableDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["columnNameTableData"],
    (data) => data
  );
  const selectedHeaderRowIndexSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["selectedHeaderRowIndex"],
    (data) => data
  );
  const selectedUnitRowIndexSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["selectedUnitRowIndex"],
    (data) => data
  );
  const matchHeadersTableSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["matchHeadersRows"],
    (data) => data
  );
  const matchUnitsTableSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["matchUnitsRows"],
    (data) => data
  );

  const currentDevOption = useSelector(currentDevOptionSelector);
  const currentAppHeaderNameMap = useSelector(currentAppHeaderNameMapSelector);
  const fileHeadersUnitsAppHeadersWithoutNoneMap = useSelector(
    fileHeadersUnitsAppHeadersWithoutNoneMapSelector
  );

  const tableRoleNames = useSelector(tableRoleNamesSelector);
  const columnNameTableData = useSelector(columnNameTableDataSelector);
  const selectedHeaderRowIndex = useSelector(selectedHeaderRowIndexSelector);
  const selectedUnitRowIndex = useSelector(selectedUnitRowIndexSelector);
  const matchHeadersRows = useSelector(matchHeadersTableSelector);
  const matchUnitsRows = useSelector(matchUnitsTableSelector);

  const facilitiesAppHeadersSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["facilitiesAppHeaders"],
    (data) => data
  );
  const forecastAppHeadersSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["forecastAppHeaders"],
    (data) => data
  );
  const costsRevenuesAppHeadersSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["costsRevenuesAppHeaders"],
    (data) => data
  );
  const economicsParametersAppHeadersSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer]["economicsParametersAppHeaders"],
    (data) => data
  );

  const facilitiesAppHeaders = useSelector(facilitiesAppHeadersSelector);
  const forecastAppHeaders = useSelector(forecastAppHeadersSelector);
  const costsRevenuesAppHeaders = useSelector(costsRevenuesAppHeadersSelector);
  const cRHeaders = costsRevenuesAppHeaders;
  const economicsParametersAppHeaders = useSelector(
    economicsParametersAppHeadersSelector
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

  const appHeaderNameTitleCollection = getCurrentApplicationHeaders(
    wp,
    allAppHeadersObj,
    false
  );

  const includedColumnIndices = matchHeadersRows.reduce(
    (acc: number[], row: IRawRow, i: number) => {
      if (row.applicationHeader.toString().toLowerCase() === "none")
        return [...acc, i];
      else return acc;
    },
    []
  );

  const columnNameTableDataWithoutNone = columnNameTableData.map(
    (row: IRawRow) => {
      const rowWithoutNone = Object.keys(row).reduce((acc, key, i) => {
        if (includedColumnIndices.includes(i)) return acc;
        else return { ...acc, [key]: row[key] };
      }, {});

      return rowWithoutNone;
    },
    []
  );

  const chosenAppHeadersWithNone = matchHeadersRows.map(
    (row: IRawRow) => row.applicationHeader
  );
  const chosenAppHeadersWithoutNone = (
    chosenAppHeadersWithNone as string[]
  ).filter((h: string) => h.toLowerCase() !== "none");

  const chosenApplicationUnitsWithoutNone = matchUnitsRows.map(
    (row: IRawRow) => row.applicationUnit
  );

  const unitsRow = zipObject(
    chosenAppHeadersWithoutNone,
    chosenApplicationUnitsWithoutNone
  ) as IRawRow;

  const appHeaderNames = swapTitleToNames(
    chosenAppHeadersWithoutNone,
    appHeaderNameTitleCollection as IApplicationHeaders[]
  );

  const applicationHeadertableData = columnNameTableDataWithoutNone.map(
    (row: IRawRow) => {
      return zipObject(appHeaderNames, Object.values(row));
    }
  );

  const dataRows = applicationHeadertableData.filter(
    (row: IRawRow, i: number) => {
      const condition = [
        selectedHeaderRowIndex as number,
        selectedUnitRowIndex as number,
      ].includes(i);

      if (!condition) return row;
    }
  );

  const orderedDataRows = dataRows.map((row: IRawRow, i: number) => ({
    sn: i + 2,
    ...row,
  }));

  const fileHeaderUnitIdMap = matchUnitsRows.reduce(
    (acc: Record<string, string>, row: any) => {
      return { ...acc, [row.fileHeader]: row.unitId };
    },
    {}
  );

  //TODO
  //Get chosen date format
  //assemble all columns that are date columns
  //use the new date format to carry out formatting

  //TODO Gift you want array or joined?
  const newUnitsRow = zipObject(appHeaderNames, Object.values(unitsRow));
  const newUnitRowWithVariableName = { sn: 1, ...newUnitsRow };
  const tableData = [newUnitRowWithVariableName, ...orderedDataRows];

  const generateColumns = () => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "role",
        name: "ROLE",
        resizable: true,
        formatter: ({ row }) => {
          const rowSN = row.sn as number;
          const slicedTableRoleNames = tableRoleNames.slice(
            1,
            tableRoleNames.length
          );

          return (
            <div style={{ width: "100%", height: "95%" }}>
              {slicedTableRoleNames[rowSN - 1]}
            </div>
          );
        },
        width: 150,
      },
    ];

    //TODO: Check for uniqueness of file headers
    //otherwise error is thrown
    const otherColumns = appHeaderNames.map((columnName: string) => ({
      key: columnName,
      name: columnName.toLocaleUpperCase(),
      resizable: true,
      width: 220,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };

  const columns = generateColumns();

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IRawRow>["columns"];

  const exportTableProps = {
    fileName: "PreviewSave",
    tableData: {
      Template: {
        data: tableData,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
        <IconButtonWithTooltip
          toolTipKey="validateToolTip"
          toolTipTitle="Validate"
          toolTipPlacement="bottom-end"
          icon={() => <FactCheckOutlinedIcon />}
          action={() =>
            dispatch(validateForecastInputDeckRequestAction(wc, wp))
          }
        />
        <ExcelExportTable<IRawRow> {...exportTableProps} />,
      </div>
    ),
  };

  React.useEffect(() => {
    dispatch(persistTableDataAction(reducer, tableData, wp));

    const appHeaderNameUnitsMap = matchUnitsRows.reduce(
      (acc: any, row: IRawRow) => {
        const { type, fileHeader } = row;
        const fileHeaderDefined = fileHeader as string;

        const appHeaderUnitIdObj =
          fileHeadersUnitsAppHeadersWithoutNoneMap.current[fileHeaderDefined];
        const appHeader = appHeaderUnitIdObj.chosenAppHeader;
        const chosenAppUnitId = fileHeaderUnitIdMap[fileHeaderDefined];
        const appHeaderName = currentAppHeaderNameMap[appHeader];

        return {
          ...acc,
          [appHeaderName]:
            type === "Multiple" ? chosenAppUnitId.join("&|&") : chosenAppUnitId,
        };
      },
      {}
    );

    dispatch(persistVariableUnitsAction(reducer, appHeaderNameUnitsMap, wp));

    dispatch(hideSpinnerAction());
  }, []);

  return (
    <div className={classes.rootPreviewSave}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid
            columns={columns}
            rows={tableData}
            tableButtons={tableButtons}
            size={size}
            autoAdjustTableDim={true}
            showTableHeader={true}
            showTablePagination={true}
          />
        )}
      </SizeMe>
    </div>
  );
}
