import { makeStyles } from "@material-ui/core";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AdministrationBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={Network} alt="Network background" height={250} width={250} /> */}
      <SupervisorAccountOutlinedIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default AdministrationBackground;
