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
import { SizeMe } from "react-sizeme";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
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
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";

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
  const wp = wrkflwPrcss;

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const { uniqUnitOptions } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO: initialize from Gift
  const initialAppHeaderChosenAppUnitObj: Record<string, string> = {
    oilRate: "bopd",
    gasRate: "MMScf/d",
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
  const [
    appHeaderChosenAppUnitObj,
    setAppHeaderChosenAppUnitObj,
  ] = React.useState(initialAppHeaderChosenAppUnitObj);

  const handleApplicationUnitChange = (
    value: ValueType<ISelectOption, false>,
    headerName: string
  ) => {
    const selectedValue = value && value.label;
    const selectedAppUnit = selectedValue as string;

    setAppHeaderChosenAppUnitObj((prev) => ({
      ...prev,
      [headerName]: selectedAppUnit,
    }));
  };

  const generateColumns = () => {
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
          console.log(
            "Logged output --> ~ file: CostsAndRevenueManual.tsx ~ line 168 ~ generateColumns ~ props",
            props
          );
          const { rowIdx } = props;
          if (rowIdx === 0) return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const data = ["bopd", "Mbopd"];
          const oilRate = row.oilRate as string;
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
          const data = ["bopd", "Mbopd"];
          const condensateRate = row.condensateRate as string;
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
        key: "gasRate",
        name: "GAS RATE",
        editable: wp === "economicsCostsRevenuesDeckManual" ? true : false,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const data = ["MMScf/d", "MScf/d"];
          const gasRate = row.gasRate as string;
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
          const data = ["$m", "Nm"];
          const seismicCost = row.seismicCost as string;
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
          const data = ["$m", "Nm"];
          const explApprCost = row.explApprCost as string;
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
          const data = ["$m", "Nm"];
          const facilitiesCapex = row.facilitiesCapex as string;
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
          const data = ["$m", "Nm"];
          const tangWellCost = row.tangWellCost as string;
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
          const data = ["$m", "Nm"];
          const intangWellCost = row.intangWellCost as string;
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
        key: "abandCost",
        name: "ABANDONMENT COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const data = ["$m", "Nm"];
          const abandCost = row.abandCost as string;
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
          const data = ["$m", "Nm"];
          const directCost = row.directCost as string;
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
          const data = ["$m", "Nm"];
          const cha = row.cha as string;
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
          const data = ["$m", "Nm"];
          const terminalCost = row.terminalCost as string;
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

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [selectedRows]);

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
  const faketableRows = createTableRows(50);
  const tableRows = React.useRef<any>(faketableRows);
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);
  console.log(
    "Logged output --> ~ file: CostsAndRevenueManual.tsx ~ line 518 ~ rows",
    rows
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.workflowBody}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                tableButtons={tableButtons as ITableButtonsProps}
                newTableRowHeight={35}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                selectedRow={sRow}
                onSelectedRowChange={setSRow}
                onRowsChange={setRows}
                size={size}
                adjustTableDimAuto={true}
                showTableHeader={true}
                showTablePagination={true}
              />
            )}
          </SizeMe>
        </div>
      </ClickAwayListener>
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
                () => console.log("Hi")
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
