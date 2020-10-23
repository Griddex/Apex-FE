import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../../../Visualytics/Utils/DragAndDropItemTypes";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import Wellhead from "../../Images/Wellhead.svg";

interface nodeProps {
  name: string;
}
interface currentNodeType {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const NodeTemplate: React.FC<nodeProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.NETWORK_ELEMENT,
      nodeType: name,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const nodes = [
    {
      name: "manifold",
      label: "Manifold",
      icon: <img src={Manifold} alt="Network background" height={80} />,
    },
    {
      name: "flowstation",
      label: "Flowstation",
      icon: <img src={Flowstation} alt="Network background" height={80} />,
    },
    {
      name: "gasFacility",
      label: "Gas Facility",
      icon: <img src={GasFacility} alt="Network background" height={80} />,
    },
    {
      name: "gatheringCenter",
      label: "Gathering Center",
      icon: <img src={GatheringCenter} alt="Network background" height={80} />,
    },
    {
      name: "terminal",
      label: "Terminal",
      icon: <img src={Terminal} alt="Network background" height={80} />,
    },
    {
      name: "wellhead",
      label: "Wellhead",
      icon: <img src={Wellhead} alt="Network background" height={80} />,
    },
  ];

  const opacity = isDragging ? 0.4 : 1;

  const currentNode: currentNodeType = nodes.find(
    (node) => node.name === name
  ) as currentNodeType;

  return (
    <div
      ref={drag}
      style={{
        opacity,
        height: "auto",
        width: "auto",
        cursor: "pointer",
        border: "1px solid grey",
      }}
    >
      {currentNode.icon}
    </div>
  );
};

export default NodeTemplate;
