import React from "react";
import { costsRevenueAggregationLevelOptions } from "../Data/EconomicsData";

const getAggregationLevelOption = (data: any[]) => {
  console.log(
    "🚀 ~ file: GetAggregationLevelOption.tsx ~ line 5 ~ getAggregationLevelOption ~ data",
    data
  );
  if (data.length === 0)
    return {
      value: "project",
      label: "Project",
    };

  const relevantRow = data[2];
  const relevantKeys = Object.keys(relevantRow).map((k) =>
    k.trim().toLowerCase()
  );

  const aggregationLevels = costsRevenueAggregationLevelOptions.map((o) =>
    o.value.trim().toLowerCase()
  );

  let currentLevel = "project";
  let i = 0;
  for (const level of aggregationLevels) {
    if (relevantKeys.includes(level)) {
      currentLevel = level;
      break;
    }
    i += 1;
  }

  return costsRevenueAggregationLevelOptions[i];
};

export default getAggregationLevelOption;
