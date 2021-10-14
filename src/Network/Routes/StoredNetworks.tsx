import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IApplicationStoredDataRow } from "../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { fetchStoredNetworkDataRequestAction } from "../Redux/Actions/NetworkActions";
import { IStoredNetworks } from "./StoredNetworkTypes";

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredNetworks({
  workflowProcess,
  containerStyle,
}: IStoredNetworks) {
  const theme = useTheme();

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

  const currentProjectId = useSelector(currentProjectIdSelector);

  const mainUrl = `${getBaseForecastUrl()}/network`;
  const collectionName = "declineParameters";

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp = workflowProcess;

  const networkStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.networkReducer[wc]["networkStored"],
    (stored) => stored
  );

  const networkStored = useSelector(networkStoredSelector);

  const snStoredData = networkStored.map(
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

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "NETWORK TITLE";

  const handleCheckboxChange = (row: any) => {
    console.log("row: ", row);
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("networkReducer", {
          selectedNetworkId: id,
          selectedNetworkTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("networkReducer", {
          selectedNetworkId: "",
          selectedNetworkTitle: "",
        })
      );
  };

  const props = {
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    wkPs: wp,
    containerStyle,
    collectionName,
    handleCheckboxChange,
    // clickAwayAction,
    mainUrl,
    fetchStoredRequestAction: () =>
      fetchStoredNetworkDataRequestAction(currentProjectId),
  };

  return <StoredDataRoute {...props} />;
}
