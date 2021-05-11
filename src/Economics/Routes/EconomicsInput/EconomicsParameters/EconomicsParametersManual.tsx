import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import EconomicsParametersValue from "../../../Components/Parameters/EconomicsParametersValue";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { workflowResetAction } from "../../../../Application/Redux/Actions/WorkflowActions";

const useStyles = makeStyles((theme) => ({
  rootEconomicsParametersManual: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "100%",
  },
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
}));

const EconomicsParametersManual = ({
  wrkflwPrcss,
  wrkflwCtgry,
  finalAction,
}: IAllWorkflowProcesses) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const typeData = ["Single", "Table", "Equation"];
  const unitData = ["$m", "bopd", "$", "days", "frac", "$/bbl"];

  const wc = wrkflwCtgry as IAllWorkflowProcesses["wrkflwCtgry"];
  const wp = wrkflwPrcss as IAllWorkflowProcesses["wrkflwPrcss"];

  const { economicsParametersAppHeaders } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const createInitialRows = (
    numberOfRows: number = economicsParametersAppHeaders.length
  ): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        parameter: economicsParametersAppHeaders[i].variableTitle,
        type: "Single",
        value: "",
        unit: unitData[0],
        remark: "",
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };

  const initialRows = createInitialRows(economicsParametersAppHeaders.length);
  const [rows, setRows] = React.useState(initialRows);

  const handleParameterTypeChange = (
    row: IRawRow,
    value: ValueType<ISelectOption, false>
  ) => {
    const selectedValue = value && value.label;
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
  };

  const columns: Column<IRawRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true, width: 70 },
    {
      key: "actions",
      name: "ACTIONS",
      editable: false,
      formatter: ({ row }) => (
        <div>
          <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
          <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
          <LaunchOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
        </div>
      ),
      width: 100,
    },
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
        const valueOption = generateSelectOptions([type])[0];

        return (
          <ApexSelectRS
            valueOption={valueOption}
            data={typeData}
            handleSelect={(value: ValueType<ISelectOption, false>) =>
              handleParameterTypeChange(row, value)
            }
            menuPortalTarget={document.body}
            isSelectOptionType={false}
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
        else return null;
      },
      width: 150,
    },
    {
      key: "unit",
      name: "UNIT",
      editable: true,
      resizable: true,
      formatter: ({ row }) => {
        const unit = row.unit as string;
        const valueOption = generateSelectOptions([unit])[0];

        return (
          <ApexSelectRS
            valueOption={valueOption}
            data={unitData}
            handleSelect={(value: ValueType<ISelectOption, false>) =>
              handleParameterUnitChange(row, value)
            }
            menuPortalTarget={document.body}
            isSelectOptionType={false}
          />
        );
      },
      width: 150,
    },
    { key: "remark", name: "REMARK", editable: true, resizable: true },
  ];

  const [sRow, setSRow] = React.useState(-1);

  return (
    <div className={classes.rootExistingData}>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.rootEconomicsParametersManual}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                tableButtons={tableButtons}
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
                "EconomicsParameterManual_Reset_Confirmation",
                "Reset Confirmation",
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
