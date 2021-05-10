import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import LandscapeIcon from "@material-ui/icons/Landscape";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import PerpetualSpinner from "../../../Application/Components/Visuals/PerpetualSpinner";
import SuspensePerpetualSpinner from "../../../Application/Components/Visuals/SuspensePerpetualSpinner";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import EconomicsInputButtonsMenu from "../../../Economics/Components/Menus/EconomicsInputButtonsMenu";
import EconomicsCostsRevenuesLanding from "../../../Economics/Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsRevenuesLanding";
import EconomicsParametersLanding from "../../../Economics/Routes/EconomicsInput/EconomicsParameters/EconomicsParametersLanding";
import ForecastInputDeckLanding from "../ForecastInputDeck/ForecastInputDeckLanding";
import ProductionDataLanding from "../ProductionData/ProductionDataLanding";
import FacilitiesInputDeckLanding from "./../FacilitiesInputDeck/FacilitiesInputDeckLanding";
import InputBackground from "./InputBackground";
import { IdType } from "./InputLayoutTypes";
import {
  IEconomicsInputButton,
  ISubNavbarData,
} from "./Workflows/InputWorkflowsTypes";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    importLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    importLayoutContainer: {
      display: "flex",
      width: "100%",
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
      startIcon: <AppsIcon fontSize="default" />,
      component: () => <div></div>,
    },
    {
      name: "Forecast Deck",
      route: `${url}/forecastdeck`,
      startIcon: <LandscapeIcon fontSize="default" />,
      component: () => <div></div>,
    },
    {
      name: "Production Data",
      route: `${url}/productiondata`,
      startIcon: <BubbleChartIcon fontSize="default" />,
      component: () => <div></div>,
    },
    {
      name: "Economic input",
      route: `${url}`,
      startIcon: <TrendingUpOutlinedIcon fontSize="default" />,
      endIcon: <KeyboardArrowDownIcon fontSize="default" />,
      hasWrapper: true,
      component: () => (
        <EconomicsInputButtonsMenu>
          {({
            name,
            className,
            startIcon,
            endIcon,
            styles,
            handleClick,
          }: IEconomicsInputButton) => {
            return (
              <Button
                key={name}
                className={className}
                onClick={(event) => {
                  handleClick && handleClick(event);
                }}
                startIcon={startIcon}
                endIcon={endIcon}
                style={styles}
              >
                <Typography variant="subtitle2">{name}</Typography>
              </Button>
            );
          }}
        </EconomicsInputButtonsMenu>
      ),
    },
  ];

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
      <div className={clsx(classes.importLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
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

                const Layouts: Record<string, JSX.Element> = {
                  background: <InputBackground />,
                  facilitiesdeck: <FacilitiesInputDeckLanding />,
                  forecastdeck: <ForecastInputDeckLanding />,
                  productiondata: <ProductionDataLanding />,
                  costsrevenue: <EconomicsCostsRevenuesLanding />,
                  parameters: <EconomicsParametersLanding />,
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
