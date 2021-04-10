import { Box, Chip, useTheme } from "@material-ui/core";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ForecastChartTitlePlaque = () => {
  const theme = useTheme();

  const { forecastResultsTitle, selectedForecastingResultsId } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const isNetworkSaved = !(selectedForecastingResultsId === "");

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <InsertPhotoOutlinedIcon />
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {forecastResultsTitle ? forecastResultsTitle : "---"}
      </Box>
      {selectedForecastingResultsId && (
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

export default ForecastChartTitlePlaque;
