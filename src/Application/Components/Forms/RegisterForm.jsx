import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import { Formik } from "formik";
import { default as React, default as React } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registerAction } from "../../Redux/Actions/RegisterActions";
import userState from "../../Redux/State/UserState";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80%",
    // maxWidth: theme.breakpoints.width("sm"),
  },
  //   formTextFields: {
  //     "& > *": { marginTop: 40, "& .MuiInputBase-root": { height: 44 } },
  //   },
  divider: {
    margin: "20px",
  },
  textfield: {
    margin: theme.spacing(1),
  },
  button: {
    height: 36,
    marginTop: 20,
    marginBottom: 10,
  },
  dropZone: {
    borderStyle: "dotted",
    borderWidth: 0,
    height: "99%",
    width: "99%",
  },
  dropZoneDiv: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneInput: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  dropZoneParagraph: {
    height: "100%",
    width: "60%",
    textAlign: "center",
  },
  dropZoneImgPDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const avatarURL = useSelector((state) => state.registerReducer.avatarURL);
  const pending = useSelector((state) => state.uiSpinnerReducer.pending);

  return (
    <Formik
      initialValues={userState}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Username is required"),
        firstName: Yup.string().required("firstName is required"),
        middleName: Yup.string().required("middleName is required"),
        lastName: Yup.string().required("lastName is required"),
        email: Yup.string().required("email is required"),
        mobileNumber: Yup.string().required("mobileNumber is required"),
        role: Yup.string().required("role is required"),
        avatarURL: Yup.string(),
      })}
      onSubmit={({
        userName,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        role,
        avatarURL,
      }) => {
        dispatch(
          registerAction(
            userName,
            firstName,
            middleName,
            lastName,
            email,
            mobileNumber,
            role,
            avatarURL
          )
        );
      }}
    >
      {(props) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
          status,
        } = props;

        const registerData = [
          {
            name: "userName",
            label: "Username",
            required: true,
            autoFocus: true,
            fullWidth: true,
            halfWidth: false,
          },
          {
            name: "firstName",
            label: "firstName",
            required: true,
            autoFocus: false,
            fullWidth: true,
            halfWidth: true,
          },
          {
            name: "middleName",
            label: "middleName",
            required: false,
            autoFocus: false,
            fullWidth: true,
            halfWidth: true,
          },
          {
            name: "lastName",
            label: "lastName",
            required: true,
            autoFocus: false,
            fullWidth: true,
            halfWidth: false,
          },
          {
            name: "email",
            label: "email",
            required: true,
            autoFocus: false,
            fullWidth: true,
            halfWidth: false,
          },
          {
            name: "phoneNumber",
            label: "phoneNumber",
            required: true,
            autoFocus: false,
            fullWidth: true,
            halfWidth: false,
          },
          {
            name: "role",
            label: "role",
            required: true,
            autoFocus: false,
            fullWidth: true,
            halfWidth: false,
          },
        ];

        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <UserAvatar />
            {registerData.map((textfield) => {
              return (
                <Grid
                  item
                  container
                  className={classes.item}
                  xs={12}
                  sm={halfWidth ? 3 : 6}
                  lg={halfWidth ? 2 : 4}
                >
                  <TextField
                    name={textfield.name}
                    label={textfield.name}
                    value={values[textfield.name]}
                    onChange={handleChange}
                    required={textfield.required}
                    autoFocus={textfield.autoFocus}
                    fullWidth={textfield.fullWidth}
                    helperText={
                      touched[textfield.name] ? errors[textfield.name] : ""
                    }
                    error={Boolean(
                      errors[textfield.name] && touched[textfield.name]
                    )}
                  />
                </Grid>
              );
            })}
            {/* <div>{errors.password}</div> */}
            {/* {pending && (
              <img
                alt="loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )} */}
            <Button type="submit" variant="outlined" color="primary">
              Select
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
