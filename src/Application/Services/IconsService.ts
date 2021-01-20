import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BarChartIcon from "@material-ui/icons/BarChart";
import TuneIcon from "@material-ui/icons/Tune";
import AppsIcon from "@material-ui/icons/Apps";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

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
