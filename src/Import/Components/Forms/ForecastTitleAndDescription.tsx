import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateInputParameterAction } from "../../Redux/Actions/InputActions";
import { INewForecastInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";

const ForecastTitleAndDescription = ({
  forecastInputDeckTitle,
  forecastInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewForecastInputDeckWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.forecastInputDeckTitle
      ? errors && errors.forecastInputDeckTitle
      : "";

  const handleTitleDescChange = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;

    dispatch(updateInputParameterAction(name, value));
  };

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <TextField
            name="forecastInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={forecastInputDeckTitle}
            onChange={handleTitleDescChange}
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
            name="forecastInputDeckDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={forecastInputDeckDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default ForecastTitleAndDescription;
