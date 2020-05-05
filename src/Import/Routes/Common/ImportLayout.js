import Container from "@material-ui/core/Container";
import React, { Suspense, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ContextDrawer from "./../../../Application/Components/ContextDrawer";
import Loading from "./../../../Application/Components/Loading";
import SubNavBar from "./../../../Application/Components/SubNavBar";
import useLayoutStyles from "./../../../Application/Styles/LayoutStyles";
import ImportSelector from "./ImportSelector";

const ImportLayout = (reduxProps) => {
  const classes = useLayoutStyles();

  const { path, url } = useRouteMatch();
  console.log("Logged output -->: ImportLayout -> url", url);
  console.log("Logged output -->: ImportLayout -> path", path);

  const { contextDrawerPresent, subNavBarPresent } = reduxProps;
  const { boundUILayoutActions } = reduxProps;
  const {
    subNavBarPresentAction,
    collapseSubNavBarAction,
    contextDrawerPresentAction,
    collapseContextDrawerAction,
  } = boundUILayoutActions;

  useEffect(() => {
    subNavBarPresentAction();
    collapseSubNavBarAction();
    contextDrawerPresentAction();
    collapseContextDrawerAction();
  });

  return (
    <main className={classes.mainContent}>
      {subNavBarPresent && <SubNavBar reduxProps={reduxProps} />}
      <Container className={classes.container}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              exact
              path={`${url}/:page`}
              render={(props) => (
                <ImportSelector
                  {...props}
                  {...reduxProps}
                  boundUILayoutActions={boundUILayoutActions}
                />
              )}
            />
            <Route path="*" render={(props) => <h1>Not Available</h1>} />
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

export default ImportLayout;
