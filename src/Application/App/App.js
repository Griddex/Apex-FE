import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./../Components/Visuals/Loading";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";

const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

const App = () => {
  const notistackRef = React.useRef(null);
  // React.useEffect(() => {
  //   const onClickDismiss = (key) => () => {
  //     notistackRef.current.closeSnackbar(key);
  //   };
  // },[])

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={(key) => (
        <Button
          style={{ color: "white" }}
          onClick={() => notistackRef.current.closeSnackbar(key)}
        >
          Dismiss
        </Button>
      )}
    >
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={LandingRoute} />
          <Route path="/login" component={LoginRoute} />
          <Route path="/apex" component={Layout} />
          {/* Not authorized will be inside protected route */}
          {/* <ProtectedRoute
        path={"/#"}
        roles={["Officer", "Admin"]}
        component={Layout}
      /> */}
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </Suspense>
    </SnackbarProvider>
  );
};

export default App;
