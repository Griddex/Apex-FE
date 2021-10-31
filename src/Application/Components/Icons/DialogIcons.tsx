import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { DialogIconsType, IconNameType } from "./DialogIconsTypes";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import TocIcon from "@mui/icons-material/Toc";
import SaveIcon from "@mui/icons-material/Save";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CategoryIcon from "@mui/icons-material/Category";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import NavigationIcon from "@mui/icons-material/Navigation";

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
    edit: <EditIcon style={{ color: theme.palette.primary.main }} />,
    network: <AccountTreeIcon style={{ color: theme.palette.primary.main }} />,
    table: <TocIcon style={{ color: theme.palette.primary.main }} />,
    save: <SaveIcon style={{ color: theme.palette.primary.main }} />,
    create: <AddBoxIcon style={{ color: theme.palette.primary.main }} />,
    delete: <DeleteIcon style={{ color: theme.palette.secondary.main }} />,
    run: <PlayArrowIcon style={{ color: theme.palette.primary.main }} />,
    remove: (
      <RemoveCircleIcon style={{ color: theme.palette.secondary.main }} />
    ),
    category: <CategoryIcon style={{ color: theme.palette.primary.main }} />,
    link: <LinkOutlinedIcon style={{ color: theme.palette.primary.main }} />,
    navigation: (
      <NavigationIcon style={{ color: theme.palette.primary.main }} />
    ),
  };

  return icons[iconType];
};

export default DialogIcons;
