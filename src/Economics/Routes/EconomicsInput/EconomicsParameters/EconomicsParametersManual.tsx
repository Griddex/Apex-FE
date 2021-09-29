import { ClickAwayListener, makeStyles } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
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
import EconomicsParametersValue from "../../../Components/Parameters/EconomicsParametersValue";

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
    (state: RootState) =>
      state.economicsReducer["economicsParametersAppHeaders"],
    (prev, next) => isEqual(prev, next)
  );

  const unitOptionsByVariableName = useSelector(
    (state: RootState) =>
      state.unitSettingsReducer["unitOptionsByVariableName"],
    (prev, next) => isEqual(prev, next)
  );

  const variableUnits = useSelector(
    (state: RootState) => state.unitSettingsReducer["variableUnits"],
    (prev, next) => isEqual(prev, next)
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
    option: ValueType<ISelectOption, false>
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
    value: ValueType<ISelectOption, false>
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
              handleSelect={(option: ValueType<ISelectOption, false>) =>
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
              handleSelect={(value: ValueType<ISelectOption, false>) =>
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
              <ApexGrid<IRawRow, ITableButtonsProps>
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
