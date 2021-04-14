import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { INewCostsRevenuesInputDeckWorkflowProps } from "../../Redux/State/EconomicsStateTypes";

const CostsRevenuesTitleAndDescription = ({
  costsRevenuesInputDeckTitle,
  costsRevenuesInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewCostsRevenuesInputDeckWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.costsRevenuesInputDeckTitle
      ? errors && errors.costsRevenuesInputDeckTitle
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
            name="costsRevenuesInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={costsRevenuesInputDeckTitle}
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
            name="costsRevenuesInputDeckDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={costsRevenuesInputDeckDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default CostsRevenuesTitleAndDescription;
