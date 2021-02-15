import { Box, Chip, useTheme } from "@material-ui/core";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ForecastChartTitlePlaque = () => {
  const theme = useTheme();

  const { networkTitle, selectedNetworkId } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const isNetworkSaved = !(selectedNetworkId === "");

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <InsertPhotoOutlinedIcon />
      {/* <Typography style={{ marginLeft: 5 }}>{networkTitle}</Typography> */}
      <Box style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
        {networkTitle ? networkTitle : "---"}
      </Box>
      {selectedNetworkId && (
        <Chip
          style={{
            backgroundColor: isNetworkSaved
              ? "#00C49F"
              : theme.palette.secondary.main,
            marginLeft: 5,
            borderRadius: 4,
          }}
          size="small"
          label={isNetworkSaved ? "Saved" : "Not Saved"}
        />
      )}
    </div>
  );
};

export default ForecastChartTitlePlaque;
