import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useTheme } from "@mui/material";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column, EditorProps, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import noEventPropagation from "../../../../Application/Events/NoEventPropagation";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getApexIconButtonStyle } from "../../../../Application/Styles/IconButtonStyles";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { ICostsRevenues } from "./EconomicsCostsAndRevenuesTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const unitOptionsByVariableNameSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.unitOptionsByVariableName,
  (data) => data
);

export default function CostsAndRevenueManualOil({
  wkPs,
  costsRevenueAggregationLevelOption,
  oilDevelopmentRows,
  setOilDevelopmentRows,
  oilDevelopmentNames,
}: ICostsRevenues) {
  const initialRowsLength = 10;
  const wkCs = "inputDataWorkflows";
  const oilDevelopmentRowsDefined = oilDevelopmentRows as IRawRow[];

  const currentAggregationLevelOption = costsRevenueAggregationLevelOption;
  const currentAggregationLevelOptionValue =
    currentAggregationLevelOption?.value as string;

  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = React.useRef();
  const oilDevelopmentRef =
    React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const unitOptionsByVariableName = useSelector(
    unitOptionsByVariableNameSelector
  );

  const [oilDevelopmentSRow, setOilDevelopmentSRow] = React.useState(-1);

  const keys = Object.keys(oilDevelopmentRowsDefined[0]);
  keys[1] = currentAggregationLevelOptionValue;
  const oilDevelopmentRowsUpdated = React.useMemo(
    () =>
      oilDevelopmentRowsDefined.map((row) => {
        const values = Object.values(row);

        return zipObject(keys, values);
      }),
    [currentAggregationLevelOptionValue, oilDevelopmentRowsDefined]
  );

  const initialOilDevelopmentUnitsObj: Record<
    string,
    OnChangeValue<ISelectOption, false>
  > = React.useMemo(
    () =>
      (oilDevelopmentNames as string[]).reduce((acc, name) => {
        const options = unitOptionsByVariableName[name];

        const firstOption =
          options && Object.keys(options).length > 0
            ? unitOptionsByVariableName[name][0]
            : { value: "unitless", label: "unitless" };

        return { ...acc, [name]: firstOption };
      }, {}) as Record<string, OnChangeValue<ISelectOption, false>>,
    []
  );

  const [appHeaderChosenAppUnitObj, setAppHeaderChosenAppUnitObj] =
    React.useState(initialOilDevelopmentUnitsObj);

  const handleApplicationUnitChange = (
    option: OnChangeValue<ISelectOption, false>,
    headerName: string
  ) => {
    setAppHeaderChosenAppUnitObj((prev) => ({
      ...prev,
      [headerName]: option,
    }));

    const selectedRow = oilDevelopmentRowsDefined[0];
    oilDevelopmentRowsDefined[0] = {
      ...selectedRow,
      [headerName]: (option as ISelectOption).label,
    };

    setOilDevelopmentRows && setOilDevelopmentRows(oilDevelopmentRowsDefined);
  };

  const generateColumns = (currentAggregationLevelOption: ISelectOption) => {
    const currentAggregationLevelOptionValueDefined =
      currentAggregationLevelOption?.value as string;

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
        key: `${currentAggregationLevelOption?.value}`,
        name: `${currentAggregationLevelOption.label.toUpperCase()}${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[
            currentAggregationLevelOptionValueDefined
          ] as ISelectOption;

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={
                    unitOptionsByVariableName[
                      currentAggregationLevelOptionValueDefined
                    ]
                  }
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
                    handleApplicationUnitChange(
                      value,
                      currentAggregationLevelOptionValueDefined
                    )
                  }
                  menuPortalTarget={document.body}
                  isSelectOptionType={true}
                />
              </div>
            );
          else
            return <div>{row[currentAggregationLevelOptionValueDefined]}</div>;
        },
        width: 170,
      },
      {
        key: "year",
        name: `YEAR${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
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
        name: `OIL RATE${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[
            "baseOilRate"
          ] as ISelectOption;

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["baseOilRate"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        key: "associatedGasRate",
        name: `ASSOC. GAS RATE${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[
            "associatedGasRate"
          ] as ISelectOption;

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["associatedGasRate"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        key: "seismicCost",
        name: "SEISMIC COST*",
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
                    appHeaderChosenAppUnitObj["seismicCost"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["seismicCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "EXPLR. & APPRAISAL COST*",
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
                    appHeaderChosenAppUnitObj[
                      "explAppraisalCost"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["explAppraisalCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "FACILITIES CAPEX*",
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
                    appHeaderChosenAppUnitObj[
                      "facilitiesCapex"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["facilitiesCapex"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "TANG. DRILLING COST*",
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
                    appHeaderChosenAppUnitObj[
                      "tangibleDrillingCost"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["tangibleDrillingCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "INTANG. DRILLING COST*",
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
                    appHeaderChosenAppUnitObj[
                      "intangibleDrillingCost"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["intangibleDrillingCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "ABANDONMENT COST*",
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
                    appHeaderChosenAppUnitObj[
                      "abandonmentCost"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["abandonmentCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "DIRECT COST*",
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
                    appHeaderChosenAppUnitObj["directCost"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["directCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "PROJECT COST*",
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
                    appHeaderChosenAppUnitObj["projectCost"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["projectCost"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "CHA*",
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
                    appHeaderChosenAppUnitObj["cHA"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["cHA"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "TARIFFS*",
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
                    appHeaderChosenAppUnitObj["tariffs"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["tariffs"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        key: "terminalFee",
        name: "TERMINAL COST*",
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
                    appHeaderChosenAppUnitObj["terminalFee"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["terminalFee"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        name: "TAX DEPRECIATION* ",
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
                    appHeaderChosenAppUnitObj[
                      "taxDepreciation"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["taxDepreciation"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(currentAggregationLevelOption),
    [currentAggregationLevelOption.value]
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
        data: oilDevelopmentRows,
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
            setOilDevelopmentRows &&
              setOilDevelopmentRows((prev) => {
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
            setOilDevelopmentRows &&
              setOilDevelopmentRows((prev) => {
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

  const getOilDevApexGridProps = (size?: ISize) => ({
    columns: columns,
    rows: oilDevelopmentRowsUpdated,
    onRowsChange: setOilDevelopmentRows,
    tableButtons: tableButtons as ITableButtonsProps,
    newTableRowHeight: 35,
    selectedRow: oilDevelopmentSRow,
    onSelectedRowChange: setOilDevelopmentSRow,
    size: { height: 700, width: 900 },
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
    initialRowsLength: initialRowsLength,
  });

  //TODO maybe Gift has to send me units for apexforecast process?
  const oilDevelopmentRowsFin =
    wkPs === "economicsCostsRevenuesDeckManual"
      ? oilDevelopmentRowsUpdated.slice(1)
      : oilDevelopmentRowsUpdated;

  React.useEffect(() => {
    if (oilDevelopmentRowsFin?.length > 0) {
      dispatch(
        updateEconomicsParameterAction(
          `${wkCs}.${wkPs}.costsRevenues.oilDevelopment`,
          oilDevelopmentRowsFin
        )
      );
    }
  }, [oilDevelopmentRowsFin]);

  const appUnits = Object.values(appHeaderChosenAppUnitObj)
    .map((v) => v?.value as string)
    .join();
  React.useEffect(() => {
    const appHeaderNameUnitTitlesMap = Object.keys(
      appHeaderChosenAppUnitObj
    ).reduce((acc, name) => {
      const options = appHeaderChosenAppUnitObj[name];
      acc[name] = options?.value as string;
      return acc;
    }, {} as Record<string, string>);

    dispatch(
      updateEconomicsParameterAction(
        `${wkCs}.${wkPs}.appHeaderNameUnitTitlesMap`,
        appHeaderNameUnitTitlesMap
      )
    );
  }, [appUnits]);

  return (
    <ApexGrid
      ref={oilDevelopmentRef}
      apexGridProps={getOilDevApexGridProps()}
    />
  );
}
