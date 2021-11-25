import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { TAllWorkflowCategories } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  developmentScenarioOptions,
  forecastCaseOptions,
} from "../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import {
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import AggregatedButtons from "../AggregatedButtons/AggregatedButtons";

export interface ISelectScenariosByButtonsWithForecastCaseEconomics {
  width?: number | string;
  height?: number | string;
  analysisProcess: TEconomicsAnalysesNames;
  workflowCategory: TAllWorkflowCategories;
  devOptions: { value: TDevScenarioNames; label: TDevScenarioTitles }[];
}

const SelectScenariosByButtonsWithForecastCaseEconomics = ({
  width,
  height,
  analysisProcess,
  workflowCategory,
  devOptions,
}: ISelectScenariosByButtonsWithForecastCaseEconomics) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const ap = analysisProcess;
  const wc = workflowCategory;

  const [devOption, setDevOption] = React.useState(devOptions[0]);

  const [buttonsData, setButtonsData] = React.useState([
    {
      title: devOption.label,
      scenarioName: devOption.value,
      variant: "outlined",
      color: "primary",
      willAllowHover: true,
    },
  ] as IAggregateButtonProps[]);

  const [forecastCaseOption, setForecastCaseOption] =
    React.useState<ISelectOption>(forecastCaseOptions[1]);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `${wc}.${ap}.economicsAnalysisButtons`,
        buttonsData
      )
    );
  }, [buttonsData]);

  return (
    <ApexFlexContainer
      justifyContent="space-evenly"
      width={width && width}
      height={height && height}
    >
      <ApexFlexContainer width={"70%"}>
        <AnalyticsComp
          title="Development Scenario"
          direction="Horizontal"
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            width: 500,
          }}
          content={
            <ApexSelectRS
              valueOption={devOption}
              data={developmentScenarioOptions}
              handleSelect={(row: OnChangeValue<ISelectOption, false>) => {
                const value = row?.value as string;
                const label = row?.label as string;

                setButtonsData((prev: IAggregateButtonProps[]) => {
                  if (
                    (buttonsData as IAggregateButtonProps[])
                      .map((obj) => obj.title)
                      .includes(label)
                  )
                    return prev;
                  else {
                    const btnData = {
                      title: label,
                      scenarioName: value,
                      variant: "outlined",
                      color: "primary",
                      willAllowHover: true,
                    } as IAggregateButtonProps;

                    return [...prev, btnData];
                  }
                });
              }}
              menuPortalTarget={document.body}
              isSelectOptionType={true}
            />
          }
        />
        <AggregatedButtons
          buttonsData={buttonsData}
          setButtonsData={setButtonsData}
        />
      </ApexFlexContainer>
      <AnalyticsComp
        title="Forecast Case"
        direction="Vertical"
        containerStyle={{
          display: "flex",
          flexDirection: "row",
          width: 300,
        }}
        content={
          <ApexSelectRS
            valueOption={forecastCaseOption}
            data={forecastCaseOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
              const path = `${wc}.${ap}.forecastScenarioAnalysis`;
              const value = option?.value as string;
              dispatch(updateEconomicsParameterAction(path, value));

              setForecastCaseOption(option as ISelectOption);
            }}
            menuPortalTarget={document.body}
            isSelectOptionType={true}
          />
        }
      />
    </ApexFlexContainer>
  );
};

export default SelectScenariosByButtonsWithForecastCaseEconomics;
