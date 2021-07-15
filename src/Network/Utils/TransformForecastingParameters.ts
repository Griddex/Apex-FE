import formatDate from "../../Application/Utils/FormatDate";
import {
  IBackendForecastingParametersRow,
  IForecastParametersStoredRow,
} from "../Components/Dialogs/StoredNetworksDialogTypes";

export const storedToForecastingParameters = (
  forecastingParametersStored: IBackendForecastingParametersRow[],
  dayFormat: string,
  monthFormat: string,
  yearFormat: string
) => {
  const transStoredData = forecastingParametersStored.map(
    (row: IBackendForecastingParametersRow) => {
      const {
        id,
        forecastInputDeckId,
        forecastInputdeckTitle,
        title,
        description,
        type,
        createdAt,
        wellPrioritizationId,
        declineParametersId,
        wellPrioritizationTitle,
        wellDeclineParameterTitle,
        parametersEntity,
      } = row;

      const {
        timeFrequency,
        targetFluid,
        isDefered,
        startDay,
        startMonth,
        startYear,
        stopDay,
        stopMonth,
        stopYear,
      } = parametersEntity;

      return {
        forecastingParametersId: id,
        forecastInputDeckId,
        forecastInputdeckTitle,
        title,
        description,
        type,
        wellDeclineParameterId: declineParametersId,
        wellPrioritizationId,
        wellDeclineParameterTitle,
        wellPrioritizationTitle,
        targetFluid,
        timeFrequency,
        isDefered: isDefered === 0 ? "noDeferment" : "useDeferment",
        realtimeResults: "no",
        startForecast: formatDate(
          new Date(startYear, startMonth, startDay),
          dayFormat,
          monthFormat,
          yearFormat
        ),
        endForecast: formatDate(
          new Date(stopYear, stopMonth, stopDay),
          dayFormat,
          monthFormat,
          yearFormat
        ),
        author: { avatarUrl: "", name: "None" },
        createdOn: createdAt,
        modifiedOn: createdAt,
      };
    }
  ) as IForecastParametersStoredRow[];

  const snTransStoredData = transStoredData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IForecastParametersStoredRow[];

  return snTransStoredData;
};

export const forecastingParametersToStored = (
  currentRow: IForecastParametersStoredRow,
  noOfRows: number
) => {
  const {
    startForecast,
    endForecast,
    targetFluid,
    timeFrequency,
    isDefered,
    wellDeclineParameterId,
    wellDeclineParameterTitle,
    wellPrioritizationId,
    wellPrioritizationTitle,
    forecastInputDeckId,
    forecastInputdeckTitle,
  } = currentRow;

  const startDay = new Date(startForecast).getDay();
  const startMonth = new Date(startForecast).getMonth();
  const startYear = new Date(startForecast).getFullYear();
  const stopDay = new Date(endForecast).getDay();
  const stopMonth = new Date(endForecast).getMonth();
  const stopYear = new Date(endForecast).getFullYear();

  const newRow = {
    parametersEntity: {
      startDay,
      startMonth,
      startYear,
      stopDay,
      stopMonth,
      stopYear,
      targetFluid,
      timeFrequency,
      isDefered: isDefered === "noDeferment" ? 0 : 1,
    },
    sn: noOfRows + 1,
    id: "",
    title: "New Title",
    description: "New Description",
    type: "User",
    createdAt: new Date().toDateString(),
    declineParametersId: wellDeclineParameterId,
    wellDeclineParameterTitle,
    wellPrioritizationId,
    wellPrioritizationTitle,
    forecastInputDeckId,
    forecastInputdeckTitle,
  } as IBackendForecastingParametersRow;

  return newRow;
};
