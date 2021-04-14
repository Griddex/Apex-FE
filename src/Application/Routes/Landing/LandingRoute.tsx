import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Image from "../../Components/Visuals/Image";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import ApexLogo from "../../Images/ApexLogo.svg";
import history from "../../Services/HistoryService";

//Please change font type!!!
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
    height: 120,
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
        <Image
          className={classes.image}
          src={CompanyLogo}
          alt="Apex Hydrocarbon Forecasting Platform Logo"
        />
        {/* <Typography variant="h5">Hydrocarbon Forecasting Platform</Typography> */}
        <Typography className={classes.typography} variant="h6">
          Integrated technology for business growth...
        </Typography>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.apex}>
        <Image
          className={classes.image}
          src={ApexLogo}
          alt="Apex Hydrocarbon Forecasting Platform Logo"
        />
        <Typography variant="h5">
          Apex Hydrocarbon Forecasting Platform
        </Typography>
        <Typography className={classes.typography} variant="h6">
          Our platform delivers the best hydrocarbon business forecasting
          services globally!
        </Typography>
        <Divider className={classes.divider} />

        <Button
          className={classes.button}
          variant="contained"
          color="default"
          onClick={() => history.push("/login")}
        >
          Proceed
        </Button>
      </div>
      <div className={classes.footer}>Footer</div>
    </div>
  );
};

export default LandingRoute;
