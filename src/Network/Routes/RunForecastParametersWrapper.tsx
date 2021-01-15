import React from "react";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import RunForecastDialog from "../Components/Dialogs/RunForecastDialog";
import ExistingForecastingParameters from "./ExistingForecastingParameters";

const RunForecastParametersWrapper = (props: DialogStuff) => {
  return (
    <RunForecastDialog {...props}>
      <ExistingForecastingParameters />
    </RunForecastDialog>
  );
};

export default RunForecastParametersWrapper;
