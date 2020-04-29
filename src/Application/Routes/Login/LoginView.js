import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import history from "./../../Services/HistoryService";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import Image from "./../../Components/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
    textAlign: "center",
  },
  textfield: {
    margin: theme.spacing(1),
  },
  item: {
    height: "100%",
    marginTop: "20vh",
  },
  image: {
    marginBottom: "40px",
    height: "15vmin",
  },
  typography: {
    color: "#808080",
    margin: "20px 20px 30px 20px",
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
    width: "100px",
  },
}));

const LoginView = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className={classes.item} xs={10} sm={6} lg={4}>
        <Image
          className={classes.image}
          src={CompanyLogo}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
        <Typography className={classes.typography} variant="h5">
          Hydrocarbon Forecasting Platform
        </Typography>
        <TextField
          className={classes.textfield}
          id="input-with-icon-textfield"
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
        />
        {/*Manage form with React final form */}
        {/*Define responsive widths for form elements 80% of screen width till sm */}
        {/*fixed width for screen sizes larger than sm */}
        <form>
          <TextField
            className={classes.textfield}
            id="input-with-icon-textfield"
            label="Password"
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
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
          />
          <Button
            className={classes.button}
            variant="contained"
            primary
            size="large"
            onClick={() => history.push("/auth")}
          >
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

LoginView.propTypes = {};

export default LoginView;
