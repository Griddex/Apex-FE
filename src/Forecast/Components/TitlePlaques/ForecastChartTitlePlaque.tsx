import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Box, Chip, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedForecastingResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedForecastingResultsTitle,
  (data) => data
);

const selectedForecastingResultsIdSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedForecastingResultsId,
  (data) => data
);

const isForecastResultsSavedSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.isForecastResultsSaved,
  (data) => data
);

const ForecastChartTitlePlaque = () => {
  const theme = useTheme();

  const selectedForecastingResultsTitle = useSelector(
    selectedForecastingResultsTitleSelector
  );
  const selectedForecastingResultsId = useSelector(
    selectedForecastingResultsIdSelector
  );
  const isForecastResultsSaved = useSelector(isForecastResultsSavedSelector);

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
