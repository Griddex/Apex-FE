import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import WithUnit from "../../../../Application/HOCs/WithUnit";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import isObjectEmpty from "../../../../Application/Utils/IsObjectEmpty";
import {
  developmentScenariosMap,
  initialHeatMapData,
  TDevScenariosMapKeys,
} from "../../../Data/EconomicsData";
import {
  getHeatMapDataRequestAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import {
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "../../EconomicsAnalyses/EconomicsAnalysesTypes";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import { RenderTree } from "./../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import EconomicsSensitivitiesHeatMap from "./EconomicsSensitivitiesHeatMap";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const sensitivitiesHeatMap1or2DSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.sensitivitiesHeatMap1or2D,
  (data) => data
);
const sensitivitiesHeatMapDataSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.sensitivitiesHeatMapData,
  (data) => data
);
const heatMapVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableXOptions,
  (data) => data
);
const heatMapVariableYOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableYOptions,
  (data) => data
);
const heatMapVariableZOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableZOptions,
  (data) => data
);
const heatMapTreeByScenarioSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapTreeByScenario,
  (data) => data
);
const resultsAnalyisOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.resultsAnalyisOptions,
  (data) => data
);
const selectedEconomicsResultsIdSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsResultsId,
  (data) => data
);
const sensitivitiesTableSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.sensitivitiesTable,
  (data) => data
);

export interface IHeatMapVariableZData extends ISelectOption {
  handleCheck: (obj: ISelectOption["value"]) => void;
}

const SensitivitiesHeatMapChart = ({
  selectedZ,
}: IEconomicsResultsVisualytics) => {
  const dispatch = useDispatch();

  const sensitivitiesHeatMap1or2D = useSelector(
    sensitivitiesHeatMap1or2DSelector
  );
  const sensitivitiesHeatMapData = useSelector(
    sensitivitiesHeatMapDataSelector
  );
  const heatMapVariableXOptions = useSelector(heatMapVariableXOptionsSelector);
  const heatMapVariableYOptions = useSelector(heatMapVariableYOptionsSelector);
  const heatMapVariableZOptions = useSelector(heatMapVariableZOptionsSelector);
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);

  const resultsAnalyisOptions = useSelector(resultsAnalyisOptionsSelector);
  const selectedEconomicsResultsId = useSelector(
    selectedEconomicsResultsIdSelector
  );
  const sensitivitiesTable = useSelector(sensitivitiesTableSelector);

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
  const isHeatMapVariableXYZOptionOnly = isX && isY && isZ;

  const noOfSensitivities = sensitivitiesTable?.length;

  let disableds = true;
  if (noOfSensitivities === 1 && isHeatMapVariableXOptionOnly) {
    disableds = false;
  } else if (noOfSensitivities === 2 && isHeatMapVariableXYOptionOnly) {
    disableds = false;
  } else if (noOfSensitivities === 3 && isHeatMapVariableXYZOptionOnly) {
    disableds = false;
  }

  let heatMapTreeZRow = {} as RenderTree;
  let heatMapVarZData = [] as ISelectOption[];
  let variableZlength = 0;
  let selectedDevScenario = "OIL/AG";

  //TODO economicsResultsCase use for agg - noagg

  selectedDevScenario = heatMapTreeByScenario?.name as string;
  const devScenario =
    developmentScenariosMap[selectedDevScenario as TDevScenariosMapKeys];

  if (heatMapTreeByScenario && "children" in heatMapTreeByScenario) {
    const firstKey = Object.keys(heatMapVariableZOptions)[0];
    heatMapTreeZRow = heatMapTreeByScenario?.children[0]?.children?.find(
      (row: any) => row?.title === heatMapVariableZOptions[firstKey]?.title
    ) as NonNullable<RenderTree>;

    if (isZ) {
      const sensitivitiesZString = heatMapTreeZRow?.title?.split("_")[1];
      heatMapVarZData = sensitivitiesZString?.split("-").map((v) => ({
        value: v,
        label: v,
      })) as ISelectOption[];

      variableZlength = heatMapVarZData?.length;
      selectedDevScenario = heatMapTreeByScenario?.name as string;
    }
  }

  const AnalysisResult = () => {
    return (
      <ApexSelectRS
        valueOption={analysisOption}
        data={resultsAnalyisOptions}
        handleSelect={(option: OnChangeValue<ISelectOption, false>) =>
          setAnalysisOption(option as ISelectOption)
        }
        menuPortalTarget={document.body}
        isSelectOptionType={true}
        containerHeight={40}
      />
    );
  };

  React.useEffect(() => {
    dispatch(updateEconomicsParameterAction("analysisOption", analysisOption));
  }, [analysisOption?.value]);

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
            <AnalysisResult />
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
          <NoSelectionPlaceholder
            icon={<ArrowUpwardOutlinedIcon color="primary" />}
            text="Select result.."
          />
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
          disableds={[false, disableds]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {
              dispatch(updateEconomicsParametersAction(initialHeatMapData));
            },
            () => {
              const variableZKey = `${heatMapTreeZRow?.name}${selectedZ}`;

              if (noOfSensitivities === 1 || noOfSensitivities === 2) {
                if (Object.entries(sensitivitiesHeatMapData).length === 0) {
                  dispatch(
                    getHeatMapDataRequestAction(
                      analyisName as TEconomicsAnalysesNames,
                      analysisTitle as TEconomicsAnalysesTitles,
                      noOfSensitivities,
                      selectedDevScenario,
                      variableZlength,
                      variableZKey
                    )
                  );
                }
              } else if (noOfSensitivities === 3) {
                if (Object.entries(sensitivitiesHeatMapData).length > 0) {
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
                      analyisName as TEconomicsAnalysesNames,
                      analysisTitle as TEconomicsAnalysesTitles,
                      noOfSensitivities,
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

export default React.memo(SensitivitiesHeatMapChart);
