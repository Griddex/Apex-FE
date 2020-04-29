import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Divider, ButtonGroup, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: flex,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 1,
    margin: "20px",
    padding: 0,
  },
  importBox: {
    display: flex,
    flexGrow: 1,
    padding: "20px 20px 100px 20px",
  },
  fileSummaryBox: {
    display: flex,
    flexGrow: 4,
    padding: "20px 20px 100px 20px",
  },
  divider: {
    flexGrow: 8,
    padding: 0,
  },
  buttonGroupBox: {
    display: flex,
    flexGrow: 6,
    justifyContent: "flex-end",
    padding: "20px 0px 20px 20px",
  },
}));

const ImportFaciltiesDeck = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box className={classes.importBox}></Box>
      <Box className={classes.fileSummaryBox}></Box>
      <Divider className={classes.divider} />
      <Box className={classes.buttonGroupBox}>
        <ButtonGroup>
          <Button startIcon={<ArrowBackIosIcon />}>
            <Typography variant="subtitle2">Back</Typography>
          </Button>
          <Button endIcon={<ArrowForwardIosIcon />}>
            <Typography variant="subtitle2">Next</Typography>
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

ImportFaciltiesDeck.propTypes = {};

export default ImportFaciltiesDeck;
