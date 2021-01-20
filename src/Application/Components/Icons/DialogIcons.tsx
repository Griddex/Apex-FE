import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import { DialogIconsType } from "./DialogIconsTypes";

const dialogIcons: DialogIconsType = {
  error: <WarningIcon style={{ color: "#DA1B57" }} />,
  success: <CheckCircleIcon style={{ color: "#00C49F" }} />,
  select: <PlaylistAddCheckOutlinedIcon style={{ color: "#31BFCC" }} />,
  information: <InfoIcon style={{ color: "#31BFCC" }} />,
};

export default dialogIcons;
