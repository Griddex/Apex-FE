import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import TuneIcon from "@mui/icons-material/Tune";
import AppsIcon from "@mui/icons-material/Apps";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

// type IIcons = Record<string, OverridableComponent<SvgIconTypeMap<{}, "svg">>>;
type IIcons = Record<string, JSX.Element>;

const IconsService = (icon: string, size: string) => {
  const icons = {
    "/apex/import": ExitToAppIcon,
    "/apex/network": AccountTreeIcon,
    "/apex/visualytics": BarChartIcon,
    "/apex/settings": TuneIcon,

    "/apex/import/facilitiesdeck": AppsIcon,
    "/apex/import/forecastdeck": LandscapeIcon,
    "/apex/import/productiondata": BubbleChartIcon,
    "/apex/import/economicsdata": AttachMoneyIcon,
  };

  // return icons[icon];
};

export default IconsService;
