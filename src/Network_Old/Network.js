import React from "react";
import Pipeline from "./Images/Pipeline.svg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Network = () => {
  return (
    <Grid container direction="column" justify="space-evenly">
      <Grid item container>
        <Typography>Production Network</Typography>
      </Grid>
      <Grid item container>
        <img src={Pipeline} height="30vmin" width="30vmin" alt="Pipeline" />
      </Grid>
    </Grid>
  );
};

export default Network;
