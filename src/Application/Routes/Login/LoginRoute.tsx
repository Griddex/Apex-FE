import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { LoginForm } from "../../Components/Forms/LoginForm";
import ApexFlexContainer from "../../Components/Styles/ApexFlexContainer";
import Image from "../../Components/Visuals/Image";
import ApexLogoFull from "../../Images/ApexLogoFull.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
    textAlign: "center",
  },
  image: {
    marginBottom: 40,
    height: 100,
  },
  typography: {
    color: theme.palette.grey["700"],
    margin: "20px 20px 30px 20px",
  },
}));

const LoginRoute = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ApexFlexContainer>
      <div
        className={classes.root}
        style={{
          minWidth: 500,
          width: "70%",
          maxWidth: theme.breakpoints.values["sm"],
          height: "auto",
        }}
      >
        <Image
          className={classes.image}
          src={ApexLogoFull}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
        <Typography className={classes.typography} variant="h6">
          - Versatile Hydrocarbon Forecasting and Economics Evaluation Platform
        </Typography>
        <LoginForm />
      </div>
    </ApexFlexContainer>
  );
};

export default LoginRoute;
