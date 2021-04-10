import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateForecastResultsParameterAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { ISaveForecastResultsProps } from "../../../Forecast/Redux/ForecastState/ForecastStateTypes";
import { IIsSaveForecastResultsValid } from "../Dialogs/SaveNetworkDialogTypes";

const SaveForecastResultsTitleAndDescription = ({
  forecastResultsTitle,
  forecastResultsDescription,
  errors,
  touched,
  handleChange,
  setIsSaveForecastResultsValid,
}: ISaveForecastResultsProps & IIsSaveForecastResultsValid) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.forecastResultsTitle
      ? errors && errors.forecastResultsTitle
      : "";

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    dispatch(updateForecastResultsParameterAction(name, value));
  };

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <TextField
            name="forecastResultsTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={forecastResultsTitle}
            onChange={(e) => {
              const { name, value } = e.target;
              handleChange && handleChange(e);

              if (value.length > 2) {
                setIsSaveForecastResultsValid &&
                  setIsSaveForecastResultsValid(false);
                dispatch(updateForecastResultsParameterAction(name, value));
              } else {
                setIsSaveForecastResultsValid &&
                  setIsSaveForecastResultsValid(true);
              }
            }}
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
