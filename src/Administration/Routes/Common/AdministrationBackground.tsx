import makeStyles from '@mui/styles/makeStyles';
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
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
