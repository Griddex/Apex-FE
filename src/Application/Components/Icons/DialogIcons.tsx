import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import { DialogIconsType, IconNameType } from "./DialogIconsTypes";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import TocIcon from "@material-ui/icons/Toc";
import SaveIcon from "@material-ui/icons/Save";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CategoryIcon from "@material-ui/icons/Category";

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
    delete: <DeleteIcon style={{ color: theme.palette.primary.main }} />,
    run: <PlayArrowIcon style={{ color: theme.palette.primary.main }} />,
    remove: <RemoveCircleIcon style={{ color: theme.palette.primary.main }} />,
    category: <CategoryIcon style={{ color: theme.palette.primary.main }} />,
  };

  return icons[iconType];
};

export default DialogIcons;
