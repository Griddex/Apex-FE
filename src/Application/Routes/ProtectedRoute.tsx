import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IProtectedRoute } from "./ProtectedRouteTypes";

const ProtectedRoute = ({
  component: Component,
  roles,
  path,
}: IProtectedRoute) => {
  // const auth = authService("identity");
  const auth = {
    isAuthenticated: true,
    role: "Asset Forecaster",
  };

  return (
    <Route path={path}>
      {(props) => {
        if (!auth.isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );

        if (roles && roles.indexOf(auth.role) === -1)
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
                state: { from: props.location },
              }}
            />
          );

        return <Component />;
      }}
    </Route>
  );
};

export default ProtectedRoute;
