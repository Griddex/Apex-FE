import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { INewFacilitiesInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";

const FacilitiesTitleAndDescription = ({
  facilitiesInputDeckTitle,
  facilitiesInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewFacilitiesInputDeckWorkflowProps) => {
  const helperText =
    touched && touched.facilitiesInputDeckTitle
      ? errors && errors.facilitiesInputDeckTitle
      : "";
  return (
    <div>
      <AnalyticsComp
        title="Facilities InputDeck Title"
        direction="Vertical"
        content={
          <TextField
            name="facilitiesInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={facilitiesInputDeckTitle}
            onChange={handleChange}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Facilities InputDeck Description"
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
