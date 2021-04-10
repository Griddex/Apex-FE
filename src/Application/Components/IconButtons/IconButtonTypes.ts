import { TooltipProps } from "@material-ui/core/Tooltip";

export interface IIconButtonWithTooltip {
  toolTipKey: string;
  toolTipTitle: string;
  toolTipPlacement: TooltipProps["placement"];
  icon: () => JSX.Element;
  action: () => void;
}
