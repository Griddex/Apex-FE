import GenerateNodeService from "./../Services/GenerateNodeService";

const GenerateWellheadNodes = (drainagePointsUnique) => {
  const wellheadNodes = drainagePointsUnique.map((drainagePoint) => {
    if (drainagePoint !== [] && drainagePoint !== undefined) {
      const wellheadNode = GenerateNodeService("wellhead");
      const wellheadNodeUpdated = {
        ...wellheadNode,
        data: { ...wellheadNode.data, forecastData: drainagePoint },
      };
      return wellheadNodeUpdated;
    }
  });

  return wellheadNodes;
};

export default GenerateWellheadNodes;
