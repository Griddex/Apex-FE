import { makeStyles } from "@material-ui/core";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CorporateBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={Network} alt="Network background" height={250} width={250} /> */}
      <BusinessOutlinedIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default CorporateBackground;
