import { ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import FormatPaintOutlinedIcon from "@mui/icons-material/FormatPaintOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import PanoramaHorizontalOutlinedIcon from "@mui/icons-material/PanoramaHorizontalOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ScoreOutlinedIcon from "@mui/icons-material/ScoreOutlined"; //statistics
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import ViewStreamOutlinedIcon from "@mui/icons-material/ViewStreamOutlined";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: "auto",
    flexDirection: "column",
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
  },
  icon: { height: "100%", width: "10%", "& > *": { width: 15, height: 15 } },
  title: { height: "100%", width: "80%" },
  closeIcon: {
    height: "100%",
    width: "10%",
    "& > *": { width: 15, height: 15 },
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "100%",
    overflow: "auto",
  },
  listItem: { padding: 0, cursor: "pointer" },
  itemIcon: {
    color: theme.palette.primary.main,
    minWidth: 30,
  },
  moreItems: {
    display: "flex",
    justifyContent: "flex-end",
    color: theme.palette.primary.main,
  },
  cancelButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: "#FFF",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "auto",
    width: "100%",
    "& > *": { width: 30, height: 20, margin: 5 },
  },
}));

interface IMoreIconsPopoverProps {
  closeIcon: JSX.Element;
  handleCancel: () => void;
  localDispatch: React.Dispatch<any>;
}

const MoreIconsPopover = React.forwardRef<
  HTMLDivElement,
  IMoreIconsPopoverProps
>(({ closeIcon, handleCancel }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const moreIconsData = [
    {
      title: "Connect",
      icon: <InsertLinkOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "View",
      icon: <ViewQuiltOutlinedIcon />,
      children: [
        {
          title: "Grid",
          icon: <ViewModuleOutlinedIcon />,
          children: null,
          callBack: () => {},
        },
        {
          title: "Table",
          icon: <ViewStreamOutlinedIcon />,
          children: null,
          callBack: () => {},
        },
      ],
    },
    {
      title: "Undo",
      icon: <UndoOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Redo",
      icon: <RedoOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Save",
      icon: <SaveTwoToneIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Print",
      icon: <PrintOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Clone",
      icon: <FilterNoneOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Extrude Table",
      icon: <LaunchOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Export Table",
      icon: <PublishOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Show Statistics",
      icon: <ScoreOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Show Visualization",
      icon: <LandscapeOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Polygon",
      icon: <PanoramaHorizontalOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Brush",
      icon: <BrushOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
    {
      title: "Eraser",
      icon: <FormatPaintOutlinedIcon />,
      children: null,
      callBack: () => {},
    },
  ];

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.header}>
        <div className={classes.icon} />
        <div className={classes.title} />
        <div className={classes.closeIcon}>{closeIcon}</div>
      </div>
      <div className={classes.body}>
        <List dense>
          {moreIconsData.map((item) => {
            //TODO: Clear all

            return (
              <ListItem
                button
                className={classes.listItem}
                key={item.title}
                onClick={item.callBack}
              >
                <ListItemIcon className={classes.itemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
                {item.children && (
                  <ListItemIcon className={classes.moreItems}>
                    <KeyboardArrowRightOutlinedIcon />
                  </ListItemIcon>
                )}
              </ListItem>
            );
          })}
        </List>
      </div>
      <div className={classes.footer}>
        <Button className={classes.cancelButton} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default MoreIconsPopover;
