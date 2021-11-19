import { Button, Input } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { registerUserRequestAction } from "../../Redux/Actions/UserActions";
import userState from "../../Redux/State/UserState";
import { IUserState } from "../../Redux/State/UserStateTypes";
import SingleRegistration from "../../Images/SingleRegistration.svg";
import Image from "../../../Application/Components/Visuals/Image";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60%",
  },
  formFields: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignSelf: "center",
    width: 200,
    height: 50,
    margin: 0,
    fontWeight: "bold",
  },
  input: {
    height: 40,
  },
  image: { height: 70, width: 70 },
}));

const SingleRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [registration, setRegistration] = React.useState(userState);

  return (
    <Formik
      initialValues={userState as IUserState}
      validationSchema={Yup.object({
        userName: Yup.string()
          .min(3, "Username must be  3 or more letters long")
          .required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, email, password }) => {
        dispatch(registerUserRequestAction(userName, email, password));
      }}
    >
      {(props: FormikProps<IUserState>) => {
        const { errors, touched, handleChange, isSubmitting, isValid } = props;

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
            <Image
              className={classes.image}
              src={SingleRegistration}
              alt="Excel logo"
            />
            <div className={classes.formFields}>
              <AnalyticsComp
                title="UserName*"
                direction="Vertical"
                containerStyle={{ marginTop: 50, width: 500, height: 40 }}
                content={
                  <Input
                    className={classes.input}
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
                title="Email*"
                direction="Vertical"
                containerStyle={{ marginTop: 50, width: 500, height: 40 }}
                content={
                  <Input
                    className={classes.input}
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
                title="Password*"
                direction="Vertical"
                containerStyle={{ marginTop: 50, width: 500, height: 40 }}
                content={
                  <Input
                    className={classes.input}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default SingleRegisterForm;
