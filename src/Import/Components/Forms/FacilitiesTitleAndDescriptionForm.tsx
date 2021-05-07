import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  INewFacilitiesInputDeckWorkflowProps,
  INewFacilitiesInputDeckFormValues,
} from "../../Redux/State/InputStateTypes";
import InputState from "./../../Redux/State/InputState";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const FacilitiesTitleAndDescriptionForm = ({
  children,
}: INewFacilitiesInputDeckWorkflowProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={InputState}
      validationSchema={Yup.object().shape({
        facilitiesInputDeckTitle: Yup.string().required(
          "projectTitle is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewFacilitiesInputDeckFormValues>) => {
        const {
          values: { facilitiesInputDeckTitle, facilitiesInputDeckDescription },
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
                facilitiesInputDeckTitle,
                facilitiesInputDeckDescription,
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

export default FacilitiesTitleAndDescriptionForm;
