import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import Economics from "../../Economics";
import EconomicsBackground from "./EconomicsBackground";

const navbarHeight = 43;
// const subNavBarHeight = 25;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    economicsLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    economicsLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const EconomicsLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.economicsLayoutRoot}>
      <div className={clsx(classes.economicsLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} render={() => <EconomicsBackground />} />
            <Route
              path={`${url}/:economicsId`}
              render={(props) => {
                const {
                  match: {
                    params: { economicsId },
                  },
                } = props;

                const Layouts = {
                  background: <EconomicsBackground />,
                  economics: <Economics />,
                };

                return Layouts[economicsId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
        {/* {showContextDrawer && (
          <ContextDrawer>
            <WorkflowStepper {...workflowStepperProps} />
          </ContextDrawer>
        )} */}
      </div>
    </main>
  );
};

export default EconomicsLayout;
