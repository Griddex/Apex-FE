import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexRadioGroup from "../../../Application/Components/Radios/ApexRadioGroup";
import {
  IExtendedSelectOption,
  IIdNameTitlePathOption,
} from "../../../Application/Components/Selects/SelectItemsType";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface ICategoryPanelComponent {
  variableOptions: Record<string, IIdNameTitlePathOption>;
  setSelectedZ: TUseState<string>;
}

const CategoryPanelComponent = ({
  variableOptions,
  setSelectedZ,
}: ICategoryPanelComponent) => {
  const zKey = Object.keys(variableOptions)[0];
  const zObj = variableOptions[zKey];

  let title = "";
  let zStrValues = "";
  let variableData = [] as IExtendedSelectOption[];
  if (Object.keys(variableOptions).length > 0) {
    const parts = zObj?.title?.split("_");
    title = parts[0];
    zStrValues = parts[1];

    variableData = zStrValues?.split("-")?.map((v: string) => {
      return {
        value: v,
        label: v,
        handleCheck: () => setSelectedZ(v),
      };
    });
  }

  return (
    <AnalyticsComp
      title={title}
      direction="Vertical"
      containerStyle={{ marginTop: 20, alignItems: "flex-start" }}
      content={
        <ApexRadioGroup
          apexRadioGroupData={variableData as IExtendedSelectOption[]}
        />
      }
    />
  );
};

export default CategoryPanelComponent;
