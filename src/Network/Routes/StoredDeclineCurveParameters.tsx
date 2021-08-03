import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
} from "../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { fetchStoredDeclineCurveParametersRequestAction } from "../Redux/Actions/NetworkActions";
import {
  ReducersType,
} from "../../Application/Components/Workflows/WorkflowTypes";


const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredDeclineCurveParameters({
  workflowProcess,
  containerStyle,
}: IStoredDataProps) {
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const mainUrl = `${getBaseForecastUrl()}/well-decline-parameters`;
  const collectionName = "declineParameters";
  const reducer = "networkReducer" as ReducersType;

  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const wp = workflowProcess as NonNullable<
    IStoredDataProps["workflowProcess"]
  >;

  const componentRef = React.useRef();

  const storedData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  );


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

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "DECLINE PARAMETERS TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction(reducer, {
          selectedDeclineParametersId: id,
          selectedDeclineParametersTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction(reducer, {
          selectedDeclineParametersId: "",
          selectedDeclineParametersTitle: "",
        })
      );
  };

  const buttonToolTip = "newDeclineParametersToolTip";
  const butttonTitle = "Add new decline parameters";
  const dialogTitle = "CREATE NEW DECLINE PARAMETER";


  const props = {
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    wkPs: wp,
    containerStyle,
    handleCheckboxChange,
    clickAwayAction,
    reducer,
    collectionName,
    mainUrl,
    buttonToolTip,
    butttonTitle,
    dialogTitle,
    fetchStoredRequestAction: () =>
      fetchStoredDeclineCurveParametersRequestAction(currentProjectId, false)
  };


  return <StoredDataRoute {...props} />;
}
