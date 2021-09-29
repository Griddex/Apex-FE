import { useTheme } from "@material-ui/core";
import map from "lodash.map";
import random from "lodash.random";
import range from "lodash.range";
import React from "react";
import { useDrop } from "react-dnd";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IEconomicsTemplateChart {
  currentBreakpoint: string;
  layout: Layout[];
  compactType: "vertical" | "horizontal" | null;
  mounted: boolean;
  layouts: { lg: Layout[] };
  cols: { lg: 12; md: 10; sm: 6; xs: 4; xxs: 2 };
  className: "layout";
  rowHeight: 30;
}

const EconomicsTemplateChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { selectedChartIndex } = useSelector(
    (state: RootState) => state.visualyticsReducer
  );

  const [layoutConfig, setConfigLayout] =
    React.useState<IEconomicsTemplateChart>({
      currentBreakpoint: "lg",
      layout: [],
      compactType: "vertical",
      mounted: false,
      layouts: { lg: generateLayout() },
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      className: "layout",
      rowHeight: 30,
    });
  const [parameter3, setParameter3] = React.useState("Z");

  const [{ isOverY, canDropY }, dropY] = useDrop({
    accept: itemTypes.ECONOMICS_TEMPLATECHARTS,
    drop: (item, monitor) => alert(`You dropped ${item}`),
    collect: (monitor) => {
      return {
        isOverY: !!monitor.isOver(),
        canDropY: !!monitor.canDrop(),
      };
    },
  });

  const isActiveY = canDropY && isOverY;
  let dndCanvasStyleY = {};
  if (isActiveY) {
    dndCanvasStyleY = {
      border: "1px solid green",
    };
  } else if (canDropY) {
    dndCanvasStyleY = {
      border: "1px solid grey",
    };
  }

  const [{ isOverX, canDropX }, dropX] = useDrop({
    accept: itemTypes.ECONOMICS_TEMPLATECHARTS,
    drop: (item, monitor) => console.log(item, monitor),
    collect: (monitor) => {
      return {
        isOverX: !!monitor.isOver(),
        canDropX: !!monitor.canDrop(),
      };
    },
  });

  const isActiveX = canDropX && isOverX;
  let dndCanvasStyleX = {};
  if (isActiveX) {
    dndCanvasStyleX = {
      border: "1px solid green",
    };
  } else if (canDropX) {
    dndCanvasStyleX = {
      border: "1px solid grey",
    };
  }

  const generateDOM = () => {
    return map(layoutConfig.layouts.lg, function (l: any, i) {
      return (
        <div
          key={i}
          className={l.static ? "static" : ""}
          style={{ backgroundColor: theme.palette.grey["200"] }}
        >
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint: string) => {
    setConfigLayout((prev) => ({ ...prev, currentBreakpoint: breakpoint }));
  };

  const onCompactTypeChange = () => {
    const { compactType: oldCompactType } = layoutConfig;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";

    setConfigLayout((prev) => ({ ...prev, compactType }));
  };

  const onLayoutChange = (
    layout: Layout[],
    layouts: IEconomicsTemplateChart["layouts"]
  ) => {
    setConfigLayout((prev) => ({ ...prev, layout: layout, layouts }));
  };

  const onNewLayout = () => {
    setConfigLayout((prev) => ({ ...prev, layouts: { lg: generateLayout() } }));
  };

  React.useEffect(() => {
    setConfigLayout((prev) => ({ ...prev, mounted: true }));
  }, []);

  return (
    <ApexFlexContainer flexDirection="column" height={"calc(100% - 50px)"}>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <ApexFlexContainer flexDirection="column" height={"calc(100% - 50px)"}>
        <ResponsiveReactGridLayout
          style={{ width: "100%" }}
          {...layoutConfig}
          layouts={layoutConfig.layouts}
          onBreakpointChange={onBreakpointChange}
          onLayoutChange={onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={layoutConfig.mounted}
          compactType={layoutConfig.compactType}
          preventCollision={!layoutConfig.compactType}
          isDraggable={true}
          isResizable={true}
          resizeHandles={["se"]}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

function generateLayout() {
  return map(range(0, 25), function (item, i) {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}

export default EconomicsTemplateChart;
