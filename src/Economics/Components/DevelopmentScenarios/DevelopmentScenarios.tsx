import React from "react";
import { useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { RenderTree } from "./../../../Visualytics/Components/TreeView/ApexTreeViewTypes";

const DevelopmentScenarios = () => {
  const { sensitivitiesHeatMapTree } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const devScenariosColl = sensitivitiesHeatMapTree["children"] as NonNullable<
    RenderTree["children"]
  >;
  const devOptions = devScenariosColl.map((row) => ({
    value: row.title,
    label: row.title,
  }));

  devOptions.unshift({
    value: "select",
    label: "Select...",
  });

  const [devOption, setDevOption] = React.useState(devOptions[0]);

  return (
    <AnalyticsComp
      title="Development Scenarios"
      content={
        <ApexSelectRS
          valueOption={devOption as NonNullable<ISelectOption>}
          data={devOptions as NonNullable<ISelectOption[]>}
          handleSelect={(option: ValueType<ISelectOption, false>) => {
            const optionDefined = option as NonNullable<ISelectOption>;

            setDevOption(optionDefined);
          }}
          isSelectOptionType={true}
          menuPortalTarget={document.body}
          containerWidth={"100%"}
        />
      }
      direction="Vertical"
      containerStyle={{ width: "100%", marginBottom: 20 }}
    />
  );
};

export default DevelopmentScenarios;
