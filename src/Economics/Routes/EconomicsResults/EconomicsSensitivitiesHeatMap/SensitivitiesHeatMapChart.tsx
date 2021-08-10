import { Box, useTheme } from "@material-ui/core";
import camelCase from "lodash.camelcase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ApexCheckbox from "../../../../Application/Components/Checkboxes/ApexCheckbox";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import {
  calculateHeatMapDataRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { ISensitivitiesRow } from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AirplayOutlinedIcon from "@material-ui/icons/AirplayOutlined";
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

  console.log("selectedAnalysis: ", selectedAnalysis);

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

  //TODO
  //1, 2 or 3 sensitivity variables are possible
  //a) For 1 variable, disable Y&Z categories and disable/remove Z area.
  //then fire request. Define an artificial Y value just for Y axis
  //b) For 2 variables, disable Z categories and disable/remove Z area.
  //then fire request.

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
    <ApexFlexContainer flexDirection="column" height={"calc(100% - 50px)"}>
      <ApexFlexContainer width={300} height={50}>
        <ApexSelectRS
          valueOption={analysisOption}
          data={economicsAnalysesOptions}
          handleSelect={(option: ValueType<ISelectOption, false>) =>
            setAnalysisOption(option as ISelectOption)
          }
          menuPortalTarget={document.body}
          isSelectOptionType={true}
        />
      </ApexFlexContainer>

      <ApexFlexContainer
        width={"95%"}
        height={"95%"}
        moreStyles={{ overflow: "auto" }}
      >
        <EconomicsSensitivitiesHeatMap />
        {isAllVariablesDropped && (
          <ApexCheckbox
            variableZOption={heatMapVariableZOption}
            apexCheckboxData={heatMapVariableZData}
          />
        )}
      </ApexFlexContainer>
      <ApexFlexContainer
        justifyContent="space-evenly"
        height={50}
        moreStyles={{ marginBottom: 4, width: 270 }}
      >
        <BaseButtons
          buttonTexts={["Reset", "Display"]}
          variants={["contained", "contained"]}
          colors={["secondary", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <AirplayOutlinedIcon key={2} />,
          ]}
          // disableds={[sRow === -1, sRow === -1]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {
              // dispatch(
              //   getForecastDataByIdRequestAction(
              //     "forecastResultsVisualytics",
              //     true,
              //     "/apex/forecast/forecastdata"
              //   )
              // );
            },
            () => dispatch(() => {}),
          ]}
        />
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default SensitivitiesHeatMapChart;
