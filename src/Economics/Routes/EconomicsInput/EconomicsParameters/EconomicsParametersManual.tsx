import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import faker from "faker";
import uniqBy from "lodash.uniqby";
import React from "react";
import { Column } from "react-data-griddex";
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
import { SelectEditor } from "../../../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsParameterHeaders } from "../../../../TestModel";
import economicsReducer from "./../../../Redux/Reducers/EconomicsReducers";

const useStyles = makeStyles((theme) => ({
  rootEconomicsParametersManual: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "90%",
  },
}));

const EconomicsParametersManual = ({
  wrkflwPrcss,
  wrkflwCtgry,
}: IAllWorkflowProcesses) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = wrkflwCtgry as IAllWorkflowProcesses["wrkflwCtgry"];
  const wp = wrkflwPrcss as IAllWorkflowProcesses["wrkflwPrcss"];

  const { economicsParametersAppHeaders } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const createRawTableData = (
    numberOfRows: number = economicsParametersAppHeaders.length
  ): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        parameter: economicsParametersAppHeaders[i],
        type: faker.random.number(100000),
        value: faker.random.number(100000),
        unit: faker.random.word(),
        remark: faker.random.words(),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };

  const rawTableData = createRawTableData(economicsParametersAppHeaders.length);
  const options = rawTableData.map((row: IRawRow, i: number) => ({
    value: row.unit,
    label: row.unit,
  }));

  const uniqueOptions = uniqBy(options, (v) => v.label);

  const handleParameterTypeChange = (
    value: ValueType<ISelectOption, false>,
    headerName: string
  ) => {
    const selectedValue = value && value.label;
    const selectedAppUnit = selectedValue as string;

    // setAppHeaderChosenAppUnitObj((prev) => ({
    //   ...prev,
    //   [headerName]: selectedAppUnit,
    // }));
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
    { key: "parameter", name: "PARAMETER", editable: false, resizable: true },
    {
      key: "type",
      name: "TYPE",
      editable: false,
      resizable: true,
      formatter: ({ row }) => {
        const data = ["Single", "Multiple", "Equation"];

        return (
          <ApexSelectRS
            data={data}
            handleSelect={(value: ValueType<ISelectOption, false>) =>
              handleParameterTypeChange(value, row.type as string)
            }
            menuPortalTarget={document.body}
          />
        );
      },
    },
    { key: "value", name: "VALUE", editable: false, resizable: true },
    {
      key: "unit",
      name: "Unit",
      editable: true,
      resizable: true,
      editor: (p) => (
        <SelectEditor
          value={p.row.year as string}
          onChange={(value) =>
            p.onRowChange({ ...p.row, country: value }, true)
          }
          options={uniqueOptions}
          rowHeight={p.rowHeight}
          menuPortalTarget={p.editorPortalTarget}
        />
      ),
    },
    { key: "remark", name: "REMARK", editable: true, resizable: true },
  ];

  const [sRow, setSRow] = React.useState(-1);

  return (
    <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
      <div className={classes.rootEconomicsParametersManual}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rawTableData}
              tableButtons={tableButtons}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </ClickAwayListener>
  );
};

export default EconomicsParametersManual;
