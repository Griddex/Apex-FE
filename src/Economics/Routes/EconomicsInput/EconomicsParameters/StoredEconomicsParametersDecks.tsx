import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../../Application/Services/BaseUrlService";
import {
  IStoredDataProps,
  IApplicationStoredDataRow,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../../../../Import/Routes/InputDeckTypes";
import { fetchStoredEconomicsDataRequestAction } from "../../../Redux/Actions/EconomicsActions";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredEconomicsParametersDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredInputDeck) {
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableTitle = "Economics Parameters Table";
  const mainUrl = `${getBaseEconomicsUrl()}/parameter`;

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> =
    "economicsParametersDeckStored";
  const { economicsParametersDeckStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snStoredData: IStoredDataRow[] =
    economicsParametersDeckStored &&
    economicsParametersDeckStored.map(
      (row: IApplicationStoredDataRow, i: number) => ({
        sn: i + 1,
        id: row.id,
        approval: "Not Started",
        title: row.title,
        description: row.description,
        author: { avatarUrl: "", name: "None" },
        approvers: '"--", "--"',
        createdOn: row.createdAt,
        modifiedOn: row.createdAt,
      })
    );

  const dataKey = "title";
  const dataTitle = "ECONOMIC PARAMETERS TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          selectedEconomicsParametersInputDeckId: id,
          selectedEconomicsParametersInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedEconomicsParametersInputDeckId: "",
          selectedEconomicsParametersInputDeckTitle: "",
        })
      );
  };

  const props: IStoredDataProps = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    tableButtons,
    handleCheckboxChange,
    reducer,
    mainUrl,
    tableTitle,
    clickAwayAction,
    fetchStoredRequestAction: () =>
      fetchStoredEconomicsDataRequestAction(currentProjectId),
  };

  return <StoredDataRoute {...props} />;
}
