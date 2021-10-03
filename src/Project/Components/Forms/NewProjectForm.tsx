import makeStyles from '@mui/styles/makeStyles';
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { IUnitSettingsData } from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import projectState from "../../Redux/State/ProjectState";
import {
  INewProjectFormProps,
  INewProjectFormValues,
} from "../../Redux/State/ProjectStateTypes";

const useStyles = makeStyles(() => ({
  form: { height: "100%", width: "100%" },
}));

const NewProjectForm = ({ children }: INewProjectFormProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={projectState}
      validationSchema={Yup.object({
        projectTitle: Yup.string().required("projectTitle is required"),
        projectDescription: Yup.string().required(
          "projectDescription is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewProjectFormValues>) => {
        const {
          values: { projectTitle, projectDescription, pressureAddend },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
        } = props;

        return (
          <Form className={classes.form}>
            {children &&
              children({
                projectTitle,
                projectDescription,
                pressureAddend,
                errors,
                touched,
                handleChange,
                isValid,
              })}
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewProjectForm;
