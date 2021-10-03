import makeStyles from '@mui/styles/makeStyles';
import TimelineIcon from "@mui/icons-material/Timeline";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const DeclineCurveAnalysisBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={Network} alt="Network background" height={250} width={250} /> */}
      <TimelineIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default DeclineCurveAnalysisBackground;
