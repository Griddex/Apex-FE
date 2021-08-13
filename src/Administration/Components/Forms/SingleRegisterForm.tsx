import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import ImageUploader from "react-images-upload";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import userState from "../../../Application/Redux/State/UserState";
import { IUserState } from "../../../Application/Redux/State/UserStateTypes";
import { registerRequestAction } from "../../Redux/Actions/AdminActions";

const useStyles = makeStyles((theme) => ({
  form: { display: "flex", width: "90%", height: "90%" },
  formFields: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    maxWidth: 700,
    padding: 10,
  },
  avatarField: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    minWidth: 500,
    padding: 10,
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

  const [registration, setRegistration] = React.useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    jobTitle: "",
    role: "",
  });

  return (
    <Formik
      initialValues={userState}
      validationSchema={Yup.object({
        userName: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, email, password }) => {
        console.log(
          "Logged output --> ~ file: SingleRegisterForm.tsx ~ line 112 ~ SingleRegisterForm ~ userName",
          userName
        );
        dispatch(registerRequestAction(userName, email, password));
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

        const handleFormChange =
          (name: string) =>
          (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleChange(event);
            const { value } = event.target;

            setRegistration((prev) => ({ ...prev, [name]: value }));
          };

        const helperText = (name: keyof IUserState) =>
          touched && touched[name] ? errors && errors[name] : "";

        return (
          <Form className={classes.form}>
            <div className={classes.formFields}>
              <div className={classes.namesContainer}>
                <AnalyticsComp
                  title="FirstName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="firstName"
                      error={Boolean(helperText("firstName"))}
                      value={registration["firstName"]}
                      onChange={handleFormChange("firstName")}
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="LastName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="lastName"
                      error={Boolean(helperText("lastName"))}
                      value={registration["lastName"]}
                      onChange={handleFormChange("lastName")}
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="MiddleName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="middleName"
                      error={Boolean(helperText("middleName"))}
                      value={registration["middleName"]}
                      onChange={handleFormChange("middleName")}
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="UserName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="userName"
                      error={Boolean(helperText("userName"))}
                      value={registration["userName"]}
                      onChange={handleFormChange("userName")}
                      required
                      autoFocus
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="Password"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="password"
                      error={Boolean(helperText("password"))}
                      value={registration["password"]}
                      onChange={handleFormChange("password")}
                      required
                      fullWidth
                    />
                  }
                />
              </div>
              <div className={classes.emailMobileContainer}>
                <AnalyticsComp
                  title="Email"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="email"
                      error={Boolean(helperText("email"))}
                      value={registration["email"]}
                      onChange={handleFormChange("email")}
                      required
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="MobileNumber"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="mobileNumber"
                      error={Boolean(helperText("mobileNumber"))}
                      value={registration["mobileNumber"]}
                      onChange={handleFormChange("mobileNumber")}
                      fullWidth
                    />
                  }
                />
              </div>
              <div className={classes.jobRoleContainer}>
                <AnalyticsComp
                  title="FirstName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="jobTitle"
                      error={Boolean(helperText("jobTitle"))}
                      value={registration["jobTitle"]}
                      onChange={handleFormChange("jobTitle")}
                      fullWidth
                    />
                  }
                />

                <AnalyticsComp
                  title="FirstName"
                  direction="Vertical"
                  containerStyle={{ marginTop: 20, width: 300, height: 30 }}
                  content={
                    <Input
                      name="role"
                      error={Boolean(helperText("role"))}
                      value={registration["role"]}
                      onChange={handleFormChange("role")}
                      fullWidth
                    />
                  }
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
            </div>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              // disabled={!isValid}
              fullWidth
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SingleRegisterForm;
