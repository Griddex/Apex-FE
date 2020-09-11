import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SubNavbar from "../../../Application/Components/SubNavbar";
import Loading from "./../../../Application/Components/Loading";
import ImportEconomicsLanding from "./../EconomicsData/ImportEconomicsLanding";
import ImportFacilitiesLanding from "./../FacilitiesDeck/ImportFacilitiesLanding";
import ImportForecastLanding from "./../ForecastDeck/ImportForecastLanding";
import ConnectProductionLanding from "./../ProductionData/ConnectProductionLanding";
import ImportBackground from "./ImportBackground";

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
  const { showSubNavbar } = layoutProps;

  const subNavbarData = [
    {
      name: "Facilities Deck",
      route: `${url}/facilitiesdeck`,
      icon: <AppsIcon fontSize="default" />,
    },
    {
      name: "Forecast Deck",
      route: `${url}/forecastdeck`,
      icon: <LandscapeIcon fontSize="default" />,
    },
    {
      name: "Production Data",
      route: `${url}/productiondata`,
      icon: <BubbleChartIcon fontSize="default" />,
    },
    {
      name: "Economics Data",
      route: `${url}/economicsdata`,
      icon: <AttachMoneyIcon fontSize="default" />,
    },
  ];

  // useEffect(() => {
  //   dispatch(subNavbarSetDataAction(subNavbarData));
  // }, []);

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
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
        {/* {showContextDrawer && (
          <ContextDrawer>
            <WorkflowStepper {...workflowStepperProps} />
          </ContextDrawer>
        )} */}
      </div>
    </main>
  );
};

export default ImportLayout;
