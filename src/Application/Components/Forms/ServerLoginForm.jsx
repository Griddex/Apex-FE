import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { serverLoginRequestAction } from "./../../../Import/Redux/Actions/DatabaseServerActions";
import databaseServerState from "./../../../Import/Redux/State/DatabaseServerState";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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

const SelectItem = ({ handleChange, authenticationType, itemData }) => {
  return (
    <TextField
      // className={classes.selectWorksheet}
      id="outlined-select-worksheet"
      select
      label=""
      value={authenticationType}
      onChange={handleChange}
      variant="outlined"
    >
      {itemData.map((authType) => (
        <MenuItem key={authType} value={authType}>
          {authType}
        </MenuItem>
      ))}
    </TextField>
  );
};

const ServerLoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const authenticationTypeList = [
    "Server Authentication",
    "Windows Authentication",
  ];
  // const [authenticationType, setAuthenticationType] = useState(
  //   authenticationTypeList[0]
  // );
  // const handleSelectChange = (event) => {
  //   const authType = event.target.value;
  //   setAuthenticationType(authType);
  // };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (event) => {
    event.persist();
    setCheckboxSelected(!checkboxSelected);
  };

  const successDialogPayload = {
    dialogType: "textDialog",
    dialogProps: {
      name: "Connect_Database_Success_Dialog",
      title: "Save Operation Success",
      show: true,
      exclusive: true,
      maxwidth: "xs",
      icon: () => <CheckCircleIcon />,
      iconClass: "success",
      iconColor: theme.palette.primary.main,
      dialogText: "Database connection successful",
    },
  };

  const failureDialogPayload = {
    dialogType: "textDialog",
    dialogProps: {
      name: "Connect_Database_Failure_Dialog",
      title: "Save Operation Failure",
      show: true,
      exclusive: true,
      maxwidth: "xs",
      icon: () => <WarningIcon />,
      iconClass: "error",
      iconColor: theme.palette.secondary.main,
      dialogText: "Database connection failure",
    },
  };

  return (
    <Formik
      initialValues={databaseServerState}
      validationSchema={Yup.object().shape({
        authenticationType: Yup.string().required(
          "AuthenticationType is required"
        ),
        userName: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={({ authenticationType, userName, password }) => {
        //write saga for async
        dispatch(
          serverLoginRequestAction(
            authenticationType,
            userName,
            password,
            successDialogPayload,
            failureDialogPayload
          )
        );
      }}
    >
      {(props) => {
        const {
          values: { authenticationType, userName, password },
          errors,
          touched,
          handleChange,
          isValid,
          handleSubmit,
        } = props;

        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid
              className={classes.grid}
              container
              direction="column"
              wrap="nowrap"
              justify="space-evenly"
            >
              <Grid item container xs={8}>
                <AnalyticsComp
                  title="Server Login"
                  content={
                    <SelectItem
                      handleChange={handleChange}
                      authenticationType={authenticationType}
                      itemData={authenticationTypeList}
                    />
                  }
                />
              </Grid>
              <Grid item xs={8} container alignItems="center">
                <TextField
                  name="userName"
                  helperText={touched[userName] ? errors[userName] : ""}
                  error={Boolean(errors[userName] && touched[userName])}
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
              </Grid>
              <Grid item xs={8} container alignItems="center">
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
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      onClick={handleCheckboxChange}
                      checked={checkboxSelected}
                      color="primary"
                    />
                  }
                  label="Remember Password"
                />
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="center">
                <Button
                  type="submit"
                  className={classes.connectButton}
                  startIcon={<StorageOutlinedIcon />}
                  disabled={!isValid}
                >
                  Connect
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default ServerLoginForm;
