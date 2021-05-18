import { useTheme } from "@material-ui/core";
import map from "lodash.map";
import random from "lodash.random";
import range from "lodash.range";
import React from "react";
import { useDrop } from "react-dnd";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IEconomicsTemplateChart {
  layout: Layout[];
  currentBreakpoint: string;
  compactType: "vertical" | "horizontal" | null;
  mounted: boolean;
  layouts: { lg: Layout[] };
}

const EconomicsTemplateChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { selectedChartIndex } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const [layoutConfig, setConfigLayout] =
    React.useState<IEconomicsTemplateChart>({
      layout: [],
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: generateLayout() },
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
    return map(layoutConfig.layouts.lg, function (l: Layout, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
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
    onLayoutChange(layout, layouts);
  };

  const onNewLayout = () => {
    setConfigLayout((prev) => ({ ...prev, layouts: { lg: generateLayout() } }));
  };

  React.useEffect(() => {
    setConfigLayout((prev) => ({ ...prev, mount: true }));
  }, [layoutConfig.mounted]);

  return (
    <CenteredStyle flexDirection="column" height={"calc(100% - 50px)"}>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <CenteredStyle flexDirection="column" height={"calc(100% - 50px)"}>
        <ResponsiveReactGridLayout
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
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </CenteredStyle>
    </CenteredStyle>
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
