import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import { IApplicationStoredDataRow } from "../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { fetchStoredNetworkDataRequestAction } from "../Redux/Actions/NetworkActions";
import { IStoredNetworks } from "./StoredNetworkTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredNetworks({
  workflowProcess,
  containerStyle,
}: IStoredNetworks) {
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const mainUrl = `${getBaseForecastUrl()}/network`;

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp = workflowProcess;

  const componentRef = React.useRef();

  const { networkStored } = useSelector(
    (state: RootState) => state.networkReducer[wc]
  );

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
    handleCheckboxChange,
    clickAwayAction,
    mainUrl,
    fetchStoredRequestAction: () =>
      fetchStoredNetworkDataRequestAction(currentProjectId),
  };

  return <StoredDataRoute {...props} />;
}
