import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateForecastChartParameterAction } from "../../../Forecast/Redux/ForecastActions/ForecastActions";
import { ISaveForecastResultsProps } from "../../../Forecast/Redux/ForecastState/ForecastStateTypes";
import { IIsSaveForecastResultsValid } from "../Dialogs/SaveNetworkDialogTypes";

const SaveForecastResultsTitleAndDescription = ({
  forecastResultsTitle,
  forecastResultsDescription,
  errors,
  touched,
  handleChange,
}: // handleBlur,
ISaveForecastResultsProps & IIsSaveForecastResultsValid) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.forecastResultsTitle
      ? errors && errors.forecastResultsTitle
      : "";

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    dispatch(updateForecastChartParameterAction(name, value));
  };
  return (
    <div>
      <AnalyticsComp
        title="Forecast Results Title"
        direction="Vertical"
        content={
          <TextField
            name="forecastResultsTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={forecastResultsTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Forecast Results Description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <TextareaAutosize
            name="forecastResultsDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={forecastResultsDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        }
      />
    </div>
  );
};

export default SaveForecastResultsTitleAndDescription;
