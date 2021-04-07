import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, DatePickerInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ApexSelectNative from "../../Application/Components/Selects/ApexSelectNative";
import {
  persistForecastParametersAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const OtherForecastingParameters = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const targetFluids = ["Oil", "Gas", "Liquid"];
  const [targetFluid, setTargetFluid] = React.useState(targetFluids[0]);
  const handleTargetFluidChange = (event: ChangeEvent<any>) => {
    setTargetFluid(event.target.value);
  };

  const timeFrequencyList = ["Monthly", "Yearly"];
  const [timeFrequency, setTimeFrequency] = React.useState(
    timeFrequencyList[0]
  );
  const handleTimeFrequencyChange = (event: ChangeEvent<any>) => {
    setTimeFrequency(event.target.value);
  };

  const defermentDecisions = ["Add Deferment", "No Deferment"];
  const [defermentDecision, setDefermentDecision] = React.useState(
    defermentDecisions[0]
  );
  const handleDefermentDecisionChange = (event: ChangeEvent<any>) => {
    setDefermentDecision(event.target.value);
  };

  const realtimeResultsList = ["No", "Yes"];
  const [realtimeResults, setRealtimeResults] = React.useState(
    realtimeResultsList[0]
  );
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

  const [startForecastDate, setStartForecastDate] = React.useState(new Date());
  const handleStartForecastDateChange = (
    _: Date[],
    currentDateString: string
  ) => {
    setStartForecastDate(new Date(currentDateString));
  };

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    dispatch(updateNetworkParameterAction(name, value));
  };

  React.useEffect(() => {
    console.log(
      "Logged output --> ~ file: OtherForecastingParameters.tsx ~ line 72 ~ React.useEffect ~ targetFluid",
      targetFluid,
      timeFrequency,
      realtimeResults,
      endForecastDate
    );

    dispatch(
      persistForecastParametersAction(
        targetFluid,
        timeFrequency,
        defermentDecision,
        realtimeResults,
        endForecastDate
      )
    );
  }, [
    targetFluid,
    timeFrequency,
    defermentDecision,
    realtimeResults,
    endForecastDate,
  ]);

  return (
    <div className={classes.root}>
      <AnalyticsComp
        title="Target Fluid"
        direction="Vertical"
        content={
          <ApexSelectNative
            name="targetFluid"
            currentItem={targetFluid}
            itemData={targetFluids}
            selectItemStyle={{ height: 40, width: 350 }}
            handleChange={handleTargetFluidChange}
            handleBlur={handleBlur}
          />
        }
      />
      <AnalyticsComp
        title="Time Frequency"
        direction="Vertical"
        content={
          <ApexSelectNative
            name="timeFrequency"
            currentItem={timeFrequency}
            itemData={timeFrequencyList}
            selectItemStyle={{ height: 40, width: 350 }}
            handleChange={handleTimeFrequencyChange}
            handleBlur={handleBlur}
          />
        }
      />
      <AnalyticsComp
        title="Add Deferment"
        direction="Vertical"
        content={
          <ApexSelectNative
            name="isDefered"
            currentItem={defermentDecision}
            itemData={defermentDecisions}
            selectItemStyle={{ height: 40, width: 350 }}
            handleChange={handleDefermentDecisionChange}
            handleBlur={handleBlur}
          />
        }
      />
      <AnalyticsComp
        title="Realtime Results"
        direction="Vertical"
        content={
          <ApexSelectNative
            name="realtimeResults"
            currentItem={realtimeResults}
            itemData={realtimeResultsList}
            selectItemStyle={{ height: 40, width: 350 }}
            handleChange={handleRealtimeResultsChange}
            handleBlur={handleBlur}
          />
        }
      />
      <AnalyticsComp
        title="Start Forecast Date"
        direction="Vertical"
        content={
          <DatePicker
            // name="endForecastDate"
            datePickerType="single"
            onChange={handleStartForecastDateChange}
          >
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="DD/MM/yyyy"
              labelText=""
            />
          </DatePicker>
        }
      />
      <AnalyticsComp
        title="End Forecast Date"
        direction="Vertical"
        content={
          <DatePicker
            // name="endForecastDate"
            datePickerType="single"
            onChange={handleEndForecastDateChange}
          >
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="DD/MM/yyyy"
              labelText=""
            />
          </DatePicker>
        }
      />
    </div>
  );
};

export default OtherForecastingParameters;
