import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
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
  workflowProcess: IAllWorkflows["wrkflwPrcss"];
  workflowCategory: IAllWorkflows["wrkflwCtgry"];
}

const SelectScenariosByButtonsWithForecastCase = ({
  width,
  height,
  workflowProcess,
  workflowCategory,
}: ISelectScenariosByButtonsWithForecastCase) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const wp = workflowProcess;
  const wc = workflowCategory;

  const {
    currentDevOption,
    costRevenuesButtons,
    developmentScenariosCompleted,
  } = useSelector((state: RootState) => state.economicsReducer[wc][wp]);

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

  const [forecastCaseOption, setForecastCaseOption] = React.useState(
    forecastCaseOptions[1]
  );

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
    <ApexFlexStyle
      justifyContent="space-evenly"
      width={width && width}
      height={height && height}
    >
      <ApexFlexStyle width={"70%"}>
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
      </ApexFlexStyle>
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
              const path = `inputDataWorkflows.${workflowProcess}.forecastScenario`;
              const value = option?.value as string;
              dispatch(updateEconomicsParameterAction(path, value));

              setForecastCaseOption(option as ISelectOption);
            }}
            menuPortalTarget={document.body}
            isSelectOptionType={true}
          />
        }
      />
    </ApexFlexStyle>
  );
};

export default SelectScenariosByButtonsWithForecastCase;
