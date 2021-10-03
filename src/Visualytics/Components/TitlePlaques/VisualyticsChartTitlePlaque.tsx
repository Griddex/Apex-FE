import { Box, Chip, useTheme } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const VisualyticsChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedVisualyticsTitle,
    selectedVisualyticsId,
    isVisualyticsDeckSaved,
  } = useSelector((state: RootState) => state.visualyticsReducer);

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
