import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexRadioGroup from "../../../Application/Components/Radios/ApexRadioGroup";
import { IExtendedSelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IEconomicsResultsVisualytics } from "../../../Economics/Routes/EconomicsResults/EconomicsResultsTypes";

const CategoryPanelComponent = ({
  selectedZ,
  setSelectedZ,
  variableZDataOptions,
  ZValuesTitle,
}: IEconomicsResultsVisualytics) => {
  return (
    <AnalyticsComp
      title={ZValuesTitle as string}
      direction="Vertical"
      containerStyle={{ marginTop: 20, alignItems: "flex-start" }}
      content={
        <ApexRadioGroup
          selectedVariable={selectedZ}
          setSelectedVariable={setSelectedZ}
          apexRadioGroupData={
            variableZDataOptions as IExtendedSelectOption<
              string,
              string,
              string
            >[]
          }
        />
      }
    />
  );
};

export default React.memo(CategoryPanelComponent);
