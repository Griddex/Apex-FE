import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import forecastState from "../../../Forecast/Redux/ForecastState/ForecastState";
import {
  ISaveForecastProps,
  ISaveForecastResultsFormValues,
  ISaveForecastResultsProps,
} from "../../../Forecast/Redux/ForecastState/ForecastStateTypes";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const SaveForecastResultsForm = ({ children }: ISaveForecastProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={forecastState}
      validationSchema={Yup.object().shape({
        forecastResultsTitle: Yup.string().required("networkTitle is required"),
        forecastResultsDescription: Yup.string(),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ISaveForecastResultsFormValues>) => {
        const {
          values: { forecastResultsTitle, forecastResultsDescription },
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
                forecastResultsTitle,
                forecastResultsDescription,
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

export default SaveForecastResultsForm;
