import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { IUnitSettingsData } from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import projectState from "../../Redux/State/ProjectState";
import {
  INewProjectFormProps,
  INewProjectFormValues,
} from "../../Redux/State/ProjectStateTypes";

const useStyles = makeStyles(() => ({
  form: { height: "100%" },
}));

const NewProjectForm = ({ children }: INewProjectFormProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ ...projectState, pressureAddend: 14.7 }}
      validationSchema={Yup.object().shape({
        projectName: Yup.string().required("projectName is required"),
        projectDescription: Yup.string().required(
          "projectDescription is required"
        ),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<INewProjectFormValues>) => {
        const {
          values: { projectName, projectDescription, pressureAddend },
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
                projectName,
                projectDescription,
                pressureAddend,
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

export default NewProjectForm;
