import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateFlowstationNodePositions } from "./GenerateNodePositions";

const GenerateFlowstationNodes = (flowStationsData) => {
  const flowStationsUnique = Object.keys(flowStationsData);

  const flowstationPositions = GenerateFlowstationNodePositions(
    flowStationsUnique
  );

  const flowstationNodes = Object.values(flowStationsData)
    .filter((data) => data && data !== undefined)
    .map((data, i) => {
      if (data && data !== undefined) {
        const stationName = data[0]["Flow station"];
        const rowData = data.map((row) => ({
          SN: row.SN,
          drainagePoint: row["Drainage Point"],
          stationName: row["Flow station"],
          stationType: "flowstationNode",
        }));
        const flowstationNode = GenerateNodeService("flowstation");

        const flowstationNodeUpdated = {
          ...flowstationNode,
          data: {
            ...flowstationNode.data,
            flowStation: rowData,
            name: stationName,
          },
          position: flowstationPositions[i],
        };

        return flowstationNodeUpdated;
      }
    });

  return flowstationNodes;
};

export default GenerateFlowstationNodes;
