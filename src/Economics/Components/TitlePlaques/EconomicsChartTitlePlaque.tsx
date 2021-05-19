import { Box, Chip, useTheme } from "@material-ui/core";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const EconomicsChartTitlePlaque = () => {
  const theme = useTheme();

  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsId,
    isEconomicsResultsSaved,
  } = useSelector((state: RootState) => state.economicsReducer);

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
