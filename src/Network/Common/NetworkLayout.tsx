import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuspensePerpetualSpinner from "../../Application/Components/Visuals/SuspensePerpetualSpinner";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  fetchExistingForecastingParametersRequestAction,
  fetchExistingNetworkDataRequestAction,
} from "../Redux/Actions/NetworkActions";
import NetworkLanding from "./NetworkLanding";

const navbarHeight = 43;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    networkLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    networkLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const NetworkLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    existingDataWorkflows: { networkExisting, forecastingParametersRoot },
  } = useSelector((state: RootState) => state.networkReducer);

  const existingNetworksPresent =
    Array.isArray(networkExisting) && networkExisting.length > 0;

  const existingForecastParametersPresent =
    Array.isArray(forecastingParametersRoot) &&
    forecastingParametersRoot.length > 0;

  React.useEffect(() => {
    dispatch(showSpinnerAction("Loading Network Data..."));

    if (!existingNetworksPresent)
      dispatch(fetchExistingNetworkDataRequestAction());

    if (!existingForecastParametersPresent)
      dispatch(fetchExistingForecastingParametersRequestAction());

    dispatch(hideSpinnerAction());
  }, []);

  return (
    <main className={classes.networkLayoutRoot}>
      <div className={clsx(classes.networkLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <NetworkLanding />
        </Suspense>
      </div>
    </main>
  );
};

export default NetworkLayout;
