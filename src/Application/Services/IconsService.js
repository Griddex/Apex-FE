import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BarChartIcon from "@material-ui/icons/BarChart";
import TuneIcon from "@material-ui/icons/Tune";
import AppsIcon from "@material-ui/icons/Apps";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const IconsService = (icon, FontSize) => {
  const icons = {
    "/auth/import": <ExitToAppIcon fontSize={FontSize} />,
    "/auth/network": <AccountTreeIcon fontSize={FontSize} />,
    "/auth/visualization": <BarChartIcon fontSize={FontSize} />,
    "/auth/settings": <TuneIcon fontSize={FontSize} />,

    "/auth/import/facilitiesdeck": <AppsIcon fontSize={FontSize} />,
    "/auth/import/forecastdeck": <LandscapeIcon fontSize={FontSize} />,
    "/auth/import/productiondata": <BubbleChartIcon fontSize={FontSize} />,
    "/auth/import/economicsdata": <AttachMoneyIcon fontSize={FontSize} />,
  };

  return icons[icon];
};

export default IconsService;
