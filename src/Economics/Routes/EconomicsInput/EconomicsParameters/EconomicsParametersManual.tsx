import { ClickAwayListener } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import {
  IAllWorkflows,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";

const EconomicsParametersValue = React.lazy(
  () => import("../../../Components/Parameters/EconomicsParametersValue")
);

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

const variableUnitsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer["variableUnits"],
  (units) => units
);
const unitOptionsByVariableNameSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer["unitOptionsByVariableName"],
  (data) => data
);

const unitSettingsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer,
  (reducer) => reducer
);

const EconomicsParametersManual = ({
  wrkflwPrcss,
  wrkflwCtgry,
  finalAction,
}: IAllWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const typeOptions = [
    { value: "Single", label: "Single" },
    { value: "Table", label: "Table" },
    { value: "Equation", label: "Equation" },
  ];

  const wc = wrkflwCtgry as TAllWorkflowCategories;
  const wp = wrkflwPrcss as TAllWorkflowProcesses;

  const economicsParametersAppHeaders = useSelector(
    economicsParametersAppHeadersSelector
  );

  const variableUnits = useSelector(variableUnitsSelector);

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
        type: "Single",
        value: "",
        unit: unitOptions ? unitOptions[0].label : "unitless",
        remark: "",
      };

      initialRows.push(initialRow);
    }
    return initialRows;
  };

  const initialRows = createInitialRows(economicsParametersAppHeaders.length);
  const [rows, setRows] = React.useState(initialRows);
  console.log(
    "Logged output --> ~ file: EconomicsParametersManual.tsx ~ line 95 ~ rows",
    rows
  );

  const handleParameterTypeChange = (
    row: IRawRow,
    option: OnChangeValue<ISelectOption, false>
  ) => {
    const selectedValue = option && option.value;
    const selectedType = selectedValue as string;

    const selectedRowSN = row.sn as number;
    const selectedRow = rows[selectedRowSN - 1];

    rows[selectedRowSN - 1] = {
      ...selectedRow,
      type: selectedType,
    };

    setRows(rows);
  };

  const handleParameterUnitChange = (
    row: IRawRow,
    value: OnChangeValue<ISelectOption, false>
  ) => {
    const selectedValue = value && value.label;
    const selectedAppUnit = selectedValue as string;

    const selectedRowSN = row.sn as number;
    const selectedRow = rows[selectedRowSN - 1];

    rows[selectedRowSN - 1] = {
      ...selectedRow,
      unit: selectedAppUnit,
    };

    setRows(rows);
  };

  const columns = React.useMemo(() => {
    return [
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
        name: "TYPE",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const type = row.type as string;
          const valueOption = typeOptions.filter(
            (opt) => opt.value === type
          )[0];

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
        name: "VALUE",
        editable: true,
        editor: TextEditor,
        resizable: true,
        formatter: ({ row }) => {
          const value = row.value as string;
          const type = row.type as string;

          if (type === "Table")
            return (
              <EconomicsParametersValue
                valueTitle="Table"
                row={row}
                additionalColumnsObj={{ value: "VALUE" }}
              />
            );
          else if (type === "Equation")
            return (
              <EconomicsParametersValue
                valueTitle="Equation"
                row={row}
                additionalColumnsObj={{ value: "VALUE" }}
              />
            );
          else return <ApexFlexContainer>{value}</ApexFlexContainer>;
        },
        width: 150,
      },
      {
        key: "unit",
        name: "UNIT",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const unit = row.unit as string;
          const parameter = row.parameter as string;
          console.log(
            "Logged output --> ~ file: EconomicsParametersManual.tsx ~ line 226 ~ generateColumns ~ parameter",
            parameter
          );

          let name: string;
          const nameTitleObj = variableUnits.find(
            (o: any) => o.variableTitle === parameter
          );

          if (nameTitleObj) name = nameTitleObj.variableName;
          else name = "unitless";

          const options = unitOptionsByVariableName[name];
          const unitOptions = options
            ? options
            : [{ value: "unitless", label: "unitless" }];

          const valueOption = typeOptions.filter(
            (opt) => opt.value === unit
          )[0];

          return (
            <ApexSelectRS
              valueOption={valueOption}
              data={unitOptions}
              handleSelect={(value: OnChangeValue<ISelectOption, false>) =>
                handleParameterUnitChange(row, value)
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
        name: "REMARK",
        editable: true,
        editor: TextEditor,
        resizable: true,
      },
    ] as Column<IRawRow>[];
  }, []);

  const [sRow, setSRow] = React.useState(-1);

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

  return (
    <div className={classes.rootStoredData}>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.rootEconomicsParametersManual}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
                tableButtons={tableButtons}
                size={size}
                autoAdjustTableDim={true}
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
                "EconomicsParameterManual_Reset_Confirmation",
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
};

export default EconomicsParametersManual;
