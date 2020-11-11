const ClusterDrainagePointData = (tableData, drainagePointsUnique) => {
  //Generate DrainagePoint Data
  const drainagePointNodes = [];
  for (const drainagePoint of drainagePointsUnique) {
    const drainagePointData = [];

    for (const row of tableData) {
      if (Object.values(row).includes(drainagePoint)) {
        drainagePointData.push(row);
      }
    }

    drainagePointNodes.push(drainagePointData);
  }

  return drainagePointNodes;
};

export default ClusterDrainagePointData;
