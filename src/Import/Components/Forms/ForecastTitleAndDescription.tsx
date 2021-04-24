import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { updateInputParameterAction } from "../../Redux/Actions/InputActions";
import { INewForecastInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";

const ForecastTitleAndDescription = ({
  selectedForecastInputDeckTitle,
  forecastInputDeckDescription,
  errors,
  touched,
  handleChange,
  reducer,
}: INewForecastInputDeckWorkflowProps) => {
  const dispatch = useDispatch();
  const reducerDefined = reducer as NonNullable<ReducersType>;

  const helperText =
    touched && touched.selectedForecastInputDeckTitle
      ? errors && errors.selectedForecastInputDeckTitle
      : "";

  const handleTitleDescChange = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;

    dispatch(updateInputParameterAction(reducerDefined, name, value));
  };

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <TextField
            name="selectedForecastInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={selectedForecastInputDeckTitle}
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
