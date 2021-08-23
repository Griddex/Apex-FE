import { TextareaAutosize } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { axisTitlePositionOptions } from "../../Data/VisualyticsData";
import { IApexChartAxis, IApexChartFormatProps } from "../Charts/ChartTypes";
import { AxisProps } from "../ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartAxis = ({
  basePath,
  updateParameterAction,
  chartType,
  axisName,
  ticksPosition,
  tickValues,
  tickSize,
  tickPadding,
  tickRotation,
  format,
  renderTick,
  legend,
  legendPosition,
  legendOffset,
}: AxisProps & IApexChartAxis & Partial<IApexChartFormatProps>) => {
  const dispatch = useDispatch();
  const pointRef = React.useRef<HTMLDivElement>(null);

  const { setChartProps } = React.useContext(ChartFormatAggregatorContext);

  const axisTitlePositionOption = axisTitlePositionOptions.find(
    (option) => option.value === legendPosition
  );

  const handleAxisSelect =
    (name: keyof AxisProps) => (option: ValueType<ISelectOption, false>) => {
      setChartProps((prev) => ({
        ...prev,
        [name]: (option as ISelectOption).value as string,
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${axisName}.${name}`, {
            scheme: (option as ISelectOption).value,
          })
        );
    };

  return (
    <div style={{ width: "100%" }}>
      <AnalyticsComp
        title="Axis Title"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <TextareaAutosize
            name={axisName}
            style={{ height: 50, width: "100%" }}
            minRows={4}
            value={legend as string}
            onChange={(event) => {
              const { value } = event.target;

              updateParameterAction &&
                dispatch(
                  updateParameterAction(`${basePath}.${axisName}.legend`, value)
                );
            }}
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
            sliderValue={legendOffset as number}
            step={1}
            min={-60}
            max={60}
            actionPath={`${basePath}.${axisName}.legendOffset`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
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
            handleSelect={handleAxisSelect(`legendPosition`)}
            menuPortalTarget={pointRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      <AnalyticsComp
        title="Tick Size"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="tickSize"
            sliderValue={tickSize as number}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.${axisName}.tickSize`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
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
            sliderValue={tickPadding as number}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.${axisName}.tickPadding`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
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
            sliderValue={tickRotation as number}
            step={1}
            min={-90}
            max={90}
            actionPath={`${basePath}.${axisName}.tickRotation`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
          />
        }
      />
    </div>
  );
};

export default ApexChartAxis;
