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
  targetVariable,
}: {
  targetVariable: TEconomicsAnalysesNames;
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "existingDataWorkflows";

  const {
    economicsCostsRevenuesDeckExisting,
    economicsParametersDeckExisting,
  } = useSelector((state: RootState) => state.economicsReducer[wc]);

  const {
    selectedCostsRevenuesInputDeckTitle,
    selectedEconomicsParametersInputDeckTitle,
  } = useSelector((state: RootState) => state.economicsReducer);

  const economicsDeckTypes = [
    "Economics Costs & Revenues",
    "Economics Parameters",
  ];

  const economicsSelectedDeckOptions = {
    "Economics Costs & Revenues": generateSelectOptions(
      economicsCostsRevenuesDeckExisting.map(
        (e: IApplicationExistingDataRow) => e.title
      )
    ),
    "Economics Parameters": generateSelectOptions(
      economicsParametersDeckExisting.map(
        (e: IApplicationExistingDataRow) => e.title
      )
    ),
  };

  const costRevDeckTitle = selectedCostsRevenuesInputDeckTitle
    ? selectedCostsRevenuesInputDeckTitle
    : economicsCostsRevenuesDeckExisting[0]?.title;
  const ecoParDeckTitle = selectedEconomicsParametersInputDeckTitle
    ? selectedEconomicsParametersInputDeckTitle
    : selectedEconomicsParametersInputDeckTitle[0]?.title;

  const initialRows = economicsDeckTypes.map((type, i) => {
    return {
      sn: i + 1,
      type,
      deck: i === 0 ? costRevDeckTitle : ecoParDeckTitle,
    };
  });

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
      key: "title",
      name: "PARAMETER TITLE",
      resizable: true,
      width: 220,
    },
    {
      key: "values",
      name: "PARAMETER VALUES",
      resizable: true,
    },
  ];

  return (
    <CenteredStyle
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={60}
    >
      <AnalyticsText
        title="Target Variable"
        text={targetVariable}
        direction="Vertical"
        containerStyle={{ alignItems: "flex-start" }}
        textStyle={{ color: theme.palette.primary.main, fontWeight: "bold" }}
      />
      <div style={{ width: "95%", height: 120 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              newTableRowHeight={35}
              onRowsChange={setRows}
              size={size}
              adjustTableDimAuto={false}
              staticTableHeight={112}
            />
          )}
        </SizeMe>
      </div>
    </CenteredStyle>
  );
};

export default EconomicsSensitivitiesTable;
