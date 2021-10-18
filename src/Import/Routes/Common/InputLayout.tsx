import AppsIcon from "@mui/icons-material/Apps";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LandscapeIcon from "@mui/icons-material/Landscape";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Button, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IdType } from "./InputLayoutTypes";
import { IEconomicsInputButton } from "./Workflows/InputWorkflowsTypes";

const SubNavbar = React.lazy(
  () => import("../../../Application/Components/Navbars/SubNavbar")
);
const EconomicsInputButtonsMenu = React.lazy(
  () => import("../../../Economics/Components/Menus/EconomicsInputButtonsMenu")
);
const EconomicsCostsRevenuesLanding = React.lazy(
  () =>
    import(
      "../../../Economics/Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsRevenuesLanding"
    )
);
const EconomicsParametersLanding = React.lazy(
  () =>
    import(
      "../../../Economics/Routes/EconomicsInput/EconomicsParameters/EconomicsParametersLanding"
    )
);
const ForecastInputDeckLanding = React.lazy(
  () => import("../ForecastInputDeck/ForecastInputDeckLanding")
);
const ProductionDataLanding = React.lazy(
  () => import("../ProductionData/ProductionDataLanding")
);
const FacilitiesInputDeckLanding = React.lazy(
  () => import("./../FacilitiesInputDeck/FacilitiesInputDeckLanding")
);
const InputBackground = React.lazy(() => import("./InputBackground"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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

const showSubNavbarSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showSubNavbar,
  (subNavbar) => subNavbar
);

const InputLayout = () => {
  console.log("Hellooooooooooo inputLayout");
  const theme = useTheme();
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  const showSubNavbar = useSelector(showSubNavbarSelector);

  const subNavbarData = React.useRef([
    {
      name: "Facilities Deck",
      route: `${url}/facilitiesdeck`,
      startIcon: <AppsIcon fontSize="medium" />,
      component: () => <div></div>,
    },
    {
      name: "Forecast Deck",
      route: `${url}/forecastdeck`,
      startIcon: <LandscapeIcon fontSize="medium" />,
      component: () => <div></div>,
    },
    {
      name: "Production Data",
      route: `${url}/productiondata`,
      startIcon: <BubbleChartIcon fontSize="medium" />,
      component: () => <div></div>,
    },
    {
      name: "Economic input",
      route: `${url}`,
      startIcon: <TrendingUpOutlinedIcon fontSize="medium" />,
      endIcon: <KeyboardArrowDownIcon fontSize="medium" />,
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
                style={{
                  ...styles,
                  borderRight: `1px solid ${theme.palette.grey["500"]}`,
                }}
              >
                <Typography variant="subtitle2">{name}</Typography>
              </Button>
            );
          }}
        </EconomicsInputButtonsMenu>
      ),
    },
  ]);

  return (
    <main className={classes.importLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData.current} />}
      <div className={clsx(classes.importLayoutContainer)}>
        <Switch>
          <Route exact path={path} component={InputBackground} />
          <Route path={`${url}/:subNavbarId`}>
            {(props: RouteComponentProps<IdType>) => {
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
          </Route>
          <Route path="*" component={() => <h1>Not Available</h1>} />
        </Switch>
      </div>
    </main>
  );
};

export default InputLayout;
