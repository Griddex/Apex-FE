import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import {
  IEconomicsParametersSensitivitiesProps,
  IEcoSelectedSensitivities,
  TParametersId,
} from "../EconomicsAnalysesTypes";
import ParameterSensitivity from "./ParameterSensitivity";

const initialSensitivityValues = [
  {
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    p7: "",
  },
];

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

const EconomicsParametersSensitivities = ({
  selectedAnalysis,
  finalAction,
  borderStyles,
}: IEconomicsParametersSensitivitiesProps) => {
  const dispatch = useDispatch();

  const { ecoParAppHeadersSelectOptions, createSensitivitiesIsDialog } =
    useSelector(economicsSelector);

  const ePAppHeaderSelectOptions =
    ecoParAppHeadersSelectOptions as ISelectOption[];

  let analysisNameOptions = [] as ISelectOption[];

  const tgtVarOption = {
    value: selectedAnalysis?.name,
    label: selectedAnalysis?.title,
  } as ISelectOption;

  const [targetOption, setTargetOption] = React.useState(tgtVarOption);

  if (createSensitivitiesIsDialog) {
    analysisNameOptions = [tgtVarOption];
  } else {
    analysisNameOptions = economicsAnalysesOptions;
  }

  const initialSensitivitiesObj = {
    "Parameter 1": {
      analysisName: selectedAnalysis?.name,
      targetParameterOptions: ePAppHeaderSelectOptions,
      selectedTargetParameterOption: ePAppHeaderSelectOptions[0],
      sensitivityValues: initialSensitivityValues,
    },
    "Parameter 2": {
      analysisName: selectedAnalysis?.name,
      targetParameterOptions: ePAppHeaderSelectOptions,
      selectedTargetParameterOption: ePAppHeaderSelectOptions[0],
      sensitivityValues: initialSensitivityValues,
    },
    "Parameter 3": {
      analysisName: selectedAnalysis?.name,
      targetParameterOptions: ePAppHeaderSelectOptions,
      selectedTargetParameterOption: ePAppHeaderSelectOptions[0],
      sensitivityValues: initialSensitivityValues,
    },
  } as Record<TParametersId, IEcoSelectedSensitivities>;

  const [parameterSensitivitiesObj, setParameterSensitivitiesObj] =
    React.useState(initialSensitivitiesObj);

  return (
    <ApexFlexContainer
      flexDirection="column"
      justifyContent="space-around"
      height={700}
      moreStyles={borderStyles}
    >
      <AnalyticsComp
        title="Target Variable"
        direction="Vertical"
        containerStyle={{ width: 250 }}
        content={
          <ApexSelectRS
            valueOption={targetOption}
            data={analysisNameOptions}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              const optionDefined = option as ISelectOption;
              setTargetOption(optionDefined);

              dispatch(
                updateEconomicsParameterAction(
                  "selectedAnalysis",
                  optionDefined
                )
              );
            }}
            menuPortalTarget={document.body}
            isSelectOptionType={true}
          />
        }
      />

      <ApexFlexContainer
        width={"90%"}
        height={500}
        flexDirection="column"
        justifyContent="space-around"
      >
        {Object.keys(initialSensitivitiesObj).map((p: any, i) => {
          return (
            <ParameterSensitivity
              key={i}
              parIndex={i}
              parId={p}
              parameterSensitivitiesObj={parameterSensitivitiesObj}
              setParameterSensitivitiesObj={setParameterSensitivitiesObj}
            />
          );
        })}
      </ApexFlexContainer>
      <ApexFlexContainer justifyContent="space-between" height={50} width={200}>
        {!createSensitivitiesIsDialog && (
          <ApexFlexContainer
            justifyContent="space-between"
            height={50}
            moreStyles={{ marginBottom: 4, width: 270 }}
          >
            <BaseButtons
              buttonTexts={["Reset", "Save"]}
              variants={["contained", "contained"]}
              colors={["secondary", "primary"]}
              startIcons={[
                <RotateLeftOutlinedIcon key={1} />,
                <SaveOutlinedIcon key={2} />,
              ]}
              shouldExecute={[true, true]}
              shouldDispatch={[false, false]}
              finalActions={[
                () => setParameterSensitivitiesObj(initialSensitivitiesObj),
                finalAction as NonNullable<
                  IEconomicsParametersSensitivitiesProps["finalAction"]
                >,
              ]}
            />
          </ApexFlexContainer>
        )}
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default EconomicsParametersSensitivities;
