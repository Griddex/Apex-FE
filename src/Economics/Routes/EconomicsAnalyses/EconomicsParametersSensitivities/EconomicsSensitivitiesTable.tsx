import { useTheme } from "@material-ui/core";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import AnalyticsText from "../../../../Application/Components/Basic/AnalyticsText";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  ISensitivitiesRow,
  TEconomicsAnalysesNames,
  TSensitivitiesTable,
} from "../EconomicsAnalysesTypes";

export interface IEconomicsSensitivitiesTable {
  selectedSensitivitiesTable: TSensitivitiesTable;
  analysisName: TEconomicsAnalysesNames;
}

const EconomicsSensitivitiesTable = ({
  selectedSensitivitiesTable,
  analysisName,
}: IEconomicsSensitivitiesTable) => {
  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesTable.tsx ~ line 27 ~ analysisName",
    analysisName
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = "economicsAnalysisWorkflows";

  const { economicsAnalysisWorkflows } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesTable.tsx ~ line 25 ~ selectedSensitivitiesTable",
    selectedSensitivitiesTable
  );

  //TODO Rethink how to make sensitivities table usable by
  //any current economics analysis

  const currentAnalysisObj = economicsAnalysisWorkflows[analysisName];
  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesTable.tsx ~ line 44 ~ currentAnalysisObj",
    currentAnalysisObj
  );
  const sensitivitiesTableTitle = currentAnalysisObj["analysisTableTitle"];
  const [rows, setRows] = React.useState(selectedSensitivitiesTable);

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

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

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
            <ApexGrid<ISensitivitiesRow, ITableButtonsProps>
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
