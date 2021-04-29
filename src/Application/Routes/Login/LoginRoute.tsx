import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { LoginForm } from "../../Components/Forms/LoginForm";
import ApexLogoFull from "../../Images/ApexLogoFull.svg";
import Image from "../../Components/Visuals/Image";

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
    textAlign: "center",
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
    width: 500,
  },
}));

const LoginRoute = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.item} xs={10} sm={6} lg={4}>
        <Image
          className={classes.image}
          src={ApexLogoFull}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
        <Typography className={classes.typography} variant="h5">
          - Robust Hydrocarbon Forecasting and Economics Evaluation Platform
        </Typography>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginRoute;
