import { TooltipProps } from "@mui/material/Tooltip";

export interface IIconButtonWithTooltip {
  toolTipKey: string;
  toolTipTitle: string;
  toolTipPlacement: TooltipProps["placement"];
  icon: () => JSX.Element;
  action?: () => void;
}
