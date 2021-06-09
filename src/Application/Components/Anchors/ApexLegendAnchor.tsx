import { IconButton, useTheme } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { ISelectOption } from "./../Selects/SelectItemsType";

export interface IApexLegendAnchorOption extends ISelectOption {
  action?: () => void;
}

export interface IApexLegendAnchor {
  currentAnchor: string;
  anchorData: IApexLegendAnchorOption[][];
}

const ApexLegendAnchor = ({ currentAnchor, anchorData }: IApexLegendAnchor) => {
  const theme = useTheme();

  return (
    <ApexFlexContainer flexDirection="column">
      {anchorData.map((row, i) => (
        <ApexFlexContainer key={i}>
          {row.map((option, j) => (
            <IconButton
              key={j}
              onClick={option.action}
              style={{
                backgroundColor:
                  currentAnchor === option.value ? theme.palette.grey[300] : "",
              }}
            >
              {option.label}
            </IconButton>
          ))}
        </ApexFlexContainer>
      ))}
    </ApexFlexContainer>
  );
};

export default ApexLegendAnchor;
