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
import React from "react";

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
  },
  moreItems: {
    display: "flex",
    justifyContent: "flex-end",
    color: theme.palette.primary.main,
  },
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
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

const moreIconsData = [
  {
    icon: <InsertLinkOutlinedIcon />,
    title: "Connect",
    children: null,
  },
  {
    icon: <ViewQuiltOutlinedIcon />,
    title: "View",
    children: [
      {
        icon: <ViewModuleOutlinedIcon />,
        title: "Grid",
        children: null,
      },
      {
        icon: <ViewStreamOutlinedIcon />,
        title: "Table",
        children: null,
      },
    ],
  },
  {
    icon: <UndoOutlinedIcon />,
    title: "Undo",
    children: null,
  },
  {
    icon: <RedoOutlinedIcon />,
    title: "Redo",
    children: null,
  },
  {
    icon: <PrintOutlinedIcon />,
    title: "Print",
    children: null,
  },
  {
    icon: <FilterNoneOutlinedIcon />,
    title: "Clone",
    children: null,
  },
  {
    icon: <LaunchOutlinedIcon />,
    title: "Extrude Table",
    children: null,
  },
  {
    icon: <PublishOutlinedIcon />,
    title: "Export Table",
    children: null,
  },
  {
    icon: <ScoreOutlinedIcon />,
    title: "Show Statistics",
    children: null,
  },
  {
    icon: <LandscapeOutlinedIcon />,
    title: "Show Visualization",
    children: null,
  },
  {
    icon: <PanoramaHorizontalOutlinedIcon />,
    title: "Polygon",
    children: null,
  },
  {
    icon: <BrushOutlinedIcon />,
    title: "Brush",
    children: null,
  },
  {
    icon: <FormatPaintOutlinedIcon />,
    title: "Eraser",
    children: null,
  },
];

const MoreIconsPopover = React.forwardRef(
  ({ closeIcon, handleCancel, localDispatch }, ref) => {
    const classes = useStyles();
    // const headers = useSelector((state) => state.importReducer.fileHeaders);

    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.header}>
          <div className={classes.icon} />
          <div className={classes.title} />
          <div className={classes.closeIcon}>{closeIcon}</div>
        </div>
        <div className={classes.body}>
          <List dense>
            {moreIconsData.map((item, listIndex) => {
              //TODO: Clear all

              return (
                <ListItem
                  button
                  className={classes.listItem}
                  key={item.title}
                  name={item.title}
                  // onClick={() =>
                  //   localDispatch({
                  //     type: "ACTIVECOLUMN_TABLE",
                  //     payload: header,
                  //   })
                  // }
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
  }
);

export default MoreIconsPopover;
