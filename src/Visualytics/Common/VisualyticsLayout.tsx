import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import SuspensePerpetualSpinner from "../../Application/Components/Visuals/SuspensePerpetualSpinner";
import Visualytics from "./Visualytics";
import VisualyticsBackground from "./VisualyticsBackground";
import { IdType, IVisualyticsLayouts } from "./VisualyticsLayoutTypes";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    visualyticsLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    visualyticsLayoutContainer: {
      display: "flex",
      width: "100%",
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
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <Switch>
            <Route exact path={path} component={Visualytics} />
            <Route path={`${url}/:visualyticsId`}>
              {(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { visualyticsId },
                  },
                } = props;

                const Layouts: IVisualyticsLayouts = {
                  background: <VisualyticsBackground />,
                  visualytics: <Visualytics />,
                };

                return Layouts[visualyticsId];
              }}
            </Route>
            <Route path="*" component={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default VisualyticsLayout;
