import { Typography, useTheme } from "@material-ui/core";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import camelCase from "lodash.camelcase";
import capitalize from "lodash.capitalize";
import omit from "lodash.omit";
import startCase from "lodash.startcase";
import React from "react";
import { Column, FormatterProps } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ApexCheckboxGroup from "../../Application/Components/Checkboxes/ApexCheckboxGroup";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";

const EditOrCreateProductionPrioritization = () => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreateOrEdit = true;
  const {
    selectedTableData,
    prioritizationPerspective,
    selectedStreamPrioritization,
  } = useSelector((state: RootState) => state.networkReducer);

  const [prtznPerspective, setPrtznPerspective] = React.useState(
    prioritizationPerspective ? prioritizationPerspective : "No Prioritization"
  );

  const [streamOption, setStreamOption] = React.useState({
    value: camelCase(selectedStreamPrioritization),
    label: capitalize(selectedStreamPrioritization),
  });

  const snSelectedTableData = selectedTableData.map(
    (row: IRawRow, i: number) => {
      const rowFiltered = omit(row, ["_id"]);

      return { sn: i + 1, ...rowFiltered };
    }
  );

  const [rows, setRows] = React.useState(snSelectedTableData);

  /*  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction(
        "selectedTableData",
        rows
      )
    );

}, [rows.length]); */

  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction(
        "prioritizationPerspective",
        prtznPerspective
      )
    );
  }, [prtznPerspective as any]);

  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction(
        "selectedStreamPrioritization",
        streamOption.value
      )
    );
  }, [streamOption.value as any]);

  const NoPrioritization = () => {
    return (
      <ApexFlexContainer>
        <ApexFlexContainer
          flexDirection="column"
          moreStyles={{
            width: 500,
            height: 300,
            backgroundColor: theme.palette.grey["200"],
          }}
        >
          <CancelPresentationOutlinedIcon fontSize="large" />
          <strong>{"No prioritization will be applied"}</strong>
          <Typography>
            {`Full facility capacity will be available to all streams`}
          </Typography>
        </ApexFlexContainer>
      </ApexFlexContainer>
    );
  };

  const ProductionPrioritization = () => {
    const columnKeys = Object.keys(snSelectedTableData[0]);

    const updateRow = (row: any, option: any) => {
      const currentSN = row.sn as number;
      row.optimizationWeight = option.value as string;
      rows[currentSN - 1] = row;
      console.log("rows: ", rows);
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
          handleSelect={(option: ValueType<ISelectOption, false>) => {
            console.log(option);
            console.log("row: ", row);
            updateRow(row, option);
          }}
          menuPortalTarget={dialogRef.current as HTMLDivElement}
          isSelectOptionType={true}
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

    return (
      <ApexFlexContainer ref={dialogRef}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns as Column<IRawRow>[]}
              rows={rows as IRawRow[]}
              onRowsChange={setRows}
              tableButtons={tableButtons}
              size={size}
              autoAdjustTableDim={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
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
          setStreamOption({
            value: "none",
            label: "None",
          });
        },
      },
      {
        value: "oil",
        label: "Oil",
        handleCheck: () => {
          setStreamOption({
            value: "oil",
            label: "Oil",
          });
        },
      },
      {
        value: "non-associated gas",
        label: "Non-Associated Gas",
        handleCheck: () => {
          setStreamOption({
            value: "non-associated gas",
            label: "Non-Associated Gas",
          });
        },
      },
      {
        value: "condensate",
        label: "Condensate",
        handleCheck: () => {
          setStreamOption({
            value: "condensate",
            label: "Condensate",
          });
        },
      },
    ];

    return (
      <ApexFlexContainer>
        <ApexCheckboxGroup
          variableZOption={streamOption}
          apexCheckboxDataGroup={streamPrioritizationData}
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
    <ApexFlexContainer flexDirection="column">
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
