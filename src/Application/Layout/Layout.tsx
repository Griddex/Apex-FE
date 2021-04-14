import { makeStyles } from "@material-ui/core";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdministrationLayout from "../../Administration/Routes/Common/AdministrationLayout";
import CorporateLayout from "../../Corporate/Routes/Common/CorporateLayout";
import DeclineCurveAnalysisLayout from "../../DeclineCurveAnalysis/Routes/Common/DeclineCurveAnalysisLayout";
import EconomicsLayout from "../../Economics/Routes/Common/EconomicsLayout";
import ForecastLayout from "../../Forecast/Common/ForecastLayout";
import { fetchApplicationHeadersRequestAction } from "../../Import/Redux/Actions/InputActions";
import InputLayout from "../../Import/Routes/Common/InputLayout";
import NetworkLayout from "../../Network/Common/NetworkLayout";
import { fetchRecentProjectsAction } from "../../Project/Redux/Actions/ProjectActions";
import { fetchUnitSettingsRequestAction } from "../../Settings/Redux/Actions/UnitSettingsActions";
import SettingsLayout from "../../Settings/Routes/Common/SettingsLayout";
import VisualyticsLayout from "../../Visualytics/Common/VisualyticsLayout";
import Dialogs from "../Components/Dialogs/Dialogs";
import MainDrawer from "../Components/Drawers/MainDrawer";
import Navbar from "../Components/Navbars/Navbar";
import PerpetualSpinner from "../Components/Visuals/PerpetualSpinner";
import Spinners from "../Components/Visuals/Spinners";
import { hideSpinnerAction } from "../Redux/Actions/UISpinnerActions";
import { RootState } from "../Redux/Reducers/AllReducers";
import ProductBackground from "../Routes/ProductBackground";
import { ILayouts, LayoutNames } from "./LayoutTypes";

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

const Layout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();
  const { showMainDrawer, showNavbar } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { pending } = useSelector((state: RootState) => state.uiSpinnerReducer);

  React.useEffect(() => {
    dispatch(fetchApplicationHeadersRequestAction());
    dispatch(fetchRecentProjectsAction());
    dispatch(fetchUnitSettingsRequestAction());
  }, []);

  React.useEffect(() => {
    if (pending) dispatch(hideSpinnerAction());
  }, []);

  return (
    <div className={classes.root}>
      {showNavbar && <Navbar />}
      {showMainDrawer && <MainDrawer />}
      <main className={classes.main}>
        <Suspense fallback={<PerpetualSpinner />}>
          <Switch>
            <Route exact path={url} component={ProductBackground} />
            <Route
              path={`${url}/:layoutId`}
              render={(props) => {
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
            />
            <Route path="*" render={() => <h1>Layout not found</h1>} />
          </Switch>
        </Suspense>
      </main>
      <Spinners />
      <Dialogs />
    </div>
  );
};

export default Layout;
