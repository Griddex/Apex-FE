import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  curveOptions,
  colorsOptions,
  areaBlendOptions,
  plotMargins,
  scaleOptions,
} from "../../Data/VisualyticsData";
import {
  IApexChartFormatProps,
  IApexLinePlotStyle,
} from "../Charts/ChartTypes";
import ApexPlotMargins from "../Margins/ApexPlotMargins";
import YScale from "../Scales/YScale";
import ApexSlider from "../Sliders/ApexSlider";

const ApexLinePlotStyle = ({
  workflowProcess,
  updateParameterAction,
  chartType,
  margin,
  xScale,
  xFormat,
  yScale,
  yFormat,
}: IApexLinePlotStyle & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wp = workflowProcess;

  const plotRef = React.useRef<HTMLDivElement>(null);

  const basePath = `economicsChartsWorkflows.${wp}.${chartType}`;
  const xScaleOption = scaleOptions.find((option) => option.value === xScale);
  const yScaleOption = scaleOptions.find((option) => option.value === yScale);

  const plotMarginData = plotMargins.map((rowArr) => {
    const optionsArr = rowArr.map((opt) => ({
      ...opt,
      action: () => {
        updateParameterAction &&
          dispatch(
            updateParameterAction(
              `${basePath}.margin.${opt.label.toLowerCase()}`,
              opt.value
            )
          );
      },
    }));

    return optionsArr;
  });

  return (
    <div style={{ width: "100%", padding: 5 }}>
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
