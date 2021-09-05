import { useTheme } from "@material-ui/core/styles";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import React from "react";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import { getApexIconButtonStyle } from "../../../Application/Styles/IconButtonStyles";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import NewWindow from "rc-new-window";

export interface IChartDataPanel<T = ISelectOption> {
  selectLabel: string;
  selectedOption: T;
  titleOptions: T[];
  selectedTitle: string;
  handleSelectChange: (row: ValueType<T, false>) => void;
  hasSecondaryComponent: boolean;
  secondarySelectComponent?: React.FC;
  treeViewComponent: React.FC;
  extrudeCategories?: boolean;
  setExtrudeCategories?: TUseState<boolean>;
  categoriesComponent?: JSX.Element;
}

const ChartDataPanel = <T extends ISelectOption>({
  selectLabel,
  selectedOption,
  titleOptions,
  handleSelectChange,
  hasSecondaryComponent,
  secondarySelectComponent,
  treeViewComponent,
  extrudeCategories,
  setExtrudeCategories,
  categoriesComponent,
}: IChartDataPanel<T>) => {
  const theme = useTheme();
  const CategoriesComponent = categoriesComponent as JSX.Element;
  const SecondarySelectComponent = secondarySelectComponent as React.FC;
  const TreeViewComponent = treeViewComponent as React.FC;

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

  return (
    <ApexFlexContainer flexDirection="column">
      <AnalyticsComp
        title={selectLabel}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectTitle />
            <OpenInNewOutlinedIcon style={getApexIconButtonStyle(theme)} />
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
          borderTop: `1px solid ${theme.palette.grey[300]}`,
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          overflow: "auto",
        }}
      >
        <TreeViewComponent />
      </div>
      <ApexFlexContainer height={50} justifyContent="flex-end">
        {extrudeCategories && (
          <NewWindow
            onClose={() => setExtrudeCategories && setExtrudeCategories(false)}
            copyStyles={true}
            height={800}
            width={400}
          >
            {CategoriesComponent}
          </NewWindow>
        )}

        <CategoryOutlinedIcon
          style={getApexIconButtonStyle(theme)}
          onClick={() =>
            setExtrudeCategories && setExtrudeCategories(!extrudeCategories)
          }
        />
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default ChartDataPanel;
