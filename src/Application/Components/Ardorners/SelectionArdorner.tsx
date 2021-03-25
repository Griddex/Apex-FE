import { useTheme } from "@material-ui/core";
import React from "react";
import BorderWrapper from "react-border-wrapper";
import { ISelectionArdorner } from "./SelectionArdornerTypes";
import DoneIcon from "@material-ui/icons/Done";

const SelectionArdorner = ({
  children,
  showArdornment,
}: ISelectionArdorner) => {
  const theme = useTheme();
  if (showArdornment)
    return (
      <BorderWrapper
        borderColour={theme.palette.success.main}
        borderWidth="2px"
        borderRadius="0px"
        borderType="solid"
        innerPadding="0px"
        rightElement={() => (
          <DoneIcon style={{ color: theme.palette.success.main }} />
        )}
        rightPosition={0.5}
        rightOffset="-12px"
        rightGap="0px"
      >
        {children}
      </BorderWrapper>
    );
  else return children;
};

export default SelectionArdorner;
