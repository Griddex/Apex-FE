import { makeStyles } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../../Components/Styles/ApexFlexContainer";
import Unauth from "../../Images/Unauth.svg";
import Image from "../../Components/Visuals/Image";

const useStyles = makeStyles((theme) => ({
  image: {
    marginBottom: "40px",
    height: 100,
  },
}));

const Unauthorized = () => {
  const classes = useStyles();

  return (
    <ApexFlexContainer flexDirection="column">
      <Image className={classes.image} src={Unauth} alt="unauthorized access" />

      <strong style={{ marginTop: 20 }}>
        {
          "This route cannot be accessed due to your current permissions level. Please contact your administrator"
        }
      </strong>
    </ApexFlexContainer>
  );
};

export default Unauthorized;
