import { Box, Chip, useTheme } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

const EconomicsChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsId,
    isEconomicsResultsSaved,
  } = useSelector(economicsSelector);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <InsertPhotoOutlinedIcon />
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {selectedEconomicsResultsTitle ? selectedEconomicsResultsTitle : "---"}
      </Box>
      {selectedEconomicsResultsId && (
        <Chip
          style={{
            backgroundColor: isEconomicsResultsSaved
              ? theme.palette.success.main
              : theme.palette.secondary.main,
            marginLeft: 5,
            color: "white",
          }}
          size="small"
          label={isEconomicsResultsSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default EconomicsChartTitlePlaque;
