import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { plotMargins, scaleOptions } from "../../Data/VisualyticsData";
import {
  IApexChartFormatProps,
  IApexLinePlotStyle,
} from "../Charts/ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import ApexPlotMargins from "../Margins/ApexPlotMargins";
import YScale from "../Scales/YScale";

export type TMargin = "top" | "right" | "bottom" | "left";

const ApexLinePlotStyle = ({
  workflowCategory,
  workflowProcess,
  updateParameterAction,
  chartType,
  margin,
  xScale,
  xFormat,
  yScale,
  yFormat,
}: IApexLinePlotStyle & Partial<IApexChartFormatProps>) => {
  const dispatch = useDispatch();
  const wc = workflowCategory;
  const wp = workflowProcess;

  const plotRef = React.useRef<HTMLDivElement>(null);

  const basePath = `${wc}.${wp}.${chartType}.otherProperties`;
  const xScaleOption = scaleOptions.find((option) => option.value === xScale);
  const yScaleOption = scaleOptions.find((option) => option.value === yScale);

  const plotMarginData = plotMargins.map((rowArr) => {
    const optionsArr = rowArr.map((opt) => ({
      ...opt,
      action: () => {
        const marginType = opt.label.toLowerCase() as TMargin;

        updateParameterAction &&
          dispatch(
            updateParameterAction(
              `${basePath}.margin.${marginType}`,
              margin[marginType]
            )
          );
      },
    }));

    return optionsArr;
  });

  return (
    <div ref={plotRef} style={{ width: "100%", padding: 5 }}>
      <AnalyticsComp
        title="X Scale"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={xScaleOption as ISelectOption}
            data={scaleOptions}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              updateParameterAction &&
                dispatch(
                  updateParameterAction(`${basePath}.xScale`, {
                    type: (option as ISelectOption).value,
                  })
                );
            }}
            menuPortalTarget={plotRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
      <AnalyticsComp
        title="X Format"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ChartValueFormatters
            basePath={basePath}
            intialFormatValue={{ format: xFormat, enabled: false }}
            plotRef={plotRef}
            updateParameterAction={
              updateParameterAction as IApexChartFormatProps["updateParameterAction"]
            }
            axisFormat="xFormat"
          />
        }
      />
      <AnalyticsComp
        title="Y Scale"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <YScale
            yScaleOption={yScaleOption as ISelectOption}
            scaleOptions={scaleOptions}
            action={(value) => {
              updateParameterAction &&
                dispatch(updateParameterAction(`${basePath}.yScale`, value));
            }}
            ref={plotRef}
          />
        }
      />
      <AnalyticsComp
        title="Margins"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={<ApexPlotMargins plotMarginData={plotMarginData} />}
      />
    </div>
  );
};

export default ApexLinePlotStyle;
