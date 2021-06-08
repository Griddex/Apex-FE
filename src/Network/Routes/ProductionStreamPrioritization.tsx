import React from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ApexFlexStyle from "../../Application/Components/Styles/ApexFlexStyle";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import { Typography } from "@material-ui/core";
import ApexCheckbox from "../../Application/Components/Checkboxes/ApexCheckbox";
import { SizeMe } from "react-sizeme";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import startCase from "lodash.startcase";
import omit from "lodash.omit";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { Column } from "react-data-griddex";

const ProductionStreamPrioritization = () => {
  const wc = "existingDataWorkflows";

  const [prioritizationPerspective, setPrioritizationPerspective] =
    React.useState("Production Prioritization");

  const [streamOption, setStreamOption] = React.useState({
    value: "oil",
    label: "Oil",
  });

  const { selectedTableData } = useSelector(
    (state: RootState) =>
      state.networkReducer[wc]["productionPrioritizationExisting"]
  );

  const snSelectedTableData = selectedTableData.map(
    (row: IRawRow, i: number) => {
      const rowFiltered = omit(row, ["id", "_id"]);

      return { sn: i + 1, ...rowFiltered };
    }
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const [rows, setRows] = React.useState(snSelectedTableData);

  const NoPrioritization = () => {
    return (
      <ApexFlexStyle>
        <div style={{ width: 300, height: 300 }}>
          <CancelPresentationOutlinedIcon fontSize="large" />
          <Typography>{`No prioritization will be applied.
       Full facility capacity will be available to all streams`}</Typography>
        </div>
      </ApexFlexStyle>
    );
  };

  const ProductionPrioritization = () => {
    const columnKeys = Object.keys(snSelectedTableData[1]);
    const columns = columnKeys.map((k) => {
      // const name = allHeadersNameTitleUniqueMap[k]?.toUpperCase();

      return {
        key: k,
        // name: name ? name : startCase(k).toUpperCase(),
        name: startCase(k).toUpperCase(),
        editable: false,
        resizable: true,
        minWidth: k.toLowerCase().trim() === "sn" ? 50 : 150,
      };
    });
    return (
      <ApexFlexStyle>
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
      </ApexFlexStyle>
    );
  };

  const StreamPrioritization = () => {
    const streamPrioritizationData = [
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
        value: "gas",
        label: "Gas",
        handleCheck: () => {
          setStreamOption({
            value: "gas",
            label: "Gas",
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
      <ApexFlexStyle>
        <ApexCheckbox
          variableZOption={streamOption}
          apexCheckboxData={streamPrioritizationData}
        />
      </ApexFlexStyle>
    );
  };

  const renderPrioritization = (prioritizationPerspective: string) => {
    switch (prioritizationPerspective) {
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
    <div>
      <AnalyticsComp
        title="Flex Direction"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ToggleButtonGroup
            size="small"
            value={prioritizationPerspective}
            exclusive
            onChange={(_, value) => {
              setPrioritizationPerspective(value);
            }}
          >
            <ToggleButton value="No Prioritization">
              {"No Prioritization"}
            </ToggleButton>
            <ToggleButton value="Production Prioritization">
              {"Production Prioritization"}
            </ToggleButton>
            <ToggleButton value="Stream Prioritization">
              {"Stream Prioritization"}
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <ApexFlexStyle>
        {renderPrioritization(prioritizationPerspective)}
      </ApexFlexStyle>
    </div>
  );
};

export default ProductionStreamPrioritization;
