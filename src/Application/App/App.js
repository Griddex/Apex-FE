import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { Loader, Segment } from "semantic-ui-react";

const LandingView = lazy(() => import("../Routes/Landing/LandingView"));
const LoginView = lazy(() => import("../Routes/Login/LoginView"));
const Layout = lazy(() => import("../Layout/Layout"));

function App() {
  //Dimmer on loader
  return (
    <Suspense
      fallback={
        <Segment dimmed="true">
          <Loader content="Loading" />
        </Segment>
      }
    >
      <Switch>
        <Route component={LandingView} path="/" exact />
        <Route component={LoginView} path="/login" exact />
        <Route component={Layout} path="/network" exact />
        {/* <ProtectedRoute
        path={"/#"}
        roles={["Officer", "Admin"]}
        component={Layout}
      /> */}
      </Switch>
    </Suspense>
  );
}

export default App;
