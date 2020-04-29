import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { Suspense, lazy } from "react";
import ImportFacilitiesLanding from "../../Import/Routes/ImportFacilities/ImportFacilitiesLanding";
import NavBar from "../Components/NavBar";
import useLayoutStyles from "../Styles/LayoutStyles";
import ContextDrawer from "./../Components/ContextDrawer";
import MainDrawer from "./../Components/MainDrawer";
import SubNavBar from "./../Components/SubNavBar";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UILayoutActions from "../../Application/Redux/Actions/UILayoutActions";
import { Switch, Route } from "react-router-dom";
import Loading from "./../Components/Loading";
import ProductBackground from "./../Routes/ProductBackground";
import ImportBackground from "./../../Import/Routes/Common/ImportBackground";
import { makeStyles } from "@material-ui/core";
import ImportLayout from "./../../Import/Routes/Common/ImportLayout";
//when clicked
//Use redux to determine what was clicked on the main menu
//return the right main content from that

//main content will determine how main drawer, subnavbar and context drawer behaves

//Approach
//Write all dimension equations in full in the styles files
//Define all relevant dimensions variables in redux
//initialize state of these variables
//use redux hooks for the styles files'['g;;lpp0hoh9tg8]
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Layout = (reduxProps) => {
  const classes = useLayoutStyles(reduxProps);
  const cls = useStyles();
  const { dispatch } = reduxProps;
  const boundUILayoutActions = bindActionCreators(UILayoutActions, dispatch);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar
        reduxProps={reduxProps}
        boundUILayoutActions={boundUILayoutActions}
      />
      <MainDrawer
        reduxProps={reduxProps}
        boundUILayoutActions={boundUILayoutActions}
      />
      <Suspense fallback={<Loading />}>
        <div className={cls.root}>
          <Switch>
            <Route exact path="/auth" component={ProductBackground} />
            <Route
              exact
              path="/auth/import"
              render={(props) => <ImportLayout {...props} {...reduxProps} />}
            />
          </Switch>
        </div>
      </Suspense>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openMainDrawer: state.UILayoutReducer.openMainDrawer,
    openContextDrawer: state.UILayoutReducer.openContextDrawer,
  };
};

export default connect(mapStateToProps, null)(Layout);
