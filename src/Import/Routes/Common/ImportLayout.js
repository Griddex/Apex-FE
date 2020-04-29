import { makeStyles } from "@material-ui/core";
import React, { Suspense, lazy } from "react";
import Container from "@material-ui/core/Container";
import ContextDrawer from "./../../../Application/Components/ContextDrawer";
import SubNavBar from "./../../../Application/Components/SubNavBar";
import useLayoutStyles from "./../../../Application/Styles/LayoutStyles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Route } from "react-router-dom";
import ImportBackground from "./ImportBackground";
import * as UILayoutActions from "../../../Application/Redux/Actions/UILayoutActions";
import Loading from "./../../../Application/Components/Loading";

const ImportLayout = (reduxProps) => {
  const classes = useLayoutStyles();
  const { dispatch, contextDrawerPresent, subNavBarPresent } = reduxProps;
  const boundUILayoutActions = bindActionCreators(UILayoutActions, dispatch);

  return (
    <main className={classes.mainContent}>
      {subNavBarPresent && <SubNavBar reduxProps={reduxProps} />}
      <Container className={classes.container}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/auth/import" component={ImportBackground} />
            <Route
              exact
              path="/auth/import/facilitiesdeck"
              component={ImportBackground}
            />
            <Route
              exact
              path="/auth/import/forecastdeck"
              component={ImportBackground}
            />
            <Route
              exact
              path="/auth/import/productiondata"
              component={ImportBackground}
            />
            <Route
              exact
              path="/auth/import/economicsdata"
              component={ImportBackground}
            />
          </Switch>
        </Suspense>
        {contextDrawerPresent && (
          <ContextDrawer
            reduxProps={reduxProps}
            boundUILayoutActions={boundUILayoutActions}
          />
        )}
      </Container>
    </main>
  );
};

ImportLayout.propTypes = {};

const mapStateToProps = (state) => {
  return {
    allReduxProps: state.UILayoutReducer,
  };
};

export default connect(mapStateToProps, null)(ImportLayout);
