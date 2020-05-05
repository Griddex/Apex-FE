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
    "/valid/import": <ExitToAppIcon fontSize={FontSize} />,
    "/valid/network": <AccountTreeIcon fontSize={FontSize} />,
    "/valid/visualization": <BarChartIcon fontSize={FontSize} />,
    "/valid/settings": <TuneIcon fontSize={FontSize} />,

    "/valid/import/facilitiesdeck": <AppsIcon fontSize={FontSize} />,
    "/valid/import/forecastdeck": <LandscapeIcon fontSize={FontSize} />,
    "/valid/import/productiondata": <BubbleChartIcon fontSize={FontSize} />,
    "/valid/import/economicsdata": <AttachMoneyIcon fontSize={FontSize} />,
  };

  return icons[icon];
};

export default IconsService;
