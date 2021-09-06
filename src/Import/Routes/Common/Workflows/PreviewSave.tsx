import { makeStyles } from "@material-ui/core";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
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
} from "../../../Redux/Actions/InputActions";
import swapTitleToNames from "../../../Utils/SwapTitleToNames";
import { IApplicationHeaders } from "./MatchHeadersTypes";

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

export default function PreviewSave({ reducer, wrkflwPrcss }: IAllWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const {
    currentDevOption,
    fileHeaderUnitIdMap,
    currentAppHeaderNameMap,
    fileHeadersUnitsAppHeadersWithoutNoneMap,
    tableRoleNames,
    columnNameTableData,
    selectedHeaderRowIndex,
    selectedUnitRowIndex,
    matchHeadersTable,
    matchUnitsTable,
  } = useSelector((state: RootState) => state[reducer][wc][wp]);

  const {
    facilitiesAppHeaders,
    forecastAppHeaders,
    costsRevenuesAppHeaders: cRHeaders,
    economicsParametersAppHeaders,
  } = useSelector((state: RootState) => state[reducer]);

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

  const includedColumnIndices = matchHeadersTable.reduce(
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

  const chosenAppHeadersWithNone = matchHeadersTable.map(
    (row: IRawRow) => row.applicationHeader
  );
  const chosenAppHeadersWithoutNone = (
    chosenAppHeadersWithNone as string[]
  ).filter((h: string) => h.toLowerCase() !== "none");

  const chosenApplicationUnitsWithoutNone = matchUnitsTable.map(
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

  const appHeaderTitleNameObj = (
    appHeaderNameTitleCollection as IApplicationHeaders[]
  ).reduce((acc: Record<string, string>, row: IApplicationHeaders) => {
    return { ...acc, [row.variableTitle]: row.variableName };
  }, {});

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

  const exportColumns = generateColumns()
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
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  React.useEffect(() => {
    dispatch(persistTableDataAction(reducer, tableData, wp));

    const appHeaderNameUnitsMap = matchUnitsTable.reduce(
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
    console.log(
      "Logged output --> ~ file: MatchUnits.tsx ~ line 858 ~ appHeaderNameUnitsMap ~ appHeaderNameUnitsMap",
      appHeaderNameUnitsMap
    );

    dispatch(persistVariableUnitsAction(reducer, appHeaderNameUnitsMap, wp));

    dispatch(hideSpinnerAction());
  }, []);

  return (
    <div className={classes.rootPreviewSave}>
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <ApexGrid<IRawRow, ITableButtonsProps>
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
