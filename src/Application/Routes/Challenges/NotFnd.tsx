import { makeStyles } from "@material-ui/core";
import React from "react";
import ApexFlexContainer from "../../Components/Styles/ApexFlexContainer";
import NotFnd from "../../Images/NotFnd.svg";
import Image from "../../Components/Visuals/Image";

const useStyles = makeStyles((theme) => ({
  image: {
    marginBottom: "40px",
    height: 100,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <ApexFlexContainer flexDirection="column">
      <Image className={classes.image} src={NotFnd} alt="not found" />

      <strong style={{ marginTop: 20 }}>
        {"This route is invalid and cannot be found"}
      </strong>
    </ApexFlexContainer>
  );
};

export default NotFound;
