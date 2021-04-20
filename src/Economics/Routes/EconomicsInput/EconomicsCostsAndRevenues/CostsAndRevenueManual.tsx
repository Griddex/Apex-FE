import { ClickAwayListener, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import faker from "faker";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  IRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";

const useStyles = makeStyles((theme) => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "98%",
    height: "90%",
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
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  idTitleArr,
  persistIdTitleAction,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;
  console.log(
    "Logged output --> ~ file: CostsAndRevenueManual.tsx ~ line 61 ~ wp",
    wp
  );

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const initialAppHeaderChosenAppUnitObj: Record<string, string> = {
    oilRate: "bopd",
    gasRate: "MMScf/d",
    seismicCost: "$m",
    explApprCost: "$m",
    facilitiesCost: "$m",
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
          if (row.sn === 0) return <div> </div>;
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
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const data = ["bopd", "Mbopd"];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "oilRate")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "gasRate")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "seismicCost")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "explApprCost")
                }
                menuPortalTarget={document.body}
              />
            );
          else return <div> {row.explApprCost}</div>;
        },
        width: 170,
      },
      {
        key: "facilitiesCost",
        name: "FACILITIES CAPEX",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const data = ["$m", "Nm"];

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "facilitiesCost")
                }
                menuPortalTarget={document.body}
              />
            );
          else return <div> {row.facilitiesCost}</div>;
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "tangWellCost")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "intangWellCost")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "abandCost")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "directCost")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "cha")
                }
                menuPortalTarget={document.body}
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

          if (row.sn === 0)
            return (
              <ApexSelectRS
                data={data}
                handleSelect={(value: ValueType<ISelectOption, false>) =>
                  handleApplicationUnitChange(value, "terminalCost")
                }
                menuPortalTarget={document.body}
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

  const createTableRows = (numberOfRows: number): IRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i,
        year: faker.random.number({ min: 2000, max: 2020 }),
        oilRate: faker.random.number({ min: 600, max: 10000 }),
        gasRate: faker.random.number({ min: 30, max: 160 }),
        seismicCost: faker.random.number({ min: 10, max: 15 }),
        explApprCost: faker.random.number({ min: 5, max: 10 }),
        facilitiesCost: faker.random.number({ min: 50, max: 250 }),
        tangWellCost: faker.random.number({ min: 20, max: 80 }),
        intangWellCost: faker.random.number({ min: 10, max: 50 }),
        abandCost: faker.random.number({ min: 10, max: 50 }),
        directCost: faker.random.number({ min: 5, max: 20 }),
        cha: faker.random.number({ min: 5, max: 50 }),
        terminalCost: faker.random.number({ min: 10, max: 20 }),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };
  const faketableRows = createTableRows(100);
  const tableRows = React.useRef<any>(faketableRows);
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

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
              />
            )}
          </SizeMe>
        </div>
      </ClickAwayListener>
    </div>
  );
}
