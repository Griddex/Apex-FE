import { useTheme } from "@material-ui/core";
import React from "react";
import { ValueType } from "react-select";
import Select from "react-select";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import {
  IEconomicsParametersSensitivites,
  TEconomicsAnalyses,
} from "../EconomicsAnalysesTypes";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import ParameterSensitivity from "./ParameterSensitivity";
import {
  economicsParameterHeaders,
  getVariableTitlesNamesObj,
} from "../../../Data/EconomicsData";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";

const EconomicsParametersSensitivities = ({
  economicsAnalyses,
}: IEconomicsParametersSensitivites) => {
  const theme = useTheme();

  const variableTitlesNamesObj = getVariableTitlesNamesObj();
  const targetVariableNames = economicsAnalyses.map((e) => e.name);
  const targetVariableTitles = economicsAnalyses.map((e) => e.title);

  const targetVariableOptions = generateSelectOptions(
    targetVariableTitles,
    true,
    targetVariableNames
  );

  const valueOption = generateSelectOptions([targetVariableTitles[0]], true, [
    targetVariableNames[0],
  ])[0];

  const [selectedTargetVariable, setSelectedTargetVariable] = React.useState(
    valueOption
  );
  const handleSelectControlVariableChange = (
    row: ValueType<ISelectOption, false>
  ) => {
    setSelectedTargetVariable(row as ISelectOption);
  };
  const RSStyles = getRSStyles(theme);
  type IsMulti = false;

  const parametersTitles = economicsParameterHeaders.map(
    (p) => p.variableTitle
  );
  const initialSensitivitiesObj = {
    "Parameter 1": { parameters: parametersTitles, selectedParameter: "" },
    "Parameter 2": { parameters: parametersTitles, selectedParameter: "" },
    "Parameter 3": { parameters: parametersTitles, selectedParameter: "" },
  };
  const initialSensitivitiesObjRef = React.useRef(initialSensitivitiesObj);
  const [
    parameterSensitivitiesObj,
    setParameterSensitivitiesObj,
  ] = React.useState(initialSensitivitiesObjRef.current);

  return (
    <CenteredStyle flexDirection="column" justifyContent="space-around">
      <AnalyticsComp
        title="Target Variable"
        direction="Vertical"
        containerStyle={{ width: 250 }}
        content={
          <Select<ISelectOption, IsMulti>
            value={valueOption}
            options={targetVariableOptions}
            styles={RSStyles}
            onChange={(value: ValueType<ISelectOption, IsMulti>) => {
              handleSelectControlVariableChange(value);
            }}
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
        {Object.keys(initialSensitivitiesObj).map((p, i) => {
          return (
            <ParameterSensitivity
              key={i}
              sensitivitiesIndex={i}
              sensitivitiesTitle={p}
              parameterSensitivitiesObj={parameterSensitivitiesObj}
              setParameterSensitivitiesObj={setParameterSensitivitiesObj}
              variableTitlesNamesObj={variableTitlesNamesObj}
            />
          );
        })}
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default EconomicsParametersSensitivities;
