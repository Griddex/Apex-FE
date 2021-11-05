import { resetAdminAction } from "../../Administration/Redux/Actions/AdminActions";
import { resetEconomicsAction } from "../../Economics/Redux/Actions/EconomicsActions";
import { resetForecastAction } from "../../Forecast/Redux/Actions/ForecastActions";
import { resetInputAction } from "../../Import/Redux/Actions/InputActions";
import { resetNetworkAction } from "../../Network/Redux/Actions/NetworkActions";
import { resetProjectAction } from "../../Project/Redux/Actions/ProjectActions";
import { resetUnitSettingsAction } from "../../Settings/Redux/Actions/UnitSettingsActions";
import { resetVisualyticsAction } from "../../Visualytics/Redux/Actions/VisualyticsActions";

export const resetActions = {
  project: resetProjectAction,
  import: resetInputAction,
  network: resetNetworkAction,
  forecast: resetForecastAction,
  visualytics: resetVisualyticsAction,
  economics: resetEconomicsAction,
  declineCurveAnalysis: () => {},
  corporate: () => {},
  administration: resetAdminAction,
  settings: resetUnitSettingsAction,
} as Record<string, () => void>;
