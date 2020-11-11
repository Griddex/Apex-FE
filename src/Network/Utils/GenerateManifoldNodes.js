import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateManifoldNodePositions } from "./GenerateNodePositions";

const GenerateManifoldNodes = (manifoldUnique) => {
  const manifoldPositions = GenerateManifoldNodePositions(manifoldUnique);

  const manifoldNodes = manifoldUnique
    .filter((manifold) => manifold && manifold !== undefined)
    .map((manifold, i) => {
      if (manifold && manifold !== undefined) {
        const manifoldNode = GenerateNodeService("manifold");
        const manifoldNodeUpdated = {
          ...manifoldNode,
          data: { ...manifoldNode.data, name: manifold },
          position: manifoldPositions[i],
        };

        return manifoldNodeUpdated;
      }
    });

  return manifoldNodes;
};

export default GenerateManifoldNodes;
