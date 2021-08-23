import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { plotMargins, scaleOptions } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexPlotMargins from "../Margins/ApexPlotMargins";
import YScale from "../Scales/YScale";

export type TMargin = "top" | "right" | "bottom" | "left";

const ApexLinePlotStyle = ({
  basePath,
  updateParameterAction,
  chartType,
}: Partial<IApexChartFormatProps>) => {
  const dispatch = useDispatch();
  const plotRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const { xScale, xFormat, yScale, yFormat, margin } = chartProps;

  const xScaleOption = scaleOptions.find(
    (option) => option.value === xScale.type
  );
  const yScaleOption = scaleOptions.find(
    (option) => option.value === yScale.type
  );

  const handleGeneralSelect =
    (name: keyof IChart) => (option: ValueType<ISelectOption, false>) => {
      setChartProps((prev) => ({
        ...prev,
        [name]: (option as ISelectOption).value as string,
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${name}`, {
            scheme: (option as ISelectOption).value,
          })
        );
    };

  const plotMarginData = plotMargins.map((rowArr) => {
    const optionsArr = rowArr.map((opt) => ({
      ...opt,
      action: () => {
        const marginType = opt.label.toLowerCase() as TMargin;

        setChartProps((prev) => ({
          ...prev,
          margin: { ...prev.margin, [marginType]: opt.value },
        }));

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
            handleSelect={handleGeneralSelect("xScale")}
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
            basePath={basePath as string}
            intialFormatValue={{ format: xFormat, enabled: false }}
            plotRef={plotRef}
            updateParameterAction={
              updateParameterAction as IApexChartFormatProps["updateParameterAction"]
            }
            axisFormatTitle="xFormat"
            setValueFormat={setChartProps}
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
            action={handleGeneralSelect("yScale")}
            ref={plotRef}
          />
        }
      />
      <AnalyticsComp
        title="Y Format"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ChartValueFormatters
            basePath={basePath as string}
            intialFormatValue={{ format: yFormat, enabled: false }}
            plotRef={plotRef}
            updateParameterAction={
              updateParameterAction as IApexChartFormatProps["updateParameterAction"]
            }
            axisFormatTitle="yFormat"
            setValueFormat={setChartProps}
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
