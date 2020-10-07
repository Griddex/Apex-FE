import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../Application/Components/Visuals/Loading";
import Visualytics from "./Visualytics";
import VisualyticsBackground from "./VisualyticsBackground";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles((theme) => {
  return {
    visualyticsLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    visualyticsLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const VisualyticsLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.visualyticsLayoutRoot}>
      <div className={clsx(classes.visualyticsLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} component={Visualytics} />
            <Route
              path={`${url}/:visualyticsId`}
              render={(props) => {
                const {
                  match: {
                    params: { visualyticsId },
                  },
                } = props;

                const Layouts = {
                  background: <VisualyticsBackground />,
                  visualytics: <Visualytics />,
                };

                return Layouts[visualyticsId];
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

export default VisualyticsLayout;
