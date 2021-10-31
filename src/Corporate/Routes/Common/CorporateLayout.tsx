import makeStyles from "@mui/styles/makeStyles";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { NavigationApexPrompt } from "../../../Application/Components/Prompts/ApexPrompt";
import Loading from "../../../Application/Components/Visuals/Loading";
import { resetActions } from "../../../Application/Utils/ResetModuleState";
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
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const module = location.pathname.split("/")[2];

  const afterConfirmAction = React.useCallback(() => {
    const action = resetActions[module];
    dispatch(action());
  }, []);

  return (
    <main className={classes.declineCurveAnalysisLayoutRoot}>
      <div className={classes.declineCurveAnalysisLayoutContainer}>
        <Suspense fallback={Loading}>
          <NavigationApexPrompt afterConfirm={afterConfirmAction} />
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
                  corporateLayout: <div>{"Corporate Landing"}</div>,
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
