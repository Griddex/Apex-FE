import { Box, Chip, useTheme } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const NetworkTitlePlaque = () => {
  const theme = useTheme();

  const { selectedNetworkTitle, nodeElements } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const isNetworkSaved = !(selectedNetworkTitle === "");
  const isNetworkDisplayed = nodeElements.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <AccountTreeIcon style={{ color: theme.palette.grey[900] }} />
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {selectedNetworkTitle ? selectedNetworkTitle : "---"}
      </Box>
      {isNetworkDisplayed && (
        <Chip
          style={{
            backgroundColor: isNetworkSaved
              ? theme.palette.success.main
              : theme.palette.secondary.main,
            marginLeft: 5,
            color: "white",
          }}
          size="small"
          label={isNetworkSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default NetworkTitlePlaque;
