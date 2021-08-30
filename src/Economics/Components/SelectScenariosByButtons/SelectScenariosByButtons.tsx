import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { subNavbarSetMenuAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { workflowResetAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { developmentScenarioOptions } from "../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import AggregatedButtons from "../AggregatedButtons/AggregatedButtons";

export interface ISelectScenariosByButtons {
  width?: number | string;
  height?: number | string;
  workflowProcess: TAllWorkflowProcesses;
  workflowCategory: TAllWorkflowCategories;
}

const SelectScenariosByButtons = ({
  width,
  height,
  workflowProcess,
  workflowCategory,
}: ISelectScenariosByButtons) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const wp = workflowProcess;
  const wc = workflowCategory;

  const {
    costRevenuesButtons,
    currentDevOption,
    developmentScenariosCompleted,
  } = useSelector((state: RootState) => state.economicsReducer[wc][wp]);

  const [devOption, setDevOption] = React.useState(currentDevOption);

  const updatedCostRevenuesButtons = (
    costRevenuesButtons as IAggregateButtonProps[]
  ).map((obj) => ({
    ...obj,
    handleAction: () => {
      dispatch(
        updateEconomicsParameterAction(
          `inputDataWorkflows.${wp}.currentDevOption`,
          { value: obj?.scenarioName, label: obj?.title }
        )
      );

      dispatch(subNavbarSetMenuAction(obj?.title as string));
      dispatch(workflowResetAction(0, wp, wc));
      dispatch(unloadDialogsAction());
    },
  }));

  const [buttonsData, setButtonsData] = React.useState(
    updatedCostRevenuesButtons as IAggregateButtonProps[]
  );

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.${wp}.currentDevOption`,
        devOption
      )
    );
  }, [devOption]);

  return (
    <ApexFlexContainer
      width={width && width}
      height={height && height}
      flexDirection="column"
    >
      <AnalyticsComp
        title="Development Scenario"
        direction="Vertical"
        containerStyle={{
          display: "flex",
          flexDirection: "row",
          width: 500,
          pointerEvents: "none",
          backgroundColor: theme.palette.grey[200],
        }}
        contentStyle={{ width: "100%", height: "100%" }}
        content={
          <ApexSelectRS
            valueOption={devOption}
            data={developmentScenarioOptions}
            handleSelect={(row: ValueType<ISelectOption, false>) => {
              const path = `inputDataWorkflows.${workflowProcess}.developmentScenarios`;
              const value = row?.value as string;
              const label = row?.label as string;
              dispatch(updateEconomicsParameterAction(path, value));

              setButtonsData((prev) => {
                if (buttonsData.map((obj) => obj.title).includes(label))
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
                      dispatch(workflowResetAction(0, wp, wc));
                      setDevOption(row as ISelectOption);
                    },
                  } as IAggregateButtonProps;

                  return [...prev, btnData];
                }
              });
            }}
            menuPortalTarget={dialogRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
      <AggregatedButtons
        buttonsData={buttonsData}
        setButtonsData={setButtonsData}
        developmentScenariosCompleted={developmentScenariosCompleted}
        moreStyles={{
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 20,
        }}
        marginTop={20}
        buttonWidth={"90%"}
        buttonHeight={70}
      />
    </ApexFlexContainer>
  );
};

export default SelectScenariosByButtons;
