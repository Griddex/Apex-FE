import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import pick from "lodash.pick";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column, EditorProps, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IInputWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import noEventPropagation from "../../../../Application/Events/NoEventPropagation";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getApexIconButtonStyle } from "../../../../Application/Styles/IconButtonStyles";
import { TUseState } from "../../../../Application/Types/ApplicationTypes";
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
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const ApexGrid = React.lazy(
  () =>
    import("../../../../Application/Components/Table/ReactDataGrid/ApexGrid")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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
    justifyContent: "center",
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

const unitOptionsByVariableNameSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.unitOptionsByVariableName,
  (data) => data
);

export default function CostsAndRevenueManual({
  wkCy,
  wkPs,
  finalAction,
}: IInputWorkflows) {
  const initialRowsLength = 10;
  const basePath = "inputDataWorkflows.economicsCostsRevenuesDeckManual";

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = wkCy;
  const wp = wkPs;

  const componentRef = React.useRef();

  const unitOptionsByVariableName = useSelector(
    unitOptionsByVariableNameSelector
  );

  const [devOption, setDevOption] = React.useState<ISelectOption>(
    developmentScenarioOptions[0]
  );
  const devVal = devOption.value as TDevScenarioNames;

  const [forecastCaseOption, setForecastCaseOption] =
    React.useState<ISelectOption>(forecastCaseOptions[1]);

  const [buttonsData, setButtonsData] = React.useState([
    {
      title: devOption.label,
      scenarioName: devOption.value,
      variant: "outlined",
      color: "primary",
      handleAction: () => setDevOption(devOption as ISelectOption),
    },
  ] as IAggregateButtonProps[]);

  let [rows, setRows] = React.useState<IRawRow[]>([] as IRawRow[]);

  let sRow = -1;
  let setSRow: TUseState<number>;

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

  const oilNAGDevelopmentNames = [
    "baseOilRate",
    "associatedGasRate",
    "seismicCost",
    "explAppraisalCost",
    "facilitiesCapex",
    "tangibleDrillingCost",
    "intangibleDrillingCost",
    "abandonmentCost",
    "directCost",
    "projectCost",
    "cHA",
    "terminalFee",
    "tariffs",
    "taxDepreciation",
    "condensateRate",
    "nonAssociatedGasRate",
    "gasProcTraiffs",
  ];

  const oilDevelopmentNames = [
    "baseOilRate",
    "associatedGasRate",
    "seismicCost",
    "explAppraisalCost",
    "facilitiesCapex",
    "tangibleDrillingCost",
    "intangibleDrillingCost",
    "abandonmentCost",
    "directCost",
    "projectCost",
    "cHA",
    "terminalFee",
    "tariffs",
    "taxDepreciation",
  ];

  const nagDevelopmentNames = [
    "condensateRate",
    "nonAssociatedGasRate",
    "seismicCost",
    "explAppraisalCost",
    "facilitiesCapex",
    "tangibleDrillingCost",
    "intangibleDrillingCost",
    "abandonmentCost",
    "directCost",
    "projectCost",
    "cHA",
    "terminalFee",
    "tariffs",
    "gasProcTraiffs",
    "taxDepreciation",
  ];

  const initialOilNAGDevelopmentUnitsObj = oilNAGDevelopmentNames.reduce(
    (acc, name) => {
      const firstOption = unitOptionsByVariableName[name][0];
      return { ...acc, [name]: firstOption };
    },
    {}
  );
  const initialOilDevelopmentUnitsObj = pick(
    initialOilNAGDevelopmentUnitsObj,
    oilDevelopmentNames
  );
  const initialNAGDevelopmentUnitsObj = pick(
    initialOilNAGDevelopmentUnitsObj,
    nagDevelopmentNames
  );

  const initialAppHeaderChosenAppUnitObj = {
    oilDevelopment: initialOilDevelopmentUnitsObj,
    nagDevelopment: initialNAGDevelopmentUnitsObj,
    oilNAGDevelopment: initialOilNAGDevelopmentUnitsObj,
  } as Record<TDevScenarioNames, Record<string, ISelectOption>>;

  const [appHeaderChosenAppUnitObj, setAppHeaderChosenAppUnitObj] =
    React.useState(initialAppHeaderChosenAppUnitObj);

  const generateInitialRows = (
    noOfRows: number,
    headerNames: string[],
    devVal: TDevScenarioNames
  ) => {
    const rows = [];
    const row = zipObject(headerNames, Array(headerNames.length).fill(""));

    for (let i = 0; i < noOfRows; i++) {
      rows.push({ sn: i, ...row });
    }

    return rows;
  };

  const [oilDevelopmentRows, setOilDevelopmentRows] = React.useState(
    generateInitialRows(
      initialRowsLength,
      oilDevelopmentNames,
      devVal
    ) as IRawRow[]
  );

  const [nagDevelopmentRows, setNAGDevelopmentRows] = React.useState(
    generateInitialRows(
      initialRowsLength,
      nagDevelopmentNames,
      devVal
    ) as IRawRow[]
  );
  const [oilNAGDevelopmentRows, setOilNAGDevelopmentRows] = React.useState(
    generateInitialRows(
      initialRowsLength,
      oilNAGDevelopmentNames,
      devVal
    ) as IRawRow[]
  );

  if (devVal === "oilDevelopment") {
    rows = oilDevelopmentRows as IRawRow[];
    setRows = setOilDevelopmentRows;
  } else if (devVal === "nagDevelopment") {
    rows = nagDevelopmentRows as IRawRow[];
    setRows = setNAGDevelopmentRows;
  } else {
    rows = oilNAGDevelopmentRows as IRawRow[];
    setRows = setOilNAGDevelopmentRows;
  }

  const handleApplicationUnitChange = (
    option: ValueType<ISelectOption, false>,
    headerName: string
  ) => {
    setAppHeaderChosenAppUnitObj((prev) => {
      return {
        ...prev,
        [devVal]: { ...prev[devVal], [headerName]: option },
      };
    });

    const selectedRow = rows[0];
    rows[0] = {
      ...selectedRow,
      [headerName]: (option as ISelectOption).label,
    };

    setRows(rows);
  };

  const generateColumns = (
    dval: TDevScenarioNames,
    appHeaderChosenAppUnitObj: Record<
      TDevScenarioNames,
      Record<string, ISelectOption>
    >
  ) => {
    const columns: Column<IRawRow>[] = [
      {
        key: "sn",
        name: "SN",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0) return <div></div>;
          else return <div>{row.sn}</div>;
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
              <ApexFlexContainer>
                <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
                <DeleteOutlinedIcon
                  onClick={() => alert(`Delete Row is:${row}`)}
                />
              </ApexFlexContainer>
            );
        },
        width: 100,
      },
      {
        key: "year",
        name: "YEAR",
        editable: true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0) return <div {...noEventPropagation()}></div>;
          else return <div>{row.year}</div>;
        },
        width: 100,
      },
      {
        key: "baseOilRate",
        name: `OIL RATE`,
        editable: true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[devVal]["baseOilRate"];

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["baseOilRate"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "baseOilRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.baseOilRate}</div>;
        },
        width: 170,
      },
      {
        key: "condensateRate",
        name: `CONDENSATE RATE`,
        editable: true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return null;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[devVal]["condensateRate"];

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["condensateRate"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "condensateRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.condensateRate}</div>;
        },
        width: 170,
      },
      {
        key: "associatedGasRate",
        name: "ASSOC. GAS RATE",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[devVal]["associatedGasRate"];

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["associatedGasRate"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "associatedGasRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.associatedGasRate}</div>;
        },
        width: 170,
      },
      {
        key: "nonAssociatedGasRate",
        name: "NON ASSOC. GAS RATE",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["nonAssociatedGasRate"]
                  }
                  data={unitOptionsByVariableName["nonAssociatedGasRate"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "nonAssociatedGasRate")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.nonAssociatedGasRate}</div>;
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
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["seismicCost"]}
                  data={unitOptionsByVariableName["seismicCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "seismicCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.seismicCost}</div>;
        },
        width: 170,
      },
      {
        key: "explAppraisalCost",
        name: "EXPLR. & APPRAISAL COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["explAppraisalCost"]
                  }
                  data={unitOptionsByVariableName["explAppraisalCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "explAppraisalCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.explAppraisalCost}</div>;
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
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["facilitiesCapex"]
                  }
                  data={unitOptionsByVariableName["facilitiesCapex"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "facilitiesCapex")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.facilitiesCapex}</div>;
        },
        width: 170,
      },
      {
        key: "tangibleDrillingCost",
        name: "TANG. DRILLING COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["tangibleDrillingCost"]
                  }
                  data={unitOptionsByVariableName["tangibleDrillingCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "tangibleDrillingCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.tangibleDrillingCost}</div>;
        },
        width: 170,
      },
      {
        key: "intangibleDrillingCost",
        name: "INTANG. DRILLING COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["intangibleDrillingCost"]
                  }
                  data={unitOptionsByVariableName["intangibleDrillingCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "intangibleDrillingCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.intangibleDrillingCost}</div>;
        },
        width: 170,
      },
      {
        key: "abandonmentCost",
        name: "ABANDONMENT COST",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["abandonmentCost"]
                  }
                  data={unitOptionsByVariableName["abandonmentCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "abandonmentCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.abandonmentCost}</div>;
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
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["directCost"]}
                  data={unitOptionsByVariableName["directCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "directCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.directCost}</div>;
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
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["projectCost"]}
                  data={unitOptionsByVariableName["projectCost"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "projectCost")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.projectCost}</div>;
        },
        width: 170,
      },
      {
        key: "cHA",
        name: "CHA",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["cHA"]}
                  data={unitOptionsByVariableName["cHA"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "cHA")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.cHA}</div>;
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
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["tariffs"]}
                  data={unitOptionsByVariableName["tariffs"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "tariffs")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.cHA}</div>;
        },
        width: 170,
      },
      {
        key: "gasProcTraiffs",
        name: "GAS PROC. FEE",
        editable: true,
        editor: TextEditor,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["gasProcTraiffs"]
                  }
                  data={unitOptionsByVariableName["gasProcTraiffs"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "gasProcTraiffs")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.gasProcTraiffs}</div>;
        },
        resizable: true,
      },
      {
        key: "terminalFee",
        name: "TERMINAL COST",
        editable: true,
        editor: TextEditor,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={appHeaderChosenAppUnitObj[devVal]["terminalFee"]}
                  data={unitOptionsByVariableName["terminalFee"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "terminalFee")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.terminalFee}</div>;
        },
        resizable: true,
        width: 170,
      },
      {
        key: "taxDepreciation",
        name: "TAX DEPRECIATION",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={
                    appHeaderChosenAppUnitObj[devVal]["taxDepreciation"]
                  }
                  data={unitOptionsByVariableName["taxDepreciation"]}
                  handleSelect={(value: ValueType<ISelectOption, false>) =>
                    handleApplicationUnitChange(value, "taxDepreciation")
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else return <div>{row.taxDepreciation}</div>;
        },
        width: 170,
      },
    ];

    if (dval === "oilDevelopment")
      return columns.filter((column) =>
        ["sn", "actions", "year", ...oilDevelopmentNames].includes(column.key)
      );
    else if (dval === "nagDevelopment")
      return columns.filter((column) =>
        ["sn", "actions", "year", ...nagDevelopmentNames].includes(column.key)
      );
    else return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(devVal, appHeaderChosenAppUnitObj),
    [devVal, JSON.stringify(appHeaderChosenAppUnitObj)]
  );

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
    fileName: "CostsAndRevenuesTemplate",
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
        <AddOutlinedIcon
          style={{ ...getApexIconButtonStyle(theme), marginLeft: 4 }}
          onClick={() => {
            setRows((prev) => {
              const sn = prev.length;
              const headerNames = Object.keys(prev[0]);

              const row = zipObject(
                headerNames,
                Array(headerNames.length).fill("")
              );
              const addedRow = { ...row, sn };

              return [...prev, addedRow];
            });
          }}
        />
        <RemoveOutlinedIcon
          style={{ ...getApexIconButtonStyle(theme), marginLeft: 4 }}
          onClick={() => {
            setRows((prev) => {
              if (prev.length > 1) return prev.slice(0, prev.length - 1);
              else return prev;
            });
          }}
        />
        <ExcelExportTable {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  React.useEffect(() => {
    dispatch(persistEconomicsDeckRequestAction(wp, devVal, rows, true));
    setRows(rows);
  }, [JSON.stringify(rows)]);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `${basePath}.costRevenuesButtons`,
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
        <ApexFlexContainer width="70%" justifyContent="flex-start">
          <AnalyticsComp
            title="Development Scenario"
            direction="Horizontal"
            containerStyle={{
              display: "flex",
              flexDirection: "row",
              width: 550,
            }}
            content={
              <ApexSelectRS
                valueOption={devOption}
                data={developmentScenarioOptions}
                handleSelect={(row: ValueType<ISelectOption, false>) => {
                  const path = `${basePath}.developmentScenarios`;
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
                const path = `${basePath}.forecastCase`;
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
      <ApexGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        tableButtons={tableButtons as ITableButtonsProps}
        newTableRowHeight={35}
        selectedRow={sRow}
        onSelectedRowChange={setSRow}
        size={{ height: 700, width: 900 }}
        autoAdjustTableDim={true}
        showTableHeader={true}
        showTablePagination={true}
        initialRowsLength={initialRowsLength}
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
