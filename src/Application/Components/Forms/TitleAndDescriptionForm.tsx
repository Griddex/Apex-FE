import makeStyles from "@mui/styles/makeStyles";
import { Form, Formik, FormikProps } from "formik";
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
  setTitle,
  setDescription,
  setDisable,
  storedTitles,
}: ITitleAndDescriptionFormProps) => {
  const classes = useStyles();
  const storedTitlesDefined = storedTitles as string[];

  return (
    <Formik
      initialValues={{ title: "", description: "" }}
      validationSchema={Yup.object({
        title: Yup.mixed().required("Title is required"),
        description: Yup.string(),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ITitleAndDescriptionFormValues>) => {
        const formProps = {
          setTitle,
          setDescription,
          setDisable,
          storedTitles: storedTitlesDefined,
        };

        return (
          <Form
            className={classes.form}
            style={{ height: "100%", width: "100%" }}
          >
            <TitleAndDescription {...formProps} {...props} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default TitleAndDescriptionForm;
