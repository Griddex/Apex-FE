import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch } from "react-router-dom";
import RegisterRoute from "../../Administration/Routes/Register/RegisterRoute";
import ProtectedRoute from "../Routes/ProtectedRoute";
import PerpetualSpinner from "./../Components/Visuals/PerpetualSpinner";

const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

const useStyles = makeStyles((theme) => ({
  info: { backgroundColor: theme.palette.primary.main },
  success: { backgroundColor: theme.palette.success.main },
  error: { backgroundColor: theme.palette.secondary.main },
  warning: { backgroundColor: theme.palette.warning.main },
}));

const App: React.FC<JSX.Element> = () => {
  const classes = useStyles();
  const notistackRef = React.useRef<SnackbarProvider>(null);

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={(key) => (
        <Button
          style={{ color: "white" }}
          onClick={() => {
            if (notistackRef && notistackRef.current)
              notistackRef.current.closeSnackbar(key);
          }}
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
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<PerpetualSpinner />}>
          <Switch>
            <Route exact path="/" component={LandingRoute} />
            <Route path="/login" component={LoginRoute} />
            <Route path="/register" component={RegisterRoute} />
            <ProtectedRoute
              path={"/apex"}
              roles={["Officer", "Admin"]}
              component={Layout}
            />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </Suspense>
      </DndProvider>
    </SnackbarProvider>
  );
};

export default App;
