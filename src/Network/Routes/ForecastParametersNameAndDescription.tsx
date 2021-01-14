import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";

const ForecastParametersNameAndDescription = ({
  forecastParametersName,
  forecastParametersDescription,
  errors,
  touched,
  handleChange,
}: ISaveForecastParametersFormProps) => {
  const helperText =
    touched && touched.forecastParametersName
      ? errors && errors.forecastParametersName
      : "";

  return (
    <div>
      <AnalyticsComp
        title="Forecast Parameters Name"
        direction="Vertical"
        content={
          <TextField
            name="forecastParametersName"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={forecastParametersName}
            onChange={handleChange}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Forecast Parameters Description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <TextareaAutosize
            name="forecastParametersDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={forecastParametersDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default ForecastParametersNameAndDescription;
