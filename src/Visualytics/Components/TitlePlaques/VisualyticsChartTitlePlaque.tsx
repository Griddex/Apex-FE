import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Box, Chip, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const visualyticsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer,
  (redcuer) => redcuer
);

const VisualyticsChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedVisualyticsTitle,
    selectedVisualyticsId,
    isVisualyticsDeckSaved,
  } = useSelector(visualyticsSelector);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <InsertPhotoOutlinedIcon />
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {selectedVisualyticsTitle ? selectedVisualyticsTitle : "---"}
      </Box>
      {selectedVisualyticsId && (
        <Chip
          style={{
            backgroundColor: isVisualyticsDeckSaved
              ? theme.palette.success.main
              : theme.palette.secondary.main,
            marginLeft: 5,
            color: "white",
          }}
          size="small"
          label={isVisualyticsDeckSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default VisualyticsChartTitlePlaque;
