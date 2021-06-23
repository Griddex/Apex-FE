import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column, EditorProps, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IInputWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import noEventPropagation from "../../../../Application/Events/NoEventPropagation";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import AggregatedButtons from "../../../Components/AggregatedButtons/AggregatedButtons";
import {
  developmentScenarioOptions,
  forecastCaseOptions,
} from "../../../Data/EconomicsData";
import {
  persistEconomicsDeckRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { TDevScenarioNames } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "./EconomicsCostsAndRevenuesTypes";

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
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
  wkCy,
  wkPs,
  finalAction,
}: IInputWorkflows) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = wkCy;
  const wp = wkPs;

  const componentRef = React.useRef();

  const { uniqUnitOptions } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  );

  const [devOption, setDevOption] = React.useState(
    developmentScenarioOptions[0]
  );
  const devVal = devOption.value as TDevScenarioNames;

  const [forecastCaseOption, setForecastCaseOption] = React.useState(
    forecastCaseOptions[1]
  );
  const [buttonsData, setButtonsData] = React.useState([
    {
      title: devOption.label,
      scenarioName: devOption.value,
      variant: "outlined",
      color: "primary",
      handleAction: () => setDevOption(devOption as ISelectOption),
    },
  ] as IAggregateButtonProps[]);

  let rows = [] as IRawRow[];
  let setRows: React.Dispatch<React.SetStateAction<IRawRow[]>>;
  let sRow = -1;
  let setSRow: React.Dispatch<React.SetStateAction<number>>;

  const [oilDevelopmentSRow, setOilDevelopmentSRow] = React.useState(-1);
  const [nagDevelopmentSRow, setNAGDevelopmentSRow] = React.useState(-1);
  const [oilNAGDevelopmentSRow, setOilNAGDevelopmentSRow] = React.useState(-1);
  if (devVal === "oilDevelopment") {
    sRow = oilDevelopmentSRow;
    setSRow = setOilDevelopmentSRow;
  } else if (devVal === "nagDevelopment") {
    sRow = nagDevelopmentSRow;
    setSRow = setNAGDevelopmentSRow;
  } else {
    sRow = oilNAGDevelopmentSRow;
    setSRow = setOilNAGDevelopmentSRow;
  }

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
    componentRef,
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

    const selectedRow = rows[0];
    rows[0] = {
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "oilRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "condensateRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "gasRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "gasRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "seismicCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "explApprCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "facilitiesCapex")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "tangWellCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "intangWellCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "taxDepreciation")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "abandCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "directCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div> {row.directCost}</div>;
        },
        width: 170,
      },
      {
        key: "projectCost",
        name: "PROJECT COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "projectCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div> {row.projectCost}</div>;
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "cha")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div> {row.cha}</div>;
        },
        width: 170,
      },
      {
        key: "tariffs",
        name: "TARIFFS",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "cha")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div> {row.cha}</div>;
        },
        width: 170,
      },
      {
        key: "gasProcessingFee",
        name: "GAS PROC. FEE",
        editable: true,
        editor: TextEditor,
        formatter: ({ row }) => {
          const valueOption = uniqUnitOptions[0];

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "gasProcessingFee")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div> {row.gasProcessingFee}</div>;
        },
        resizable: true,
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
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={valueOption}
                  data={uniqUnitOptions}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "terminalCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
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
          "abandCost",
          "directCost",
          "projectCost",
          "cha",
          "terminalCost",
          "tariffs",
          "taxDepreciation",
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
          "abandCost",
          "directCost",
          "projectCost",
          "cha",
          "terminalCost",
          "tariffs",
          "gasProcessingFee",
          "taxDepreciation",
        ].includes(column.key)
      );
    else return columns;
  };

  const columns = React.useMemo(() => generateColumns(devVal), [devVal]);

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
        taxDepreciation: "",
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
  const oilDevelopmentTableRows = React.useRef(faketableRows);
  const nagDevelopmentTableRows = React.useRef(faketableRows);
  const oilNAGDevelopmentTableRows = React.useRef(faketableRows);

  const oilDevelopmentCurrentRows = oilDevelopmentTableRows.current;
  const nagDevelopmentCurrentRows = nagDevelopmentTableRows.current;
  const oilNAGDevelopmentCurrentRows = oilNAGDevelopmentTableRows.current;

  const [oilDevelopmentRows, setOilDevelopmentRows] = React.useState(
    oilDevelopmentCurrentRows
  );
  const [nagDevelopmentRows, setNAGDevelopmentRows] = React.useState(
    nagDevelopmentCurrentRows
  );
  const [oilNAGDevelopmentRows, setOilNAGDevelopmentRows] = React.useState(
    oilNAGDevelopmentCurrentRows
  );

  if (devVal === "oilDevelopment") {
    rows = oilDevelopmentRows;
    setRows = setOilDevelopmentRows;
  } else if (devVal === "nagDevelopment") {
    rows = nagDevelopmentRows;
    setRows = setNAGDevelopmentRows;
  } else {
    rows = oilNAGDevelopmentRows;
    setRows = setOilNAGDevelopmentRows;
  }

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

  React.useEffect(() => {
    dispatch(persistEconomicsDeckRequestAction(wp, devVal, rows, true));
  }, [rows]);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.economicsCostsRevenuesDeckManual.costRevenuesButtons`,
        buttonsData
      )
    );
  }, [devVal]);

  return (
    <div className={classes.rootStoredData}>
      <ApexFlexContainer
        justifyContent="space-between"
        moreStyles={{
          marginBottom: 10,
          height: 50,
          borderBottom: `1px solid ${theme.palette.grey[400]}`,
          paddingBottom: 10,
        }}
      >
        <ApexFlexContainer width={"70%"} justifyContent="flex-start">
          <AnalyticsComp
            title="Development Scenario"
            direction="Horizontal"
            containerStyle={{
              display: "flex",
              flexDirection: "row",
              width: 300,
            }}
            content={
              <ApexSelectRS
                valueOption={devOption}
                data={developmentScenarioOptions}
                handleSelect={(row: ValueType<ISelectOption, false>) => {
                  const path = `inputDataWorkflows.economicsCostsRevenuesDeckManual.developmentScenarios`;
                  const value = row?.value as string;
                  const label = row?.label as string;
                  dispatch(updateEconomicsParameterAction(path, value));

                  setButtonsData((prev) => {
                    if (buttonsData.map((obj) => obj.title).includes(label))
                      return prev;
                    else {
                      const btnData = {
                        title: label,
                        scenarioName: value,
                        variant: "outlined",
                        color: "primary",
                        handleAction: () => setDevOption(row as ISelectOption),
                      } as IAggregateButtonProps;

                      return [...prev, btnData];
                    }
                  });
                }}
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            }
          />
          <AggregatedButtons
            buttonsData={buttonsData}
            setButtonsData={setButtonsData}
          />
        </ApexFlexContainer>

        <AnalyticsComp
          title="Forecast Case"
          direction="Vertical"
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            width: 300,
          }}
          content={
            <ApexSelectRS
              valueOption={forecastCaseOption}
              data={forecastCaseOptions}
              handleSelect={(option: ValueType<ISelectOption, false>) => {
                const path = `inputDataWorkflows.economicsCostsRevenuesDeckManual.forecastScenario`;
                const value = option?.value as string;
                dispatch(updateEconomicsParameterAction(path, value));

                setForecastCaseOption(option as ISelectOption);
              }}
              menuPortalTarget={document.body}
              isSelectOptionType={true}
            />
          }
        />
      </ApexFlexContainer>
      <ApexGrid<IRawRow, ITableButtonsProps>
        columns={columns}
        rows={rows}
        tableButtons={tableButtons as ITableButtonsProps}
        newTableRowHeight={35}
        selectedRow={sRow}
        onSelectedRowChange={setSRow}
        onRowsChange={setRows}
        size={{ height: 700, width: 900 }}
        autoAdjustTableDim={true}
        showTableHeader={true}
        showTablePagination={true}
      />
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
                "textDialog",
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
