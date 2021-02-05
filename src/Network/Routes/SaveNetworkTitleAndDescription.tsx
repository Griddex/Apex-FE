import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ISaveNetworkFormProps } from "../Redux/State/NetworkStateTypes";
import { IIsSaveNetworkValid } from "../Components/Dialogs/SaveNetworkDialogTypes";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";

const SaveNetworkTitleAndDescription = ({
  networkTitle,
  networkDescription,
  errors,
  touched,
  handleChange,
  setIsSaveNetworkValid,
}: ISaveNetworkFormProps & IIsSaveNetworkValid) => {
  const dispatch = useDispatch();

  const helperText =
    touched && touched.networkTitle ? errors && errors.networkTitle : "";

  return (
    <div>
      <AnalyticsComp
        title="Network Title"
        direction="Vertical"
        content={
          <TextField
            name="networkTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={networkTitle}
            onChange={(e) => {
              const { name, value } = e.target;
              handleChange && handleChange(e);

              if (value.length > 2) {
                setIsSaveNetworkValid && setIsSaveNetworkValid(false);
                dispatch(updateNetworkParameterAction(name, value));
              } else {
                setIsSaveNetworkValid && setIsSaveNetworkValid(true);
              }
            }}
            onBlur={(e) => {
              const { name, value } = e.target;
              dispatch(updateNetworkParameterAction(name, value));
            }}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="Network Description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <TextareaAutosize
            name="networkDescription"
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={networkDescription}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default SaveNetworkTitleAndDescription;
