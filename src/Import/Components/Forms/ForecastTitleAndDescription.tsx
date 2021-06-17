import { Input, TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { updateInputParameterAction } from "../../Redux/Actions/InputActions";
import { INewForecastInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";
import PreviewSave from "../../Routes/Common/Workflows/PreviewSave";

const ForecastTitleAndDescription = ({
  forecastInputdeckTitle,
  forecastInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewForecastInputDeckWorkflowProps) => {
  const dispatch = useDispatch();
  const reducerDefined = "inputReducer";

  const helperText =
    touched && touched.forecastInputdeckTitle
      ? errors && errors.forecastInputdeckTitle
      : "";

  type TTitleDesc = "forecastInputdeckTitle" | "forecastInputDeckDescription";
  const [TitleDesc, setTitleDesc] = React.useState({
    forecastInputdeckTitle: "",
    forecastInputDeckDescription: "",
  });

  const handleTitleDescChange = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;
    setTitleDesc((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    for (const name of Object.keys(TitleDesc)) {
      dispatch(
        updateInputParameterAction(
          reducerDefined,
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
          <Input
            name="forecastInputdeckTitle"
            // variant="outlined"
            style={{ width: "100%" }}
            // helperText={helperText}
            error={Boolean(helperText)}
            value={forecastInputdeckTitle}
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
            onChange={handleTitleDescChange}
          />
        }
      />
    </div>
  );
};

export default ForecastTitleAndDescription;
