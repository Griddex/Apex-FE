import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  indexScaleOptions,
  plotMargins,
  scaleOptions,
  valueScaleOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { lin_sct, bar } from "../../Utils/ChartFormatDiscriminators";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ScaleLinearSpec, ScaleSpec } from "../ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexPlotMargins from "../Margins/ApexPlotMargins";
import YScale from "../Scales/YScale";

const ApexPlotStyle = ({
  basePath,
  updateParameterAction,
  chartType,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const plotRef = React.useRef<HTMLDivElement>(null);

  const chartTypeDefined = chartType as string;

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );
  console.log(
    "Logged output --> ~ file: ApexLinePlotSyle.tsx ~ line 28 ~ chartProps",
    chartProps
  );

  const {
    xScale,
    xFormat,
    yScale,
    yFormatString,
    valueScale,
    indexScale,
    reverse,
    margin,
  } = chartProps;

  const xScaleOption = scaleOptions.find(
    (option) => option.value === xScale.type
  );

  const valueScaleOption = valueScaleOptions.find(
    (option) => option.value === valueScale.type
  );

  const indexScaleOption = indexScaleOptions.find(
    (option) => option.value === indexScale.type
  );

  const handlePlotStyleSelect =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (option: OnChangeValue<ISelectOption, false>) => {
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

  const handlePlotStyleSwitch =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (event: React.ChangeEvent<any>) => {
      const switchValue = event.target.value;

      let value: any;
      if (isObj) {
        value = { ...obj, [objKey as string]: switchValue };
      } else {
        value = switchValue;
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
      {lin_sct.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="XValue Scale"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={xScaleOption as ISelectOption}
              data={scaleOptions}
              handleSelect={handlePlotStyleSelect(
                "xScale",
                true,
                xScale,
                "type"
              )}
              menuPortalTarget={plotRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {lin_sct.includes(chartTypeDefined) && (
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
      )}

      {lin_sct.includes(chartTypeDefined) && (
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
      )}

      {lin_sct.includes(chartTypeDefined) && (
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
      )}

      {bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Value Scale"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={valueScaleOption as ISelectOption}
              data={valueScaleOptions}
              handleSelect={handlePlotStyleSelect(
                "valueScale",
                true,
                valueScale,
                "type"
              )}
              menuPortalTarget={plotRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Index Scale"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <>
              <ApexSelectRS
                valueOption={indexScaleOption as ISelectOption}
                data={indexScaleOptions}
                handleSelect={handlePlotStyleSelect(
                  "indexScale",
                  true,
                  indexScale,
                  "type"
                )}
                menuPortalTarget={plotRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
              <AnalyticsComp
                title="Round"
                direction="Vertical"
                containerStyle={{ marginTop: 20 }}
                content={
                  <ApexMuiSwitch
                    name={"round"}
                    handleChange={handlePlotStyleSwitch(
                      "indexScale",
                      true,
                      indexScale,
                      "round"
                    )}
                    checked={indexScale["round"] as boolean}
                    checkedColor={theme.palette.success.main}
                    notCheckedColor={theme.palette.common.white}
                    hasLabels={true}
                    leftLabel="Off"
                    rightLabel="On"
                  />
                }
              />
            </>
          }
        />
      )}

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

export default ApexPlotStyle;
