import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ValueType } from "react-select";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import NodePanel from "../Components/Nodes/NodePanel";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import { IApplicationExistingForecastResultsRow } from "../../Application/Types/ApplicationTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";
import generateSelectOptions from "../../Application/Utils/GenerateSelectOptions";

const useStyles = makeStyles(() => ({
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

const NetworkPanel = () => {
  const classes = useStyles();

  const wc = "existingDataWorkflows";
  const wp = "forecastResultsExisting";

  const { isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const existingData = useSelector(
    (state: RootState) => state.forecastReducer[wc][wp]
  ) as IApplicationExistingForecastResultsRow[];

  const nodeNames = [
    "wellhead",
    "manifold",
    "flowstation",
    "gasFacility",
    "gatheringCenter",
    "terminal",
  ];

  const forecastInputDeckTitles = existingData.map((row) => row.title);
  console.log(
    "Logged output --> ~ file: NetworkPanel.tsx ~ line 48 ~ NetworkPanel ~ forecastInputDeckTitles",
    forecastInputDeckTitles
  );
  const forecastInputDeckOptions = generateSelectOptions(
    forecastInputDeckTitles
  );
  const [forecastInputDeckOption, setForecastInputDeckOption] = React.useState(
    forecastInputDeckOptions[0]
  );
  return (
    <>
      {!isNetworkAuto && (
        <AnalyticsComp
          title="Forecast InputDeck"
          content={
            <div style={{ display: "flex", alignItems: "center" }}>
              <ApexSelectRS
                valueOption={forecastInputDeckOption}
                data={forecastInputDeckOptions}
                handleSelect={(option: ValueType<ISelectOption, false>) => {
                  setForecastInputDeckOption(option as ISelectOption);
                }}
                menuPortalTarget={document.body}
                isSelectOptionType={true}
              />
              <CallMadeOutlinedIcon />
            </div>
          }
          direction="Vertical"
          containerStyle={{ marginBottom: 20 }}
        />
      )}
      <AnalyticsTitle title="Network Nodes" />
      <div className={classes.networkPanel}>
        {nodeNames.map((nodeName, i) => (
          <NodePanel key={i} name={nodeName} />
        ))}
      </div>
    </>
  );
};

export default NetworkPanel;
