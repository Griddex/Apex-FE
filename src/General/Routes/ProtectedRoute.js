import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./../services/authService";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const auth = authService("identity");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!(auth.IsAuthenticated === "True"))
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );

        if (roles && roles.indexOf(auth.Role) === -1)
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
                state: { from: props.location },
              }}
            />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
