import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import { useSnackbar } from "notistack";
import React from "react";
import Dropzone from "react-dropzone";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import TreeView from "./TreeView";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  chartSelect: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  chartProps: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 200,
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  list: { minHeight: 200, border: "1px solid #C4C4C4" },
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
}));

const StackedAreaChartPanel = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // const ChartInput = () => {
  //   const [inputList, setInputList] = React.useState([]);

  //   return (
  //     <Dropzone
  //       accept="text/plain"
  //       onDropAccepted={(acceptedText) => {
  //         setInputList(acceptedText);
  //       }}
  //       onDropRejected={(rejectedText) => {
  //         enqueueSnackbar(`Data format not supported! ${rejectedText}`, {
  //           persist: false,
  //           variant: "error",
  //         });
  //       }}
  //       //   disabled={isDisabled}
  //       minSize={0}
  //       maxSize={1048}
  //       multiple={true}
  //     >
  //       {({ getRootProps, getInputProps }) => {
  //         return (
  //           <List dense {...getRootProps()} {...getInputProps()}>
  //             {inputList.map((item) => {
  //               //TODO: Clear all

  //               return (
  //                 <ListItem
  //                   button
  //                   className={classes.listItem}
  //                   key={item.title}
  //                   onClick={item.callBack}
  //                 >
  //                   <ListItemIcon className={classes.itemIcon}>
  //                     {item.icon}
  //                   </ListItemIcon>
  //                   <ListItemText>{item.title}</ListItemText>
  //                   {item.children && (
  //                     <ListItemIcon className={classes.moreItems}>
  //                       <KeyboardArrowRightOutlinedIcon />
  //                     </ListItemIcon>
  //                   )}
  //                 </ListItem>
  //               );
  //             })}
  //           </List>
  //         );
  //       }}
  //     </Dropzone>
  //   );
  // };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TreeView />
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="X Category"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Y Category"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Filter"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Color"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
    </div>
  );
};

export default StackedAreaChartPanel;
