import { DatePicker, DatePickerInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ApexSelect from "../../Application/Components/Selects/ApexSelect";
import { persistForecastParametersAction } from "../Redux/Actions/ForecastingActions";

const OtherForecastingParameters = () => {
  const dispatch = useDispatch();

  const hSPList = ["Oil", "Gas", "Liquid"];
  const [hSPName, setHSPName] = React.useState("");
  const handleHSPNameChange = (event: ChangeEvent<any>) => {
    setHSPName(event.target.value);
  };

  const timeFrequencyList = ["Monthly", "Yearly"];
  const [timeFrequency, setTimeFrequency] = React.useState("");
  const handleTimeFrequencyChange = (event: ChangeEvent<any>) => {
    setTimeFrequency(event.target.value);
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
        hSPName,
        timeFrequency,
        realtimeResults,
        endForecastDate,
      })
    );
  }, [hSPName, timeFrequency, realtimeResults, endForecastDate]);

  return (
    <div>
      <AnalyticsComp
        title="Hydrocarbon Stream Prioritization"
        direction="Horizontal"
        content={
          <ApexSelect
            currentItem={hSPName}
            itemData={hSPList}
            selectItemStyle={{ width: "100%" }}
            handleChange={handleHSPNameChange}
          />
        }
      />
      <AnalyticsComp
        title="Time Frequency"
        direction="Horizontal"
        content={
          <ApexSelect
            currentItem={timeFrequency}
            itemData={timeFrequencyList}
            selectItemStyle={{ width: "100%" }}
            handleChange={handleTimeFrequencyChange}
          />
        }
      />
      <AnalyticsComp
        title="Realtime Results"
        direction="Horizontal"
        content={
          <ApexSelect
            currentItem={realtimeResults}
            itemData={realtimeResultsList}
            selectItemStyle={{ width: "100%" }}
            handleChange={handleRealtimeResultsChange}
          />
        }
      />
      <AnalyticsComp
        title="End Forecast Date"
        direction="Horizontal"
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
