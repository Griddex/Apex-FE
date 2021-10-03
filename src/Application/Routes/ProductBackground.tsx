import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import ApexLogoFull from "../Images/ApexLogoFull.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ProductBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={ApexLogoFull}
        alt="Product background"
        height={250}
        width={250}
      />
    </div>
  );
};

export default ProductBackground;
