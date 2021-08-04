export interface IExtraNodeProps {
  xPos: number;
  yPos: number;
  data: any;
}

export interface IWidget {
  title?: string;
  drainagePoints?: string[];
}

export type TNodeTypes =
  | "drainagePoint"
  | "manifold"
  | "flowstation"
  | "gasFacility"
  | "gatheringCenter"
  | "terminal";
