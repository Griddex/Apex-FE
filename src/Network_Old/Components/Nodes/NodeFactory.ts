import { WellheadNodeModel } from "./Wellhead/WellheadNodeModel";

const nodeFactory = (nodeName: string, nodeType: string) => {
  switch (nodeType) {
    case "wellhead":
      return new WellheadNodeModel({ name: nodeName });
    default:
      return new WellheadNodeModel({ name: nodeName });
  }
};

export default nodeFactory;
