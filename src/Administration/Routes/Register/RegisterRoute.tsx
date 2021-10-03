import { Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
