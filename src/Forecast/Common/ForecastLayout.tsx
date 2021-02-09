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
import ForecastBackground from "./ForecastBackground";
import ForecastLanding from "./ForecastLanding";
import { IdType, IForecastLayouts } from "./ForecastLayoutTypes";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    forecastLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    forecastLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const ForecastLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.forecastLayoutRoot}>
      <div className={clsx(classes.forecastLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={path} component={ForecastLanding} />
            <Route
              path={`${url}/:forecastId`}
              render={(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { forecastId },
                  },
                } = props;

                const Layouts: IForecastLayouts = {
                  background: <ForecastBackground />,
                  forecastresults: <ForecastLanding />,
                };

                return Layouts[forecastId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default ForecastLayout;
