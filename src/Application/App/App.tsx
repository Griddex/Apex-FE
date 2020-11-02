import Button from "@material-ui/core/Button";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch } from "react-router-dom";
import PerpetualSpinner from "./../Components/Visuals/PerpetualSpinner";

const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

// const useStyles = makeStyles((theme: Theme) => ({
//   success: { backgroundColor: theme.palette.tertiary.main },
//   error: { backgroundColor: theme.palette.secondary.main },
//   warning: { backgroundColor: theme.palette.quaternary.main },
//   info: { backgroundColor: theme.palette.primary.main },
// }));

const App: React.FC<JSX.Element> = () => {
  // const classes = useStyles();
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
      // classes={{
      //   variantSuccess: classes.success,
      //   variantError: classes.error,
      //   variantWarning: classes.warning,
      //   variantInfo: classes.info,
      // }}
    >
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<PerpetualSpinner message={"Loading..."} />}>
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
      </DndProvider>
    </SnackbarProvider>
  );
};

export default App;
