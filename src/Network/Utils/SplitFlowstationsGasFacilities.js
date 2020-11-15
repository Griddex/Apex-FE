const SplitFlowstationsGasFacilities = (flowStationsGasFacilitiesData) => {
  const flowStationsData = {};
  const gasFacilitiesData = {};

  for (const key in flowStationsGasFacilitiesData) {
    const data = flowStationsGasFacilitiesData[key][0];

    if (data["Hydrocarbon Stream"] === "GAS")
      gasFacilitiesData[key] = flowStationsGasFacilitiesData[key];
    else if (data["Hydrocarbon Stream"] === "OIL")
      flowStationsData[key] = flowStationsGasFacilitiesData[key];
  }

  return { flowStationsData, gasFacilitiesData };
};

export default SplitFlowstationsGasFacilities;
