import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  INewEconomicsParametersInputDeckWorkflowProps,
  INewEconomicsParametersInputDeckFormValues,
} from "../../Redux/State/EconomicsStateTypes";
import EconomicsState from "../../Redux/State/EconomicsState";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const EconomicsParametersTitleAndDescriptionForm = ({
  children,
}: INewEconomicsParametersInputDeckWorkflowProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={EconomicsState}
      validationSchema={Yup.object().shape({
        economicsParametersInputDeckTitle: Yup.string().required(
          "Title is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewEconomicsParametersInputDeckFormValues>) => {
        const {
          values: {
            economicsParametersInputDeckTitle,
            economicsParametersInputDeckDescription,
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
                economicsParametersInputDeckTitle,
                economicsParametersInputDeckDescription,
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

export default EconomicsParametersTitleAndDescriptionForm;
