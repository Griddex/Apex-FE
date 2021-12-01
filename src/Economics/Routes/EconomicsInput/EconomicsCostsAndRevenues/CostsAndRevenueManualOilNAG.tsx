import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useTheme } from "@mui/material";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column, EditorProps, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
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
import { persistEconomicsDecksRequestAction } from "../../../Redux/Actions/EconomicsActions";
import { ICostsRevenues } from "./EconomicsCostsAndRevenuesTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const unitOptionsByVariableNameSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.unitOptionsByVariableName,
  (data) => data
);

export default function CostsAndRevenueManualOilNAG({
  wkPs,
  oilNAGDevelopmentRows,
  setOilNAGDevelopmentRows,
  oilNAGDevelopmentNames,
}: ICostsRevenues) {
  const initialRowsLength = 10;

  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = React.useRef();
  const oilNAGDevelopmentRef =
    React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const unitOptionsByVariableName = useSelector(
    unitOptionsByVariableNameSelector
  );

  const [oilNAGDevelopmentSRow, setOilNAGDevelopmentSRow] = React.useState(-1);

  const initialOilNAGDevelopmentUnitsObj: Record<
    string,
    OnChangeValue<ISelectOption, false>
  > = React.useMemo(
    () =>
      (oilNAGDevelopmentNames as string[]).reduce((acc, name) => {
        const firstOption = unitOptionsByVariableName[name][0];
        return { ...acc, [name]: firstOption };
      }, {}) as Record<string, OnChangeValue<ISelectOption, false>>,
    []
  );

  const [appHeaderChosenAppUnitObj, setAppHeaderChosenAppUnitObj] =
    React.useState(initialOilNAGDevelopmentUnitsObj);

  const handleApplicationUnitChange = (
    option: OnChangeValue<ISelectOption, false>,
    headerName: string
  ) => {
    setAppHeaderChosenAppUnitObj((prev) => ({
      ...prev,
      [headerName]: option,
    }));

    const selectedRow = (oilNAGDevelopmentRows as IRawRow[])[0];
    (oilNAGDevelopmentRows as IRawRow[])[0] = {
      ...selectedRow,
      [headerName]: (option as ISelectOption).label,
    };

    setOilNAGDevelopmentRows &&
      setOilNAGDevelopmentRows(oilNAGDevelopmentRows as IRawRow[]);
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
        key: "condensateRate",
        name: `CONDENSATE RATE${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
        editor: (props: EditorProps<IRawRow>) => {
          const { rowIdx } = props;
          if (rowIdx === 0) return null;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }) => {
          const option = appHeaderChosenAppUnitObj[
            "condensateRate"
          ] as ISelectOption;

          if (row.sn === 0)
            return (
              <div
                style={{ width: "100%", height: "100%" }}
                {...noEventPropagation()}
              >
                <ApexSelectRS
                  valueOption={option}
                  data={unitOptionsByVariableName["condensateRate"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        key: "nonAssociatedGasRate",
        name: `NON ASSOC. GAS RATE${
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? "" : "*"
        }`,
        editable:
          wkPs === "economicsCostsRevenuesDeckApexForecast" ? false : true,
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
                      "nonAssociatedGasRate"
                    ] as ISelectOption
                  }
                  data={unitOptionsByVariableName["nonAssociatedGasRate"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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
        key: "gasProcTraiffs",
        name: "GAS PROC. FEE*",
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
                    appHeaderChosenAppUnitObj["gasProcTraiffs"] as ISelectOption
                  }
                  data={unitOptionsByVariableName["gasProcTraiffs"]}
                  handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
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

  const columns = React.useMemo(() => generateColumns(), []);

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
        data: oilNAGDevelopmentRows as IRawRow[],
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
            setOilNAGDevelopmentRows &&
              setOilNAGDevelopmentRows((prev) => {
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
            setOilNAGDevelopmentRows &&
              setOilNAGDevelopmentRows((prev) => {
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

  const getOilNAGApexGridProps = (size?: ISize) => ({
    columns: columns,
    rows: oilNAGDevelopmentRows as IRawRow[],
    onRowsChange: setOilNAGDevelopmentRows,
    tableButtons: tableButtons as ITableButtonsProps,
    newTableRowHeight: 35,
    selectedRow: oilNAGDevelopmentSRow,
    onSelectedRowChange: setOilNAGDevelopmentSRow,
    size: { height: 700, width: 900 },
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
    initialRowsLength: initialRowsLength,
  });

  React.useEffect(() => {
    dispatch(
      persistEconomicsDecksRequestAction(
        "oilNAGDevelopment",
        oilNAGDevelopmentRows as IRawRow[]
      )
    );
  }, [oilNAGDevelopmentRows]);

  return (
    <ApexGrid
      ref={oilNAGDevelopmentRef}
      apexGridProps={getOilNAGApexGridProps()}
    />
  );
}
