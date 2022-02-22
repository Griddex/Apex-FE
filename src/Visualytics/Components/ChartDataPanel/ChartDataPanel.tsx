import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Rnd } from "react-rnd";
import { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import DraggableDialog from "../../../Application/Components/Dialogs/DraggableDialog";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { getApexIconButtonStyle } from "../../../Application/Styles/IconButtonStyles";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface ITreeViewProps {
  height?: number;
  droppedIds?: string[];
}

export interface IChartDataPanel<T = ISelectOption> {
  selectLabel: string;
  selectedOption: T;
  titleOptions: T[];
  selectedTitle: string;
  handleSelectChange: (row: OnChangeValue<T, false>) => void;
  hasSecondaryComponent: boolean;
  resultsSelect?: React.FC;
  secondarySelectComponent?: React.FC;
  treeViewComponent: React.FC<any>;
  extrudeCategories?: boolean;
  setExtrudeCategories?: TUseState<boolean>;
  categoriesComponent?: JSX.Element;
  renderCategoryIcon: boolean;
  showMembersObjValues?: boolean[];
  clearChartCategories?: () => IAction;
  hasTitle?: boolean;
  title?: string;
}

const ChartDataPanel: React.FC<IChartDataPanel<IExtendedSelectOption>> = ({
  selectLabel,
  resultsSelect,
  hasSecondaryComponent,
  secondarySelectComponent,
  treeViewComponent,
  extrudeCategories,
  setExtrudeCategories,
  categoriesComponent,
  renderCategoryIcon,
  showMembersObjValues,
  clearChartCategories,
  hasTitle,
  title,
}) => {
  const theme = useTheme();

  const ResultsSelect = resultsSelect as React.FC;
  const CategoriesComponent = categoriesComponent as JSX.Element;
  const SecondarySelectComponent = secondarySelectComponent as React.FC;
  const TreeViewComponent = treeViewComponent as React.FC<ITreeViewProps>;

  const [render, setRender] = React.useState(false);
  const [categorySizePosition, setCategorySizePosition] = React.useState({
    width: 385,
    height: 540,
    x: 300,
    y: 0,
  });

  const categoryExpanded = showMembersObjValues?.some((v) => v === true);

  React.useEffect(() => {
    setRender(!render);
  }, [showMembersObjValues?.join()]);

  return (
    <ApexFlexContainer flexDirection="column" justifyContent="flex-start">
      <AnalyticsComp
        title={selectLabel}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ResultsSelect />
            <OpenInNewOutlinedIcon style={getApexIconButtonStyle(theme)} />
          </div>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
      {hasSecondaryComponent && <SecondarySelectComponent />}
      {hasTitle && title !== "Select..." && (
        <div
          style={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            width: "100%",
            border: `1px solid ${theme.palette.grey[300]}`,
            backgroundColor: theme.palette.grey["200"],
          }}
        >
          {title}
        </div>
      )}
      <SizeMe monitorHeight refreshRate={32}>
        {({ size }) => (
          <TreeViewComponent
            height={size.height ? (size.height as number) : 800}
          />
        )}
      </SizeMe>
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

export default React.memo(ChartDataPanel);
