import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "./../Components/Loading";
import LayoutSelector from "./../Routes/LayoutSelector";

const LandingView = lazy(() => import("../Routes/Landing/LandingView"));
const LoginView = lazy(() => import("../Routes/Login/LoginView"));
const Layout = lazy(() => import("../Layout/Layout"));

function App() {
  //Dimmer on loader
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route component={Layout} path="/valid" />
        <Route component={LoginView} path="/login" />
        <Route component={LandingView} path="/" exact />
        {/* Not authorized will be inside protected route */}
        {/* <ProtectedRoute
        path={"/#"}
        roles={["Officer", "Admin"]}
        component={Layout}
      /> */}
        <Route render={(props) => <h1>Not Found</h1>} />
      </Switch>
    </Suspense>
  );
}

export default App;
