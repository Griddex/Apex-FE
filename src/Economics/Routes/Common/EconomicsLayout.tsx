import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SubNavbar from "../../../Application/Components/Navbars/SubNavbar";
import Loading from "../../../Application/Components/Visuals/Loading";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import Economics from "../../Economics";
import EconomicsBackground from "./EconomicsBackground";
import WidgetsOutlinedIcon from "@material-ui/icons/WidgetsOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import EconomicsAnalysisWorkflow from "../EconomicsWorkflows/EconomicsAnalysisWorkflow";
import { ISubNavbarData } from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import EconomicsInputButtonsMenu from "../../Components/Menus/EconomicsInputButtonsMenu";

const navbarHeight = 43;
const subNavBarHeight = 25;
// const addedHeight = 10;
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
      name: "Economic Analysis",
      route: `${url}/economicanalysis`,
      icon: <WidgetsOutlinedIcon fontSize="default" />,
    },
    {
      name: "View Tables",
      route: `${url}/viewtables`,
      icon: <TableChartOutlinedIcon fontSize="default" />,
    },
    {
      name: "View Charts",
      route: `${url}/charttables`,
      icon: <AssessmentOutlinedIcon fontSize="default" />,
    },
  ];

  return (
    <main className={classes.economicsLayoutRoot}>
      {showSubNavbar && (
        <SubNavbar
          subNavbarData={subNavbarData}
          hasExtraButton={true}
          ExtraButton={() => <EconomicsInputButtonsMenu />}
        />
      )}
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
                  economicanalysis: <EconomicsAnalysisWorkflow />,
                  viewtables: <Economics />,
                  charttables: <Economics />,
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
