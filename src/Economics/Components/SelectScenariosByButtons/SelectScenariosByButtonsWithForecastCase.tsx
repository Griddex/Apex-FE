import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { subNavbarSetMenuAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  developmentScenarioOptions,
  forecastCaseOptions,
} from "../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import AggregatedButtons from "../AggregatedButtons/AggregatedButtons";

export interface ISelectScenariosByButtonsWithForecastCase {
  width?: number | string;
  height?: number | string;
  workflowProcess: TAllWorkflowProcesses;
  workflowCategory: TAllWorkflowCategories;
}

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const SelectScenariosByButtonsWithForecastCase = ({
  width,
  height,
  workflowProcess,
  workflowCategory,
}: ISelectScenariosByButtonsWithForecastCase) => {
  const dispatch = useDispatch();
  const wp = workflowProcess;
  const wc = workflowCategory;

  const currentDevOptionSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc][wp]["currentDevOption"],
    (reducer) => reducer
  );
  const costRevenuesButtonsSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc][wp]["costRevenuesButtons"],
    (reducer) => reducer
  );
  const developmentScenariosCompletedSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wc][wp]["developmentScenariosCompleted"],
    (reducer) => reducer
  );

  const currentDevOption = useSelector(currentDevOptionSelector);
  const costRevenuesButtons = useSelector(costRevenuesButtonsSelector);
  const developmentScenariosCompleted = useSelector(
    developmentScenariosCompletedSelector
  );

  const [devOption, setDevOption] = React.useState(
    Object.entries(currentDevOption).length > 0
      ? currentDevOption
      : developmentScenarioOptions[0]
  );

  const [buttonsData, setButtonsData] = React.useState(
    Object.entries(costRevenuesButtons).length > 0
      ? costRevenuesButtons
      : ([
          {
            title: devOption.label,
            scenarioName: devOption.value,
            variant: "outlined",
            color: "primary",
            handleAction: () => {
              dispatch(
                subNavbarSetMenuAction(
                  `Economics Costs & Revenues [${devOption.label}]`
                )
              );
              setDevOption(devOption as ISelectOption);
            },
          },
        ] as IAggregateButtonProps[])
  );

  const [forecastCaseOption, setForecastCaseOption] =
    React.useState<ISelectOption>(forecastCaseOptions[1]);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.${workflowProcess}.currentDevOption`,
        devOption
      )
    );
  }, []);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.${workflowProcess}.currentDevOption`,
        devOption
      )
    );
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.${workflowProcess}.costRevenuesButtons`,
        buttonsData
      )
    );
  }, [devOption, buttonsData]);

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
              handleSelect={(row: ValueType<ISelectOption, false>) => {
                const path = `inputDataWorkflows.${workflowProcess}.developmentScenarios`;
                const value = row?.value as string;
                const label = row?.label as string;
                dispatch(updateEconomicsParameterAction(path, value));

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
                      handleAction: () => {
                        dispatch(
                          subNavbarSetMenuAction(
                            `Economics Costs & Revenues [${label}]`
                          )
                        );
                        setDevOption(row as ISelectOption);
                      },
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
          developmentScenariosCompleted={developmentScenariosCompleted}
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
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              const path = `inputDataWorkflows.${workflowProcess}.forecastCase`;
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

export default SelectScenariosByButtonsWithForecastCase;
