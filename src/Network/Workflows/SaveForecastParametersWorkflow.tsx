import { findIndex } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ExistingForecastDecks from "../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";
import { IForecastingParametersRow } from "../Components/Dialogs/ExistingNetworksDialogTypes";
import SaveForecastParametersForm from "../Components/Forms/SaveForecastParametersForm";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";
import DeclineCurveParameters from "../Routes/DeclineCurveParameters";
import ForecastParametersTitleAndDescription from "../Routes/ForecastParametersTitleAndDescription";
import OtherForecastingParameters from "../Routes/OtherForecastingParameters";

const SaveForecastParametersWorkflow = ({
  activeStep,
}: {
  activeStep: number;
}) => {
  const { forecastInputDeckId } = useSelector(
    (state: RootState) => state.inputReducer
  );
  const { forecastingParametersExisting } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const index = findIndex(
    forecastingParametersExisting,
    (k: IForecastingParametersRow) =>
      k.forecastInputDeckId === forecastInputDeckId
  );

  const renderImportStep = (props: ISaveForecastParametersFormProps) => {
    switch (activeStep) {
      case 0:
        return (
          <ExistingForecastDecks
            showChart={false}
            finalAction={() => {}}
            containerStyle={{ boxShadow: "none" }}
          />
        );
      case 1:
        return (
          <DeclineCurveParameters
            selectedRowIndex={index} //Provide default DCA parameters
            workflowProcess="saveForecastingParametersWorkflowDialog"
          />
        );
      case 2:
        return <OtherForecastingParameters />;
      case 3:
        return <ForecastParametersTitleAndDescription {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <SaveForecastParametersForm>
      {({
        forecastParametersTitle,
        forecastParametersDescription,
        targetFluid,
        timeFrequency,
        defermentDecision,
        realtimeResults,
        endForecastDate,
        errors,
        touched,
        handleChange,
        isValid,
      }) =>
        renderImportStep({
          forecastParametersTitle,
          forecastParametersDescription,
          targetFluid,
          timeFrequency,
          defermentDecision,
          realtimeResults,
          endForecastDate,
          errors,
          touched,
          handleChange,
          isValid,
        })
      }
    </SaveForecastParametersForm>
  );
};

export default SaveForecastParametersWorkflow;
