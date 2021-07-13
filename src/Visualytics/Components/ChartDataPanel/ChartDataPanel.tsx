import { useTheme } from "@material-ui/core/styles";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import React from "react";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";

export interface IChartDataPanel<T = ISelectOption> {
  selectLabel: string;
  selectedOption: T;
  titleOptions: T[];
  selectedTitle: string;
  handleSelectChange: (row: ValueType<T, false>) => void;
  hasSecondaryComponent: boolean;
  secondarySelectComponent?: React.FC;
  treeViewComponent: React.FC;
  categoriesAction?: () => void;
}

const ChartDataPanel = <T extends ISelectOption>({
  selectLabel,
  selectedOption,
  titleOptions,
  handleSelectChange,
  hasSecondaryComponent,
  secondarySelectComponent,
  treeViewComponent: TreeViewComponent,
  categoriesAction,
}: IChartDataPanel<T>) => {
  const theme = useTheme();
  const SecondarySelectComponent = secondarySelectComponent as React.FC;

  const SelectTitle = () => {
    return (
      <ApexSelectRS<T>
        valueOption={selectedOption}
        data={titleOptions}
        handleSelect={handleSelectChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerWidth={300}
      />
    );
  };

  const apexIconButtonStyle = {
    height: "28px",
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 2,
    marginLeft: 4,
  };

  return (
    <ApexFlexContainer flexDirection="column">
      <AnalyticsComp
        title={selectLabel}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectTitle />
            <CallMadeOutlinedIcon style={apexIconButtonStyle} />
          </div>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
      {hasSecondaryComponent && <SecondarySelectComponent />}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          overflow: "auto",
        }}
      >
        <TreeViewComponent />
      </div>
      <ApexFlexContainer height={50} justifyContent="flex-end">
        <CategoryOutlinedIcon
          style={apexIconButtonStyle}
          onClick={categoriesAction}
        />
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default ChartDataPanel;
