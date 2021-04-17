import { makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  IUnitSettingsData,
  IUnit,
} from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import {
  persistTableDataAction,
  persistVariableUnitsAction,
} from "../../../Redux/Actions/InputActions";
import swapTitleToNames from "../../../Utils/SwapTitleToNames";
import swapToChosenTableHeaders from "../../../Utils/SwapToChosenTableHeaders";
import getUnitIdByUnitTitle from "../../../Utils/GetUnitIdByUnitTitle";

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

export default function PreviewSave({
  reducer,
  wrkflwPrcss,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const { facilitiesInputHeaders, forecastInputHeaders } = useSelector(
    (state: RootState) => state.inputReducer
  );
  const isFacilitiesWorkflow = wp.includes("facilities");
  let applicationHeaders = [];
  if (isFacilitiesWorkflow) applicationHeaders = facilitiesInputHeaders;
  else applicationHeaders = forecastInputHeaders;

  //Application units
  const { applicationUnitsCollection } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;
  const applicationUnitsCollectionDefined = applicationUnitsCollection as IUnit[];
  const unitTitles = applicationUnitsCollectionDefined.map((u) => u.title);
  const unitIds = applicationUnitsCollectionDefined.map((u) => u.unitId);
  const titleUnitIdObj = zipObject(unitTitles, unitIds);

  const {
    tableRoleNames,
    chosenApplicationHeaders,
    chosenApplicationUnits,
    columnNameTableData,
    selectedHeaderRowIndex,
    selectedUnitRowIndex,
  } = useSelector((state: RootState) => state[reducer][wc][wp]);

  const unitsRow = zipObject(
    chosenApplicationHeaders,
    chosenApplicationUnits
  ) as IRawRow;

  const appHeaderNames = swapTitleToNames(
    chosenApplicationHeaders,
    applicationHeaders
  );
  const applicationHeadertableData = swapToChosenTableHeaders(
    columnNameTableData,
    appHeaderNames
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

  //Get chosen date format
  //assemble all columns that are date columns
  //use the new date format to carry out formatting

  const newUnitsRow = zipObject(appHeaderNames, Object.values(unitsRow));
  const newUnitRowWithVariableName = { sn: 1, ...newUnitsRow };
  const tableData = [newUnitRowWithVariableName, ...orderedDataRows];

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const generateColumns = () => {
    const snActionRoleColumns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
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
      width: 180,
    }));

    const allColumns = [...snActionRoleColumns, ...otherColumns];

    return allColumns;
  };

  const columns = generateColumns();

  //Generate unitLabel-unitId object
  const appHeaderNamesUnitTitles = zipObject(
    appHeaderNames,
    chosenApplicationUnits
  ) as IRawRow;

  const variableUnits: Record<string, string> = {};
  for (const name of Object.keys(appHeaderNamesUnitTitles)) {
    const unitTitle = appHeaderNamesUnitTitles[name] as string;

    if (unitTitle.includes("&|&")) {
      const unitTitles: string[] = unitTitle.split("&|&");

      const unitIds = getUnitIdByUnitTitle(
        unitTitles,
        titleUnitIdObj
      ) as string[];
      const multipleIds = unitIds.join("&|&");

      variableUnits[name] = multipleIds;
    } else if (unitTitle) {
      const unitId = getUnitIdByUnitTitle(unitTitle, titleUnitIdObj) as string;
      variableUnits[name] = unitId;
    }
  }

  React.useEffect(() => {
    dispatch(persistTableDataAction(tableData, wp));
    dispatch(persistVariableUnitsAction(variableUnits, wp));
    console.log(
      "Logged output --> ~ file: PreviewSave.tsx ~ line 201 ~ React.useEffect ~ variableUnits",
      variableUnits
    );
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
          />
        )}
      </SizeMe>
    </div>
  );
}
