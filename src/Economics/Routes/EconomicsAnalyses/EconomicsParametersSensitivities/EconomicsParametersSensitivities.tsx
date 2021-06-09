import { useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { economicsAnalysesOptions } from "../../../Data/EconomicsData";
import {
  IEconomicsParametersSensitivitiesProps,
  IEconomicsSensitivities,
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

const EconomicsParametersSensitivities = ({
  selectedAnalysis,
}: IEconomicsParametersSensitivitiesProps) => {
  const theme = useTheme();

  const { ecoParAppHeadersSelectOptions, createSensitivitiesIsDialog } =
    useSelector((state: RootState) => state.economicsReducer);

  const ePAppHeaderSelectOptions =
    ecoParAppHeadersSelectOptions as ISelectOption[];

  let tgtVarOption = {} as ISelectOption;
  let analysisNameOptions = [] as ISelectOption[];
  console.log(
    "Logged output --> ~ file: EconomicsParametersSensitivities.tsx ~ line 45 ~ createSensitivitiesIsDialog",
    createSensitivitiesIsDialog
  );
  if (createSensitivitiesIsDialog) {
    tgtVarOption = {
      value: selectedAnalysis?.name,
      label: selectedAnalysis?.title,
    } as ISelectOption;
    analysisNameOptions = [tgtVarOption];
  } else {
    tgtVarOption = {
      value: economicsAnalysesOptions[0]?.value,
      label: economicsAnalysesOptions[0]?.label,
    } as ISelectOption;
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
  } as Record<TParametersId, IEconomicsSensitivities>;

  const initialSensitivitiesObjRef = React.useRef(initialSensitivitiesObj);
  const [parameterSensitivitiesObj, setParameterSensitivitiesObj] =
    React.useState(initialSensitivitiesObjRef.current);

  const RSStyles = getRSStyles(theme);

  return (
    <ApexFlexContainer
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
    </ApexFlexContainer>
  );
};

export default EconomicsParametersSensitivities;
