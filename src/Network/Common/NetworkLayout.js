import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../Application/Components/Visuals/Loading";
import Network from "./Network";
import NetworkBackground from "./NetworkBackground";
import { ReactFlowProvider } from "@griddex/react-flow-updated";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    networkLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    networkLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const NetworkLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.networkLayoutRoot}>
      <div className={clsx(classes.networkLayoutContainer)}>
        <Suspense fallback={<Loading />}>
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
              render={(props) => {
                const {
                  match: {
                    params: { networkId },
                  },
                } = props;

                const Layouts = {
                  background: <NetworkBackground />,
                  network: <Network />,
                };

                return Layouts[networkId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
        {/* {showContextDrawer && (
          <ContextDrawer>
            <WorkflowStepper {...workflowStepperProps} />
          </ContextDrawer>
        )} */}
      </div>
    </main>
  );
};

export default NetworkLayout;
