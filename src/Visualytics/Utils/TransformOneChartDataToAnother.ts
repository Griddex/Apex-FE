import omitBy from "lodash.omitby";
import { IForecastResultsTransformers } from "../../Forecast/Redux/Sagas/SagaTypes";

export const stackedChartTostackedChartData = ({
  data,
}: IForecastResultsTransformers) => {
  return data;
};

export const stackedChartToLineOrScatterChartData = ({
  data,
  yearsOrMonths,
  lineOrScatter,
}: IForecastResultsTransformers) => {
  if (data.length === 0) return [];

  const series = Object.keys(data[0]);

  const lineData = series.reduce((acc, serie) => {
    const seriesData = data.map(
      (row: Record<string, React.Key | boolean>, i: number) => {
        return {
          x: yearsOrMonths && yearsOrMonths[i],
          y: row[serie],
        };
      }
    );

    return [
      ...acc,
      {
        id: serie,
        ...(lineOrScatter === "lineChart" && { color: "#CCC" }),
        data: seriesData,
      },
    ];
  }, [] as any[]);

  return lineData;
};

export const lineOrScatterChartToStackedChartData = ({
  data,
}: IForecastResultsTransformers) => {
  if (data.length === 0) return [];

  const stackedData = data.reduce((acc: any[], row: any) => {
    const serie = row["id"];
    const lineOrScatterData = row["data"];

    const transformedStackedData = lineOrScatterData.map((row: any) => ({
      [serie]: row["y"],
    }));

    return acc.map((row: any, i: number) => ({
      ...row,
      ...transformedStackedData[i],
    }));
  }, [] as any[]);

  return stackedData;
};

//******************************************************************* */

export const stackedChartToBarChartData = ({
  data,
  yearsOrMonths,
  isYear,
}: IForecastResultsTransformers) => {
  if (data.length === 0) return [];

  const series = Object.keys(data[0]);
  const yearOrMonthTitle = isYear ? "Year" : "Month";

  const barData = data.map((row: any, i: number) => {
    const yearOrMonth = yearsOrMonths && yearsOrMonths[i];

    const seriesObj = series.reduce((acc, serie: string, i: number) => {
      const a = {
        [serie]: row[serie],
        [`${serie}Color`]: "#CCC",
      };

      return { ...acc, ...a };
    }, {});

    return { [yearOrMonthTitle]: yearOrMonth, ...seriesObj };
  }, []);

  return barData;
};

export const barChartToStackedChartData = ({
  data,
}: IForecastResultsTransformers) => {
  if (data.length === 0) return [];

  const keys = Object.keys(data[0]);

  const stackedData = data.map((row: any, i: number) => {
    const series = keys.filter((k) => {
      const isSeries =
        k.toLowerCase() !== "year" &&
        k.toLowerCase() !== "month" &&
        !k.toLowerCase().endsWith("color");

      if (isSeries) return k;
    });

    return omitBy(row, (_, k) => series.includes(k));
  }, []);

  return stackedData;
};

//******************************************************************* */

export const stackedChartToDoughnutChartData = ({
  data,
}: IForecastResultsTransformers) => {
  if (data.length === 0) return [];

  const series = Object.keys(data[0]);

  const doughnutData = series.map((serie: string, i: number) => {
    const cummulativeValue = data.reduce((acc: number, row: any, i: number) => {
      return acc + parseFloat(row[serie]);
    }, 0);

    return {
      id: serie,
      label: serie,
      color: "#CCC",
      value: cummulativeValue,
    };
  }, []);
  return doughnutData;
};
