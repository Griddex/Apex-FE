import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import makeStyles from "@mui/styles/makeStyles";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginRequestAction } from "../../Redux/Actions/LoginActions";
import userState from "../../../Administration/Redux/State/UserState";
import { IUserState } from "../../../Administration/Redux/State/UserStateTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "45%",
  },
  formTextFields: {
    "& > *": { marginTop: 40, "& .MuiInputBase-root": { height: 44 } },
  },
  divider: {
    margin: "20px",
  },
  button: {
    padding: theme.spacing(1),
    textAlign: "center",
    width: "100%",
    height: 50,
    margin: 0,
    fontWeight: "bold",
  },
  textfield: {
    margin: theme.spacing(1),
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  //TODO Persist remember me in redis, localstorage or mongo?

  return (
    <Formik
      initialValues={userState as IUserState}
      validationSchema={Yup.object({
        userName: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, password }) => {
        dispatch(loginRequestAction(userName, password));
      }}
    >
      {(props: FormikProps<IUserState>) => {
        const {
          values: { userName, password },
          errors,
          touched,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
        } = props;

        const helperTextUsername =
          touched && touched.userName ? errors && errors.userName : "";
        const helperTextPassword =
          touched && touched.password ? errors && errors.password : "";

        const UserNameComp = (
          <TextField
            name="userName"
            helperText={helperTextUsername}
            error={Boolean(helperTextUsername)}
            value={userName}
            onChange={handleChange}
            InputProps={{
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
        );

        const PasswordComp = (
          <TextField
            name="password"
            helperText={helperTextPassword}
            error={Boolean(helperTextPassword)}
            autoComplete="current-password"
            InputProps={{
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
            value={password}
            onChange={handleChange}
            fullWidth
          />
        );

        return (
          <Form className={classes.form}>
            <div className={classes.formTextFields}>
              <AnalyticsComp
                title="Username"
                direction="Vertical"
                containerStyle={{ width: "100%" }}
                content={UserNameComp}
              />
              <AnalyticsComp
                title="Password"
                direction="Vertical"
                containerStyle={{ width: "100%" }}
                content={PasswordComp}
              />
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
              fullWidth
            >
              {isSubmitting ? "Logging in..." : "Submit"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
