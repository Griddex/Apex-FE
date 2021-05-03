import {
  ClickAwayListener,
  IconButton,
  makeStyles,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import { Column, TextEditor } from "react-data-griddex";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import React from "react";
import {
  IRawRow,
  TRawTable,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IEconomicsParametersTable } from "./IParametersType";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import omit from "lodash.omit";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";
import swapVariableNameTitleForISelectOption from "../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import { TVariableNameTitleData } from "../../../Application/Types/ApplicationTypes";
import AnalyticsText from "../../../Application/Components/Basic/AnalyticsText";

const useStyles = makeStyles((theme) => ({
  economicsParametersTable: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "90%",
    marginTop: 40,
  },
}));

const EconomicsParametersTable = ({
  row,
  additionalColumnsObj,
}: IEconomicsParametersTable) => {
  const classes = useStyles();
  const theme = useTheme();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reducer = "economicsReducer";

  const {
    costsRevenuesAppHeaders,
    economicsParametersAppHeaders,
  } = useSelector((state: RootState) => state[reducer]);
  console.log(
    "Logged output --> ~ file: EconomicsParametersTable.tsx ~ line 55 ~ costsRevenuesAppHeaders",
    costsRevenuesAppHeaders
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <Tooltip
          key={"addRowToolTip"}
          title={"Add Row"}
          placement="bottom-end"
          arrow
        >
          <IconButton
            style={{
              height: "28px",
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
            }}
            onClick={() => {
              const lastSn = rows.length;
              const emptyRow = Object.keys(omit(rows[0], "sn")).reduce(
                (acc, v) => ({ ...acc, [v]: "" }),
                {}
              );
              const newRows = [...rows, { sn: lastSn + 1, ...emptyRow }];

              setRows(newRows);
            }}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          key={"removeRowToolTip"}
          title={"Remove Row"}
          placement="bottom-end"
          arrow
        >
          <IconButton
            style={{
              height: "28px",
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              marginLeft: 5,
            }}
            onClick={() => {
              const lastSn = rows.length;
              const newRows = rows.slice(0, lastSn - 1);

              setRows(newRows);
            }}
          >
            <RemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  };

  const additionalColumnsObjKeys = Object.keys(additionalColumnsObj);

  const createInitialRows = (numberOfRows = 3): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        from: "",
        to: "",
        ...additionalColumnsObjKeys.reduce(
          (acc, k) => ({ ...acc, [k]: "" }),
          {}
        ),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };

  const initialRows = createInitialRows(3);
  const [rows, setRows] = React.useState(initialRows);
  const [sRow, setSRow] = React.useState(-1);

  const additionalColumns = additionalColumnsObjKeys.map((k) => ({
    key: k,
    name: additionalColumnsObj[k],
    editable: true,
    editor: TextEditor,
    resizable: true,
  }));
  const columns: Column<IRawRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true, width: 70 },
    {
      key: "from",
      name: "FROM",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 100,
    },
    {
      key: "to",
      name: "TO",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 100,
    },
    ...additionalColumns,
  ];

  const dataOptions = swapVariableNameTitleForISelectOption(
    costsRevenuesAppHeaders as TVariableNameTitleData
  );
  const valueOption = dataOptions[0];

  const handleBasedOnVariableChange = (
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

  return (
    <CenteredStyle ref={rootRef} flexDirection="column" alignItems="flex-start">
      <CenteredStyle
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={60}
      >
        <AnalyticsText
          title="Current Variable"
          text={row.parameter as string}
          direction="Vertical"
          containerStyle={{ alignItems: "flex-start" }}
          textStyle={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        />
        <AnalyticsComp
          title="Select Base Variable"
          direction="Vertical"
          content={
            <ApexSelectRS
              valueOption={valueOption}
              data={dataOptions}
              handleSelect={(value: ValueType<ISelectOption, false>) =>
                handleBasedOnVariableChange(value, "oilRate")
              }
              menuPortalTarget={rootRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
          containerStyle={{ width: 400 }}
        />
      </CenteredStyle>
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.economicsParametersTable}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
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
    </CenteredStyle>
  );
};

export default EconomicsParametersTable;
