import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Box, Chip, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const forecastSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer,
  (reducer) => reducer
);

const ForecastChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedForecastingResultsTitle,
    selectedForecastingResultsId,
    isForecastResultsSaved,
  } = useSelector(forecastSelector);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <InsertPhotoOutlinedIcon />
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {selectedForecastingResultsTitle
          ? selectedForecastingResultsTitle
          : "---"}
      </Box>
      {selectedForecastingResultsId && (
        <Chip
          style={{
            backgroundColor: isForecastResultsSaved
              ? theme.palette.success.main
              : theme.palette.secondary.main,
            marginLeft: 5,
            color: "white",
          }}
          size="small"
          label={isForecastResultsSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default ForecastChartTitlePlaque;
