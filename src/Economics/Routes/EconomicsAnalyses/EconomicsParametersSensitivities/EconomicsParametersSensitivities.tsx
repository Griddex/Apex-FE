import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { ValueType } from "react-select";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import {
  economicsParameterHeaders,
  getVariableTitlesNamesObj,
} from "../../../Data/EconomicsData";
import {
  IEconomicsAnalysis,
  IEconomicsParametersSensitivitiesProps,
  IEconomicsSensitivities,
  TEconomicsAnalyses,
  TEconomicsAnalysesNames,
  TParametersId,
} from "../EconomicsAnalysesTypes";
import { IParameterSensitivity } from "./EconomicsParametersSensitivitiesTypes";
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

const EconomicsParametersSensitivities = ({
  selectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const theme = useTheme();

  const {
    ecoParAppHeadersSelectOptions,
    createSensitivitiesIsDialog,
  } = useSelector((state: RootState) => state.economicsReducer);

  const ePAppHeaderSelectOptions = ecoParAppHeadersSelectOptions as ISelectOption[];

  let tgtVarOption = {} as ISelectOption;
  if (createSensitivitiesIsDialog)
    tgtVarOption = {
      value: selectedAnalysis?.name,
      label: selectedAnalysis?.title,
    } as ISelectOption;
  else
    tgtVarOption = {
      value: ecoParAppHeadersSelectOptions[0]?.name,
      label: ecoParAppHeadersSelectOptions[0]?.title,
    } as ISelectOption;
  const analysisNameOptions = [tgtVarOption];

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
  } as Record<TParametersId, IEconomicsSensitivities>;

  const initialSensitivitiesObjRef = React.useRef(initialSensitivitiesObj);
  const [
    parameterSensitivitiesObj,
    setParameterSensitivitiesObj,
  ] = React.useState(initialSensitivitiesObjRef.current);
  console.log(
    "Logged output --> ~ file: EconomicsParametersSensitivities.tsx ~ line 138 ~ parameterSensitivitiesObj",
    parameterSensitivitiesObj
  );

  const RSStyles = getRSStyles(theme);

  return (
    <CenteredStyle
      flexDirection="column"
      justifyContent="space-around"
      height={700}
    >
      <AnalyticsComp
        title="Target Variable"
        direction="Vertical"
        containerStyle={{ width: 250 }}
        content={
          <Select<ISelectOption, false>
            value={tgtVarOption}
            options={analysisNameOptions}
            styles={RSStyles}
            menuPortalTarget={document.body}
            theme={(thm) => getRSTheme(thm, theme)}
          />
        }
      />

      <CenteredStyle
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
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default EconomicsParametersSensitivities;
