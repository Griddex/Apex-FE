import { IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { IIconButtonWithTooltip } from "./IconButtonTypes";

const IconButtonWithTooltip = ({
  toolTipKey,
  toolTipTitle,
  toolTipPlacement,
  icon,
  action,
}: IIconButtonWithTooltip) => {
  const theme = useTheme();

  return (
    <Tooltip
      key={toolTipKey}
      title={toolTipTitle}
      placement={toolTipPlacement}
      arrow
    >
      <IconButton
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          marginLeft: 4,
        }}
        onClick={action}
        size="large">
        {icon && icon()}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
