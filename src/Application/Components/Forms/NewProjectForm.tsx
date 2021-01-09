import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import newProjectState, {
  INewProjectFormProps,
  INewProjectFormValues,
} from "../../../Project/Redux/State/ProjectState";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
  },
  topSection: {
    height: "40%",
    borderBottom: "1px solid #C4C4C4",
  },
  bottomSection: {
    height: "50%",
    paddingTop: 20,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
  button: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  form: { height: "100%" },
  connectButton: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 184,
  },
  grid: { width: "100%", height: "100%" },
  checkBox: { margin: 0 },
  selectItem: {},
}));

const NewProjectForm = ({ children }: INewProjectFormProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={newProjectState}
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
          values: {
            projectName,
            projectDescription,
            dateFormat,
            pressureAddend,
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
                projectName,
                projectDescription,
                dateFormat,
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
