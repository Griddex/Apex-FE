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
    "/import": <ExitToAppIcon fontSize={FontSize} />,
    "/network": <AccountTreeIcon fontSize={FontSize} />,
    "/visualization": <BarChartIcon fontSize={FontSize} />,
    "/settings": <TuneIcon fontSize={FontSize} />,

    "/facilitiesdeck": <AppsIcon fontSize={FontSize} />,
    "/forecastdeck": <LandscapeIcon fontSize={FontSize} />,
    "/productiondata": <BubbleChartIcon fontSize={FontSize} />,
    "/economicsdata": <AttachMoneyIcon fontSize={FontSize} />,
  };

  return icons[icon];
};

export default IconsService;
