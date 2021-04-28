import { ClickAwayListener, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import faker from "faker";
import uniqBy from "lodash.uniqby";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { SizeMe } from "react-sizeme";
import MainTitle from "../../Application/Components/Basic/MainTitle";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { SelectEditor } from "../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";

const useStyles = makeStyles(() => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function EconomicsAssumptions() {
  const classes = useStyles();
  const dispatch = useDispatch();

  type IRawRow = Record<string, React.Key>;
  type TRawTable = IRawRow[];

  const createTableRows = (numberOfRows: number): TRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        year: faker.random.number({ min: 2000, max: 2020 }),
        oilRate: faker.random.number({ min: 600, max: 10000 }),
        gasRate: faker.random.number({ min: 30, max: 160 }),
        seismicCost: faker.random.number({ min: 10, max: 15 }),
        explApprCost: faker.random.number({ min: 5, max: 10 }),
        facilitiesCost: faker.random.number({ min: 50, max: 250 }),
        tangWellCost: faker.random.number({ min: 20, max: 80 }),
        intangWellCost: faker.random.number({ min: 10, max: 50 }),
        abandCost: faker.random.number({ min: 10, max: 50 }),
        directCost: faker.random.number({ min: 5, max: 20 }),
        cha: faker.random.number({ min: 5, max: 50 }),
        terminalCost: faker.random.number({ min: 10, max: 20 }),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  };
  const tableRows = createTableRows(100);
  const currentRows = tableRows;
  const [sRow, setSRow] = React.useState(-1);

  React.useEffect(() => {
    // dispatch(persistTableDataAction(noAddedColumnTableData,workflowProcess));
    // dispatch(persistTableHeadersAction(rawTableHeaders,workflowProcess));
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    // dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const options = createTableRows(100).map((row: IRawRow) => ({
    value: row.year,
    label: row.year,
  }));

  const uniqueOptions = uniqBy(options, (v) => v.label);
  const columns: Column<IRawRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true },
    {
      key: "actions",
      name: "ACTIONS",
      editable: false,
      formatter: ({ row }) => (
        <div>
          <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
          <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
          <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
        </div>
      ),
    },
    {
      key: "year",
      name: "Year",
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
      // editor: (p) => (
      //   <Select
      //     className="basic-single"
      //     classNamePrefix="select"
      //     options={options}
      //     defaultValue={{ value: "value_12345", label: p.row.year }}
      //     isDisabled={false}
      //     isLoading={false}
      //     isClearable={true}
      //     isRtl={false}
      //     isSearchable={true}
      //     name="year"
      //     isMulti
      //   ></Select>
      // ),
      // editor: (p) => (
      //   <SelectEditor
      //     value={p.row.country}
      //     onChange={(value) =>
      //       p.onRowChange({ ...p.row, country: value }, true)
      //     }
      //     options={countries.map((c) => ({ value: c, label: c }))}
      //     rowHeight={p.rowHeight}
      //     menuPortalTarget={p.editorPortalTarget}
      //   />
      // ),
    },
    { key: "oilRate", name: "Oil Rate", editable: true, resizable: true },
    { key: "gasRate", name: "Gas Rate", editable: true, resizable: true },
    {
      key: "seismicCost",
      name: "Seismic Cost",
      editable: true,
      resizable: true,
    },
    {
      key: "explApprCost",
      name: "Exploration/Appraisal Cost",
      editable: true,
      resizable: true,
    },
    {
      key: "facilitiesCost",
      name: "Facilities Cost",
      editable: true,
      resizable: true,
    },
    {
      key: "tangWellCost",
      name: "Tangible WellCost",
      editable: true,
      resizable: true,
    },
    {
      key: "intangWellCost",
      name: "Intangible WellCost",
      editable: true,
      resizable: true,
    },
    {
      key: "abandCost",
      name: "Abandonment Cost",
      editable: true,
      resizable: true,
    },
    { key: "directCost", name: "Direct Cost", editable: true, resizable: true },
    { key: "cha", name: "CHA", editable: true, resizable: true },
    {
      key: "terminalCost",
      name: "Terminal Cost",
      editable: true,
      resizable: true,
    },
  ];

  return (
    <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
      <div className={classes.rootParseTable}>
        <MainTitle title="Economics Assumptions" />
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={tableRows}
              tableButtons={tableButtons}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </ClickAwayListener>
  );
}
