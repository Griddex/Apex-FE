import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { plotMargins, scaleOptions } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ScaleLinearSpec, ScaleSpec } from "../ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexPlotMargins from "../Margins/ApexPlotMargins";
import YScale from "../Scales/YScale";

const ApexLinePlotStyle = ({
  basePath,
  updateParameterAction,
  chartType,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const plotRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );
  console.log(
    "Logged output --> ~ file: ApexLinePlotSyle.tsx ~ line 28 ~ chartProps",
    chartProps
  );

  const { xScale, xFormat, yScale, yFormatString, margin } = chartProps;

  const xScaleOption = scaleOptions.find(
    (option) => option.value === xScale.type
  );

  const handleGeneralSelect =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (option: ValueType<ISelectOption, false>) => {
      const optionValue = (option as ISelectOption).value as string;

      let value: any;
      if (isObj) {
        value = { ...obj, [objKey as string]: optionValue };
      } else {
        value = optionValue;
      }

      setChartProps((prev) => ({
        ...prev,
        [name]: value,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, value));
    };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <AnalyticsComp
        title="XValue Scale"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={xScaleOption as ISelectOption}
            data={scaleOptions}
            handleSelect={handleGeneralSelect("xScale", true, xScale, "type")}
            menuPortalTarget={plotRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
      <AnalyticsComp
        title="XValue Format"
        direction="Vertical"
        containerStyle={{
          marginTop: 20,
        }}
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
        title="YValue Scale"
        direction="Vertical"
        containerStyle={{
          marginTop: 20,
          borderTop: `1px solid ${theme.palette.grey["400"]}`,
          paddingTop: 5,
        }}
        content={
          <YScale
            basePath={basePath as string}
            yScale={yScale as ScaleLinearSpec}
            scaleOptions={scaleOptions}
            actionPath={`${basePath}.yScale`}
            action={(path: string, value: any) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            yScaleContextFxn={(value: any, name?: keyof ScaleLinearSpec) => {
              const nameDefined = name as keyof ScaleLinearSpec;

              setChartProps((prev) => ({
                ...prev,
                yScale: { ...prev["yScale"], [nameDefined]: value },
              }));
            }}
            ref={plotRef}
          />
        }
      />
      <AnalyticsComp
        title="YValue Format"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ChartValueFormatters
            basePath={basePath as string}
            intialFormatValue={{ format: yFormatString, enabled: false }}
            plotRef={plotRef}
            updateParameterAction={
              updateParameterAction as IApexChartFormatProps["updateParameterAction"]
            }
            axisFormatTitle="yFormatString"
            setValueFormat={setChartProps}
          />
        }
      />
      <AnalyticsComp
        title="Margins"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexPlotMargins
            basePath={basePath as string}
            margin={margin}
            updateParameterAction={
              updateParameterAction as IApexChartFormatProps["updateParameterAction"]
            }
            setMargins={setChartProps}
            plotMarginData={plotMargins}
          />
        }
      />
    </div>
  );
};

export default ApexLinePlotStyle;
