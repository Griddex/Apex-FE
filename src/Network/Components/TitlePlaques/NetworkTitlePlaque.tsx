import { Box, Chip, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const NetworkTitlePlaque = () => {
  const { networkTitle } = useSelector(
    (state: RootState) => state.networkReducer
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <AccountTreeIcon />
      {/* <Typography style={{ marginLeft: 5 }}>{networkTitle}</Typography> */}
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {networkTitle ? networkTitle : "---"}
      </Box>
      <Chip
        style={{ backgroundColor: "#00C49F", marginLeft: 5 }}
        size="small"
        label="Saved"
      />
    </div>
  );
};

export default NetworkTitlePlaque;
