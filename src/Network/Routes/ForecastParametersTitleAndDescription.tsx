import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";

const ForecastParametersTitleAndDescription = ({
  forecastParametersTitle,
  forecastParametersDescription,
  errors,
  touched,
  handleChange,
}: ISaveForecastParametersFormProps) => {
  const helperText =
    touched && touched.forecastParametersTitle
      ? errors && errors.forecastParametersTitle
      : "";

  return (
    <div>
      <AnalyticsComp
        title="Forecast Parameters Title"
        direction="Vertical"
        content={
          <TextField
            name="forecastParametersTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={forecastParametersTitle}
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

export default ForecastParametersTitleAndDescription;
