import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Box, Chip, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isAuto) => isAuto
);

const selectedNetworkTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedNetworkTitle,
  (data) => data
);

const nodeElementsSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.nodeElements,
  (data) => data
);

const NetworkTitlePlaque = () => {
  const theme = useTheme();

  const isNetworkAuto = useSelector(isNetworkAutoSelector);
  const selectedNetworkTitle = useSelector(selectedNetworkTitleSelector);
  const nodeElements = useSelector(nodeElementsSelector);

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
      <Chip
        style={{
          backgroundColor: theme.palette.primary.main,
          marginLeft: 5,
          color: "white",
        }}
        size="small"
        label={isNetworkAuto ? "Auto" : "Manual"}
      />
    </div>
  );
};

export default NetworkTitlePlaque;
