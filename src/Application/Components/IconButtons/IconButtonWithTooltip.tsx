import { IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { IIconButtonWithTooltip } from "./IconButtonTypes";

const IconButtonWithTooltip = ({
  toolTipKey,
  toolTipTitle,
  toolTipPlacement,
  icon,
  action,
  style,
  isDisabled,
}: IIconButtonWithTooltip) => {
  const theme = useTheme();

  const commonStyle: React.CSSProperties = {
    height: "28px",
    borderRadius: 2,
    marginLeft: 4,
  };

  const finalStyle: React.CSSProperties = isDisabled
    ? {
        pointerEvents: "none",
        color: theme.palette.grey[200],
        backgroundColor: theme.palette.grey[400],
      }
    : {
        backgroundColor: theme.palette.primary.light,
        border: `1px solid ${theme.palette.primary.main}`,
        ...style,
      };

  return (
    <Tooltip
      key={toolTipKey}
      title={toolTipTitle}
      placement={toolTipPlacement}
      arrow
    >
      <IconButton
        style={{ ...commonStyle, ...finalStyle }}
        onClick={action}
        size="large"
      >
        {icon && icon()}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
