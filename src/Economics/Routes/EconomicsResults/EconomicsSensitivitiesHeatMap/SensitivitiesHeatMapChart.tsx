import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import WithUnit from "../../../../Application/HOCs/WithUnit";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import isObjectEmpty from "../../../../Application/Utils/IsObjectEmpty";
import {
  developmentScenariosMap,
  TDevScenariosMapKeys,
} from "../../../Data/EconomicsData";
import {
  getHeatMapDataRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import {
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import { RenderTree } from "./../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

export interface IHeatMapVariableZData extends ISelectOption {
  handleCheck: (obj: ISelectOption["value"]) => void;
}

const SensitivitiesHeatMapChart = ({
  selectedZ,
}: IEconomicsResultsVisualytics) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    sensitivitiesHeatMapData,
    heatMapVariableXOptions,
    heatMapVariableYOptions,
    heatMapVariableZOptions,
    heatMapTreeByScenario,
    resultsAnalyisOptions,
    selectedEconomicsResultsId,
    sensitivitiesHeatMap1or2D,
  } = useSelector(economicsSelector);

  const [analysisOption, setAnalysisOption] = React.useState<ISelectOption>(
    resultsAnalyisOptions[0]
  );

  const analyisName = analysisOption?.value;
  const analysisTitle = analysisOption?.label;

  const isX = !isObjectEmpty(heatMapVariableXOptions);
  const isY = !isObjectEmpty(heatMapVariableYOptions);
  const isZ = !isObjectEmpty(heatMapVariableZOptions);

  const isHeatMapVariableXOptionOnly = isX && !isY && !isZ;
  const isHeatMapVariableXYOptionOnly = isX && isY && !isZ;

  let heatMapTreeZRow = {} as RenderTree;
  let heatMapVarZData = [] as ISelectOption[];
  let variableZlength = 0;
  let selectedDevScenario = "OIL/AG";

  selectedDevScenario = heatMapTreeByScenario.name as string;
  const devScenario =
    developmentScenariosMap[selectedDevScenario as TDevScenariosMapKeys];

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

  React.useEffect(() => {
    if (selectedEconomicsResultsId === "") {
      setAnalysisOption({
        value: "Select",
        label: "Select...",
      } as ISelectOption);
    } else {
      setAnalysisOption(resultsAnalyisOptions[0]);
    }
  }, [selectedEconomicsResultsId]);

  return (
    <ApexFlexContainer flexDirection="column" height={"calc(100% - 50px)"}>
      <WithUnit
        innerComponent={
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
        }
        unitValue={analysisOption?.value as string}
      />

      <ApexFlexContainer
        width={"95%"}
        height={"95%"}
        moreStyles={{ overflow: "auto" }}
      >
        {sensitivitiesHeatMap1or2D &&
        sensitivitiesHeatMap1or2D?.length === 0 ? (
          <ApexFlexContainer
            moreStyles={{
              border: `1px solid ${theme.palette.grey[400]}`,
              backgroundColor: theme.palette.grey[200],
              width: theme.breakpoints.values["md"],
            }}
          >
            {"No map"}
          </ApexFlexContainer>
        ) : (
          <EconomicsSensitivitiesHeatMap />
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
                    getHeatMapDataRequestAction(
                      analyisName as TEconomicsAnalysesNames,
                      analysisTitle as TEconomicsAnalysesTitles,
                      selectedDevScenario
                    )
                  );
                }
              } else {
                if (Object.entries(sensitivitiesHeatMapData).length > 0) {
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
                      analyisName as TEconomicsAnalysesNames,
                      analysisTitle as TEconomicsAnalysesTitles,
                      selectedDevScenario,
                      variableZlength,
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
