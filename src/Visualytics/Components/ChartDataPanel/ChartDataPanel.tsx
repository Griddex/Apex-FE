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
  showMembersObjValues?: boolean[];
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
  showMembersObjValues,
}: IChartDataPanel<T>) => {
  const theme = useTheme();

  const CategoriesComponent = categoriesComponent as JSX.Element;
  const SecondarySelectComponent = secondarySelectComponent as React.FC;
  const TreeViewComponent = treeViewComponent as React.FC;

  const [render, setRender] = React.useState(false);
  const [categorySizePosition, setCategorySizePosition] = React.useState({
    width: 385,
    height: 540,
    x: 300,
    y: 0,
  });
  console.log(
    "Logged output --> ~ file: ChartDataPanel.tsx ~ line 58 ~ categorySizePosition",
    categorySizePosition
  );

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

  const categoryExpanded = showMembersObjValues?.some((v) => v === true);

  React.useEffect(() => {
    setRender(!render);
  }, [showMembersObjValues?.join()]);

  return (
    <ApexFlexContainer flexDirection="column">
      {extrudeCategories && (
        <Rnd
          style={{ zIndex: 2000, padding: 2 }}
          size={{
            width: categoryExpanded
              ? categorySizePosition.width + 150
              : categorySizePosition.width,
            height: categorySizePosition.height,
          }}
          position={{
            x: categorySizePosition.x,
            y: categorySizePosition.y,
          }}
          onDragStop={(e, d) =>
            setCategorySizePosition((prev) => ({ ...prev, x: d.x, y: d.y }))
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            setCategorySizePosition({
              width: Number(ref.style.width),
              height: Number(ref.style.height),
              ...position,
            });
          }}
        >
          <DraggableDialog
            title="Title"
            iconType="category"
            onClose={() => setExtrudeCategories && setExtrudeCategories(false)}
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
