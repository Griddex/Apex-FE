import countBy from "lodash.countby";

const generateDoughnutAnalyticsData = (data: any[], variableName: string) => {
  const analyticsDataArray = data.map((row) => row[variableName]);

  const analyticsCountBy = countBy(analyticsDataArray, (v) => v);
  const analyticsDataArrayLength = analyticsDataArray.length;
  const analyticsDataObj = Object.keys(analyticsCountBy).reduce((acc, k) => {
    const val = Math.round(
      (analyticsCountBy[k] / analyticsDataArrayLength) * 100
    );
    return { ...acc, [k]: val };
  }, {});

  const analyticsData = Object.keys(analyticsDataObj).map((k) => {
    return {
      id: `${k} [%]`,
      label: k.toUpperCase(),
      value: (analyticsDataObj as any)[k],
    };
  });

  return analyticsData;
};

export default generateDoughnutAnalyticsData;
