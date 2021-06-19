import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  ITitleAndDescriptionFormProps,
  ITitleAndDescriptionFormValues,
} from "./FormTypes";
import TitleAndDescription from "./TitleAndDescription";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const TitleAndDescriptionForm = ({
  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
}: ITitleAndDescriptionFormProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ title, description }}
      validationSchema={Yup.object().shape({
        title: Yup.mixed()
          .required("title is required")
          //.notOneOf(storedTitles as string[], "Title already exists"),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ITitleAndDescriptionFormValues>) => {
        const { handleSubmit } = props;

        const formProps = {
          title,
          setTitle,
          description,
          setDescription,
        };

        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            <TitleAndDescription {...formProps} />
          </form>
        );
      }}
    </Formik>
  );
};

export default TitleAndDescriptionForm;
