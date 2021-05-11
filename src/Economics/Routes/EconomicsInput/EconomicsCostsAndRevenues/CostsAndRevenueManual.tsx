import { ClickAwayListener, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column, EditorProps, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe, SizeMeProps } from "react-sizeme";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import swapVariableNameTitleForISelectOption from "../../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { developmentScenarios } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import {
  IEconomicsAnalysis,
  TDevScenarioNames,
} from "../../EconomicsAnalyses/EconomicsAnalysesTypes";

const useStyles = makeStyles((theme) => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "98%",
    height: "95%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[3],
    padding: 10,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center", //around, between
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
}));

export default function CostsAndRevenueManual({
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;
  const { uniqUnitOptions } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  );

  const devOptions =
    swapVariableNameTitleForISelectOption(developmentScenarios);
  const devValueOption = devOptions[0];
  const [devValue, setDevValue] = React.useState(devValueOption);
  const devVal = devValue.value as TDevScenarioNames;

  const [selectedRows, setSelectedRows] = React.useState({
    oilDevelopment: new Set<React.Key>(),
    nagDevelopment: new Set<React.Key>(),
    oilNAGDevelopment: new Set<React.Key>(),
  });
  const [sRow, setSRow] = React.useState({
    oilDevelopment: -1,
    nagDevelopment: -1,
    oilNAGDevelopment: -1,
  });

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO: initialize from Gift
  const initUnitOj = {
    oilRate: "bopd",
    agRate: "MMScf/d",
    naGRate: "MMScf/d",
    condensateRate: "bopd",
    seismicCost: "$m",
    explApprCost: "$m",
    facilitiesCapex: "$m",
    tangWellCost: "$m",
    intangWellCost: "$m",
    abandCost: "$m",
    directCost: "$m",
    cha: "$m",
    terminalCost: "$m",
  };
  const initialAppHeaderChosenAppUnitObj = {
    oilDevelopment: initUnitOj,
    nagDevelopment: initUnitOj,
    oilNAGDevelopment: initUnitOj,
  } as Record<TDevScenarioNames, Record<string, string>>;

  const [appHeaderChosenAppUnitObj, setAppHeaderChosenAppUnitObj] =
    React.useState(initialAppHeaderChosenAppUnitObj);

  const handleApplicationUnitChange = (
    option: ValueType<ISelectOption, false>,
    headerName: string
  ) => {
    const selectedOption = option && option.label;
    const selectedAppUnit = selectedOption as string;

    setAppHeaderChosenAppUnitObj((prev) => {
      return {
        ...prev,
        [devVal]: { ...prev[devVal], [headerName]: selectedAppUnit },
      };
    });

    const selectedRow = rows[devVal][0];
    rows[devVal][0] = {
      ...selectedRow,
      headerName: selectedAppUnit,
    };
    setRows(rows);
  };

  const generateColumns = (dval: TDevScenarioNames) => {
    const columns: Column<IRawRow>[] = [
      {
        key: "sn",
        name: "SN",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0) return <div></div>;
          else return <div> {row.sn}</div>;
        },
        width: 50,
      },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          if (row.sn === 0) return <div></div>;
          else
            return (
              <div>
                <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
                <DeleteOutlinedIcon
                  onClick={() => alert(`Delete Row is:${row}`)}
                />
                <VisibilityOutlinedIcon
                  onClick={() => alert(`View Row is:${row}`)}
                />
              </div>
            );
        },
        width: 100,
      },
      {
        key: "year",
        name: "YEAR",
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0) return <div></div>;
          else return <div> {row.year}</div>;
        },
        width: 100,
      },
      {
        key: "oilRate",
        name: `OIL RATE`,
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0)
            return <div style={{ backgroundColor: "blue" }}></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "oilRate")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.oilRate}</div>;
        },
        width: 170,
      },
      {
        key: "condensateRate",
        name: `CONDENSATE RATE`,
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return null;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "condensateRate")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.oilRate}</div>;
        },
        width: 170,
      },
      {
        key: "agRate",
        name: "ASSOC. GAS RATE",
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "gasRate")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.gasRate}</div>;
        },
        width: 170,
      },
      {
        key: "naGRate",
        name: "NON ASSOC. GAS RATE",
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "gasRate")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.gasRate}</div>;
        },
        width: 170,
      },
      {
        key: "seismicCost",
        name: "SEISMIC COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "seismicCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.seismicCost}</div>;
        },
        width: 170,
      },
      {
        key: "explApprCost",
        name: "EXPLR. & APPRAISAL COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "explApprCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.explApprCost}</div>;
        },
        width: 170,
      },
      {
        key: "facilitiesCapex",
        name: "FACILITIES CAPEX",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "facilitiesCapex")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.facilitiesCapex}</div>;
        },
        width: 170,
      },
      {
        key: "tangWellCost",
        name: "TANG. DRILLING COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "tangWellCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.tangWellCost}</div>;
        },
        width: 170,
      },
      {
        key: "intangWellCost",
        name: "INTANG. DRILLING COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "intangWellCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.intangWellCost}</div>;
        },
        width: 170,
      },
      {
        key: "taxDepreciation",
        name: "TAX DEPRECIATION",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "taxDepreciation")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.taxDepreciation}</div>;
        },
        width: 170,
      },
      {
        key: "abandCost",
        name: "ABANDONMENT COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "abandCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.abandCost}</div>;
        },
        width: 170,
      },
      {
        key: "directCost",
        name: "DIRECT COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "directCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.directCost}</div>;
        },
        width: 170,
      },
      {
        key: "cha",
        name: "CHA",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "cha")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.cha}</div>;
        },
        width: 170,
      },
      {
        key: "terminalCost",
        name: "TERMINAL COST",
        editable: true,
        editor: TextEditor,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={uniqUnitOptions}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "terminalCost")
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          else return <div> {row.terminalCost}</div>;
        },
        resizable: true,
      },
    ];

    if (dval === "oilDevelopment")
      return columns.filter((column) =>
        [
          "sn",
          "actions",
          "year",
          "oilRate",
          "agRate",
          "seismicCost",
          "explApprCost",
          "facilitiesCapex",
          "tangWellCost",
          "intangWellCost",
          "taxDepreciation",
          "abandCost",
          "directCost",
          "cha",
          "terminalCost",
        ].includes(column.key)
      );
    else if (dval === "nagDevelopment")
      return columns.filter((column) =>
        [
          "sn",
          "actions",
          "year",
          "condensateRate",
          "naGRate",
          "seismicCost",
          "explApprCost",
          "facilitiesCapex",
          "tangWellCost",
          "intangWellCost",
          "taxDepreciation",
          "abandCost",
          "directCost",
          "cha",
          "terminalCost",
        ].includes(column.key)
      );
    else return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(devValue.value as TDevScenarioNames),
    [devValue.value as TDevScenarioNames]
  );

  const createTableRows = (numberOfRows: number): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i,
        year: "",
        oilRate: "",
        condensateRate: "",
        gasRate: "",
        seismicCost: "",
        explApprCost: "",
        facilitiesCapex: "",
        tangWellCost: "",
        intangWellCost: "",
        abandCost: "",
        directCost: "",
        cha: "",
        terminalCost: "",
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };

  const renderTable = (
    dval: TDevScenarioNames,
    columns: Column<IRawRow>[],
    size: SizeMeProps["size"]
  ) => {
    return (
      <ApexGrid<IRawRow, ITableButtonsProps>
        columns={columns}
        rows={rows[devVal]}
        tableButtons={tableButtons as ITableButtonsProps}
        newTableRowHeight={35}
        selectedRows={selectedRows[devVal]}
        // setSelectedRows={setSelectedRows}
        selectedRow={sRow[devVal]}
        onSelectedRowChange={setSRow}
        onRowsChange={setRows}
        size={size}
        adjustTableDimAuto={true}
        showTableHeader={true}
        showTablePagination={true}
      />
    );
  };

  const faketableRows = createTableRows(50);
  const tableRows = React.useRef<any>({
    oilDevelopment: faketableRows,
    nagDevelopment: faketableRows,
    oilNAGDevelopment: faketableRows,
  });
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState({
    oilDevelopment: currentRows,
    nagDevelopment: currentRows,
    oilNAGDevelopment: currentRows,
  });

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      <AnalyticsComp
        title="Development Scenario"
        direction="Horizontal"
        containerStyle={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          marginBottom: 10,
        }}
        content={
          <ApexSelectRS
            valueOption={devValue}
            data={devOptions}
            handleSelect={(row: ValueType<ISelectOption, false>) => {
              const path = `economicsAnalysisWorkflows.${name}.devScenario`;
              const value = row?.value as string;

              setDevValue(row as ISelectOption);
              dispatch(updateEconomicsParameterAction(path, value));
            }}
            menuPortalTarget={document.body}
            isSelectOptionType={true}
          />
        }
      />

      {renderTable(devValue.value as TDevScenarioNames, columns, {
        height: 700,
        width: 900,
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 2,
          width: 200,
        }}
      >
        <BaseButtons
          buttonTexts={["Reset", "Save"]}
          variants={["contained", "contained"]}
          colors={["secondary", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <SaveOutlinedIcon key={2} />,
          ]}
          disableds={[false, false]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {
              const dialogParameters = confirmationDialogParameters(
                "CostsRevenueManual_Reset_Confirmation",
                "Reset Confirmation",
                `Do you want to reset this table?. 
                  You will lose all data up to current step.`,
                true,
                false,
                () => workflowResetAction(0, wp, wc),
                "Reset",
                "reset"
              );

              dispatch(showDialogAction(dialogParameters));
            },
            () => finalAction && finalAction(),
          ]}
        />
      </div>
    </div>
  );
}
