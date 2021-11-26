import { Input, TextareaAutosize, useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { axisTitlePositionOptions } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { stk_lin_bar_sct_htm } from "../../Utils/ChartFormatDiscriminators";
import { IApexChartAxis, IApexChartFormatProps } from "../Charts/ChartTypes";
import { AxisProps, TAxisName } from "../ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartAxis = ({
  basePath,
  updateParameterAction,
  chartType,
  axisName,
}: IApexChartAxis & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const axisRef = React.useRef<HTMLDivElement>(null);

  const chartTypeDefined = chartType as string;

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const { enableApexAxes, minValue, maxValue, valueFormatString, reverse } =
    chartProps;
  const axisObj = chartProps[axisName as TAxisName];
  const axisNameDefined = axisName as TAxisName;

  const axisObjRef = React.useRef(axisObj);

  const handleAxisSelect =
    (name: TAxisName, isObj?: boolean, obj?: any, objKey?: string) =>
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

  const handleAxisChange =
    (
      name: TAxisName | keyof IChart,
      isObj?: boolean,
      obj?: any,
      objKey?: string
    ) =>
    (event: React.ChangeEvent<any>) => {
      const { value: optionValue } = event.target;

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

  const handleAxisSwitch =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: TAxisName) =>
    (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      let value: any;
      if (isObj) {
        value = { ...obj, [objKey as string]: checked };
      } else {
        value = checked;
      }

      setChartProps((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (checked) {
        updateParameterAction &&
          dispatch(updateParameterAction(`${basePath}.${name}`, value));
        updateParameterAction &&
          dispatch(
            updateParameterAction(
              `${basePath}.${axisNameDefined}`,
              axisObjRef.current //initial obj
            )
          );
      } else {
        updateParameterAction &&
          dispatch(
            updateParameterAction(
              `${basePath}.${axisNameDefined}`,
              null //initial obj
            )
          );
      }
    };

  const axisTitlePositionOption = axisTitlePositionOptions.find(
    (option) => option.value === axisObj?.legendPosition
  );

  return (
    <div style={{ width: "100%", padding: 10 }}>
      {stk_lin_bar_sct_htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title=""
          direction="Vertical"
          content={
            <ApexMuiSwitch
              name={axisNameDefined}
              handleChange={handleAxisSwitch(
                "enableApexAxes",
                true,
                enableApexAxes,
                axisNameDefined
              )}
              checked={enableApexAxes[axisNameDefined]}
              checkedColor={theme.palette.success.main}
              notCheckedColor={theme.palette.common.white}
              hasLabels={true}
              leftLabel="Disable"
              rightLabel="Enable"
            />
          }
        />
      )}

      {stk_lin_bar_sct_htm.includes(chartTypeDefined) &&
        enableApexAxes[axisNameDefined] && (
          <>
            <AnalyticsComp
              title="Axis Title"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <TextareaAutosize
                  name={axisName}
                  style={{ height: 50, width: "100%" }}
                  minRows={4}
                  value={axisObj?.legend as string}
                  onChange={handleAxisChange(
                    axisNameDefined,
                    true,
                    axisObj,
                    "legend"
                  )}
                />
              }
            />

            <AnalyticsComp
              title="Title Offset"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ApexSlider
                  name="titleOffset"
                  sliderValue={axisObj?.legendOffset as number}
                  step={1}
                  min={-60}
                  max={60}
                  actionPath={`${basePath}.${axisName}`}
                  action={(path, value) =>
                    updateParameterAction &&
                    dispatch(
                      updateParameterAction(path, {
                        ...axisObj,
                        legendOffset: value,
                      })
                    )
                  }
                  sliderContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      [axisName]: {
                        ...prev[axisNameDefined],
                        legendOffset: value,
                      },
                    }));
                  }}
                />
              }
            />

            <AnalyticsComp
              title="Title Position"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ApexSelectRS
                  valueOption={axisTitlePositionOption as ISelectOption}
                  data={axisTitlePositionOptions}
                  handleSelect={handleAxisSelect(
                    axisNameDefined,
                    true,
                    axisObj,
                    `legendPosition`
                  )}
                  menuPortalTarget={axisRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                  containerHeight={40}
                />
              }
            />

            <AnalyticsComp
              title="Min Value"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  <ApexMuiSwitch
                    name={"minValue"}
                    handleChange={handleAxisSwitch("minValue")}
                    checked={minValue === "auto" ? true : false}
                    checkedColor={theme.palette.success.main}
                    notCheckedColor={theme.palette.common.white}
                    hasLabels={true}
                    leftLabel="Manual"
                    rightLabel="Auto"
                  />
                  {minValue === "auto" || (
                    <Input
                      value={minValue}
                      onChange={handleAxisChange("minValue")}
                    />
                  )}
                </div>
              }
            />

            <AnalyticsComp
              title="Max Value"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  <ApexMuiSwitch
                    name={"maxValue"}
                    handleChange={handleAxisSwitch("maxValue")}
                    checked={maxValue === "auto" ? true : false}
                    checkedColor={theme.palette.success.main}
                    notCheckedColor={theme.palette.common.white}
                    hasLabels={true}
                    leftLabel="Manual"
                    rightLabel="Auto"
                  />
                  {maxValue === "auto" || (
                    <Input
                      value={maxValue}
                      onChange={handleAxisChange("maxValue")}
                    />
                  )}
                </div>
              }
            />

            <AnalyticsComp
              title="Value Format"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ChartValueFormatters
                  basePath={basePath as string}
                  intialFormatValue={{
                    format: valueFormatString,
                    enabled: false,
                  }}
                  plotRef={axisRef}
                  updateParameterAction={
                    updateParameterAction as IApexChartFormatProps["updateParameterAction"]
                  }
                  axisFormatTitle="valueFormatString"
                  setValueFormat={setChartProps}
                />
              }
            />

            <ApexMuiSwitch
              name={"reverse"}
              handleChange={handleAxisSwitch("reverse")}
              checked={reverse}
              checkedColor={theme.palette.success.main}
              notCheckedColor={theme.palette.common.white}
              hasLabels={true}
              leftLabel="Off"
              rightLabel="On"
            />

            <AnalyticsComp
              title="Tick Size"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ApexSlider
                  name="tickSize"
                  sliderValue={axisObj?.tickSize as number}
                  step={1}
                  min={0}
                  max={20}
                  actionPath={`${basePath}.${axisName}`}
                  action={(path, value) =>
                    updateParameterAction &&
                    dispatch(
                      updateParameterAction(path, {
                        ...axisObj,
                        tickSize: value,
                      })
                    )
                  }
                  sliderContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      [axisName]: { ...prev[axisNameDefined], tickSize: value },
                    }));
                  }}
                />
              }
            />

            <AnalyticsComp
              title="Tick Padding"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ApexSlider
                  name="tickPadding"
                  sliderValue={axisObj?.tickPadding as number}
                  step={1}
                  min={0}
                  max={20}
                  actionPath={`${basePath}.${axisName}`}
                  action={(path, value) =>
                    updateParameterAction &&
                    dispatch(
                      updateParameterAction(path, {
                        ...axisObj,
                        tickPadding: value,
                      })
                    )
                  }
                  sliderContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      [axisName]: {
                        ...prev[axisNameDefined],
                        tickPadding: value,
                      },
                    }));
                  }}
                />
              }
            />

            <AnalyticsComp
              title="Tick Rotation"
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <ApexSlider
                  name="tickRotation"
                  sliderValue={axisObj?.tickRotation as number}
                  step={1}
                  min={-90}
                  max={90}
                  actionPath={`${basePath}.${axisName}`}
                  action={(path, value) =>
                    updateParameterAction &&
                    dispatch(
                      updateParameterAction(path, {
                        ...axisObj,
                        tickRotation: value,
                      })
                    )
                  }
                  sliderContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      [axisName]: {
                        ...prev[axisNameDefined],
                        tickRotation: value,
                      },
                    }));
                  }}
                />
              }
            />
          </>
        )}
    </div>
  );
};

export default ApexChartAxis;
