import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ISaveNetworkFormProps } from "../Redux/State/NetworkStateTypes";
import { useDispatch } from "react-redux";
import { saveNetworkExtrudeIsValidAction } from "../Redux/Actions/NetworkActions";
import { IIsSaveNetworkValid } from "./../Components/Dialogs/SaveNetworkDialogTypes";

const SaveNetworkNameAndDescription = ({
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
        title="Network Name"
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
              setIsSaveNetworkValid && setIsSaveNetworkValid(true);
              handleChange && handleChange(e);
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

export default SaveNetworkNameAndDescription;
