import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import RegisterForm from "./../../Components/Forms/RegisterForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
}));

const RegisterRoute = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignItems="center"
      wrap="nowrap"
    >
      <RegisterForm />
    </Grid>
  );
};

export default RegisterRoute;
