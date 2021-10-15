import makeStyles from "@mui/styles/makeStyles";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import { ICorporateLayouts, IdType } from "./CorporateLayoutTypes";

const CorporateBackground = React.lazy(() => import("./CorporateBackground"));

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

const CorporateLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.declineCurveAnalysisLayoutRoot}>
      <div className={classes.declineCurveAnalysisLayoutContainer}>
        <Suspense fallback={Loading}>
          <Switch>
            <Route exact path={path}>
              {() => <CorporateBackground />}
            </Route>
            <Route path={`${url}/:corporateId`}>
              {(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { corporateId },
                  },
                } = props;

                const Layouts: ICorporateLayouts = {
                  background: <CorporateBackground />,
                  corporateLayout: <CorporateLayout />,
                };

                return Layouts[corporateId];
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
