import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  INewEconomicsSensitivitiesWorkflowProps,
  INewEconomicsSensitivitiesFormValues,
} from "../../Redux/State/EconomicsStateTypes";
import EconomicsState from "../../Redux/State/EconomicsState";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const EconomicsSensitivitiesTitleAndDescriptionForm = ({
  children,
}: INewEconomicsSensitivitiesWorkflowProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={EconomicsState}
      validationSchema={Yup.object().shape({
        economicsSensitivitiesTitle: Yup.string().required("Title is required"),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewEconomicsSensitivitiesFormValues>) => {
        const {
          values: {
            economicsSensitivitiesTitle,
            economicsSensitivitiesDescription,
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
                economicsSensitivitiesTitle,
                economicsSensitivitiesDescription,
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

export default EconomicsSensitivitiesTitleAndDescriptionForm;
