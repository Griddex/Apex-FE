import { Box, Chip, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const NetworkTitlePlaque = () => {
  const theme = useTheme();

  const { networkTitle, selectedNetworkId } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const isNetworkSaved = !(selectedNetworkId === "");

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <AccountTreeIcon />
      {/* <Typography style={{ marginLeft: 5 }}>{networkTitle}</Typography> */}
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {networkTitle ? networkTitle : "---"}
      </Box>
      {selectedNetworkId && (
        <Chip
          style={{
            backgroundColor: isNetworkSaved
              ? "#00C49F"
              : theme.palette.secondary.main,
            marginLeft: 5,
            borderRadius: 4,
          }}
          size="small"
          label={isNetworkSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default NetworkTitlePlaque;
