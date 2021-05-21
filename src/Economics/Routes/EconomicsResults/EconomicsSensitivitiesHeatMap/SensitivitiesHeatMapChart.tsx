import { Box, useTheme } from "@material-ui/core";
import camelCase from "lodash.camelcase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import ApexCheckbox from "../../../../Application/Components/Checkboxes/ApexCheckbox";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../../Application/Components/Styles/ApexFlexStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import {
  calculateHeatMapDataRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { ISensitivitiesRow } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";

export interface IHeatMapVariableZData extends ISelectOption {
  handleCheck: (obj: ISelectOption["value"]) => void;
}

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
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
    selectedSensitivitiesTable,
  } = useSelector((state: RootState) => state.economicsReducer);

  const { economicsAnalysisButtons } = useSelector(
    (state: RootState) => state.economicsReducer[wc][ap]
  );

  const isAllVariablesDropped = [
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
  ].every((v) => v !== null);

  //TODO Gift to give me this everytime
  let sensitivitiesZRow: ISensitivitiesRow;
  let heatMapVariableZData: any;

  if (isAllVariablesDropped) {
    sensitivitiesZRow = (
      selectedSensitivitiesTable as ISensitivitiesRow[]
    ).filter((row) =>
      heatMapVariableZOption.label.startsWith(row.parameterTitle)
    )[0];

    const heatMapVarZData = sensitivitiesZRow.parameterValues
      .split(", ")
      .map((v) => ({
        value: v,
        label: v,
      }));

    let handleCheck: IHeatMapVariableZData["handleCheck"];

    if (Object.entries(sensitivitiesHeatMapData).length > 0) {
      handleCheck = (v: any) => {
        const devScenario = economicsAnalysisButtons[0].scenarioName;
        const variableZCamel = camelCase(sensitivitiesZRow.parameterTitle);
        const variableZKey = `${variableZCamel}${v}`;
        //use current devscenario and current z value to get collection
        //dispatch object to map1or2d
        const sensitivitiesHeatMap1or2D =
          sensitivitiesHeatMapData[devScenario][variableZKey];

        dispatch(
          updateEconomicsParameterAction(
            "sensitivitiesHeatMap1or2D",
            sensitivitiesHeatMap1or2D
          )
        );
      };
    } else {
      handleCheck = (v: any) => {
        dispatch(calculateHeatMapDataRequestAction(ap, tl, v));
      };
    }

    heatMapVariableZData = heatMapVarZData.map((obj) => ({
      ...obj,
      handleCheck: () => handleCheck(obj.value),
    }));
  } else {
    sensitivitiesZRow = {} as ISensitivitiesRow;
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
        <EconomicsSensitivitiesHeatMap />
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
