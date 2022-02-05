import DialpadOutlinedIcon from "@mui/icons-material/DialpadOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Button, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IEconomicsInputButton,
  ISubNavbarData,
} from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import EconomicsInputButtonsMenu from "../../Components/Menus/EconomicsInputButtonsMenu";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { IdType } from "./EconomicsLayoutTypes";

const EconomicsAnalysesLanding = React.lazy(
  () => import("../EconomicsAnalyses/EconomicsAnalysesLanding")
);
const EconomicsCostsRevenuesLanding = React.lazy(
  () =>
    import(
      "../EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsRevenuesLanding"
    )
);
const EconomicsParametersLanding = React.lazy(
  () =>
    import("../EconomicsInput/EconomicsParameters/EconomicsParametersLanding")
);
const EconomicsResultsLanding = React.lazy(
  () => import("../EconomicsResults/EconomicsResultsLanding")
);
const EconomicsSensitivitiesLanding = React.lazy(
  () => import("../EconomicsSensitivities/EconomicsSensitivitiesLanding")
);
const EconomicsBackground = React.lazy(() => import("./EconomicsBackground"));

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    economicsLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    economicsLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight}px)`,
    },
  };
});

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showSubNavbarSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showSubNavbar,
  (subNavbar) => subNavbar
);

const EconomicsLayout = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const showSubNavbar = useSelector(showSubNavbarSelector);

  const subNavbarData: ISubNavbarData = [
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
    {
      name: "Parameter Sensitivities",
      route: `${url}/sensitivities`,
      startIcon: <DialpadOutlinedIcon fontSize="medium" />,
      hasWrapper: false,
      component: () => <div></div>,
      action: () =>
        dispatch(
          updateEconomicsParameterAction(
            "loadEconomicsSensitivitiesWorkflow",
            false
          )
        ),
    },
    {
      name: "Economic Analyses",
      route: `${url}/analyseslanding`,
      startIcon: <WidgetsOutlinedIcon fontSize="medium" />,
      hasWrapper: false,
      component: () => <div></div>,
      action: () =>
        dispatch(
          updateEconomicsParameterAction("loadEconomicsAnalysesWorkflow", false)
        ),
    },
    {
      name: "View Results",
      route: `${url}/viewresults`,
      startIcon: <TableChartOutlinedIcon fontSize="medium" />,
      hasWrapper: false,
      component: () => <div></div>,
      action: () =>
        dispatch(
          updateEconomicsParameterAction("loadEconomicsResultsWorkflow", false)
        ),
    },
  ];

  React.useEffect(() => {
    //TODO Find more appropriate location
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <main className={classes.economicsLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
      <div className={classes.economicsLayoutContainer}>
        <Switch>
          <Route exact path={path} component={() => <EconomicsBackground />} />
          <Route path={`${url}/:economicsId`}>
            {(props: RouteComponentProps<IdType>) => {
              const {
                match: {
                  params: { economicsId },
                },
              } = props;

              const Layouts: Record<string, JSX.Element> = {
                background: <EconomicsBackground />,
                costsrevenue: <EconomicsCostsRevenuesLanding />,
                parameters: <EconomicsParametersLanding />,
                analyseslanding: <EconomicsAnalysesLanding />,
                sensitivities: <EconomicsSensitivitiesLanding />,
                viewresults: <EconomicsResultsLanding />,
              };

              return Layouts[economicsId];
            }}
          </Route>
          <Route path="*" component={() => <h1>Not Available</h1>} />
        </Switch>
      </div>
    </main>
  );
};

export default EconomicsLayout;
