import { Typography, useTheme } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../Styles/ApexFlexContainer";

const NoData = () => {
  const theme = useTheme();

  return (
    <ApexFlexContainer
      moreStyles={{ backgroundColor: theme.palette.grey["200"] }}
    >
      <Typography variant="h6">{"No Data"}</Typography>
    </ApexFlexContainer>
  );
};

export default NoData;
