import makeStyles from '@mui/styles/makeStyles';
import TuneIcon from "@mui/icons-material/Tune";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SettingsBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={Network} alt="Network background" height={250} width={250} /> */}
      <TuneIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default SettingsBackground;
