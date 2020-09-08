import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Dialogs from "../Components/Dialogs";
import Navbar from "../Components/Navbar";
import ImportLayout from "./../../Import/Routes/Common/ImportLayout";
import NetworkLayout from "./../../Network/Common/NetworkLayout";
import VisualizationLayout from "./../../Visualization/Common/VisualizationLayout";
import Loading from "./../Components/Loading";
import MainDrawer from "./../Components/MainDrawer";
import ProductBackground from "./../Routes/ProductBackground";

const useStyles = makeStyles((theme) => ({
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

const Layout = (reduxProps) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const layoutData = useSelector((state) => state.layoutReducer);
  // const {
  //   showMainDrawer,
  //   expandMainDrawer,
  //   showContextDrawer,
  //   expandContextDrawer,
  //   showSubNavbar,
  //   expandSubNavbar,
  //   showNavbar,
  //   expandNavbar,
  // } = layoutData;
  const { showMainDrawer, showNavbar } = layoutData;

  return (
    <div className={classes.root}>
      <CssBaseline />
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

                const Layouts = {
                  background: <ProductBackground />,
                  import: <ImportLayout />,
                  network: <NetworkLayout />,
                  visualization: <VisualizationLayout />,
                };

                return Layouts[layoutId];
              }}
            />
            <Route path="*" render={() => <h1>Layout not found</h1>} />
          </Switch>
        </Suspense>
      </main>
      <Dialogs />
    </div>
  );
};

export default Layout;
