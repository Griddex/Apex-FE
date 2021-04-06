import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import DeclineCurveAnalysis from "../../Corporate";
import DeclineCurveAnalysisBackground from "./CorporateBackground";
import { ICorporateLayouts, IdType } from "./CorporateLayoutTypes";

const navbarHeight = 43;
// const subNavBarHeight = 25;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    declineCurveAnalysisLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    declineCurveAnalysisLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const CorporateLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.declineCurveAnalysisLayoutRoot}>
      <div className={classes.declineCurveAnalysisLayoutContainer}>
        <Suspense fallback={Loading}>
          <Switch>
            <Route exact path={path}>
              {() => <DeclineCurveAnalysisBackground />}
            </Route>
            <Route path={`${url}/:declineCurveAnalysisId`}>
              {(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { declineCurveAnalysisId },
                  },
                } = props;

                const Layouts: ICorporateLayouts = {
                  background: <DeclineCurveAnalysisBackground />,
                  declineCurveAnalysis: <DeclineCurveAnalysis />,
                };

                return Layouts[declineCurveAnalysisId];
              }}
            </Route>
            <Route path="*">{() => <h1>Not Available</h1>}</Route>
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default CorporateLayout;
