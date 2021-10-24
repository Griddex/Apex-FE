import { Button, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useHistory } from "react-router-dom";
import Image from "../../Components/Visuals/Image";
import ApexLogoFull from "../../Images/ApexLogoFull.svg";
import SyncwareLogoWithName from "../../Images/SyncwareLogoWithName.svg";

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
  },
  company: {
    gridArea: "company",
    height: 300,
  },
  apex: {
    gridArea: "apex",
    height: 300,
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
    backgroundColor: theme.palette.grey["100"],
  },
}));

const LandingRoute = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.header}>Header</div>
      <div className={classes.company}>
        <Image height={50} src={SyncwareLogoWithName} alt="Syncware Logo" />
        <Typography className={classes.typography} variant="h6">
          ...inspired technologies for business growth
        </Typography>
      </div>
      <div className={classes.apex}>
        <Image height={150} src={ApexLogoFull} alt="Apex Logo" />
        <Typography className={classes.typography} variant="h6">
          {
            "-Syncware's flagship Hydrocarbon Forecasting and Economics Platform"
          }
        </Typography>
      </div>
      <div className={classes.footer}>
        <hr style={{ margin: 0 }} />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => history.push("/login")}
        >
          Proceed
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LandingRoute;
