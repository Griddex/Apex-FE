import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import makeStyles from "@mui/styles/makeStyles";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import Image from "../../../Application/Components/Visuals/Image";
import SingleRegistration from "../../Images/SingleRegistration.svg";
import { registerUserRequestAction } from "../../Redux/Actions/UserActions";
import userState from "../../Redux/State/UserState";
import { IUserState } from "../../Redux/State/UserStateTypes";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

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
    height: 44,
  },
  image: { height: 70, width: 70 },
}));

const SingleRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
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
                containerStyle={{ marginTop: 50, width: 500, height: 44 }}
                content={
                  <TextField
                    className={classes.input}
                    name="userName"
                    helperText={helperText("userName")}
                    error={Boolean(helperText("userName"))}
                    value={registration["userName"]}
                    onChange={handleFormChange("userName")}
                    InputProps={{
                      sx: { height: 44 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
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
                  <TextField
                    className={classes.input}
                    name="email"
                    helperText={helperText("email")}
                    error={Boolean(helperText("email"))}
                    value={registration["email"]}
                    onChange={handleFormChange("email")}
                    InputProps={{
                      sx: { height: 44 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    required
                    autoFocus
                    fullWidth
                  />
                }
              />
              <AnalyticsComp
                title="Password*"
                direction="Vertical"
                containerStyle={{ marginTop: 50, width: 500, height: 40 }}
                content={
                  <TextField
                    name="password"
                    helperText={helperText("password")}
                    error={Boolean(helperText("password"))}
                    autoComplete="current-password"
                    InputProps={{
                      sx: { height: 44 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => setShowPassword(!showPassword)}
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    required
                    type={showPassword ? "text" : "password"}
                    value={registration["password"]}
                    onChange={handleFormChange("password")}
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
