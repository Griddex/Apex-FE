import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IWorkflowBannerProps } from "./WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5%",
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBanner: {
    display: "flex",
    justifyContent: "center",
    width: 54,
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    // borderRadius: theme.spacing(0),
    // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    "& > *": { fontWeight: "bold" },
  },
  workflowBannerHeader: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
}));

const WorkflowBanner = ({
  activeStep,
  steps,
  moduleName,
  subModuleName,
  workflowName,
}: IWorkflowBannerProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.workflowHeaderRow} fixed disableGutters>
      <Box className={classes.workflowBanner}>
        <Typography variant="subtitle1">{`${activeStep + 1}/${
          steps.length
        }`}</Typography>
      </Box>
      <Box className={classes.workflowBannerHeader}>
        <Typography variant="subtitle1">{`${moduleName} `}</Typography>
        <Typography variant="subtitle1">{` | ${subModuleName}`}</Typography>
        <Typography variant="subtitle1" color="primary">
          {` | ${workflowName}`}
        </Typography>
      </Box>
    </Container>
  );
};

export default WorkflowBanner;
