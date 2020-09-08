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
    "/apex/import": <ExitToAppIcon fontSize={FontSize} />,
    "/apex/network": <AccountTreeIcon fontSize={FontSize} />,
    "/apex/visualization": <BarChartIcon fontSize={FontSize} />,
    "/apex/settings": <TuneIcon fontSize={FontSize} />,

    "/apex/import/facilitiesdeck": <AppsIcon fontSize={FontSize} />,
    "/apex/import/forecastdeck": <LandscapeIcon fontSize={FontSize} />,
    "/apex/import/productiondata": <BubbleChartIcon fontSize={FontSize} />,
    "/apex/import/economicsdata": <AttachMoneyIcon fontSize={FontSize} />,
  };

  return icons[icon];
};

export default IconsService;
