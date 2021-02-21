import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import { DialogIconsType, IconNameType } from "./DialogIconsTypes";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useTheme } from "@material-ui/core/styles";

const DialogIcons = ({ iconType }: { iconType: IconNameType }) => {
  const theme = useTheme();

  const icons: DialogIconsType = {
    error: <WarningIcon style={{ color: theme.palette.secondary.main }} />,
    success: <CheckCircleIcon style={{ color: theme.palette.success.main }} />,
    select: (
      <PlaylistAddCheckOutlinedIcon
        style={{ color: theme.palette.primary.main }}
      />
    ),
    information: <InfoIcon style={{ color: theme.palette.primary.main }} />,
    confirmation: (
      <HelpOutlineOutlinedIcon style={{ color: theme.palette.primary.main }} />
    ),
    network: <AccountTreeIcon style={{ color: theme.palette.primary.main }} />,
  };

  return icons[iconType];
};

export default DialogIcons;
