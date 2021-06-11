import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  INewForecastInputDeckWorkflowProps,
  INewForecastInputDeckFormValues,
} from "../../Redux/State/InputStateTypes";
import InputState from "../../Redux/State/InputState";
import ForecastTitleAndDescription from "./ForecastTitleAndDescription";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const ForecastTitleAndDescriptionForm = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={InputState}
      validationSchema={Yup.object().shape({
        forecastInputdeckTitle: Yup.string().required(
          "projectTitle is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewForecastInputDeckFormValues>) => {
        const {
          values: { forecastInputdeckTitle, forecastInputDeckDescription },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
        } = props;

        const formProps = {
          forecastInputdeckTitle,
          forecastInputDeckDescription,
          errors,
          touched,
          handleChange,
          isValid,
        };

        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            <ForecastTitleAndDescription {...formProps} />
          </form>
        );
      }}
    </Formik>
  );
};

export default ForecastTitleAndDescriptionForm;
