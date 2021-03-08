import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import React, { ChangeEvent } from "react";
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import ApexMuiTextField from "../../../Application/Components/TextFields/ApexMuiTextField";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  registerAction,
  updateRegistrationFormAction,
} from "../../Redux/Actions/AdminActions";
import * as Yup from "yup";
import userState from "../../../Application/Redux/State/UserState";
import { IUserState } from "../../../Application/Redux/State/UserStateTypes";

const useStyles = makeStyles((theme) => ({
  form: { display: "flex", width: "90%", height: "90%" },
  formFields: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    maxWidth: 700,
  },
  avatarField: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  namesContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: "50%",
    width: "100%",
  },
  emailMobileContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: "25%",
    width: "100%",
  },
  jobRoleContainer: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "center",
    height: "25%",
    width: "100%",
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
    minWidth: 600,
  },
  button: {
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.primary,
    // background: theme.palette.primary.main,
    width: "100%",
    height: 50,
    margin: 0,
    fontWeight: "bold",
  },
}));

const SingleRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { registrationScenario } = useSelector(
    (state: RootState) => state.adminReducer
  );

  return (
    <Formik
      initialValues={userState}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, email, password }) => {
        console.log(
          "Logged output --> ~ file: SingleRegisterForm.tsx ~ line 97 ~ SingleRegisterForm ~ userName",
          userName
        );
        dispatch(registerAction(userName, email, password));
      }}
    >
      {(props: FormikProps<IUserState>) => {
        const {
          values: { userName, email, password },
          errors,
          touched,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
        } = props;

        // const [value, setValue] = React.useState(textFieldInitialValue);
        // const handleRegisterChange = (event: ChangeEvent<any>) => {
        //   handleChange(event)
        //   const { name, value } = event.target;
        //   setValue(value);
        //   updateRegistrationFormAction && dispatch(updateRegistrationFormAction(name, value));
        // };

        const helperTextUsername =
          touched && touched.userName ? errors && errors.userName : "";
        const helperTextEmail =
          touched && touched.email ? errors && errors.email : "";
        const helperTextPassword =
          touched && touched.password ? errors && errors.password : "";

        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.formFields}>
              <div className={classes.namesContainer}>
                <ApexMuiTextField
                  title="FirstName"
                  textFieldName="firstName"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
                <ApexMuiTextField
                  title="MiddleName"
                  textFieldName="middleName"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
                <ApexMuiTextField
                  title="LastName"
                  textFieldName="lastName"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
                <ApexMuiTextField
                  title="Username"
                  textFieldName="userName"
                  action={handleChange}
                  required={true}
                  autoFocus={true}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={userName}
                  helperText={helperTextUsername}
                />
                <ApexMuiTextField
                  title="Password"
                  textFieldName="password"
                  action={handleChange}
                  required={true}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={password}
                  type="password"
                  helperText={helperTextPassword}
                />
              </div>
              <div className={classes.emailMobileContainer}>
                <ApexMuiTextField
                  title="Email"
                  textFieldName="email"
                  action={handleChange}
                  required={true}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={email}
                  helperText={helperTextEmail}
                />
                <ApexMuiTextField
                  title="Mobile Number"
                  textFieldName="mobileNumber"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
              </div>
              <div className={classes.jobRoleContainer}>
                <ApexMuiTextField
                  title="Job Title"
                  textFieldName="jobTitle"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
                <ApexMuiTextField
                  title="Role"
                  textFieldName="role"
                  action={handleChange}
                  required={false}
                  autoFocus={false}
                  textFieldStyle={{ minWidth: 300 }}
                  textFieldInitialValue={""}
                />
              </div>
            </div>
            <div className={classes.avatarField}>
              <AnalyticsTitle title="Photo" />
              <ImageUploader
                withIcon={true}
                onChange={(files: File[], pictures: string[]) => {}}
                imgExtension={[".jpeg", ".jpg", ".gif", ".png", "gif"]}
                maxFileSize={5242880}
                withPreview={true}
                style={{ height: "100%", width: "100%" }}
                fileContainerStyle={{ height: "100%", width: "100%" }}
                buttonText="Choose photo"
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                fullWidth
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SingleRegisterForm;
