import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import {
  IStoredDataProps,
  IApplicationStoredDataRow,
} from "../../Application/Types/ApplicationTypes";
import { fetchStoredInputDeckRequestAction } from "../../Import/Redux/Actions/StoredInputDeckActions";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../../Import/Routes/InputDeckTypes";

export default function StoredVisualyticsDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredInputDeck) {
  const theme = useTheme();
  //TODO: Calculate classification data from collection
  const chartData = [
    {
      id: "Group A",
      label: "Group A",
      value: 2400,
      color: theme.palette.primary.main,
    },
    {
      id: "Group B",
      label: "Group B",
      value: 4567,
      color: theme.palette.success.main,
    },
    {
      id: "Group C",
      label: "Group C",
      value: 1398,
      color: theme.palette.secondary.main,
    },
  ];
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableTitle = "Visualytics InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/visualytics-inputdeck`;
  const collectionName = "InputDeckEntities";

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "visualyticsDeckStored";
  const storedData = useSelector(
    // const { visualyticsDeckStored } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );
  console.log(
    "Logged output --> ~ file: StoredVisualyticsDecks.tsx ~ line 54 ~ storedData",
    storedData
  );

  const componentRef = React.useRef();

  const snStoredData =
    storedData &&
    storedData.map((row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    }));

  const dataKey = "title";
  const dataTitle = "VISUALYTICS DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("visualyticsReducer", {
          selectedVisualyticsInputDeckId: id,
          selectedVisualyticsInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("visualyticsReducer", {
          selectedVisualyticsInputDeckId: "",
          selectedVisualyticsInputDeckTitle: "",
        })
      );
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

  return (
    <StoredDataRoute
      {...props}
      ref={componentRef as React.MutableRefObject<any>}
    />
  );
}
