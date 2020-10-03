import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import EconomicsLanding from "../EconomicsData/EconomicsLanding";
import ProductionDataLanding from "../ProductionData/ProductionDataLanding";
import InputBackground from "./InputBackground";
import InputLanding from "./InputLanding";

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

const InputLayout = () => {
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

  const subModule = {
    facilitiesdeck: { name: "Facilities Deck", data: {} },
    forecastdeck: { name: "Forecast Deck", data: {} },
    productiondata: { name: "Production Data", data: {} },
    economicsdata: { name: "Economics Data", data: {} },
  };

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
      <div className={clsx(classes.importLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} component={InputBackground} />
            <Route
              path={`${url}/:subNavbarId`}
              render={(props) => {
                const {
                  match: {
                    params: { subNavbarId },
                  },
                } = props;

                const Layouts = {
                  background: <InputBackground />,
                  facilitiesdeck: (
                    <InputLanding subModule={subModule.facilitiesdeck} />
                  ),
                  forecastdeck: (
                    <InputLanding subModule={subModule.forecastdeck} />
                  ),
                  productiondata: (
                    <ProductionDataLanding
                      subModule={subModule.productiondata}
                    />
                  ),
                  economicsdata: (
                    <EconomicsLanding subModule={subModule.economicsdata} />
                  ),
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

export default InputLayout;
