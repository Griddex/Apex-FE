import Button from "@material-ui/core/Button";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// import PersonIcon from "@material-ui/icons/Person";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import userState from "../../../Application/Redux/State/UserState";
import { IRegistrationFormValues } from "../../Redux/State/RegistrationStateTypes";
import RegistrationScenarios from "../RadioGroups/RegistrationScenarios";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80%",
    // maxWidth: theme.breakpoints.width("sm"),
  },
  regScenario: {
    width: "100%",
    height: 50,
  },
  regFormContainer: { display: "flex", width: "100%", height: "100%" },
  textFieldsContainer: {
    display: "flex",
    minWidth: "70%",
    height: "100%",
  },
  avatarContainer: {
    display: "flex",
    height: "100%",
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { registrationScenario } = useSelector(
    (state: RootState) => state.adminReducer
  );

  return (
    <Formik
      initialValues={userState}
      validationSchema={Yup.object({
        firstName: Yup.string().required("firstName is required"),
        middleName: Yup.string(),
        lastName: Yup.string().required("lastName is required"),
        email: Yup.string().required("email is required"),
        mobileNumber: Yup.string(),
        jobTitle: Yup.string(),
        role: Yup.string().required("role is required"),
        avatarUrl: Yup.string(),
      })}
      onSubmit={() => {}}
    >
      {(props: FormikProps<IRegistrationFormValues>) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          // isValid,
          handleSubmit,
          // status,
        } = props;

        return (
          <Form className={classes.form}>
            <RegistrationScenarios />
            <div></div>
            <Button type="submit" variant="outlined" color="primary">
              Select
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
