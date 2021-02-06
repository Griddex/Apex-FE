import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, DatePickerInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ApexSelectNative from "../../Application/Components/Selects/ApexSelectNative";
import { persistForecastParametersAction } from "../Redux/Actions/ForecastingActions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    width: "100%",
    height: "100%",
  },
}));

const OtherForecastingParameters = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const targetFluids = ["Oil", "Gas", "Liquid"];
  const [targetFluidTitle, setTargetFluidTitle] = React.useState("");
  const handleTargetFluidTitleChange = (event: ChangeEvent<any>) => {
    setTargetFluidTitle(event.target.value);
  };

  const timeFrequencyList = ["Monthly", "Yearly"];
  const [timeFrequency, setTimeFrequency] = React.useState("");
  const handleTimeFrequencyChange = (event: ChangeEvent<any>) => {
    setTimeFrequency(event.target.value);
  };

  const defermentDecisions = ["Add Deferment", "No Deferment"];
  const [defermentDecision, setDefermentDecision] = React.useState("");
  const handleDefermentDecisionChange = (event: ChangeEvent<any>) => {
    setDefermentDecision(event.target.value);
  };

  const realtimeResultsList = ["No", "Yes"];
  const [realtimeResults, setRealtimeResults] = React.useState("");
  const handleRealtimeResultsChange = (event: ChangeEvent<any>) => {
    setRealtimeResults(event.target.value);
  };

  const [endForecastDate, setEndForecastDate] = React.useState(new Date());
  const handleEndForecastDateChange = (
    _: Date[],
    currentDateString: string
  ) => {
    setEndForecastDate(new Date(currentDateString));
  };

  React.useEffect(() => {
    dispatch(
      persistForecastParametersAction({
        targetFluidTitle,
        timeFrequency,
        realtimeResults,
        endForecastDate,
      })
    );
  }, [targetFluidTitle, timeFrequency, realtimeResults, endForecastDate]);

  return (
    <div className={classes.root}>
      <AnalyticsComp
        title="Target Fluid"
        direction="Vertical"
        content={
          <ApexSelectNative
            currentItem={targetFluidTitle}
            itemData={targetFluids}
            selectItemStyle={{ width: 250 }}
            handleChange={handleTargetFluidTitleChange}
          />
        }
      />
      <AnalyticsComp
        title="Time Frequency"
        direction="Vertical"
        content={
          <ApexSelectNative
            currentItem={timeFrequency}
            itemData={timeFrequencyList}
            selectItemStyle={{ width: 250 }}
            handleChange={handleTimeFrequencyChange}
          />
        }
      />
      <AnalyticsComp
        title="Add Deferment"
        direction="Vertical"
        content={
          <ApexSelectNative
            currentItem={defermentDecision}
            itemData={defermentDecisions}
            selectItemStyle={{ width: 250 }}
            handleChange={handleDefermentDecisionChange}
          />
        }
      />
      <AnalyticsComp
        title="Realtime Results"
        direction="Vertical"
        content={
          <ApexSelectNative
            currentItem={realtimeResults}
            itemData={realtimeResultsList}
            selectItemStyle={{ width: 250 }}
            handleChange={handleRealtimeResultsChange}
          />
        }
      />
      <AnalyticsComp
        title="End Forecast Date"
        direction="Vertical"
        content={
          <DatePicker
            datePickerType="single"
            onChange={handleEndForecastDateChange}
          >
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
            />
          </DatePicker>
        }
      />
    </div>
  );
};

export default OtherForecastingParameters;
