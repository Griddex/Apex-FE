import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { EditorProps, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
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
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import {
  IAllWorkflows,
  TReducer,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { resetInputDataAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import EconomicsParametersValue from "../../../Components/Parameters/EconomicsParametersValue";
import {
  gasDevelopmentConceptOptions,
  productionTerrainOptions,
} from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  rootEconomicsParametersManual: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "100%",
  },
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
}));

const economicsParametersAppHeadersSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer["economicsParametersAppHeaders"],
  (headers) => headers
);

const unitOptionsByVariableNameSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer["unitOptionsByVariableName"],
  (data) => data
);

const EconomicsParametersManual = ({
  reducer,
  wrkflwPrcss,
  wrkflwCtgry,
  finalAction,
}: IAllWorkflows) => {
  const reducerDefined = reducer as TReducer;
  const wc = wrkflwCtgry as TAllWorkflowCategories;
  const wp = wrkflwPrcss as TAllWorkflowProcesses;

  const classes = useStyles();
  const dispatch = useDispatch();

  const parametersDeck = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]["tableData"],
    () => false
  );

  const typeOptions = [
    { value: "Single", label: "Single" },
    { value: "Table", label: "Table" },
    // { value: "Equation", label: "Equation" },
  ];

  const economicsParametersAppHeaders = useSelector(
    economicsParametersAppHeadersSelector
  );

  const unitOptionsByVariableName = useSelector(
    unitOptionsByVariableNameSelector
  );

  const createInitialRows = (
    numberOfRows: number = economicsParametersAppHeaders.length
  ): TRawTable => {
    const initialRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const { variableName, variableTitle } = economicsParametersAppHeaders[i];
      const unitOptions = unitOptionsByVariableName[variableName];

      const initialRow = {
        sn: i + 1,
        parameter: variableTitle,
        parameterName: variableName,
        type: "Single",
        value:
          variableName === "prodTerrain"
            ? "onshore"
            : variableName === "gasDevConcept"
            ? "monetize"
            : "",
        unit: unitOptions ? unitOptions[0].label : "unitless",
        remark: "",
      };

      initialRows.push(initialRow);
    }
    return initialRows;
  };

  const initialRows = React.useMemo(
    () => createInitialRows(economicsParametersAppHeaders.length),
    []
  );

  const [rows, setRows] = React.useState<IRawRow[]>(
    Object.entries(parametersDeck).length > 0 ? parametersDeck : initialRows
  );

  const initialParametersObj: Record<
    string,
    OnChangeValue<ISelectOption, false>
  > = React.useMemo(
    () =>
      (economicsParametersAppHeaders as string[]).reduce((acc, name) => {
        const options = unitOptionsByVariableName[name];

        const firstOption =
          options && Object.keys(options).length > 0
            ? options[0]
            : { value: "unitless", label: "unitless" };

        return { ...acc, [name]: firstOption };
      }, {}) as Record<string, OnChangeValue<ISelectOption, false>>,
    []
  );

  const [appHeaderChosenAppUnitObj, setAppHeaderChosenAppUnitObj] =
    React.useState(initialParametersObj);

  const handleParameterTypeChange = (
    row: IRawRow,
    option: OnChangeValue<ISelectOption, false>
  ) => {
    const selectedValue = option && option.value;
    const selectedType = selectedValue as string;

    const selectedRowSN = row.sn as number;
    const selectedRow = rows[selectedRowSN - 1];

    const newRows = [...rows];
    newRows[selectedRowSN - 1] = {
      ...selectedRow,
      type: selectedType,
    };

    setRows(newRows);
  };

  const handleParameterUnitChange = (
    row: IRawRow,
    option: OnChangeValue<ISelectOption, false>
  ) => {
    const selectedValue = option && option.label;
    const selectedAppUnit = selectedValue as string;

    const selectedRowSN = row.sn as number;
    const selectedRow = rows[selectedRowSN - 1];

    const newRows = [...rows];
    newRows[selectedRowSN - 1] = {
      ...selectedRow,
      unit: selectedAppUnit,
    };

    const headerName = row.parameter as string;
    setAppHeaderChosenAppUnitObj((prev) => ({
      ...prev,
      [headerName]: option,
    }));

    setRows(newRows);
  };

  const handleValueChange = (
    row: IRawRow,
    value: OnChangeValue<ISelectOption, false>
  ) => {
    const selectedValue = value && value.label;
    const selectedValueFinal = selectedValue as string;

    const selectedRowSN = row.sn as number;
    const selectedRow = rows[selectedRowSN - 1];

    const newRows = [...rows];
    newRows[selectedRowSN - 1] = {
      ...selectedRow,
      value: selectedValueFinal,
    };

    setRows(newRows);
  };

  const genericAddtnlColumnsObj = React.useMemo(
    () => ({
      value: "VALUE",
    }),
    []
  );

  const customAddtnlColumnsObj = React.useMemo(
    () => ({
      govtRoyRate: "GOVT. ROYALTY RATE",
      ovrrToHeadFarmor: "OVRR TO HEAD FARMOR",
    }),
    []
  );

  const typeString = rows.map((row: any) => row.type).join();
  const unitString = rows.map((row: any) => row.unit).join();
  const valueString = rows.map((row: any) => JSON.stringify(row.value)).join();

  const columns = React.useMemo(
    () => [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 70 },
      {
        key: "parameter",
        name: "PARAMETER",
        editable: false,
        resizable: true,
        width: 250,
      },
      {
        key: "type",
        name: "TYPE*",
        editable: false,
        resizable: true,
        formatter: ({ row }: any) => {
          const type = row.type as string;
          const parameterName = row.parameterName as string;

          const valueOption = typeOptions.find(
            (opt) => opt.value === type
          ) as ISelectOption;

          if (["prodTerrain", "gasDevConcept"].includes(parameterName))
            return <></>;

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={typeOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
                handleParameterTypeChange(row, option)
              }
              menuPortalTarget={document.body}
              isSelectOptionType={true}
            />
          );
        },
        width: 150,
      },
      {
        key: "value",
        name: "VALUE*",
        editable: true,
        editor: (props: EditorProps<IRawRow>) => {
          const { row } = props;
          if (
            ["prodTerrain", "gasDevConcept"].includes(
              row.parameterName as string
            )
          )
            return <div></div>;
          else return <TextEditor {...props} />;
        },
        resizable: true,
        formatter: ({ row }: any) => {
          const rowIndex = (row.sn as number) - 1;
          const value = row.value as string;
          const type = row.type as string;
          const parameterName = row.parameterName as string;

          if (parameterName === "prodTerrain") {
            const valueOption = productionTerrainOptions.filter(
              (opt) => opt.value === value
            )[0];

            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={productionTerrainOptions}
                handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
                  handleValueChange(row, option)
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          }

          if (parameterName === "gasDevConcept") {
            const valueOption = gasDevelopmentConceptOptions.filter(
              (opt) => opt.value === value
            )[0];

            return (
              <ApexSelectRS
                valueOption={valueOption}
                data={gasDevelopmentConceptOptions}
                handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
                  handleValueChange(row, option)
                }
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
            );
          }

          if (type === "Table")
            return (
              <EconomicsParametersValue
                valueTitle="Table"
                rows={rows}
                rowIndex={rowIndex}
                genericAddtnlColumnsObj={genericAddtnlColumnsObj}
                customAddtnlColumnsObj={customAddtnlColumnsObj}
              />
            );
          else if (type === "Equation")
            return (
              <EconomicsParametersValue
                valueTitle="Equation"
                rowIndex={rowIndex}
                rows={rows}
                genericAddtnlColumnsObj={genericAddtnlColumnsObj}
                customAddtnlColumnsObj={customAddtnlColumnsObj}
              />
            );
          else return <ApexFlexContainer>{value}</ApexFlexContainer>;
        },
        width: 150,
      },
      {
        key: "unit",
        name: "UNIT*",
        editable: false,
        resizable: true,
        formatter: ({ row }: any) => {
          const unit = row.unit as string;
          const parameter = row.parameter as string;

          let nameTitleObj = {} as any;
          let unitOptions = [] as ISelectOption[];
          nameTitleObj = economicsParametersAppHeaders.find(
            (o: any) => o.variableTitle === parameter
          );

          if (nameTitleObj) {
            const { variableName } = nameTitleObj;
            //TODO
            //variable found in headers but not in unitOptions collection
            //Gift to remedy
            //just a hack here
            unitOptions = unitOptionsByVariableName[variableName]
              ? unitOptionsByVariableName[variableName]
              : [{ value: "unitless", label: "unitless" }];
          } else {
            unitOptions = [{ value: "unitless", label: "unitless" }];
          }

          const valueOption = unitOptions.filter(
            (opt) => opt.value === unit
          )[0];

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={unitOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
                handleParameterUnitChange(row, option)
              }
              menuPortalTarget={document.body}
              isSelectOptionType={true}
            />
          );
        },
        width: 150,
      },
      {
        key: "remark",
        name: "REMARK*",
        editable: true,
        editor: TextEditor,
        resizable: true,
      },
    ],
    [typeString, unitString, valueString]
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
    fileName: "EconomicsParametersManual",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
  };

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    onRowsChange: setRows,
    tableButtons: tableButtons,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  const parameterDeckisFilledOnFirstColumn = React.useMemo(
    () => rows.map((row) => row["value"] !== "").length === initialRows.length,
    [rows]
  );

  React.useEffect(() => {
    dispatch(updateEconomicsParameterAction(`${wc}.${wp}.tableData`, rows));
  }, [rows]);

  React.useEffect(() => {
    if (Object.entries(parametersDeck).length > 0) {
      setRows(parametersDeck);
    }
  }, [parametersDeck]);

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
        `${wc}.${wp}.appHeaderNameUnitTitlesMap`,
        appHeaderNameUnitTitlesMap
      )
    );
  }, [appUnits]);

  return (
    <div className={classes.rootStoredData}>
      <div className={classes.rootEconomicsParametersManual}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </div>
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
          disableds={[false, !parameterDeckisFilledOnFirstColumn]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {
              const dialogParameters = confirmationDialogParameters(
                "EconomicsParameterManual_Reset_Confirmation",
                "Reset Confirmation",
                "textDialog",
                `Do you want to reset this table?. 
                You will lose all data up to current step.`,
                true,
                false,
                () => {
                  dispatch(workflowResetAction(0, wp, wc));
                  dispatch(resetInputDataAction(reducerDefined));
                },
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
};

export default EconomicsParametersManual;
