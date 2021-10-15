import { useTheme } from "@mui/material";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsText from "../../../../Application/Components/Basic/AnalyticsText";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  ISensitivitiesRow,
  TEconomicsAnalysesNames,
  TSensitivitiesTable,
} from "../EconomicsAnalysesTypes";

//ISensitivitiesRow
const ApexGrid = React.lazy(
  () =>
    import("../../../../Application/Components/Table/ReactDataGrid/ApexGrid")
);

export interface IEconomicsSensitivitiesTable {
  sensitivitiesTable: TSensitivitiesTable;
  analysisName: TEconomicsAnalysesNames;
}

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsAnalysisWorkflowsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer["economicsAnalysisWorkflows"],
  (wc) => wc
);

const EconomicsSensitivitiesTable = ({
  sensitivitiesTable,
}: IEconomicsSensitivitiesTable) => {
  const theme = useTheme();

  const economicsAnalysisWorkflows = useSelector(
    economicsAnalysisWorkflowsSelector
  );

  const { sensitivitiesTableTitle } = economicsAnalysisWorkflows;

  const columns: Column<ISensitivitiesRow>[] = [
    {
      key: "sn",
      name: "SN",
      resizable: true,
      width: 70,
    },
    {
      key: "parameter",
      name: "PARAMETER",
      resizable: true,
      width: 100,
    },
    {
      key: "parameterTitle",
      name: "PARAMETER TITLE",
      resizable: true,
      width: 220,
    },
    {
      key: "parameterValues",
      name: "PARAMETER VALUES",
      resizable: true,
    },
  ];

  const [rows, setRows] = React.useState(sensitivitiesTable);

  React.useEffect(() => {
    setRows(sensitivitiesTable);
  }, [sensitivitiesTableTitle]);

  return (
    <ApexFlexContainer
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="flex-start"
      height={"100%"}
    >
      <AnalyticsText
        title="Sensitivities Table:"
        text={sensitivitiesTableTitle}
        direction="Horizontal"
        containerStyle={{ alignItems: "flex-start", width: "80%" }}
        textStyle={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        titleStyle={{ lineHeight: 2, minWidth: 200 }}
      />
      <div style={{ width: "100%", height: 150 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid
              columns={columns}
              rows={rows}
              newTableRowHeight={35}
              onRowsChange={setRows}
              size={size}
              autoAdjustTableDim={false}
              staticTableHeight={150}
            />
          )}
        </SizeMe>
      </div>
    </ApexFlexContainer>
  );
};

export default EconomicsSensitivitiesTable;
