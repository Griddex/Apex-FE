import { useTheme } from "@material-ui/core";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import AnalyticsText from "../../../../Application/Components/Basic/AnalyticsText";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IApplicationExistingDataRow } from "../../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import {
  IEconomicsAnalysis,
  TEconomicsAnalysesNames,
} from "../EconomicsAnalysesTypes";

const EconomicsSensitivitiesTable = ({
  analysisName,
}: {
  analysisName: TEconomicsAnalysesNames;
}) => {
  const theme = useTheme();
  const wc = "economicsAnalysisWorkflows";

  const economicsAnalyses = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const { selectedAnalysis } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const selectedAnalysisName = (selectedAnalysis as IEconomicsAnalysis).name;
  const initialRows = economicsAnalyses[selectedAnalysisName];
  const [rows, setRows] = React.useState(initialRows);

  const columns: Column<IRawRow>[] = [
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

  return (
    <CenteredStyle
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      height={"100%"}
    >
      <AnalyticsText
        title="Target Variable"
        text={analysisName}
        direction="Vertical"
        containerStyle={{ alignItems: "flex-start", width: "100%" }}
        textStyle={{ color: theme.palette.primary.main, fontWeight: "bold" }}
      />
      <div style={{ width: "100%", height: 150 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              newTableRowHeight={35}
              onRowsChange={setRows}
              size={size}
              adjustTableDimAuto={false}
              staticTableHeight={150}
            />
          )}
        </SizeMe>
      </div>
    </CenteredStyle>
  );
};

export default EconomicsSensitivitiesTable;
