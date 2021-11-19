import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { getTableDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IApplicationStoredDataRow } from "../../Application/Types/ApplicationTypes";
import { updateForecastResultsParameterAction } from "../../Forecast/Redux/Actions/ForecastActions";
import { networkIcons } from "../Data/NetworkData";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { Divider } from "@material-ui/core";

const NodePanel = React.lazy(() => import("../Components/Nodes/NodePanel"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles(() => ({
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isAuto) => isAuto
);

const selectedForecastInputDeckTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.inputReducer.selectedForecastInputDeckTitle,
  (title) => title
);

const NetworkPanel = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const reducer = "inputReducer";
  const mainUrl = `${getBaseForecastUrl()}/forecast-inputdeck`;
  const wc = "storedDataWorkflows";
  const wp = "forecastInputDeckStored";

  const isNetworkAuto = useSelector(isNetworkAutoSelector);

  const forecastInputDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.inputReducer[wc][wp],
    (stored) => stored
  );

  const forecastInputDeckStored = useSelector(forecastInputDeckStoredSelector);

  const selectedForecastInputDeckTitle = useSelector(
    selectedForecastInputDeckTitleSelector
  );

  const nodeTypes = Object.keys(networkIcons);

  const forecastInputDeckOptions = forecastInputDeckStored?.map(
    (row: IApplicationStoredDataRow) => ({
      value: row.title,
      label: row.title,
      id: row.id,
    })
  ) as IExtendedSelectOption[];

  forecastInputDeckOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
  });

  const selectedForecastDeckTitleOption =
    selectedForecastInputDeckTitle !== ""
      ? {
          value: selectedForecastInputDeckTitle,
          label: selectedForecastInputDeckTitle,
          id: forecastInputDeckOptions.filter(
            (o) => o.label === selectedForecastInputDeckTitle
          )[0].id,
        }
      : forecastInputDeckOptions[0];

  const [forecastInputDeckOption, setForecastInputDeckOption] =
    React.useState<IExtendedSelectOption>(
      selectedForecastDeckTitleOption as IExtendedSelectOption
    );

  let style = {};
  if (isNetworkAuto) {
    style = {
      pointerEvents: "none",
      backgroundColor: theme.palette.grey[200],
    };
  }

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
                handleSelect={(
                  option: ValueType<IExtendedSelectOption, false>
                ) => {
                  const optionDefined = option as IExtendedSelectOption;
                  setForecastInputDeckOption(optionDefined);

                  dispatch(
                    updateForecastResultsParameterAction(
                      "selectedForecastInputDeckId",
                      optionDefined.id
                    )
                  );

                  dispatch(
                    getTableDataByIdRequestAction(
                      reducer as ReducersType,
                      `${mainUrl}/${optionDefined.id}`,
                      optionDefined.label as string,
                      "networkManualBuild",
                      "success"
                    )
                  );
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
      <Divider style={{ marginBottom: 5 }} />
      <AnalyticsTitle title="Network Nodes" />
      <div className={classes.networkPanel} style={style}>
        {nodeTypes
          .filter((n) => n !== "drainagePointSummary")
          .map((nodeName, i) => (
            <NodePanel key={i} name={nodeName} />
          ))}
      </div>
    </>
  );
};

export default NetworkPanel;
