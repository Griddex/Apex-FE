import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ContextDrawer from "./../../../Application/Components/ContextDrawer";
import Loading from "./../../../Application/Components/Loading";
import SubNavbar from "../../../Application/Components/SubNavbar";
import ImportEconomicsLanding from "./../EconomicsData/ImportEconomicsLanding";
import ImportFacilitiesLanding from "./../FacilitiesDeck/ImportFacilitiesLanding";
import ImportForecastLanding from "./../ForecastDeck/ImportForecastLanding";
import ConnectProductionLanding from "./../ProductionData/ConnectProductionLanding";
import ImportBackground from "./ImportBackground";
import { useSelector } from "react-redux";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles((theme) => {
  return {
    importLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    importLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const ImportLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const layoutProps = useSelector((state) => state.layoutReducer);
  const { showContextDrawer, showSubNavbar } = layoutProps;

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar />}
      <div className={clsx(classes.importLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} component={ImportBackground} />
            <Route
              path={`${url}/:subNavbarId`}
              render={(props) => {
                const {
                  match: {
                    params: { subNavbarId },
                  },
                } = props;

                const Layouts = {
                  background: <ImportBackground />,
                  facilitiesdeck: <ImportFacilitiesLanding />,
                  forecastdeck: <ImportForecastLanding />,
                  productiondata: <ConnectProductionLanding />,
                  economicsdata: <ImportEconomicsLanding />,
                };

                return Layouts[subNavbarId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
        {showContextDrawer && <ContextDrawer />}
      </div>
    </main>
  );
};

export default ImportLayout;
