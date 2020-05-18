import Container from "@material-ui/core/Container";
import React, { Suspense, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ContextDrawer from "./../../../Application/Components/ContextDrawer";
import Loading from "./../../../Application/Components/Loading";
import SubNavBar from "./../../../Application/Components/SubNavBar";
import useLayoutStyles from "./../../../Application/Styles/LayoutStyles";
import ImportBackground from "./ImportBackground";
import ImportFacilitiesLanding from "./../FacilitiesDeck/ImportFacilitiesLanding";
import ImportForecastLanding from "./../ForecastDeck/ImportForecastLanding";
import ConnectProductionLanding from "./../ProductionData/ConnectProductionLanding";
import ImportEconomicsLanding from "./../EconomicsData/ImportEconomicsLanding";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const ImportLayout = (reduxProps) => {
  const classes = useLayoutStyles();
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const { contextDrawerPresent, subNavBarPresent } = reduxProps;
  const { boundUILayoutActions } = reduxProps;
  const { ImportLayoutDefaultAction } = boundUILayoutActions;

  useEffect(() => {
    dispatch(ImportLayoutDefaultAction());
  }, []);

  return (
    <main className={classes.mainContainer}>
      {subNavBarPresent && <SubNavBar {...reduxProps} />}
      <div className={clsx(classes.container)}>
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
                  background: <ImportBackground {...props} />,
                  facilitiesdeck: <ImportFacilitiesLanding {...props} />,
                  forecastdeck: <ImportForecastLanding {...props} />,
                  productiondata: <ConnectProductionLanding {...props} />,
                  economicsdata: <ImportEconomicsLanding {...props} />,
                };

                return Layouts[subNavbarId];
              }}
            />
            <Route path="*" render={(props) => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
        {contextDrawerPresent && (
          <ContextDrawer
            reduxProps={reduxProps}
            boundUILayoutActions={boundUILayoutActions}
          />
        )}
      </div>
    </main>
  );
};

ImportLayout.propTypes = {};

export default ImportLayout;
