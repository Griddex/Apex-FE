import { TextareaAutosize, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { stk_lin_bar_sct_htm } from "../../Utils/ChartFormatDiscriminators";
import { IApexChartFormatProps, IApexChartGrid } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";

const ApexChartGrid = ({
  basePath,
  updateParameterAction,
  gridName,
  gridTitle,
  enableGrid,
  gridValuesName,
  gridValues,
  chartType,
}: IApexChartGrid & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const chartTypeDefined = chartType as string;

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  let currentGridEnabled: string;
  let currentGridValues: string;
  if (gridName.endsWith("X")) {
    currentGridEnabled = "enableGridX";
    currentGridValues = "gridXValues";
  } else {
    currentGridEnabled = "enableGridY";
    currentGridValues = "gridYValues";
  }

  return (
    <div style={{ width: "100%" }}>
      {stk_lin_bar_sct_htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title={gridTitle}
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexMuiSwitch
              name={gridName}
              handleChange={(event) => {
                const { checked } = event.target;
                setChartProps((prev) => ({
                  ...prev,
                  [currentGridEnabled]: checked,
                }));

                if (checked) {
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.${currentGridEnabled}`,
                        checked
                      )
                    );
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.${currentGridValues}`,
                        undefined
                      )
                    );
                } else {
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.${currentGridValues}`,
                        []
                      )
                    );
                }
              }}
              checked={enableGrid}
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
        !chartProps[currentGridEnabled as "enableGridX" | "enableGridY"] && (
          <TextareaAutosize
            name={gridValuesName}
            style={{ height: 30, width: "100%" }}
            minRows={4}
            value={gridValues?.join(",")}
            onChange={(event) => {
              const { value } = event.target;
              //TODO regex to remove one or more commas at end of string
              const XValues = value.split(",");

              setChartProps((prev) => ({
                ...prev,
                [currentGridValues]: XValues,
              }));

              updateParameterAction &&
                dispatch(
                  updateParameterAction(
                    `${basePath}.${gridValuesName}`,
                    XValues
                  )
                );
            }}
          />
        )}
    </div>
  );
};

export default ApexChartGrid;
