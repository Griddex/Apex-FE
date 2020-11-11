import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateTerminalNodePositions } from "./GenerateNodePositions";

const GenerateTerminalNodes = (terminalData) => {
  const terminalNodePositions = GenerateTerminalNodePositions(terminalData);

  const terminalNodes = terminalData
    .filter((terminal) => terminal && terminal !== undefined)
    .map((terminal, i) => {
      if (terminal && terminal !== undefined) {
        const terminalNode = GenerateNodeService("terminal");

        const terminalNodeUpdated = {
          ...terminalNode,
          data: { ...terminalNode.data, name: terminal },
          position: terminalNodePositions[i],
        };

        return terminalNodeUpdated;
      }
    });

  return terminalNodes;
};

export default GenerateTerminalNodes;
