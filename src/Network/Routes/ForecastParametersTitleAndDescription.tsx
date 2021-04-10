import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";

const ForecastParametersTitleAndDescription = ({
  forecastParametersTitle,
  forecastParametersDescription,
  errors,
  touched,
  handleChange,
}: ISaveForecastParametersFormProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.forecastParametersTitle
      ? errors && errors.forecastParametersTitle
      : "";

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    dispatch(updateNetworkParameterAction(name, value));
  };

  return (
    <div>
      <AnalyticsComp
        title="Title"
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
            onBlur={handleBlur}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <TextareaAutosize
            name="forecastParametersDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={forecastParametersDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        }
      />
    </div>
  );
};

export default ForecastParametersTitleAndDescription;
