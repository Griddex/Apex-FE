import { Box, Chip, useTheme } from "@material-ui/core";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ForecastChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedForecastingResultsTitle,
    selectedForecastingResultsId,
    isForecastResultsSaved,
  } = useSelector((state: RootState) => state.forecastReducer);

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
