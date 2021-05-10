import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../Application/Components/Visuals/Loading";
import Network from "./Network";
import NetworkBackground from "./NetworkBackground";
import { ReactFlowProvider } from "react-flow-renderer";
import { IdType, INetworkLayouts } from "./NetworkLayoutTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExistingForecastingParametersRequestAction,
  fetchExistingNetworkDataRequestAction,
} from "../Redux/Actions/NetworkActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import SuspensePerpetualSpinner from "../../Application/Components/Visuals/SuspensePerpetualSpinner";

const navbarHeight = 43;
// const subNavBarHeight = 25;
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
    success,
    existingDataWorkflows: { networkExisting, forecastingParametersServer },
  } = useSelector((state: RootState) => state.networkReducer);

  const existingNetworksPresent =
    Array.isArray(networkExisting) && networkExisting.length > 0;

  const existingForecastParametersPresent =
    Array.isArray(forecastingParametersServer) &&
    forecastingParametersServer.length > 0;

  React.useEffect(() => {
    if (!existingForecastParametersPresent)
      dispatch(fetchExistingForecastingParametersRequestAction());

    if (!existingNetworksPresent)
      dispatch(fetchExistingNetworkDataRequestAction());
  }, [success]);

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
