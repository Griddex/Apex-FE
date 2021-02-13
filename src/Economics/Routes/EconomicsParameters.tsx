import { Container, makeStyles, useTheme } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import faker from "faker";
import uniqBy from "lodash/uniqBy";
import React, { ChangeEvent } from "react";
import ReactDataGrid, { Column, SelectColumn } from "react-data-griddex";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import xlsx from "xlsx";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  IRawTable,
} from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { SelectEditor } from "../../Application/Components/Table/ReactDataGrid/SelectEditor";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ToTitleCase from "../../Application/Utils/ToTitleCase";
import {
  persistFileAction,
  persistWorksheetAction,
  persistWorksheetNamesAction,
} from "../../Import/Redux/Actions/ImportActions";
import { IEvent } from "./EconomicsParametersTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "flex-start",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
    "& > *": { marginBottom: 40 },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  economicParameter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 5,
    width: "100%",
  },
  parameterName: { width: "20%" },
  parameterIcon: { width: "5%" },
  parameterValue: { width: "15%" },
  parameterUnit: { width: "15%", marginLeft: 5 },
  parameterRemark: { width: "45%", marginLeft: 5 },
  parameterTable: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  selectFile: { width: 200, height: 50, fontWeight: "bold" },
  dndSection: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
  },
  dndInput: {
    height: "80%",
    width: "100%",
  },
  dndArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #707070",
    backgroundColor: "#F7F7F7",
    borderRadius: 2,
    height: "100%",
    width: "100%",
  },
  imageDnD: {
    width: 95,
    height: 80,
    color: theme.palette.primary.main,
  },
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
  },
  maxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

const EconomicsParameters = ({
  wrkflwPrcss,
  wrkflwCtgry,
}: IAllWorkflowProcesses) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = wrkflwCtgry as IAllWorkflowProcesses["wrkflwCtgry"];
  const wp = wrkflwPrcss as IAllWorkflowProcesses["wrkflwPrcss"];

  const { dnDDisabled } = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );
  const [economicsDataSource, setEconomicsDataSource] = React.useState(
    "template"
  );
  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  const SelectDevelopmentScenario = () => {
    const classes = useStyles();

    const developmentScenarios = [
      "Oil Development",
      "NAG Development",
      "Oil + NAG Development",
    ];
    const [scenario, setScenario] = React.useState(developmentScenarios[0]);

    const handleDevelopmentScenarioChange = (
      event: ChangeEvent<IEvent<unknown>>
    ) => {
      if (typeof event.target.value === "string")
        setScenario(event.target.value);
    };

    return (
      <Select
        className={classes.formControl}
        value={scenario}
        onChange={handleDevelopmentScenarioChange}
        label="Development Scenario"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {developmentScenarios.map((scenario, i) => (
          <MenuItem key={i} value={scenario}>
            {scenario}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const EconomicsDataSource = () => {
    const handleEconomicsDataSourceChange = (
      event: ChangeEvent<IEvent<string>>
    ) => {
      setEconomicsDataSource(event.target.value);
    };

    return (
      <RadioGroup
        value={economicsDataSource}
        onChange={handleEconomicsDataSourceChange}
        style={{ flexDirection: "row" }}
      >
        <FormControlLabel
          value="template"
          control={<Radio />}
          label="Template"
        />
        <FormControlLabel value="import" control={<Radio />} label="Import" />
        <FormControlLabel value="manual" control={<Radio />} label="Manual" />
      </RadioGroup>
    );
  };

  const moreEconomicParametersDetails = () => {
    //Supposed to be object from server
    //use row uuid to fetch specific economic parameters obj
    const ecoparameters = [
      "Reference Year for Discounting",
      "First Oil Date",
      "Oil price",
      "Gas price",
      "LPG Price",
      "Lean Gas/WH Gas Ratio",
      "LPG Prod/WH Gas Prod Ratio",
      "Farm-in Signature Bonus",
      "G&A Cost (Pre-Prod) ",
      "G&A Cost (Post-Prod) ",
      "Var Oil Opex (CHA)",
      "Var Oil Opex (Terminaling Fee)",
      "Gas Var Opex",
      "Operation Days/annum",
      "Self Utilized Gas Volume",
      "Inflation Rate",
      "Recoverable Reserves",
      "Abandonment Cost",
      "Abandonment Cost per bbl",
      "Production Terrain",
      "Gas Development Concept",
    ];

    const createRawTableData = (
      numberOfRows: number = ecoparameters.length
    ): IRawTable => {
      const fakeRows = [];
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: ecoparameters[i],
          value: faker.random.number(100000),
          unit: faker.random.word(),
          remark: faker.random.words(),
        };

        fakeRows.push(fakeRow);
      }
      return fakeRows;
    };

    const rows = createRawTableData(ecoparameters.length);
    const options = rows.map((row: IRawRow, i: number) => ({
      value: row.unit,
      label: row.unit,
    }));

    const uniqueOptions = uniqBy(options, (v) => v.label);

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "parameter",
        name: "Parameter",
        editable: false,
        resizable: true,
      },
      {
        key: "actions",
        name: "Actions",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <LaunchOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
      },
      { key: "value", name: "Value", editable: false, resizable: true },
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
      { key: "remark", name: "Remark", editable: true, resizable: true },
    ];

    const dialogParameters: DialogStuff = {
      name: "Economic_Parameter_Details_Dialog",
      title: "Economic Parameter Details",
      type: "economicsParametersDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "select",
      dialogText: "",
      dialogData: { columns, rows },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const EconomicsDataTemplate = () => {
    function rowKeyGetter(row: IRawRow) {
      return row.sn as number;
    }

    const createRawTableData = (numberOfRows: number): IRawTable => {
      const fakeRows = [];
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          title: faker.random.word(),
          createdOn: faker.date
            .between(new Date(2010, 1, 20), new Date(2015, 1, 20))
            .toString(),
          modifiedOn: faker.date
            .between(new Date(2016, 1, 20), new Date(2020, 1, 20))
            .toString(),
        };

        fakeRows.push(fakeRow);
      }
      return fakeRows;
    };

    const columns: Column<IRawRow>[] = [
      SelectColumn,
      { key: "sn", name: "SN", width: 20, editable: false, resizable: true },
      {
        key: "actions",
        name: "Actions",
        width: 20,
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row.sn}`)} />
            <DeleteOutlinedIcon
              onClick={() => alert(`Delete Row is:${row.sn}`)}
            />
            <MoreHorizIcon
              onClick={() => {
                moreEconomicParametersDetails();
              }}
            />
          </div>
        ),
      },
      {
        key: "title",
        name: "Title",
        editable: false,
        resizable: true,
      },
      {
        key: "createdOn",
        name: "Created",
        editable: false,
        resizable: true,
      },
      {
        key: "modifiedOn",
        name: "Modified",
        editable: false,
        resizable: true,
      },
    ];

    const rows = createRawTableData(20);

    return (
      <>
        <ReactDataGrid
          style={{ width: "100%", height: "100%" }}
          columns={columns}
          rows={rows}
          rowKeyGetter={rowKeyGetter}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
        {/* <Button
          className={classes.secondaryButton}
          startIcon={<SaveTwoToneIcon />}
          onClick={() => console.log("Saving...")}
        >
          Save
        </Button> */}
      </>
    );
  };

  const EconomicsDataImport = () => {
    return (
      <Container style={{ height: "100%" }} maxWidth="md" fixed disableGutters>
        <Dropzone
          accept="text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onDropAccepted={(acceptedFile) => {
            const file = acceptedFile[0];

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
              const fileData = new Uint8Array(reader.result as ArrayBuffer);
              const inputWorkbook = xlsx.read(fileData, { type: "array" });

              dispatch(persistFileAction(inputWorkbook, wp));

              const workSheetNames = inputWorkbook.SheetNames;
              dispatch(persistWorksheetNamesAction(workSheetNames, wp));

              if (workSheetNames.length > 1) {
                const dialogParameters: DialogStuff = {
                  name: "Excel_Worksheet_Selection_Dialog",
                  title: "Excel Worksheet Selection",
                  type: "economicsParameterImportWorkflowDialog",
                  show: true,
                  exclusive: true,
                  maxWidth: "md",
                  iconType: "select",
                  dialogText: "singleSheetFile",
                  contentList: workSheetNames,
                  workflowProcess: wp,
                };
                dispatch(showDialogAction(dialogParameters));
              } else {
                const selectedWorksheetName =
                  workSheetNames && workSheetNames[0];
                const selectedWorksheetDataXLSX =
                  inputWorkbook.Sheets[selectedWorksheetName];
                const selectedWorksheetData = xlsx.utils.sheet_to_json<
                  Record<string, React.Key>
                >(selectedWorksheetDataXLSX);

                dispatch(
                  persistWorksheetAction(
                    selectedWorksheetName,
                    selectedWorksheetData,
                    wp
                  )
                );

                const dialogParameters: DialogStuff = {
                  name: "Excel_Worksheet_Selection_Dialog",
                  title: "Excel Worksheet Selection",
                  type: "economicsParameterImportWorkflowDialog",
                  show: true,
                  exclusive: true,
                  maxWidth: "md",
                  iconType: "select",
                  dialogText: "multiSheetFile",
                  contentList: workSheetNames,
                  workflowProcess: wp,
                };
                dispatch(showDialogAction(dialogParameters));
              }
            };
            reader.onprogress = () => {
              // console.log("Logged output -->: UploadFile -> e", e);
            };
          }}
          disabled={dnDDisabled}
          minSize={0}
          maxSize={10485760}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => {
            //TODO: if file is not accepted etc, dispatch dialog
            return (
              <section className={classes.dndSection}>
                <div {...getRootProps()} className={classes.dndInput}>
                  <input {...getInputProps()} />
                  <div className={classes.dndArea}>
                    <CloudUploadIcon className={classes.imageDnD} />
                    <p>Drag and Drop a file here or Browse a file to upload</p>
                  </div>
                </div>
                {/* <Button
                className={classes.selectFile}
                variant="contained"
                {...getRootProps()}
              >
                Select File
              </Button> */}
              </section>
            );
          }}
        </Dropzone>
      </Container>
    );
  };

  const EconomicsDataManual = () => {
    const classes = useStyles();
    const tableButtons: ITableButtonsProps = {
      showExtraButtons: false,
      extraButtons: () => <div></div>,
    };

    const ecoparameters = [
      "Reference Year for Discounting",
      "First Oil Date",
      "Oil price",
      "Gas price",
      "LPG Price",
      "Lean Gas/WH Gas Ratio",
      "LPG Prod/WH Gas Prod Ratio",
      "Farm-in Signature Bonus",
      "G&A Cost (Pre-Prod) ",
      "G&A Cost (Post-Prod) ",
      "Var Oil Opex (CHA)",
      "Var Oil Opex (Terminaling Fee)",
      "Gas Var Opex",
      "Operation Days/annum",
      "Self Utilized Gas Volume",
      "Inflation Rate",
      "Recoverable Reserves",
      "Abandonment Cost",
      "Abandonment Cost per bbl",
      "Production Terrain",
      "Gas Development Concept",
    ];

    const createRawTableData = (
      numberOfRows: number = ecoparameters.length
    ): IRawTable => {
      const fakeRows = [];
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: ecoparameters[i],
          value: faker.random.number(100000),
          unit: faker.random.word(),
          remark: faker.random.words(),
        };

        fakeRows.push(fakeRow);
      }
      return fakeRows;
    };

    const rawTableData = createRawTableData(ecoparameters.length);
    const options = rawTableData.map((row: IRawRow, i: number) => ({
      value: row.unit,
      label: row.unit,
    }));

    const uniqueOptions = uniqBy(options, (v) => v.label);

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true },
      {
        key: "actions",
        name: "Actions",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <LaunchOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
      },
      { key: "parameter", name: "Parameter", editable: false, resizable: true },
      { key: "value", name: "Value", editable: false, resizable: true },
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
      { key: "remark", name: "Remark", editable: true, resizable: true },
    ];

    return (
      <div className={classes.maxContainer}>
        <ApexGrid<IRawRow, ITableButtonsProps>
          columns={columns}
          rows={rawTableData}
          tableButtons={tableButtons}
        />
      </div>
    );
  };

  const renderEconomicsDataSource = (selectedOption: string) => {
    switch (selectedOption) {
      case "template":
        return <EconomicsDataTemplate />;
      case "import":
        return <EconomicsDataImport />;
      case "manual":
        return <EconomicsDataManual />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <AnalyticsComp
        title="Development Scenario"
        content={<SelectDevelopmentScenario />}
        direction="Horizontal"
      />
      <AnalyticsComp
        title="Economics Data Source"
        content={<EconomicsDataSource />}
        direction="Vertical"
      />
      <AnalyticsTitle
        title={`Economic Parameters and Assumptions [${ToTitleCase(
          economicsDataSource
        )}]`}
      />
      {renderEconomicsDataSource(economicsDataSource)}
    </Container>
  );
};

export default EconomicsParameters;
