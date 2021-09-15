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
    const dataObj = data.find((o) => o.name === name);

    if (dataObj) {
      return { ...acc, [name]: dataObj.values };
    } else {
      return acc;
    }
  }, {});

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
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const stackedData = [];

  const xValues = linkedData && Object.values(linkedData["X Category"])[0];

  const yObj = linkedData && linkedData["Y Category"];
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
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const yNames = Object.keys(linkedData["Y Category"]);
  if (yNames.length === 0) return [];

  const xValues = Object.values(linkedData["X Category"])[0];

  const lineData = yNames.reduce((acc, yName) => {
    const yNamesData =
      linkedData &&
      linkedData["Y Category"][yName].map((name: string, i: number) => {
        return {
          x: (xValues as any[])[i],
          y: name,
        };
      });

    return [
      ...acc,
      {
        id: yName,
        ...(lineOrScatter === "line" && { color: "#CCC" }),
        data: yNamesData,
      },
    ];
  }, [] as any[]);

  return { data: lineData, xValueCategories: xValues };
};

export const visualyticsDataToDoughnutChartData = ({
  data,
  categoryDragItems,
  collateBy,
  collationFxn,
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const yNames = Object.keys(linkedData["Y Category"]);
  if (yNames.length === 0) return [];
  const xValues = Object.values(linkedData["X Category"])[0];

  let doughnutData: any[];
  let cummulativeValue: number;

  if (collateBy === "xValue") {
    doughnutData = xValues.map((xValue: string, i: number) => {
      cummulativeValue = Object.values(linkedData["Y Category"]).reduce(
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
      cummulativeValue = linkedData["Y Category"][yName].reduce(
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
}: IVisualyticsResultsTransformers) => {
  const linkedData = linkColumnNamesToCategories(
    data,
    categoryDragItems
  ) as NonNullable<IVisualyticsResultsTransformers["linkedData"]>;

  const yObj = linkedData["Y Category"];
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
