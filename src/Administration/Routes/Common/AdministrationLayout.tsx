import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../../../Application/Components/Visuals/Loading";
import SuspensePerpetualSpinner from "../../../Application/Components/Visuals/SuspensePerpetualSpinner";
import Administration from "../../Administration";
import AdministrationBackground from "./AdministrationBackground";
import { IdType } from "./AdministrationLayoutTypes";

const navbarHeight = 43;
// const subNavBarHeight = 25;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    administrationLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    administrationLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const AdministrationLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.administrationLayoutRoot}>
      <div className={clsx(classes.administrationLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <Switch>
            <Route exact path={path}>
              {() => <AdministrationBackground />}
            </Route>
            <Route path={`${url}/:administrationId`}>
              {(props: RouteComponentProps<IdType>) => {
                const {
                  match: {
                    params: { administrationId },
                  },
                } = props;

                const Layouts: Record<string, JSX.Element> = {
                  background: <AdministrationBackground />,
                  administration: <Administration />,
                };

                return Layouts[administrationId];
              }}
            </Route>
            <Route path="*" component={() => <h1>Not Available</h1>} />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
};

export default AdministrationLayout;
