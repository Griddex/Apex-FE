import makeStyles from "@mui/styles/makeStyles";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const EconomicsBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LocalAtmOutlinedIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default EconomicsBackground;
