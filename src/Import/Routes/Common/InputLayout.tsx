import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import EconomicsLanding from "../EconomicsData/EconomicsDataLanding";
import ProductionDataLanding from "../ProductionData/ProductionDataLanding";
import InputBackground from "./InputBackground";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ISubNavbarData } from "./Workflows/InputWorkflowsTypes";
import { IdType, ISubModuleData } from "./InputLayoutTypes";
import FacilitiesInputDeckLanding from "./../FacilitiesInputDeck/FacilitiesInputDeckLanding";
import ForecastInputDeckLanding from "../ForecastInputDeck/ForecastInputDeckLanding";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
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
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const { showSubNavbar } = layoutProps;

  const subNavbarData: ISubNavbarData = [
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

  const subModuleData: ISubModuleData = {
    facilitiesInputDeck: "Facilities Deck",
    forecastInputDeck: "Forecast Deck",
    productionData: "Production Data",
    economicsData: "Economics Data",
  };

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
      <div className={clsx(classes.importLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          import ForecastInputDeckLanding from
          './../ForecastInputDeck/ForecastInputDeckLanding';
          <Switch>
            <Route exact path={path} component={InputBackground} />
            <Route
              path={`${url}/:subNavbarId`}
              render={(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { subNavbarId },
                  },
                } = props;

                const subModuleName = subNavbarId;
                const subModuleLabel = subModuleData[subNavbarId];

                const Layouts: Record<string, JSX.Element> = {
                  background: <InputBackground />,
                  facilitiesdeck: (
                    <FacilitiesInputDeckLanding
                      subModuleName={subModuleName}
                      subModuleLabel={subModuleLabel}
                    />
                  ),
                  forecastdeck: (
                    <ForecastInputDeckLanding
                      subModuleName={subModuleName}
                      subModuleLabel={subModuleLabel}
                    />
                  ),
                  productiondata: (
                    <ProductionDataLanding
                      subModuleName={subModuleName}
                      subModuleLabel={subModuleLabel}
                    />
                  ),
                  economicsdata: (
                    <EconomicsLanding
                      subModuleName={subModuleName}
                      subModuleLabel={subModuleLabel}
                    />
                  ),
                };

                return Layouts[subNavbarId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default InputLayout;
