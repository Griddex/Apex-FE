import { NodeTypesType } from "react-flow-renderer";
import DrainagePointSummaryNode from "../Components/Widgets/DrainagePointSummaryWidget";
import DrainagePointNode from "../Components/Widgets/DrainagePointWidget";
import FlowstationNode from "../Components/Widgets/FlowstationWidget";
import GasFacilityNode from "../Components/Widgets/GasFacilityWidget";
import GatheringCenterNode from "../Components/Widgets/GatheringCenterWidget";
import ManifoldNode from "../Components/Widgets/ManifoldWidget";
import TerminalNode from "../Components/Widgets/TerminalWidget";
import DrainagePoint from "../Images/DrainagePoint.svg";
import Flowstation from "../Images/Flowstation.svg";
import GasFacility from "../Images/GasFacility.svg";
import GatheringCenter from "../Images/GatheringCenter.svg";
import Manifold from "../Images/Manifold.svg";
import Terminal from "../Images/Terminal.svg";
import Image from "../../Application/Components/Visuals/Image";

export const streamOptions = [
  {
    value: "oil",
    label: "Oil",
  },
  {
    value: "gas",
    label: "Gas",
  },
  {
    value: "condensate",
    label: "Condensate",
  },
];

export const timeFrequencyOptions = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];

export const defermentOptions = [
  {
    value: "useDeferment",
    label: "Use Deferment",
  },
  {
    value: "noDeferment",
    label: "No Deferment",
  },
];

export const realtimeOptions = [
  {
    value: "no",
    label: "No",
  },
  {
    value: "yes",
    label: "Yes",
  },
];

export const declineTypeOptions = [
  {
    value: "exponential",
    label: "Exponential",
  },
  {
    value: "hyperbolic",
    label: "Hyperbolic",
  },
  {
    value: "harmonic",
    label: "Harmonic",
  },
];

export const nodeTypes = {
  drainagePointSummaryNode: DrainagePointSummaryNode,
  drainagePointNode: DrainagePointNode,
  manifoldNode: ManifoldNode,
  flowstationNode: FlowstationNode,
  gasFacilityNode: GasFacilityNode,
  gatheringCenterNode: GatheringCenterNode,
  terminalNode: TerminalNode,
};

export type TNodeTypes = keyof typeof nodeTypes;

export const networkIcons: Record<string, string> = {
  drainagePoint: DrainagePoint,
  drainagePointSummary: DrainagePoint,
  manifold: Manifold,
  flowstation: Flowstation,
  gasFacility: GasFacility,
  gatheringCenter: GatheringCenter,
  terminal: Terminal,
};
