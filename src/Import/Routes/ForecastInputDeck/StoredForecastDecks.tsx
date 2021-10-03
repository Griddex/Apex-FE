import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
} from "../../../Application/Types/ApplicationTypes";
import { fetchStoredInputDeckRequestAction } from "../../Redux/Actions/StoredInputDeckActions";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../InputDeckTypes";

export default function StoredForecastDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredInputDeck) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "forecastInputDeckStored";
  const storedData = useSelector((state: RootState) => state[reducer][wc][wp]);

  const componentRef = React.useRef();
  //TODO: Calculate classification data from collection
  const chartData = [
    {
      id: "A",
      label: "A",
      value: 2400,
      color: theme.palette.primary.main,
    },
    {
      id: "B",
      label: "B",
      value: 4567,
      color: theme.palette.success.main,
    },
    {
      id: "C",
      label: "C",
      value: 1398,
      color: theme.palette.secondary.main,
    },
  ];
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableTitle = "Forecast InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/forecast-inputdeck`;
  const collectionName = "InputDeckEntities";

  const snStoredData = storedData.map(
    (row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  const dataKey = "title";
  const dataTitle = "FORECAST DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedForecastInputDeckId: id,
          selectedForecastInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    // persistSelectedIdTitleAction &&
    //   dispatch(
    //     persistSelectedIdTitleAction("inputReducer", {
    //       selectedForecastInputDeckId: "",
    //       selectedForecastInputDeckTitle: "",
    //     })
    //   );
  };

  const isDataVisibility = true;
  const isCloning = false;

  const props: IStoredDataProps = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
    reducer,
    collectionName,
    mainUrl,
    tableTitle,
    isDataVisibility,
    isCloning,
    clickAwayAction,
    fetchStoredRequestAction: () =>
      fetchStoredInputDeckRequestAction(currentProjectId),
  };

  return <StoredDataRoute {...props} />;
}
