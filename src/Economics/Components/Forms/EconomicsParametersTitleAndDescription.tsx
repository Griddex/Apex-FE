import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { INewEconomicsParametersInputDeckWorkflowProps } from "../../Redux/State/EconomicsStateTypes";

const EconomicsParametersTitleAndDescription = ({
  economicsParametersInputDeckTitle,
  economicsParametersInputDeckDescription,
  errors,
  touched,
  handleChange,
}: INewEconomicsParametersInputDeckWorkflowProps) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.economicsParametersInputDeckTitle
      ? errors && errors.economicsParametersInputDeckTitle
      : "";

  type TTitleDesc =
    | "economicsParametersInputDeckTitle"
    | "economicsParametersInputDeckDescription";
  const [TitleDesc, setTitleDesc] = React.useState({
    economicsParametersInputDeckTitle: "",
    economicsParametersInputDeckDescription: "",
  });

  const handleTitleDescChange = (event: ChangeEvent<any>) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;
    setTitleDesc((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    for (const name of Object.keys(TitleDesc)) {
      dispatch(
        updateEconomicsParameterAction(name, TitleDesc[name as TTitleDesc])
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
            name="economicsParametersInputDeckTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={economicsParametersInputDeckTitle}
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
            name="economicsParametersInputDeckDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={economicsParametersInputDeckDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default EconomicsParametersTitleAndDescription;