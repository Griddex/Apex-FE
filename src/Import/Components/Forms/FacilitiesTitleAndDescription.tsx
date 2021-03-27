import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { workflowReInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { INewFacilitiesInputDeckWorkflowProps } from "../../Redux/State/InputStateTypes";

const FacilitiesTitleAndDescription = ({
  facilitiesInputDeckTitle,
  facilitiesInputDeckDescription,
  errors,
  touched,
  handleChange,
}: // handleBlur,
INewFacilitiesInputDeckWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.facilitiesInputDeckTitle
      ? errors && errors.facilitiesInputDeckTitle
      : "";

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    dispatch(workflowReInitAction(name, value));
  };
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
        }
      />
    </div>
  );
};

export default FacilitiesTitleAndDescription;
