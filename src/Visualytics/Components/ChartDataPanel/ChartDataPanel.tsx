import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import React from "react";
import { Rnd } from "react-rnd";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import DraggableDialog from "../../../Application/Components/Dialogs/DraggableDialog";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { getApexIconButtonStyle } from "../../../Application/Styles/IconButtonStyles";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
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
  renderCategoryIcon: boolean;
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
  renderCategoryIcon,
}: IChartDataPanel<T>) => {
  const theme = useTheme();
  const CategoriesComponent = categoriesComponent as JSX.Element;
  const SecondarySelectComponent = secondarySelectComponent as React.FC;
  const TreeViewComponent = treeViewComponent as React.FC;

  const [categorySize, setCategorySize] = React.useState({
    width: 300,
    height: 540,
  });
  const [categoryPosition, setCategoryPosition] = React.useState({
    x: 0,
    y: 0,
  });

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
          <Rnd
            style={{ zIndex: 2000 }}
            size={{
              width: categorySize.width,
              height: categorySize.height,
            }}
            position={{
              x: categoryPosition.x,
              y: categoryPosition.y,
            }}
            onDragStop={(e, d) => setCategoryPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
              setCategorySize({
                width: Number(ref.style.width),
                height: Number(ref.style.height),
              });
              setCategoryPosition(position);
            }}
          >
            <DraggableDialog
              title="Title"
              iconType="category"
              onClose={() =>
                setExtrudeCategories && setExtrudeCategories(false)
              }
              actionsList={() => (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    setExtrudeCategories && setExtrudeCategories(false)
                  }
                  startIcon={<CallReceivedIcon />}
                >
                  {"Hide"}
                </Button>
              )}
            >
              {CategoriesComponent}
            </DraggableDialog>
          </Rnd>
        )}

        {renderCategoryIcon && (
          <CategoryOutlinedIcon
            style={getApexIconButtonStyle(theme)}
            onClick={() =>
              setExtrudeCategories && setExtrudeCategories(!extrudeCategories)
            }
          />
        )}
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default ChartDataPanel;
