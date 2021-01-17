import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import Settings from "../../Settings";
import SettingsBackground from "./SettingsBackground";

const navbarHeight = 43;
// const subNavBarHeight = 25;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    settingsLayoutRoot: {
      display: "flex",
      flexGrow: 1,
    },
    settingsLayoutContainer: {
      display: "flex",
      flexGrow: 1,
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const SettingsLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.settingsLayoutRoot}>
      <div className={clsx(classes.settingsLayoutContainer)}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={path} render={() => <Settings />} />
            <Route
              path={`${url}/:settingsId`}
              render={(props) => {
                const {
                  match: {
                    params: { settingsId },
                  },
                } = props;

                const Layouts = {
                  background: <SettingsBackground />,
                  settings: <Settings />,
                };

                return Layouts[settingsId];
              }}
            />
            <Route path="*" render={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default SettingsLayout;
