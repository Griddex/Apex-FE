import { IDragItem } from "../../Visualytics/Components/ChartCategories/ChartCategoryTypes";
import { IVisualyticsResultsTransformers } from "../../Visualytics/Redux/Sagas/SagaTypes";

export type TVisualyticsServerData = {
  name: string;
  values: number[] | string[];
}[];

export const generateNamesValuesObj = (
  names: string[],
  data: IVisualyticsResultsTransformers["data"]
) => {
  const namesValuesObj = names.reduce((acc, name) => {
    const dataObj = data.find((o) => o.name.startsWith(name));

    if (dataObj) {
      return { ...acc, [name]: dataObj.values };
    } else {
      return acc;
    }
  }, {});
  console.log(
    "🚀 ~ file: TransformOneVisualyticsDataToAnother.ts ~ line 22 ~ namesValuesObj ~ namesValuesObj",
    namesValuesObj
  );

  return namesValuesObj;
};

export const linkColumnNamesToCategories = (
  data: IVisualyticsResultsTransformers["data"],
  categoryDragItems: IVisualyticsResultsTransformers["categoryDragItems"]
) => {
  const xObj = categoryDragItems && categoryDragItems["X Category"];
  const xNames = Object.values(xObj as Record<string, IDragItem>).map(
    (obj) => obj.name
  );

  const yObj = categoryDragItems && categoryDragItems["Y Category"];
  const yNames = Object.values(yObj as Record<string, IDragItem>).map(
    (obj) => obj.name
  );

  const ySecondaryObj =
    categoryDragItems && categoryDragItems["Y Secondary Category"];
  const ySecondaryNames = Object.values(
    ySecondaryObj as Record<string, IDragItem>
  ).map((obj) => obj.name);

  const zObj = categoryDragItems && categoryDragItems["Z Category"];
  const zNames = Object.values(zObj as Record<string, IDragItem>).map(
    (obj) => obj.name
  );

  const rObj = categoryDragItems && categoryDragItems["R Category"];
  const rNames = Object.values(rObj as Record<string, IDragItem>).map(
    (obj) => obj.name
  );

  const xNamesObj = generateNamesValuesObj(xNames, data);
  const yNamesObj = generateNamesValuesObj(yNames, data);
  const ySecondaryNamesObj = generateNamesValuesObj(ySecondaryNames, data);
  const zNamesObj = generateNamesValuesObj(zNames, data);
  const rNamesObj = generateNamesValuesObj(rNames, data);

  return {
    "X Category": xNamesObj,
    "Y Category": yNamesObj,
    "Y Secondary Category": ySecondaryNamesObj,
    "Z Category": zNamesObj,
    "R Category": rNamesObj,
  };
};

export const visualyticsDataToStackedChartData = ({
  data,
  categoryDragItems,
  chartStory,
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const stackedData = [];
  const xValues = linkedData && Object.values(linkedData["X Category"])[0];

  const catgry =
    chartStory === "primary" ? "Y Category" : "Y Secondary Category";

  const yObj = linkedData && linkedData[catgry];
  const yNames = Object.keys(yObj);

  for (let i = 0; i < xValues.length; i++) {
    const obj = yNames.reduce((acc, name) => {
      return { ...acc, [name]: yObj[name][i] };
    }, {});

    stackedData.push(obj);
  }

  return { data: stackedData, xValueCategories: xValues };
};

export const visualyticsDataToLineOrScatterChartData = ({
  data,
  categoryDragItems,
  lineOrScatter,
  chartStory,
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;
  console.log(
    "🚀 ~ file: TransformOneVisualyticsDataToAnother.ts ~ line 111 ~ linkedData",
    linkedData
  );
  const catgry =
    chartStory === "primary" ? "Y Category" : "Y Secondary Category";
  const yNames = Object.keys(linkedData[catgry]);
  console.log(
    "🚀 ~ file: TransformOneVisualyticsDataToAnother.ts ~ line 115 ~ yNames",
    yNames
  );
  if (yNames.length === 0) return [];

  //TODO this is considering only one x value on bottom
  const xValues = Object.values(linkedData["X Category"])[0];
  console.log(
    "🚀 ~ file: TransformOneVisualyticsDataToAnother.ts ~ line 120 ~ xValues",
    xValues
  );

  const lineData = yNames.reduce((acc, yName) => {
    const yNamesData =
      linkedData &&
      linkedData[catgry][yName].map((name: string, i: number) => ({
        x: (xValues as any[])[i],
        y: name,
      }));

    return [
      ...acc,
      {
        id: yName,
        ...(lineOrScatter === "lineChart" && { color: "#CCC" }),
        data: yNamesData,
      },
    ];
  }, [] as any[]);
  console.log(
    "🚀 ~ file: TransformOneVisualyticsDataToAnother.ts ~ line 139 ~ lineData ~ lineData",
    lineData
  );

  return { data: lineData, xValueCategories: xValues };
};

export const visualyticsDataToDoughnutChartData = ({
  data,
  categoryDragItems,
  chartStory,
  collateBy,
  collationFxn,
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const catgry =
    chartStory === "primary" ? "Y Category" : "Y Secondary Category";

  const yNames = Object.keys(linkedData[catgry]);
  if (yNames.length === 0) return [];
  const xValues = Object.values(linkedData["X Category"])[0];

  let doughnutData: any[];
  let cummulativeValue: number;

  if (collateBy === "xValue") {
    doughnutData = xValues.map((xValue: string, i: number) => {
      cummulativeValue = Object.values(linkedData[catgry]).reduce(
        (acc: number, arr: any) => {
          return acc + parseFloat(arr[i]);
        },
        0
      );

      return {
        id: xValue,
        label: xValue,
        color: "#CCC",
        value: cummulativeValue,
      };
    }, []);
  } else {
    doughnutData = yNames.map((yName: string, i: number) => {
      cummulativeValue = linkedData[catgry][yName].reduce(
        (acc: number, v: any) => {
          return acc + parseFloat(v);
        },
        0
      );

      return {
        id: yName,
        label: yName,
        color: "#CCC",
        value: cummulativeValue,
      };
    }, []);
  }

  return { data: doughnutData, xValueCategories: xValues };
};

export const visualyticsDataToBarOrHeatmapChartData = ({
  data,
  categoryDragItems,
  chartStory,
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const catgry =
    chartStory === "primary" ? "Y Category" : "Y Secondary Category";

  const yObj = linkedData[catgry];
  const yNames = Object.keys(yObj);
  if (yNames.length === 0) return [];

  const xObj = linkedData["X Category"];
  const xName = Object.keys(xObj)[0];
  const xValues = xObj[xName];

  const barData = xValues.map((xValue: any, i: number) => {
    const yNamesObj = yNames.reduce((acc, yName: string) => {
      const a = {
        [yName]: yObj[yName][i],
        [`${yName}Color`]: "#CCC",
      };

      return { ...acc, ...a };
    }, {});

    return { [xName]: xValue, ...yNamesObj };
  }, []);

  return { data: barData, xValueCategories: xValues };
};
