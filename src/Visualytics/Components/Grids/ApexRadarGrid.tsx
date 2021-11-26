import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { gridShapeOptions } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexRadarGrid = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const dispatch = useDispatch();

  const radarGridRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const { gridLevels, gridShape, gridLabelOffset } = chartProps;

  const gridShapeOption = gridShapeOptions.find(
    (option) => option.value === gridShape
  );

  const handleRadarGridSelect =
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

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <AnalyticsComp
        title="Grid Levels"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="gridLevels"
            sliderValue={gridLevels}
            step={1}
            min={2}
            max={20}
            actionPath={`${basePath}.gridLevels`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                gridLevels: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Grid Shape"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={gridShapeOption as ISelectOption}
            data={gridShapeOptions}
            handleSelect={handleRadarGridSelect("gridShape")}
            menuPortalTarget={radarGridRef.current as HTMLDivElement}
            isSelectOptionType={true}
            containerHeight={40}
          />
        }
      />

      <AnalyticsComp
        title="Grid Label Offset"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="gridLabelOffset"
            sliderValue={gridLabelOffset}
            step={1}
            min={0}
            max={60}
            actionPath={`${basePath}.gridLabelOffset`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                gridLabelOffset: value,
              }));
            }}
          />
        }
      />
    </div>
  );
};

export default ApexRadarGrid;
