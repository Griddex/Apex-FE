import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { INewEconomicsResultsWorkflowProps } from "../../Redux/State/EconomicsStateTypes";
import { IIsSaveEconomicsResultsValid } from "../Dialogs/SaveEconomicsResultsDialogTypes";

const EconomicsResultsTitleAndDescription = ({
  economicsResultsTitle,
  economicsResultsDescription,
  errors,
  touched,
  handleChange,
  setIsSaveEconomicsResultsValid,
}: INewEconomicsResultsWorkflowProps & IIsSaveEconomicsResultsValid) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.economicsResultsTitle
      ? errors && errors.economicsResultsTitle
      : "";

  type TTitleDesc = "economicsResultsTitle" | "economicsResultsDescription";
  const [TitleDesc, setTitleDesc] = React.useState({
    economicsResultsTitle: "",
    economicsResultsDescription: "",
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

    console.log(
      "Logged output --> ~ file: EconomicsResultsTitleAndDescription.tsx ~ line 29 ~ TitleDesc",
      TitleDesc
    );
  }, [TitleDesc]);

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <TextField
            name="economicsResultsTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={economicsResultsTitle}
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
            name="economicsResultsDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={economicsResultsDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default EconomicsResultsTitleAndDescription;
