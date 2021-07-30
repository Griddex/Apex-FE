import { makeStyles } from "@material-ui/core/styles";
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
        title: Yup.string(),
          // .required("Title is required")
          // .test("alreadyExists", "Title already exists", (v) => {
          //   if (v) {
          //     const exi = storedTitlesDefined
          //       .map((t) => t.toLowerCase())
          //       .includes((v as string).trim().toLowerCase());
          //     console.log(
          //       "Logged output --> ~ file: TitleAndDescriptionForm.tsx ~ line 35 ~ .test ~ exi",
          //       exi
          //     );

          //     return !exi;
          //   } else return true;
          // })
          
        description: Yup.string(),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<ITitleAndDescriptionFormValues>) => {
        const formProps = {
          setTitle,
          setDescription,
          setDisable,
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
