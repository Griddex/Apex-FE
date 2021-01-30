import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import networkState from "../../Redux/State/NetworkState";
import {
  ISaveForecastParametersFormValues,
  ISaveForecastParametersProps,
} from "../../Redux/State/NetworkStateTypes";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const RunForecastForm = ({ children }: ISaveForecastParametersProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={networkState.saveForecastParameters}
      validationSchema={Yup.object().shape({
        forecastParametersName: Yup.string().required(
          "projectTitle is required"
        ),
        forecastParametersDescription: Yup.string().required(
          "projectDescription is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ISaveForecastParametersFormValues>) => {
        const {
          values: {
            forecastParametersName,
            forecastParametersDescription,
            hSPName,
            timeFrequency,
            realtimeResults,
            endForecastDate,
          },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
        } = props;

        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            {children &&
              children({
                forecastParametersName,
                forecastParametersDescription,
                hSPName,
                timeFrequency,
                realtimeResults,
                endForecastDate,
                errors,
                touched,
                handleChange,
                isValid,
              })}
          </form>
        );
      }}
    </Formik>
  );
};

export default RunForecastForm;
