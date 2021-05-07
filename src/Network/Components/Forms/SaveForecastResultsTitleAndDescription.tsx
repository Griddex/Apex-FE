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

  type TTitleDesc = "forecastResultsTitle" | "forecastResultsDescription";
  const [TitleDesc, setTitleDesc] = React.useState({
    forecastResultsTitle: "",
    forecastResultsDescription: "",
  });

  const handleTitleDescBlur = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;
    setTitleDesc((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    for (const name of Object.keys(TitleDesc)) {
      dispatch(
        updateForecastResultsParameterAction(
          name,
          TitleDesc[name as TTitleDesc]
        )
      );
    }
  }, [TitleDesc]);

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
            onBlur={handleTitleDescBlur}
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
            onBlur={handleTitleDescBlur}
          />
        }
      />
    </div>
  );
};

export default SaveForecastResultsTitleAndDescription;
