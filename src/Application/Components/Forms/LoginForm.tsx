import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginRequestAction } from "../../Redux/Actions/LoginActions";
import userState from "../../../Administration/Redux/State/UserState";
import { IUserState } from "../../../Administration/Redux/State/UserStateTypes";

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

        return (
          <Form className={classes.form}>
            <div className={classes.formTextFields}>
              <TextField
                name="userName"
                helperText={helperTextUsername}
                error={Boolean(helperTextUsername)}
                label="Username"
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
              <TextField
                name="password"
                helperText={helperTextPassword}
                error={Boolean(helperTextPassword)}
                label="Password"
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
                        // onMouseDown={event => handleMouseDownPassword(event)}
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
