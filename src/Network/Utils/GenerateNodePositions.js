const generateRepeatingSequence = (noOfNodes) => {
  const arr = [];
  for (let i = 0; i < noOfNodes; i++) {
    arr.push(i + 1);
    arr.push(i + 1);
  }
  return arr.slice(0, noOfNodes);
};

const generateAltSequence = (shift, noOfNodes, multNumbers) => {
  const altSequence = [];
  for (let i = 0; i < noOfNodes; i++) {
    const seqEle = Math.pow(-1, i + 1);
    const multNo = multNumbers[i];
    altSequence.push(seqEle * multNo * shift);
  }
  console.log(
    "Logged output -->: GenerateTerminalNodes -> altSequence",
    altSequence
  );
  return altSequence;
};

const generatePositions = (
  noOfNodes,
  terminalData,
  altSequence,
  originalPosition
) => {
  let positions = [];
  if (noOfNodes === 1) {
    positions.push(originalPosition);
  } else {
    positions = terminalData.map((_, i) => ({
      x: originalPosition.x - altSequence[i],
      y: originalPosition.y,
    }));
  }

  if (noOfNodes % 2 !== 0) {
    positions.unshift(originalPosition);
    positions.pop();
  }

  console.log(
    "Logged output -->: GenerateTerminalNodes -> positions",
    positions
  );

  return positions;
};

export const GenerateTerminalNodePositions = (terminalData) => {
  const originalPosition = { x: 460, y: 30 };
  const noOfNodes = terminalData.length;
  const shift = 50;
  const multNumbers = generateRepeatingSequence(noOfNodes);
  const altSequence = generateAltSequence(shift, noOfNodes, multNumbers);
  const positions = generatePositions(
    noOfNodes,
    terminalData,
    altSequence,
    originalPosition
  );

  return positions;
};

export const GenerateFlowstationNodePositions = (flowStationsUnique) => {
  const originalPosition = { x: 260, y: 80 };
  const noOfNodes = flowStationsUnique.length;
  const shift = 80;
  const multNumbers = generateRepeatingSequence(noOfNodes);
  const altSequence = generateAltSequence(shift, noOfNodes, multNumbers);
  const positions = generatePositions(
    noOfNodes,
    flowStationsUnique,
    altSequence,
    originalPosition
  );

  return positions;
};

export const GenerateGasfacilityNodePositions = (gasFacilitiesUnique) => {
  const originalPosition = { x: 660, y: 80 };
  const noOfNodes = gasFacilitiesUnique.length;
  const shift = 80;
  const multNumbers = generateRepeatingSequence(noOfNodes);
  const altSequence = generateAltSequence(shift, noOfNodes, multNumbers);
  const positions = generatePositions(
    noOfNodes,
    gasFacilitiesUnique,
    altSequence,
    originalPosition
  );

  return positions;
};

export const GenerateManifoldNodePositions = (manifoldUnique) => {
  const originalPosition = { x: 660, y: 180 };
  const noOfNodes = manifoldUnique.length;
  const shift = 80;
  const multNumbers = generateRepeatingSequence(noOfNodes);
  const altSequence = generateAltSequence(shift, noOfNodes, multNumbers);
  const positions = generatePositions(
    noOfNodes,
    manifoldUnique,
    altSequence,
    originalPosition
  );

  return positions;
};
