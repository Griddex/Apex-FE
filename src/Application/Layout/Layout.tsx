import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { fetchApplicationHeadersRequestAction } from "../../Import/Redux/Actions/InputActions";
import { fetchStoredProjectsRequestAction } from "../../Project/Redux/Actions/ProjectActions";
import { fetchUnitSettingsRequestAction } from "../../Settings/Redux/Actions/UnitSettingsActions";
import Dialogs from "../Components/Dialogs/Dialogs";
import { NavigationApexPrompt } from "../Components/Prompts/ApexPrompt";
import Spinners from "../Components/Visuals/Spinners";
import { fetchMatchObjectRequestAction } from "../Redux/Actions/ApplicationActions";
import { RootState } from "../Redux/Reducers/AllReducers";
import { resetActions } from "../Utils/ResetModuleState";
import { IdType, ILayouts, LayoutNames } from "./LayoutTypes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  main: {
    display: "flex",
    width: "100%",
  },
}));

const MainDrawer = React.lazy(() => import("../Components/Drawers/MainDrawer"));
const Navbar = React.lazy(() => import("../Components/Navbars/Navbar"));
const ProductBackground = React.lazy(
  () => import("../Routes/ProductBackground")
);
const InputLayout = React.lazy(
  () => import("../../Import/Routes/Common/InputLayout")
);
const NetworkLayout = React.lazy(
  () => import("../../Network/Common/NetworkLayout")
);
const ForecastLayout = React.lazy(
  () => import("../../Forecast/Common/ForecastLayout")
);
const VisualyticsLayout = React.lazy(
  () => import("../../Visualytics/Common/VisualyticsLayout")
);
const EconomicsLayout = React.lazy(
  () => import("../../Economics/Routes/Common/EconomicsLayout")
);
const DeclineCurveAnalysisLayout = React.lazy(
  () =>
    import(
      "../../DeclineCurveAnalysis/Routes/Common/DeclineCurveAnalysisLayout"
    )
);
const CorporateLayout = React.lazy(
  () => import("../../Corporate/Routes/Common/CorporateLayout")
);
const AdministrationLayout = React.lazy(
  () => import("../../Administration/Routes/Common/AdministrationLayout")
);
const SettingsLayout = React.lazy(
  () => import("../../Settings/Routes/Common/SettingsLayout")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showMainDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showMainDrawer,
  (v) => v
);

const showNavbarSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showNavbar,
  (v) => v
);

const Layout = () => {
  console.log("layoutttttttttttttt");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const location = useLocation();
  const module = location.pathname.split("/")[2];
  console.log("🚀 ~ file: Layout.tsx ~ line 86 ~ Layout ~ url", url);

  const showMainDrawer = useSelector(showMainDrawerSelector);
  const showNavbar = useSelector(showNavbarSelector);

  const afterConfirmAction = React.useCallback(() => {
    const action = resetActions[module];
    dispatch(action());
  }, []);

  React.useEffect(() => {
    dispatch(fetchApplicationHeadersRequestAction());
    dispatch(fetchStoredProjectsRequestAction());
    dispatch(fetchUnitSettingsRequestAction());
    dispatch(fetchMatchObjectRequestAction());
  }, []);

  return (
    <div className={classes.root}>
      {showNavbar && <Navbar />}
      {showMainDrawer && <MainDrawer />}
      <main className={classes.main}>
        <NavigationApexPrompt afterConfirm={afterConfirmAction} />
        <Switch>
          <Route exact path={url} component={ProductBackground} />
          <Route path={`${url}/:layoutId`}>
            {(props: RouteComponentProps<IdType>) => {
              const {
                match: {
                  params: { layoutId },
                },
              } = props;

              const Layouts: ILayouts = {
                background: <ProductBackground />,
                import: <InputLayout />,
                network: <NetworkLayout />,
                forecast: <ForecastLayout />,
                visualytics: <VisualyticsLayout />,
                economics: <EconomicsLayout />,
                declineCurveAnalysis: <DeclineCurveAnalysisLayout />,
                corporate: <CorporateLayout />,
                administration: <AdministrationLayout />,
                settings: <SettingsLayout />,
              };

              return Layouts[layoutId as LayoutNames];
            }}
          </Route>
          <Route path="*" component={() => <h1>Layout not found</h1>} />
        </Switch>
      </main>
      <Spinners />
      <Dialogs />
    </div>
  );
};

export default Layout;
