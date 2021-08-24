import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../InputDeckTypes";

type wpTypeNon = NonNullable<IStoredDataProps["wkPs"]>;
// type wpType = Omit<wpTypeNon, "">;

export default function StoredProductionData({
  reducer,
  finalAction,
}: IStoredInputDeck) {
  const dispatch = useDispatch();
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

  const collectionName = "declineParameters";

  const wc = "storedDataWorkflows";
  const wp: wpTypeNon = "productionInputDataStored";

  const componentRef = React.useRef();

  const stored = useSelector((state: RootState) => state.inputReducer);
  const storedData = useSelector((state: RootState) => state[reducer][wc][wp]);

  const snStoredData = storedData.map((row: any, i: number) => {
    const data: IStoredDataRow = {
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    };

    return data;
  }) as IStoredDataRow[];

  const dataKey = "title";
  const dataTitle = "PRODUCTION DATA TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          productionInputDeckId: id,
          productionInputDeckTitle: title,
        })
      );
  };

  const props = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    collectionName,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
