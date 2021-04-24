import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import WidgetsOutlinedIcon from "@material-ui/icons/WidgetsOutlined";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import Loading from "../../../Application/Components/Visuals/Loading";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IEconomicsInputButton,
  ISubNavbarData,
} from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import EconomicsInputButtonsMenu from "../../Components/Menus/EconomicsInputButtonsMenu";
import Economics from "../../Economics";
import EconomicsCostsRevenuesLanding from "../EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsRevenuesLanding";
import EconomicsParametersLanding from "../EconomicsInput/EconomicsParameters/EconomicsParametersLanding";
import EconomicsAnalysisWorkflow from "../EconomicsWorkflows/EconomicsAnalysisWorkflow";
import EconomicsResultsWorkflow from "../EconomicsWorkflows/EconomicsResultsWorkflow";
import EconomicsBackground from "./EconomicsBackground";

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
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const EconomicsLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const { showSubNavbar } = layoutProps;

  const subNavbarData: ISubNavbarData = [
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
    {
      name: "Economic Analysis",
      route: `${url}/economicanalysis`,
      startIcon: <WidgetsOutlinedIcon fontSize="default" />,
      hasWrapper: false,
      component: () => <div></div>,
    },
    {
      name: "View Results",
      route: `${url}/viewresults`,
      startIcon: <TableChartOutlinedIcon fontSize="default" />,
      hasWrapper: false,
      component: () => <div></div>,
    },
  ];

  return (
    <main className={classes.economicsLayoutRoot}>
      {showSubNavbar && <SubNavbar subNavbarData={subNavbarData} />}
      <div className={clsx(classes.economicsLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} render={() => <EconomicsBackground />} />
            <Route
              path={`${url}/:economicsId`}
              render={(props) => {
                const {
                  match: {
                    params: { economicsId },
                  },
                } = props;

                const Layouts: Record<string, JSX.Element> = {
                  background: <EconomicsBackground />,
                  costsrevenue: <EconomicsCostsRevenuesLanding />,
                  parameters: <EconomicsParametersLanding />,
                  economicanalysis: <EconomicsAnalysisWorkflow />,
                  viewresults: <EconomicsResultsWorkflow />,
                };

                return Layouts[economicsId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default EconomicsLayout;
