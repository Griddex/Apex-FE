import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch } from "react-router-dom";
import SuspensePerpetualSpinner from "../Components/Visuals/SuspensePerpetualSpinner";

const RegisterRoute = React.lazy(
  () => import("../../Administration/Routes/Register/RegisterRoute")
);
const NotFnd = React.lazy(() => import("../Routes/Challenges/NotFnd"));
const ProtectedRoute = React.lazy(() => import("../Routes/ProtectedRoute"));
const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

const useStyles = makeStyles((theme) => ({
  info: { backgroundColor: theme.palette.primary.main },
  success: { backgroundColor: theme.palette.success.main },
  error: { backgroundColor: theme.palette.secondary.main },
  warning: { backgroundColor: theme.palette.warning.main },
}));

const App = () => {
  console.log("Apppppppppppppppp");
  const classes = useStyles();

  const notistackRef = React.useRef<SnackbarProvider>(null);

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e = e || window.event;

      if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
        console.log("Yo, you just pressed F5!");
        e.preventDefault();
      }
    });
  }, []);

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
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <Switch>
            <Route exact path="/" component={LandingRoute} />
            <Route path="/login" component={LoginRoute} />
            <Route path="/register" component={RegisterRoute} />
            <ProtectedRoute
              path={"/apex"}
              roles={["Officer", "Admin"]}
              component={Layout}
            />
            <Route component={NotFnd} />
          </Switch>
        </Suspense>
      </DndProvider>
    </SnackbarProvider>
  );
};

export default React.memo(App);
