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
import {
  developmentScenariosMap,
  economicsAnalysesOptions,
} from "../../../Data/EconomicsData";
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

  const { selectedAnalysis } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const ap = selectedAnalysis?.name;
  const tl = selectedAnalysis?.title;

  const [analysisOption, setAnalysisOption] = React.useState({
    value: ap,
    label: tl,
  });

  const [selectedZ, setSelectedZ] = React.useState("");

  const {
    sensitivitiesHeatMapData,
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
    heatMapTreeByScenario,
  } = useSelector((state: RootState) => state.economicsReducer);
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapChart.tsx ~ line 51 ~ SensitivitiesHeatMapChart ~ heatMapTreeByScenario",
    heatMapTreeByScenario
  );

  const isAllVariablesDropped = [
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
  ].every((v) => v !== null);

  const isHeatMapVariableXOptionOnly =
    heatMapVariableXOption !== null &&
    heatMapVariableYOption === null &&
    heatMapVariableZOption == null;
  const isHeatMapVariableXYOptionOnly =
    heatMapVariableXOption !== null &&
    heatMapVariableYOption !== null &&
    heatMapVariableZOption == null;
  const isHeatMapVariableXYZOptionOnly =
    heatMapVariableXOption !== null &&
    heatMapVariableYOption !== null &&
    heatMapVariableZOption !== null;

  let heatMapTreeZRow = {} as RenderTree;
  let heatMapVarZData = [] as ISelectOption[];
  let variableZlength = 0;
  let selectedDevScenario = "OIL/AG Development";

  if (heatMapTreeByScenario.id !== "" && heatMapVariableZOption !== null) {
    heatMapTreeZRow = heatMapTreeByScenario["children"].filter(
      (row: any) => row.title === heatMapVariableZOption.label
    )[0] as NonNullable<RenderTree>;

    const sensitivitiesZString = heatMapTreeZRow.title?.split("_")[1];
    heatMapVarZData = sensitivitiesZString?.split("-").map((v) => ({
      value: v,
      label: v,
    })) as ISelectOption[];

    variableZlength = heatMapVarZData.length;
    selectedDevScenario = heatMapTreeByScenario.title as string;
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
          <ApexCheckboxGroup
            setSelectedVariable={setSelectedZ}
            variableZOption={heatMapVariableZOption}
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
          disableds={[false, heatMapVariableXOption === null]}
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
                  //TODO 1or2d doesn't have z variable
                  //Gabriel to consider this scenario
                  dispatch(getHeatMapDataRequestAction(ap, tl));
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
                  dispatch(
                    getHeatMapDataRequestAction(
                      //TODO Temporary. Gift to give me this with tree view
                      "payout",
                      "Payout",
                      variableZlength,
                      selectedDevScenario
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
