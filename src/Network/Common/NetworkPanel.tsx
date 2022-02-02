import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Divider, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { getTableDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { getApexIconButtonStyle } from "../../Application/Styles/IconButtonStyles";
import { IApplicationStoredDataRow } from "../../Application/Types/ApplicationTypes";
import {
  updateForecastResultsParameterAction,
  updateForecastResultsParametersAction,
} from "../../Forecast/Redux/Actions/ForecastActions";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import { networkIcons } from "../Data/NetworkData";

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

  const panelIsActivated = forecastInputDeckOption.label !== "Select...";

  let style = {};
  if (isNetworkAuto) {
    style = {
      pointerEvents: "none",
      backgroundColor: theme.palette.grey[200],
    };
  }
  if (!panelIsActivated) {
    style = {
      pointerEvents: "none",
      backgroundColor: theme.palette.grey[200],
    };
  }

  const ForecastInputDeckSelect = () => (
    <ApexSelectRS
      valueOption={forecastInputDeckOption}
      data={forecastInputDeckOptions}
      handleSelect={(option: OnChangeValue<IExtendedSelectOption, false>) => {
        const optionDefined = option as IExtendedSelectOption;
        setForecastInputDeckOption(optionDefined);

        if (optionDefined.label === "Select...") {
          dispatch(
            updateForecastResultsParameterAction(
              "selectedForecastInputDeckId",
              ""
            )
          );
        } else {
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
              "success",
              "InputDeckEntities"
            )
          );
        }
      }}
      menuPortalTarget={document.body}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );

  React.useEffect(() => {
    if (selectedForecastInputDeckTitle !== "") {
      const selectedOption = forecastInputDeckOptions.find(
        (o) => o.label === selectedForecastInputDeckTitle
      ) as IExtendedSelectOption;

      setForecastInputDeckOption(selectedOption);

      if (selectedForecastInputDeckTitle === "") {
        dispatch(
          updateForecastResultsParameterAction(
            "selectedForecastInputDeckId",
            ""
          )
        );
      } else {
        dispatch(
          updateForecastResultsParameterAction(
            "selectedForecastInputDeckId",
            selectedOption.id
          )
        );

        dispatch(
          getTableDataByIdRequestAction(
            reducer as ReducersType,
            `${mainUrl}/${selectedOption.id}`,
            selectedOption.label as string,
            "networkManualBuild",
            "success",
            "InputDeckEntities"
          )
        );
      }
    }
  }, [selectedForecastInputDeckTitle]);

  return (
    <>
      {!isNetworkAuto && (
        <AnalyticsComp
          title="Forecast InputDeck"
          content={
            <div style={{ display: "flex", alignItems: "center" }}>
              <ForecastInputDeckSelect />
              <IconButton
                onClick={() => {
                  const dialogParameters: DialogStuff = {
                    name: "Forecast_InputDeck_Dialog",
                    title: "Stored InputDecks",
                    type: "componentDialog",
                    show: true,
                    exclusive: true,
                    maxWidth: "lg",
                    iconType: "table",
                    customComponent: (
                      <StoredForecastDecks
                        reducer="inputReducer"
                        containerStyle={{ boxShadow: "none" }}
                        showChart={false}
                        finalAction={() => {}}
                      />
                    ),
                    actionsList: () =>
                      DialogOneCancelButtons(
                        [true, true],
                        [true, true],
                        [
                          () =>
                            updateForecastResultsParametersAction({
                              selectedForecastInputDeckId: "",
                              selectedForecastInputDeckTitle: "",
                              selectedForecastInputDeckDescription: "",
                            }),
                          unloadDialogsAction,
                        ],
                        "Okay",
                        "doneOutlined",
                        false,
                        "All"
                      ),
                    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
                  };
                  dispatch(showDialogAction(dialogParameters));
                }}
              >
                <OpenInNewOutlinedIcon style={getApexIconButtonStyle(theme)} />
              </IconButton>
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
