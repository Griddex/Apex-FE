import React from "react";
import { useDrag } from "react-dnd";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import { itemTypes } from "../../Utils/DragAndDropItemTypes";

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

const NodePanel: React.FC<nodeProps> = ({ name }) => {
  // const { updateNodePosDiff } = useStoreActions((actions) => actions);
  // const allNodes = useStoreState((store) => store.nodes);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.NETWORK_ELEMENT,
    item: {
      nodeType: name,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const nodes = [
    {
      name: "manifold",
      label: "Manifold",
      icon: (
        <img
          src={Manifold}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "flowstation",
      label: "Flowstation",
      icon: (
        <img
          src={Flowstation}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "gasFacility",
      label: "Gas Facility",
      icon: (
        <img
          src={GasFacility}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "gatheringCenter",
      label: "Gathering Center",
      icon: (
        <img
          src={GatheringCenter}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "terminal",
      label: "Terminal",
      icon: (
        <img
          src={Terminal}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "drainagePoint",
      label: "DrainagePoint",
      icon: (
        <img
          src={DrainagePoint}
          alt="Network background"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;

  const currentNode = nodes.find(
    (node) => node.name === name
  ) as currentNodeType;

  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        ref={drag}
        style={{
          opacity,
          height: "60px",
          width: "60px",
          cursor: "pointer",
          border: "1px solid grey",
          padding: "5px",
        }}
      >
        {currentNode.icon}
      </div>
      <div
        style={{
          height: "60px",
          width: "20px",
          padding: "5px",
          verticalAlign: "middle",
        }}
      >
        {currentNode.label}
      </div>
    </div>
  );
};

export default NodePanel;
