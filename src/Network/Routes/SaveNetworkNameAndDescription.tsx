import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { ISaveNetworkFormProps } from "../Redux/State/NetworkStateTypes";

const SaveNetworkNameAndDescription = ({
  networkName,
  networkDescription,
  errors,
  touched,
  handleChange,
}: ISaveNetworkFormProps) => {
  const helperText =
    touched && touched.networkName ? errors && errors.networkName : "";
  return (
    <div>
      <AnalyticsComp
        title="Network Name"
        direction="Vertical"
        content={
          <TextField
            name="networkName"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={networkName}
            onChange={handleChange}
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
