import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateInputParameterAction } from "../../Redux/Actions/InputActions";
import { INewFacilitiesInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";

const FacilitiesTitleAndDescription = ({
  selectedFacilitiesInputDeckTitle,
  facilitiesInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewFacilitiesInputDeckWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.selectedFacilitiesInputDeckTitle
      ? errors && errors.selectedFacilitiesInputDeckTitle
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
            name="selectedFacilitiesInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={selectedFacilitiesInputDeckTitle}
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
            name="facilitiesInputDeckDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={facilitiesInputDeckDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default FacilitiesTitleAndDescription;
