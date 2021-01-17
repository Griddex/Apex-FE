import { ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import FormatPaintOutlinedIcon from "@material-ui/icons/FormatPaintOutlined";
import InsertLinkOutlinedIcon from "@material-ui/icons/InsertLinkOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import LandscapeOutlinedIcon from "@material-ui/icons/LandscapeOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import PanoramaHorizontalOutlinedIcon from "@material-ui/icons/PanoramaHorizontalOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import ScoreOutlinedIcon from "@material-ui/icons/ScoreOutlined"; //statistics
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import ViewQuiltOutlinedIcon from "@material-ui/icons/ViewQuiltOutlined";
import ViewStreamOutlinedIcon from "@material-ui/icons/ViewStreamOutlined";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addTabAction,
  setCurrentMainTabValueAction,
} from "../../Redux/Actions/ApplicationActions";

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
    // flex: "auto",
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
    overflow: "overlay",
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
      callBack: () => {
        dispatch(
          addTabAction({ label: "visualytics", displayed: false }, [
            "visualytics",
          ])
        );
        dispatch(setCurrentMainTabValueAction(1));
      },
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
