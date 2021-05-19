import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import ApexCheckbox from "../../../../Application/Components/Checkboxes/ApexCheckbox";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../../Application/Components/Styles/ApexFlexStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import { calculateHeatMapDataRequestAction } from "../../../Redux/Actions/EconomicsActions";
import { ISensitivitiesRow } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";

const SensitivitiesHeatMapChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = "economicsAnalysisWorkflows";

  const { selectedAnalysis } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const ap = selectedAnalysis?.name;
  const tl = selectedAnalysis?.title;

  const [analysisOption, setAnalysisOption] = React.useState({
    value: ap,
    label: tl,
  });

  const {
    sensitivitiesHeatMapData,
    sensitivitiesHeatMapDataDisplayed,
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
  } = useSelector((state: RootState) => state.economicsReducer);

  const { sensitivitiesTable } = useSelector(
    (state: RootState) => state.economicsReducer[wc][ap]
  );

  const isAllVariablesDropped = [
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
  ].every((v) => v !== null);

  //TODO Gift to give me this everytime
  let sensitivitiesZRow;
  let heatMapVariableZData: any;

  if (isAllVariablesDropped) {
    sensitivitiesZRow = (sensitivitiesTable as ISensitivitiesRow[]).filter(
      (row) => heatMapVariableZOption.label.startsWith(row.parameterTitle)
    )[0];

    heatMapVariableZData = sensitivitiesZRow.parameterValues
      .split(", ")
      .map((v) => ({
        value: v,
        label: v,
        handleCheck: () => dispatch(calculateHeatMapDataRequestAction(ap, tl)),
      }));
  } else {
    sensitivitiesZRow = {};
    heatMapVariableZData = [];
  }

  return (
    <ApexFlexStyle flexDirection="column" height={"calc(100% - 50px)"}>
      <ApexFlexStyle width={300} height={50}>
        <ApexSelectRS
          valueOption={analysisOption}
          data={economicsAnalysesOptions}
          handleSelect={(option: ValueType<ISelectOption, false>) =>
            setAnalysisOption(option as ISelectOption)
          }
          menuPortalTarget={document.body}
          isSelectOptionType={true}
        />
      </ApexFlexStyle>

      <ApexFlexStyle width={"90%"} height={"90%"}>
        <EconomicsSensitivitiesHeatMap
          mapDataDisplayed={sensitivitiesHeatMapDataDisplayed}
        />
        <Box marginLeft={3} width={200} minWidth={200} height={"70%"}>
          {isAllVariablesDropped ? (
            <ApexCheckbox
              variableZOption={heatMapVariableZOption}
              apexCheckboxData={heatMapVariableZData}
            />
          ) : (
            <Box
              width={200}
              minWidth={200}
              height={"70%"}
              style={{
                border: `1px solid ${theme.palette.grey[400]}`,
                backgroundColor: theme.palette.grey[200],
              }}
            />
          )}
        </Box>
      </ApexFlexStyle>
    </ApexFlexStyle>
  );
};

export default SensitivitiesHeatMapChart;
