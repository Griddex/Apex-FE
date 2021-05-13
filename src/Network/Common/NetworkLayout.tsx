import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
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
import Network from "./Network";
import NetworkBackground from "./NetworkBackground";
import { IdType, INetworkLayouts } from "./NetworkLayoutTypes";

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
  const { path, url } = useRouteMatch();

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
          <Switch>
            <Route
              exact
              path={path}
              render={() => (
                <ReactFlowProvider>
                  <Network />
                </ReactFlowProvider>
              )}
            />
            <Route
              path={`${url}/:networkId`}
              render={(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { networkId },
                  },
                } = props;

                const Layouts: INetworkLayouts = {
                  background: <NetworkBackground />,
                  network: <Network />,
                };

                return Layouts[networkId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default NetworkLayout;
