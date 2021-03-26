import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Image from "../../Components/Visuals/Image";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import history from "../../Services/HistoryService";

//Please change font type!!!
const useStyles = makeStyles((theme) => ({
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
    height: "30vmin",
  },
  typography: {
    color: "#808080",
    margin: "20px",
  },
  divider: {
    margin: "20px",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    background: theme.palette.primary.main,
    margin: "20px",
    width: 250,
    height: 50,
  },
  buttonReg: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    background: theme.palette.primary.main,
    margin: "20px",
    width: 250,
    height: 50,
  },
}));

const LandingRoute = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.item} xs={12} sm={6}>
        <Image
          className={classes.image}
          src={CompanyLogo}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
        <Typography variant="h5">Hydrocarbon Forecasting Platform</Typography>
        <Typography className={classes.typography} variant="h6">
          Our platform delivers the best hydrocarbon business forecasting
          services globally!
        </Typography>
        <Divider className={classes.divider} />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Proceed
        </Button>
        <Button
          className={classes.buttonReg}
          variant="contained"
          color="primary"
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingRoute;
