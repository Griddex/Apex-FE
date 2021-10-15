import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import React from "react";
import { Rnd } from "react-rnd";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { getApexIconButtonStyle } from "../../../Application/Styles/IconButtonStyles";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

const DraggableDialog = React.lazy(
  () => import("../../../Application/Components/Dialogs/DraggableDialog")
);

export interface ITreeViewProps {
  height: number;
}

export interface IChartDataPanel<T = ISelectOption> {
  selectLabel: string;
  selectedOption: T;
  titleOptions: T[];
  selectedTitle: string;
  handleSelectChange: (row: ValueType<T, false>) => void;
  hasSecondaryComponent: boolean;
  secondarySelectComponent?: React.FC;
  treeViewComponent: React.FC<any>;
  extrudeCategories?: boolean;
  setExtrudeCategories?: TUseState<boolean>;
  categoriesComponent?: JSX.Element;
  renderCategoryIcon: boolean;
  showMembersObjValues?: boolean[];
  clearChartCategories?: () => IAction;
}

const ChartDataPanel: React.FC<IChartDataPanel<IExtendedSelectOption>> = ({
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
  clearChartCategories,
}) => {
  // const ChartDataPanel = <T extends ISelectOption>({
  //   selectLabel,
  //   selectedOption,
  //   titleOptions,
  //   handleSelectChange,
  //   hasSecondaryComponent,
  //   secondarySelectComponent,
  //   treeViewComponent,
  //   extrudeCategories,
  //   setExtrudeCategories,
  //   categoriesComponent,
  //   renderCategoryIcon,
  //   showMembersObjValues,
  //   clearChartCategories,
  // }: IChartDataPanel<T>) => {
  const theme = useTheme();
  const treeRef = React.useRef<HTMLDivElement>(null);

  const CategoriesComponent = categoriesComponent as JSX.Element;
  const SecondarySelectComponent = secondarySelectComponent as React.FC;
  const TreeViewComponent = treeViewComponent as React.FC<ITreeViewProps>;

  const [render, setRender] = React.useState(false);
  const [treeHeight, setTreeHeight] = React.useState(0);
  const [categorySizePosition, setCategorySizePosition] = React.useState({
    width: 385,
    height: 540,
    x: 300,
    y: 0,
  });

  const SelectTitle = () => {
    return (
      <ApexSelectRS<IExtendedSelectOption>
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
    const treeViewDimen = treeRef.current?.getBoundingClientRect();
    const treeViewHeight = treeViewDimen?.height as number;
    setTreeHeight(treeViewHeight);
  }, []);

  React.useEffect(() => {
    setRender(!render);
  }, [showMembersObjValues?.join()]);

  return (
    <ApexFlexContainer flexDirection="column" justifyContent="flex-start">
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
        ref={treeRef}
        style={{
          width: "100%",
          height: "100%",
          borderTop: `1px solid ${theme.palette.grey[300]}`,
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <TreeViewComponent height={treeHeight} />
      </div>
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
            title="Chart Categories"
            iconType="category"
            onClose={() => setExtrudeCategories && setExtrudeCategories(false)}
            actionsList={() => (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => clearChartCategories && clearChartCategories()}
                  startIcon={<CloseOutlinedIcon />}
                >
                  {"Clear"}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setExtrudeCategories && setExtrudeCategories(false)
                  }
                  startIcon={<CallReceivedIcon />}
                >
                  {"Hide"}
                </Button>
              </>
            )}
          >
            {CategoriesComponent}
          </DraggableDialog>
        </Rnd>
      )}
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
