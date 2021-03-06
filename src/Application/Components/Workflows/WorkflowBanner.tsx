import { Box, Chip, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { IWorkflowBannerProps } from "./WorkflowTypes";

const useStyles = makeStyles(() => ({
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 50,
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBannerHeader: {
    display: "flex",
    width: "100%",
    marginLeft: 6,
  },
}));

const WorkflowBanner = ({
  activeStep,
  steps,
  subModuleName,
  showChip,
}: IWorkflowBannerProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.workflowHeaderRow}>
      <Box className={classes.workflowBannerHeader}>
        <Typography
          variant="button"
          style={{ color: theme.palette.grey[900], letterSpacing: 1.2 }}
        >{`${subModuleName}`}</Typography>
        <span>&nbsp;</span>
        <Typography>{"|"}</Typography>
        <span>&nbsp;</span>
        <Typography
          variant="subtitle1"
          style={{ color: theme.palette.grey[700], letterSpacing: 1.2 }}
        >{`${
          steps && steps[activeStep] ? steps[activeStep] : ""
        } `}</Typography>
        {showChip && (
          <Chip
            style={{
              marginLeft: 5,
              border: `1px solid ${theme.palette.primary.main}`,
              backgroundColor: theme.palette.primary.light,
              minWidth: 50,
            }}
            size="small"
            label={`${activeStep + 1} | ${steps ? steps?.length : 0}`}
          />
        )}
      </Box>
    </div>
  );
};

export default WorkflowBanner;
