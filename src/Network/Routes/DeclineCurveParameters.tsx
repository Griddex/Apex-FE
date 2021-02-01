import { Checkbox, makeStyles } from "@material-ui/core";
import AmpStoriesOutlinedIcon from "@material-ui/icons/AmpStoriesOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { findIndex } from "lodash";
import React, { ChangeEvent } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import DoughnutChart from "../../Visualytics/Components/DoughnutChart";
import { IDeclineCurveParametersDetail } from "../Components/Dialogs/ExistingNetworksDialogTypes";
import generateSelectData from "./../../Application/Utils/GenerateSelectData";

const useStyles = makeStyles(() => ({
  rootExistingData: {
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
  status: {
    height: "100%",
    width: "100%",
    fontSize: 14,
  },
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

//TODO: Calculate classification data from collection
const existingData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function DeclineCurveParameters({
  workflowProcess,
}: {
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"];
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  //TODO: API saga to get entire units object from server
  const workflowCategory = "importDataWorkflows";
  const { inputDeckData } = useSelector(
    (state: RootState) =>
      state.networkReducer[workflowCategory][
        workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"]
      ]
  );

  const declineCurveList: Omit<
    IDeclineCurveParametersDetail,
    | "module"
    | "drainagePoint"
    | "field"
    | "initialRate"
    | "reservoir"
    | "initialRate"
  >[] = [
    {
      declineType: "Exponential",
      declineRate: 2500,
      declineExponent: 0.2,
    },
    {
      declineType: "Hyperbolic",
      declineRate: 2500,
      declineExponent: 1.3,
    },
    {
      declineType: "Harmonic",
      declineRate: 2500,
      declineExponent: 1.3,
    },
  ];
  const modules: string[] = inputDeckData.map(
    (row: Record<string, React.Key>) => row["Modules"]
  );
  const drainagePoints: string[] = inputDeckData.map(
    (row: Record<string, React.Key>) => row["Drainage Point"]
  );
  const initialRates: number[] = inputDeckData.map(
    (row: Record<string, React.Key>) => row["Init. Oil/Gas Rate 2P/2C"]
  );
  const fields: string[] = inputDeckData.map(
    (row: Record<string, React.Key>) => row["Field"]
  );
  const reservoirs: string[] = inputDeckData.map(
    (row: Record<string, React.Key>) => row["Reservoir"]
  );

  const getRndInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const indexerArr = modules.map((m) => getRndInteger(0, 2));
  const declineCurveParametersList: IDeclineCurveParametersDetail[] = modules.map(
    (module, i: number) => {
      const index = indexerArr[i];
      const { declineType, declineRate, declineExponent } = declineCurveList[
        index
      ];

      return {
        module: module,
        drainagePoint: drainagePoints[i],
        field: fields[i],
        reservoir: reservoirs[i],
        initialRate: initialRates[i],
        declineType: declineType,
        declineRate: declineRate,
        declineExponent: declineExponent,
      };
    }
  );

  const declineTypes = ["Exponential", "Hyperbolic", "Harmonic"];
  const declineTypeOptions = generateSelectData(declineTypes);

  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };
  //Assuming all index 0 i.e. Exponential
  const snChosenApplicationDeclineTypeIndices = modules.reduce(
    (acc: Record<string, number>, module, i: number) => {
      return { ...acc, [module]: 0 };
    },
    {}
  );

  const [
    chosenApplicationDeclineTypeIndices,
    setChosenApplicationDeclineTypeIndices,
  ] = React.useState(snChosenApplicationDeclineTypeIndices);
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (
    row: IDeclineCurveParametersDetail,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.persist();
    alert(row);
    setCheckboxSelected(!checkboxSelected);
  };

  const generateColumns = () => {
    const columns: Column<IDeclineCurveParametersDetail>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "selectDecline",
        name: "",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleCheckboxChange(row, event)}
            checked={checkboxSelected}
          />
        ),
        width: 300,
      },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <VisibilityOutlinedIcon
              onClick={() => alert(`View decline curve:${row}`)}
            />
            <AmpStoriesOutlinedIcon
              onClick={() => alert(`Calculate decline parameters:${row}`)}
            />
          </div>
        ),
        width: 100,
      },
      {
        key: "module",
        name: "MODULE",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "drainagePoint",
        name: "DRAINAGE POINT",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "initialRate",
        name: "INITIAL RATE",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "declineType",
        name: "DECLINE TYPE",
        editable: false,
        resizable: true,
        formatter: ({ row, onRowChange }) => {
          const module = row.module as string;
          const declineTypeValue = row.declineType as string;

          return (
            <select
              style={{ width: "100%", height: "95%" }}
              value={declineTypeValue as string}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                event.stopPropagation();
                const selectedValue = event.target.value;

                onRowChange({
                  ...row,
                  declineType: selectedValue as string,
                });

                const selectedDeclineTypeOptionIndex = findIndex(
                  declineTypeOptions,
                  (option) => option.value === selectedValue
                );

                setChosenApplicationDeclineTypeIndices((prev) => ({
                  ...prev,
                  [`${module}`]: selectedDeclineTypeOptionIndex,
                }));

                modifyTableRows(module, selectedDeclineTypeOptionIndex);
                setRerender((rerender) => !rerender);
              }}
            >
              {declineTypeOptions.map((option, i: number) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        },
        width: 100,
      },
      {
        key: "declineRate",
        name: "DECLINE RATE",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "declineExponent",
        name: "DECLINE EXPONENT",
        editable: true,
        resizable: true,
        width: 100,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  const snDeclineCurveParametersList = declineCurveParametersList.map(
    (row, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );
  const tableRows = React.useRef<IDeclineCurveParametersDetail[]>(
    snDeclineCurveParametersList
  );
  const [, setRerender] = React.useState(false);
  const modifyTableRows = (
    selectedModule: string,
    selectedDeclineTypeOptionIndex: number
  ) => {
    const modifiedRows = tableRows.current.map((row, i: number) => {
      if (row.module === selectedModule) {
        return {
          sn: i + 1,
          module: row.module,
          drainagePoint: row.drainagePoint,
          field: row.field,
          reservoir: row.reservoir,
          initialRate: row.initialRate,
          declineType: "Exponential",
          declineRate: 2500,
          declineExponent: 0.2,
        };
      } else return row;
    });

    tableRows.current = modifiedRows;
  };
  const rows = tableRows.current;

  React.useEffect(() => {
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      <div className={classes.chart}>
        <DoughnutChart data={existingData} />
      </div>
      <div className={classes.table}>
        <ApexGrid<IDeclineCurveParametersDetail, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions}
          newTableRowHeight={80}
        />
      </div>
    </div>
  );
}
