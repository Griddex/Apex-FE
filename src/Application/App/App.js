import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./../Components/Visuals/Loading";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: `${theme.palette.tertiary.main}` },
  error: { backgroundColor: `${theme.palette.secondary.main}` },
  warning: { backgroundColor: `${theme.palette.quaternary.main}` },
  info: { backgroundColor: `${theme.palette.primary.main}` },
}));

const App = () => {
  const classes = useStyles();
  const notistackRef = React.useRef(null);

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
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
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
