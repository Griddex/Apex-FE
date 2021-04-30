import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Image from "../../Components/Visuals/Image";
import SyncwareLogoWithName from "../../Images/SyncwareLogoWithName.svg";
import ApexLogoFull from "../../Images/ApexLogoFull.svg";
import history from "../../Services/HistoryService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateAreas: `'header header header header header header'
    'company company company apex apex apex'
    'footer footer footer footer footer footer'`,
    rowGap: 10,
    columnGap: 10,
    height: "100%",
    textAlign: "center",
  },
  header: {
    gridArea: "header",
    height: "100%",
    // marginTop: "20vh",
  },
  company: {
    gridArea: "company",
    height: "100%",
    padding: 40,
  },
  apex: {
    gridArea: "apex",
    height: "100%",
    padding: 40,
  },
  image: {
    marginBottom: "40px",
    height: "20vmin",
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
    color: theme.palette.grey[900],
    fontWeight: "bold",
    margin: "20px",
    width: 250,
    height: 50,
  },
  footer: {
    gridArea: "footer",
    height: "100%",
    // marginTop: "20vh",
  },
}));

const LandingRoute = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>Header</div>
      <div className={classes.company}>
        <div>
          <Image
            src={SyncwareLogoWithName}
            alt="Apex Hydrocarbon Forecasting Platform Logo"
          />
          <Typography className={classes.typography} variant="h6">
            ...Integrated technology for business growth
          </Typography>
        </div>
      </div>
      <div className={classes.apex}>
        <Image
          className={classes.image}
          src={ApexLogoFull}
          alt="Apex Hydrocarbon Forecasting Platform Logo"
        />
        <Typography className={classes.typography} variant="h6">
          {
            "-Syncware's flagship Hydrocarbon Forecasting and Economics Platform"
          }
        </Typography>
      </div>
      <div className={classes.footer}>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          onClick={() => history.push("/login")}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default LandingRoute;
