import { makeStyles } from "@material-ui/core";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navbar from "../Components/Navbars/Navbar";
import Spinners from "../Components/Visuals/Spinners";
import InputLayout from "./../../Import/Routes/Common/InputLayout";
import NetworkLayout from "./../../Network/Common/NetworkLayout";
import VisualyticsLayout from "./../../Visualytics/Common/VisualyticsLayout";
import Loading from "./../Components/Visuals/Loading";
import MainDrawer from "./../Components/Drawers/MainDrawer";
import ProductBackground from "./../Routes/ProductBackground";
import Dialogs from "./../Components/Dialogs/Dialogs";

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

  const { url } = useRouteMatch();
  const { showMainDrawer, showNavbar } = useSelector(
    (state) => state.layoutReducer
  );

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

                const Layouts = {
                  background: <ProductBackground />,
                  import: <InputLayout />,
                  network: <NetworkLayout />,
                  visualytics: <VisualyticsLayout />,
                };

                return Layouts[layoutId];
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
