import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SingleRegisterForm from "../../Components/Forms/SingleRegisterForm";

const useStyles = makeStyles(() => ({
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
      justifyContent="center"
      alignItems="center"
      wrap="nowrap"
    >
      <SingleRegisterForm />
    </Grid>
  );
};

export default RegisterRoute;
