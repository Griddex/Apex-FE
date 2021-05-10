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
import SuspensePerpetualSpinner from "../../../Application/Components/Visuals/SuspensePerpetualSpinner";
import { IdType } from "../../../Corporate/Routes/Common/CorporateLayoutTypes";
import DeclineCurveAnalysis from "../../DeclineCurveAnalysis";
import DeclineCurveAnalysisBackground from "./DeclineCurveAnalysisBackground";
import { IDeclineCurveAnalysisLayouts } from "./DeclineCurveAnalysisLayoutTypes";

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

const DeclineCurveAnalysisLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.declineCurveAnalysisLayoutRoot}>
      <div className={clsx(classes.declineCurveAnalysisLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <Switch>
            <Route
              exact
              path={path}
              render={() => <DeclineCurveAnalysisBackground />}
            />
            <Route
              path={`${url}/:declineCurveAnalysisId`}
              render={(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { declineCurveAnalysisId },
                  },
                } = props;

                const Layouts: IDeclineCurveAnalysisLayouts = {
                  background: <DeclineCurveAnalysisBackground />,
                  declineCurveAnalysis: <DeclineCurveAnalysis />,
                };

                return Layouts[declineCurveAnalysisId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default DeclineCurveAnalysisLayout;
