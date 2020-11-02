import { makeStyles } from "@material-ui/core";
import React from "react";
import CompanyLogo from "../Images/CompanyLogo.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
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
        src={CompanyLogo}
        alt="Product background"
        height={250}
        width={250}
      />
    </div>
  );
};

export default ProductBackground;
