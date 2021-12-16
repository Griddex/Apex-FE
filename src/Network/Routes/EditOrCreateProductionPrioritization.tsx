import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { Typography, useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import camelCase from "lodash.camelcase";
import capitalize from "lodash.capitalize";
import omit from "lodash.omit";
import startCase from "lodash.startcase";
import React from "react";
import { Column, FormatterProps } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexRadioGroup from "../../Application/Components/Radios/ApexRadioGroup";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import {
  IRawRow,
  ISize,
} from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedTableDataSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedTableData,
  (data) => data
);
const prioritizationPerspectiveSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.prioritizationPerspective,
  (data) => data
);
const selectedStreamPrioritizationSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedStreamPrioritization,
  (data) => data
);

const EditOrCreateProductionPrioritization = () => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreateOrEdit = true;

  const selectedTableData = useSelector(selectedTableDataSelector);
  const prioritizationPerspective = useSelector(
    prioritizationPerspectiveSelector
  );
  const selectedStreamPrioritization = useSelector(
    selectedStreamPrioritizationSelector
  );

  const [prtznPerspective, setPrtznPerspective] = React.useState(
    prioritizationPerspective ? prioritizationPerspective : "No Prioritization"
  );

  const [streamValue, setStreamValue] = React.useState(
    camelCase(selectedStreamPrioritization)
  );

  const snSelectedTableData = selectedTableData.map(
    (row: IRawRow, i: number) => {
      const rowFiltered = omit(row, ["_id"]);

      return { sn: i + 1, ...rowFiltered };
    }
  );

  const [rows, setRows] = React.useState(snSelectedTableData);

  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction(
        "prioritizationPerspective",
        prtznPerspective
      )
    );
  }, [prtznPerspective as string]);

  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction("selectedStreamPrioritization", streamValue)
    );
  }, [streamValue as string]);

  const NoPrioritization = () => {
    return (
      <ApexFlexContainer
        flexDirection="column"
        moreStyles={{
          backgroundColor: theme.palette.grey["200"],
        }}
      >
        <CancelPresentationOutlinedIcon
          fontSize="large"
          htmlColor={theme.palette.secondary.main}
        />
        <strong>{"No prioritization will be applied"}</strong>
        <Typography>
          {`Full facility capacity will be available to all streams`}
        </Typography>
      </ApexFlexContainer>
    );
  };

  const ProductionPrioritization = () => {
    const columnKeys = Object.keys(snSelectedTableData[0]);

    const updateRow = (row: any, option: any) => {
      const currentSN = row.sn as number;
      row.optimizationWeight = option.value as string;
      rows[currentSN - 1] = row;

      dispatch(updateNetworkParameterAction("selectedTableData", rows));
    };

    const streamFormatter = ({ row }: FormatterProps<IRawRow, unknown>) => {
      const optimizationWeight = row.optimizationWeight as string;
      const optimizationOptions = [
        { value: "high", label: "High" },
        { value: "normal", label: "Normal" },
        { value: "low", label: "Low" },
      ];
      const valueOption = {
        value: camelCase(optimizationWeight),
        label: capitalize(optimizationWeight),
      };

      return (
        <ApexSelectRS
          valueOption={valueOption as ISelectOption}
          data={optimizationOptions}
          handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
            updateRow(row, option);
          }}
          menuPortalTarget={dialogRef.current as HTMLDivElement}
          isSelectOptionType={true}
          containerHeight={40}
        />
      );
    };

    const columns = columnKeys.map((k) => {
      const column = {
        key: k,
        name: startCase(k).toUpperCase(),
        editable: false,
        resizable: true,
        formatter:
          k.toLowerCase().trim() === "optimizationweight"
            ? streamFormatter
            : undefined,
        width: k.toLowerCase().trim() === "sn" ? 50 : "auto",
      };

      if (isCreateOrEdit == true) {
        if (column.key != "module") {
          column.editable = true;
        }
      }
      return column;
    });

    const exportColumns = columns
      .filter(
        (column) =>
          !["actions", "select_control_key"].includes(column.key.toLowerCase())
      )
      .map((column) => ({
        value: column.key,
        label: column.name,
      })) as IExcelSheetData<IRawRow>["columns"];

    const exportTableProps = {
      fileName: "productionPrioritization",
      tableData: {
        Template: {
          data: snSelectedTableData,
          columns: exportColumns,
        },
      },
    } as IExcelExportTable<IRawRow>;

    const tableButtons: ITableButtonsProps = {
      showExtraButtons: true,
      extraButtons: () => <ExcelExportTable<IRawRow> {...exportTableProps} />,
    };

    const getApexGridProps = (size: ISize) => ({
      columns: columns as Column<IRawRow>[],
      rows: rows as IRawRow[],
      onRowsChange: setRows,
      tableButtons: tableButtons,
      size: size,
      autoAdjustTableDim: true,
      showTableHeader: true,
      showTablePagination: true,
    });

    return (
      <ApexFlexContainer>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </ApexFlexContainer>
    );
  };

  const StreamPrioritization = () => {
    const streamPrioritizationData = [
      {
        value: "none",
        label: "None",
        handleCheck: () => {
          setStreamValue("none");
        },
      },
      {
        value: "oil",
        label: "Oil",
        handleCheck: () => {
          setStreamValue("oil");
        },
      },
      {
        value: "non-associated gas",
        label: "Non-Associated Gas",
        handleCheck: () => {
          setStreamValue("non-associated gas");
        },
      },
      {
        value: "condensate",
        label: "Condensate",
        handleCheck: () => {
          setStreamValue("condensate");
        },
      },
    ];

    return (
      <ApexFlexContainer
        moreStyles={{
          backgroundColor: theme.palette.grey["200"],
        }}
      >
        <AnalyticsComp
          title={streamValue}
          // title={streamValue.label}
          direction="Vertical"
          containerStyle={{
            // width: "100%",
            // height: "100%",
            marginTop: 20,
          }}
          content={
            <ApexRadioGroup apexRadioGroupData={streamPrioritizationData} />
          }
        />
      </ApexFlexContainer>
    );
  };

  const renderPrioritization = (prtznPerspective: string) => {
    switch (prtznPerspective) {
      case "Production Prioritization":
        return <ProductionPrioritization />;

      case "No Prioritization":
        return <NoPrioritization />;

      case "Stream Prioritization":
        return <StreamPrioritization />;

      default:
        <div>None</div>;
    }
  };

  return (
    <ApexFlexContainer flexDirection="column" ref={dialogRef}>
      <AnalyticsComp
        title="Prioritization Perspective"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ToggleButtonGroup
            size="small"
            value={prtznPerspective}
            exclusive
            onChange={(_, value) => {
              setPrtznPerspective(value);
            }}
          >
            <ToggleButton
              value="No Prioritization"
              style={
                prtznPerspective === "No Prioritization"
                  ? { backgroundColor: theme.palette.primary.light }
                  : {}
              }
            >
              {"No Prioritization"}
            </ToggleButton>
            <ToggleButton
              value="Production Prioritization"
              style={
                prtznPerspective === "Production Prioritization"
                  ? { backgroundColor: theme.palette.primary.light }
                  : {}
              }
            >
              {"Production Prioritization"}
            </ToggleButton>
            <ToggleButton
              value="Stream Prioritization"
              style={
                prtznPerspective === "Stream Prioritization"
                  ? { backgroundColor: theme.palette.primary.light }
                  : {}
              }
            >
              {"Stream Prioritization"}
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <ApexFlexContainer moreStyles={{ marginTop: 20 }}>
        {renderPrioritization(prtznPerspective)}
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default EditOrCreateProductionPrioritization;
