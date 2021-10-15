import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import { IdType } from "./SettingsLayoutTypes";

const Settings = React.lazy(() => import("../../Settings"));
const SettingsBackground = React.lazy(() => import("./SettingsBackground"));
const SuspensePerpetualSpinner = React.lazy(
  () =>
    import("../../../Application/Components/Visuals/SuspensePerpetualSpinner")
);

const navbarHeight = 43;
const addedHeight = 0;
const useStyles = makeStyles(() => {
  return {
    settingsLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    settingsLayoutContainer: {
      display: "flex",
      width: "100%",
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
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <Switch>
            <Route exact path={path} component={() => <Settings />} />
            <Route path={`${url}/:settingsId`}>
              {(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { settingsId },
                  },
                } = props;

                const Layouts: Record<string, JSX.Element> = {
                  background: <SettingsBackground />,
                  settings: <Settings />,
                };

                return Layouts[settingsId];
              }}
            </Route>
            <Route path="*" component={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default SettingsLayout;
