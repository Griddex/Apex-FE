import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import {
  IDeclineCurveAnalysisLayouts,
  IdType,
} from "./DeclineCurveAnalysisLayoutTypes";

const SuspensePerpetualSpinner = React.lazy(
  () =>
    import("../../../Application/Components/Visuals/SuspensePerpetualSpinner")
);
const DeclineCurveAnalysis = React.lazy(
  () => import("../../DeclineCurveAnalysis")
);
const DeclineCurveAnalysisBackground = React.lazy(
  () => import("./DeclineCurveAnalysisBackground")
);

const navbarHeight = 43;
const addedHeight = 0;
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

                const Layouts: IDeclineCurveAnalysisLayouts = {
                  background: <DeclineCurveAnalysisBackground />,
                  declineCurveAnalysis: <DeclineCurveAnalysis />,
                };

                return Layouts[declineCurveAnalysisId];
              }}
            </Route>
            <Route path="*" component={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default DeclineCurveAnalysisLayout;
