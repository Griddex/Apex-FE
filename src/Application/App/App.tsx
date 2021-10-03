import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch } from "react-router-dom";
import RegisterRoute from "../../Administration/Routes/Register/RegisterRoute";
import SuspensePerpetualSpinner from "../Components/Visuals/SuspensePerpetualSpinner";
import useExitPrompt from "../Hooks/UseExitPrompt";
import NotFnd from "../Routes/Challenges/NotFnd";
import ProtectedRoute from "../Routes/ProtectedRoute";
import { TUseState } from "../Types/ApplicationTypes";

const LandingRoute = React.lazy(() => import("../Routes/Landing/LandingRoute"));
const LoginRoute = React.lazy(() => import("../Routes/Login/LoginRoute"));
const Layout = React.lazy(() => import("../Layout/Layout"));

const useStyles = makeStyles((theme) => ({
  info: { backgroundColor: theme.palette.primary.main },
  success: { backgroundColor: theme.palette.success.main },
  error: { backgroundColor: theme.palette.secondary.main },
  warning: { backgroundColor: theme.palette.warning.main },
}));

interface IExitPromptContext {
  showExitPrompt: boolean;
  setShowExitPrompt: TUseState<boolean>;
}

const initExitPromptContext = {
  showExitPrompt: false,
  setShowExitPrompt: () => false,
};

export const ExitPromptContext = React.createContext<IExitPromptContext>(
  initExitPromptContext
);

const App = () => {
  console.log("Apppppppppppppppp");
  const classes = useStyles();

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false) as [
    boolean,
    TUseState<boolean>
  ];
  const notistackRef = React.useRef<SnackbarProvider>(null);

  return (
    <ExitPromptContext.Provider value={{ showExitPrompt, setShowExitPrompt }}>
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
    </ExitPromptContext.Provider>
  );
};

export default React.memo(App);
