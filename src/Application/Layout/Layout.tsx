import { makeStyles } from "@material-ui/core";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navbar from "../Components/Navbars/Navbar";
import Spinners from "../Components/Visuals/Spinners";
import InputLayout from "../../Import/Routes/Common/InputLayout";
import NetworkLayout from "../../Network/Common/NetworkLayout";
import EconomicsLayout from "../../Economics/Routes/Common/EconomicsLayout";
import VisualyticsLayout from "../../Visualytics/Common/VisualyticsLayout";
import DeclineCurveAnalysisLayout from "../../DeclineCurveAnalysis/Routes/Common/DeclineCurveAnalysisLayout";
import CorporateLayout from "../../Corporate/Routes/Common/CorporateLayout";
import AdministrationLayout from "../../Administration/Routes/Common/AdministrationLayout";
import SettingsLayout from "../../Settings/Routes/Common/SettingsLayout";
import Loading from "../Components/Visuals/Loading";
import MainDrawer from "../Components/Drawers/MainDrawer";
import ProductBackground from "../Routes/ProductBackground";
import Dialogs from "../Components/Dialogs/Dialogs";
import { ILayouts, LayoutNames } from "./LayoutTypes";
import { RootState } from "../Redux/Reducers/AllReducers";
import { fetchRecentProjectsAction } from "../../Project/Redux/Actions/ProjectActions";
import { failureDialogParameters } from "../../Project/Components/DialogParameters/RecentProjectsFailureDialogParameters";
import { fetchUnitSettingsRequestAction } from "../../Settings/Redux/Actions/UnitSettingsActions";
import { fetchExistingDataRequestAction } from "../../Import/Redux/Actions/ExistingDataActions";
import { fetchApplicationHeadersRequestAction } from "../../Import/Redux/Actions/ImportActions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
  },
  main: {
    display: "flex",
    flexGrow: 1,
  },
}));

const Layout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = useRouteMatch();
  const { showMainDrawer, showNavbar } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  React.useEffect(() => {
    //Boostrap recent projects

    //Application headers
    dispatch(fetchApplicationHeadersRequestAction("forecastInputDeckExcel"));
    dispatch(fetchApplicationHeadersRequestAction("facilitiesInputDeckExcel"));

    //Existing Data tables
    dispatch(
      fetchExistingDataRequestAction("A", "facilitiesInputDeckExisting")
    );
    dispatch(fetchExistingDataRequestAction("A", "forecastInputDeckExisting"));
    dispatch(fetchExistingDataRequestAction("A", "economicsInputDataExisting"));
    dispatch(
      fetchExistingDataRequestAction("A", "productionInputDataExisting")
    );
    dispatch(fetchExistingDataRequestAction("A", "networkExisting"));
    dispatch(fetchRecentProjectsAction(failureDialogParameters));
    dispatch(fetchUnitSettingsRequestAction());

    //Boostrap User details
  }, []);

  return (
    <div className={classes.root}>
      {showNavbar && <Navbar />}
      {showMainDrawer && <MainDrawer />}
      <main className={classes.main}>
        <Suspense fallback={<Loading />}>
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
