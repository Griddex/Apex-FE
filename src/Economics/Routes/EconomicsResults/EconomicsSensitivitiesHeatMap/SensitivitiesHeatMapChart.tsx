import AirplayOutlinedIcon from "@material-ui/icons/AirplayOutlined";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ApexCheckboxGroup from "../../../../Application/Components/Checkboxes/ApexCheckboxGroup";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import isObjectEmpty from "../../../../Application/Utils/IsObjectEmpty";
import { developmentScenariosMap } from "../../../Data/EconomicsData";
import {
  getHeatMapDataRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { RenderTree } from "./../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";
export interface IHeatMapVariableZData extends ISelectOption {
  handleCheck: (obj: ISelectOption["value"]) => void;
}

const SensitivitiesHeatMapChart = () => {
  const dispatch = useDispatch();
  const wc = "economicsAnalysisWorkflows";

  const {
    sensitivitiesHeatMapData,
    heatMapVariableXOptions,
    heatMapVariableYOptions,
    heatMapVariableZOptions,
    heatMapTreeByScenario,
    resultsAnalyis,
  } = useSelector((state: RootState) => state.economicsReducer);
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 36 ~ SensitivitiesHeatMapChart ~ resultsAnalyis",
    resultsAnalyis
  );

  const resultsAnalyisOptions = resultsAnalyis.map((row: any) => ({
    value: row["analysisName"],
    label: row["analysisTitle"],
  }));
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 42 ~ resultsAnalyisOptions ~ resultsAnalyisOptions",
    resultsAnalyisOptions
  );

  const [analysisOption, setAnalysisOption] = React.useState<ISelectOption>(
    resultsAnalyisOptions[0]
  );
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 45 ~ SensitivitiesHeatMapChart ~ analysisOption",
    analysisOption
  );

  const { analyisName, analysisTitle } = resultsAnalyis;

  const [selectedZ, setSelectedZ] = React.useState("");

  const isAllVariablesDropped = [
    heatMapVariableXOptions,
    heatMapVariableYOptions,
    heatMapVariableZOptions,
  ].every((v) => v !== null);

  const isX = !isObjectEmpty(heatMapVariableXOptions);
  const isY = !isObjectEmpty(heatMapVariableYOptions);
  const isZ = !isObjectEmpty(heatMapVariableZOptions);

  const isHeatMapVariableXOptionOnly = isX && !isY && !isZ;
  const isHeatMapVariableXYOptionOnly = isX && isY && !isZ;
  const isHeatMapVariableXYZOptionOnly = isX && isY && isZ;

  let heatMapTreeZRow = {} as RenderTree;
  let heatMapVarZData = [] as ISelectOption[];
  let variableZlength = 0;
  let selectedDevScenario = "OIL/AG";

  if (heatMapTreeByScenario && heatMapTreeByScenario.id !== "" && isZ) {
    const firstKey = Object.keys(heatMapVariableZOptions)[0];

    heatMapTreeZRow = heatMapTreeByScenario["children"].filter(
      (row: any) => row.title === heatMapVariableZOptions[firstKey].title
    )[0] as NonNullable<RenderTree>;

    const sensitivitiesZString = heatMapTreeZRow.title?.split("_")[1];
    heatMapVarZData = sensitivitiesZString?.split("-").map((v) => ({
      value: v,
      label: v,
    })) as ISelectOption[];

    variableZlength = heatMapVarZData.length;
    selectedDevScenario = heatMapTreeByScenario.name as string;
  }

  // React.useEffect(() => {
  //   setAnalysisOption(resultsAnalyisOptions[0]);
  // }, []);

  return (
    <ApexFlexContainer flexDirection="column" height={"calc(100% - 50px)"}>
      <ApexFlexContainer width={300} height={50}>
        <ApexSelectRS
          valueOption={analysisOption}
          data={resultsAnalyisOptions}
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
          <ApexCheckboxGroup
            setSelectedVariable={setSelectedZ}
            variableZOption={heatMapVariableZOptions}
            apexCheckboxDataGroup={heatMapVarZData as ISelectOption[]}
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
          disableds={[false, heatMapVariableXOptions === null]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {},
            () => {
              if (
                isHeatMapVariableXOptionOnly ||
                isHeatMapVariableXYOptionOnly
              ) {
                if (Object.entries(sensitivitiesHeatMapData).length === 0) {
                  dispatch(
                    getHeatMapDataRequestAction(analyisName, analysisTitle)
                  );
                }
              } else {
                if (Object.entries(sensitivitiesHeatMapData).length > 0) {
                  const devScenario =
                    developmentScenariosMap[
                      selectedDevScenario as keyof typeof developmentScenariosMap
                    ];
                  const variableZKey = `${heatMapTreeZRow.name}${selectedZ}`;

                  const sensitivitiesHeatMap1or2D =
                    sensitivitiesHeatMapData[devScenario][variableZKey];

                  dispatch(
                    updateEconomicsParameterAction(
                      "sensitivitiesHeatMap1or2D",
                      sensitivitiesHeatMap1or2D
                    )
                  );
                } else {
                  const variableZKey = `${heatMapTreeZRow.name}${selectedZ}`;

                  dispatch(
                    getHeatMapDataRequestAction(
                      analyisName,
                      analysisTitle,
                      variableZlength,
                      selectedDevScenario,
                      variableZKey
                    )
                  );
                }
              }
            },
          ]}
        />
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default SensitivitiesHeatMapChart;
