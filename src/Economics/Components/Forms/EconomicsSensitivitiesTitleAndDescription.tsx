import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { INewEconomicsSensitivitiesWorkflowProps } from "../../Redux/State/EconomicsStateTypes";

const EconomicsSensitivitiesTitleAndDescription = ({
  economicsSensitivitiesTitle,
  economicsSensitivitiesDescription,
  errors,
  touched,
  handleChange,
}: INewEconomicsSensitivitiesWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.economicsSensitivitiesTitle
      ? errors && errors.economicsSensitivitiesTitle
      : "";

  const handleTitleDescChange = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;

    dispatch(updateEconomicsParameterAction(name, value));
  };

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <TextField
            name="economicsSensitivitiesTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={economicsSensitivitiesTitle}
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
            name="economicsSensitivitiesDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={economicsSensitivitiesDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default EconomicsSensitivitiesTitleAndDescription;
