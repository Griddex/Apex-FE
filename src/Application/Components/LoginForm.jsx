import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginAction } from "./../Redux/Actions/LoginActions";
import userState from "./../Redux/State/UserState";

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
    color: theme.palette.text.primary,
    background: theme.palette.primary.main,
    margin: "20px",
    width: "100%",
  },
  textfield: {
    margin: theme.spacing(1),
  },
  button: {
    height: 36,
    marginTop: 20,
    marginBottom: 10,
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const pending = useSelector((state) => state.uiSpinnerReducer.pending);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Need a local json file for remember me?

  return (
    <Formik
      initialValues={userState}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ userName, password }) => {
        dispatch(loginAction(userName, password));
      }}
    >
      {(props) => {
        const {
          values: { userName, password },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
          status,
        } = props;

        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.formTextFields}>
              <TextField
                name="userName"
                helperText={touched[userName] ? errors[userName] : ""}
                error={Boolean(errors[userName] && touched[userName])}
                label="userName"
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
                helperText={touched[password] ? errors[password] : ""}
                error={Boolean(errors[password] && touched[password])}
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
                        onClick={setShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
            {/* <div>{errors.password}</div> */}
            {/* {pending && (
              <img
                alt="loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )} */}
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
              startIcon={pending ? <CircularProgress /> : ""}
              fullWidth
            >
              Submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
