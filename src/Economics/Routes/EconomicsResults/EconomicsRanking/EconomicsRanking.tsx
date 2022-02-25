import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getApexIconButtonStyle } from "../../../../Application/Styles/IconButtonStyles";
import theme from "../../../../Application/Theme/Theme";
import { economicsAnalysisNamesAbbrMap } from "../../../Data/EconomicsData";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  resetPlotChartsWorkflowsAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import { TEconomicsAnalysesNames } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  chartBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chartPanel: {
    display: "flex",
    alignSelf: "flex-start",
    height: "100%",
    width: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: "calc(100% - 300px)",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
    overflow: "auto",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer["storedDataWorkflows"]["economicsResultsStored"],
  (data) => data
);

const selectedEconomicsResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsResultsTitle,
  (data) => data
);

const selectedEconomicsResultsDescriptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.selectedEconomicsResultsDescription,
  (data) => data
);

const economicsRankingCollectionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.economicsRanking,
  (data) => data
);

const selectedAnalysisNamesSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisNames,
  (data) => data
);

const EconomicsRanking = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const selectedAnalysisNames = useSelector(selectedAnalysisNamesSelector);
  const economicsRankingCollection = useSelector(
    economicsRankingCollectionSelector
  );

  const economicsResultsStored = useSelector(economicsResultsStoredSelector);
  const selectedEconomicsResultsTitle = useSelector(
    selectedEconomicsResultsTitleSelector
  );
  const selectedEconomicsResultsDescription = useSelector(
    selectedEconomicsResultsDescriptionSelector
  );

  const economicsResultsTitleOptions = economicsResultsStored.map(
    (row: any) => ({
      value: row.title,
      label: row.title,
      id: row.id,
      title: row.title,
      description: row.description,
    })
  ) as IExtendedSelectOption[];

  economicsResultsTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
    title: "Select...",
    description: "Select...",
  });

  const selectedEconomicsResultsTitleOption =
    selectedEconomicsResultsTitle !== ""
      ? {
          value: selectedEconomicsResultsTitle,
          label: selectedEconomicsResultsTitle,
          id: (economicsResultsTitleOptions as IExtendedSelectOption[]).filter(
            (o) => o.label === selectedEconomicsResultsTitle
          )[0].id,
          title: selectedEconomicsResultsTitle,
          description: selectedEconomicsResultsDescription,
        }
      : economicsResultsTitleOptions[0];

  const [economicsResultOption, setEconomicsResultOption] =
    React.useState<IExtendedSelectOption>(
      selectedEconomicsResultsTitleOption as IExtendedSelectOption
    );

  const handleSelectEconomicsResultsChange = (
    option: OnChangeValue<IExtendedSelectOption, false>
  ) => {
    const optionDefined = option as IExtendedSelectOption;
    setEconomicsResultOption(optionDefined);

    const { id, title, description } = optionDefined;

    if (title === "Select...") {
      dispatch(
        updateEconomicsParametersAction({
          selectedEconomicsResultsId: "",
          selectedEconomicsResultsTitle: "",
          selectedEconomicsResultsDescription: "",
          isEconomicsResultsSaved: false,
        })
      );
    } else {
      const idTitleDescIsSaved = {
        selectedEconomicsResultsId: id,
        selectedEconomicsResultsTitle: title,
        selectedEconomicsResultsDescription: description,
        isEconomicsResultsSaved: true,
      };

      dispatch(
        fetchEconomicsTreeviewKeysRequestAction(
          true,
          "plotChartsTree",
          idTitleDescIsSaved
        )
      );
    }

    dispatch(resetPlotChartsWorkflowsAction());
  };

  const ResultsSelect = () => {
    return (
      <ApexSelectRS<IExtendedSelectOption>
        valueOption={economicsResultOption}
        data={economicsResultsTitleOptions}
        handleSelect={handleSelectEconomicsResultsChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerWidth={300}
        containerHeight={40}
      />
    );
  };

  const [rows, setRows] = React.useState<IRawRow[]>(economicsRankingCollection);

  let tData = [];
  tData =
    economicsRankingCollection?.length > 0 && economicsRankingCollection[0]
      ? economicsRankingCollection[0]
      : {};

  const selectedAnalysisNamesAbbr = (
    selectedAnalysisNames as TEconomicsAnalysesNames[]
  ).map((name) => economicsAnalysisNamesAbbrMap[name]);

  const columnKeys = Object.keys(tData);
  const otherColumnKeys = columnKeys.filter(
    (k) => !Object.values(economicsAnalysisNamesAbbrMap).includes(k)
  );

  const selectedColumnKeys = columnKeys.filter((k) =>
    selectedAnalysisNamesAbbr.includes(k)
  );

  //TODO Hack just to ensure we have analysis when we fetch treeview
  const finalColumnKeys =
    selectedColumnKeys.length === 0 ? ["payout", "npv"] : selectedColumnKeys;
  const finalColumns = [...otherColumnKeys, ...finalColumnKeys];

  const columns = finalColumns.map((k, i) => {
    return {
      key: k,
      name: k.toUpperCase(),
      editable: false,
      resizable: true,
      minWidth: k.toLowerCase().trim() !== "sn" ? 150 : 50,
      ...(i === finalColumns.length - 1
        ? { width: "" }
        : { width: k.toLowerCase().trim() === "sn" ? 50 : 200 }),
    };
  });
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
    fileName: "EconomicsRanking",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IRawRow>;
  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
        <ExcelExportTable<IRawRow> {...exportTableProps} />
      </div>
    ),
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

  React.useEffect(() => {
    setRows(economicsRankingCollection);
  }, [selectedEconomicsResultsTitle]);

  return (
    <div className={classes.root}>
      <WorkflowBanner
        activeStep={0}
        steps={["Economics Ranking"]}
        subModuleName="Project Based"
        showChip={false}
      />
      <AnalyticsComp
        title={"Economics Results"}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ResultsSelect />
            <OpenInNewOutlinedIcon style={getApexIconButtonStyle(theme)} />
          </div>
        }
        direction="Vertical"
        containerStyle={{
          width: "100%",
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 15,
        }}
      />

      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </div>
    </div>
  );
};

export default EconomicsRanking;
