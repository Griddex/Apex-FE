import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import ItemTypes from "../../Visualytics/Utils/DragAndDropItemTypes";
import Flowstation from "../Images/Flowstation.svg";
import GasFacility from "../Images/GasFacility.svg";
import GatheringCenter from "../Images/GatheringCenter.svg";
import Manifold from "../Images/Manifold.svg";
import Terminal from "../Images/Terminal.svg";
import Wellhead from "../Images/Wellhead.svg";

const useStyles = makeStyles((theme) => ({
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
    // overflow: "auto",
  },
}));

export interface WellheadWidgetProps {
  model: any;
  color?: string;
  name?: string;
}

const NetworkPanel = ({ model }: WellheadWidgetProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.NETWORK_ELEMENT,
      nodeType: "wellhead",
    },
    // end: (item, monitor) => {
    //   const dropResult = monitor.getDropResult();
    //   if (item && dropResult) {
    //     alert(`You dropped ${item.label} into ${dropResult.name}`);
    //   }
    // },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const opacity = isDragging ? 0.4 : 1;

  const networkComponents = [
    {
      name: "Manifold",
      icon: (
        <img src={Manifold} alt="Network background" height={80} ref={drag} />
      ),
    },
    {
      name: "Flowstation",
      icon: (
        <img
          src={Flowstation}
          alt="Network background"
          height={80}
          ref={drag}
        />
      ),
    },
    {
      name: "GasFacility",
      icon: (
        <img
          src={GasFacility}
          alt="Network background"
          height={80}
          ref={drag}
        />
      ),
    },
    {
      name: "GatheringCenter",
      icon: (
        <img
          src={GatheringCenter}
          alt="Network background"
          height={80}
          ref={drag}
        />
      ),
    },
    {
      name: "Terminal",
      icon: (
        <img src={Terminal} alt="Network background" height={80} ref={drag} />
      ),
    },
    {
      name: "Wellhead",
      icon: (
        <img src={Wellhead} alt="Network background" height={80} ref={drag} />
      ),
    },
  ];

  const renderNetworkPanel = () => {
    return (
      <>
        {networkComponents.map((element, i) => (
          <div
            key={i}
            // ref={drag}
            style={{
              opacity,
              height: "auto",
              width: "auto",
              cursor: "pointer",
              border: "1px solid grey",
            }}
          >
            {element.icon}
            {element.name}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <AnalyticsTitle title="Network Diagram Panel" />
      <div className={classes.networkPanel}>{renderNetworkPanel()}</div>
    </>
  );
};

export default NetworkPanel;
