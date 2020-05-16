import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as UILayoutActions from "../../Application/Redux/Actions/UILayoutActions";
import NavBar from "../Components/NavBar";
import useLayoutStyles from "../Styles/LayoutStyles";
import ImportLayout from "./../../Import/Routes/Common/ImportLayout";
import NetworkLayout from "./../../Network/Common/NetworkLayout";
import VisualizationLayout from "./../../Visualization/Common/VisualizationLayout";
import Loading from "./../Components/Loading";
import MainDrawer from "./../Components/MainDrawer";
import ProductBackground from "./../Routes/ProductBackground";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
    // justifyContent: "center",
  },
}));

const Layout = (reduxProps) => {
  const classesRoot = useStyles();
  const classes = useLayoutStyles(reduxProps);
  const { url } = useRouteMatch();

  const { dispatch, mainDrawerPresent, navBarPresent } = reduxProps;
  const boundUILayoutActions = bindActionCreators(UILayoutActions, dispatch);
  const allProps = { ...reduxProps, boundUILayoutActions };

  const {
    mainDrawerPresentAction,
    collapseMainDrawerAction,
    navBarPresentAction,
    collapseNavBarAction,
  } = boundUILayoutActions;

  useEffect(() => {
    mainDrawerPresentAction();
    collapseMainDrawerAction();
    navBarPresentAction();
    collapseNavBarAction();
    // defaultLayoutAction();
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      {navBarPresent && (
        <NavBar
          reduxProps={reduxProps}
          boundUILayoutActions={boundUILayoutActions}
        />
      )}
      {mainDrawerPresent && (
        <MainDrawer
          reduxProps={reduxProps}
          boundUILayoutActions={boundUILayoutActions}
        />
      )}
      <div className={classesRoot.root}>
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
                  background: <ProductBackground {...allProps} />,
                  import: <ImportLayout {...allProps} />,
                  network: <NetworkLayout {...allProps} />,
                  visualization: <VisualizationLayout {...allProps} />,
                };

                return Layouts[layoutId];
              }}
            />
            <Route path="*" render={(props) => <h1>Layout not found</h1>} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mainDrawerPresent: state.UILayoutReducer.mainDrawerPresent,
    expandMainDrawer: state.UILayoutReducer.expandMainDrawer,
    contextDrawerPresent: state.UILayoutReducer.contextDrawerPresent,
    expandContextDrawer: state.UILayoutReducer.expandContextDrawer,
    subNavBarPresent: state.UILayoutReducer.subNavBarPresent,
    expandSubNavBar: state.UILayoutReducer.expandSubNavBar,
    navBarPresent: state.UILayoutReducer.navBarPresent,
    expandNavBar: state.UILayoutReducer.expandNavBar,
  };
};

export default connect(mapStateToProps, null)(Layout);
