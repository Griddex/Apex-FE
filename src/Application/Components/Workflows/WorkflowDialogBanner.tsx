import {
  Box,
  Chip,
  Container,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { IWorkflowBannerProps } from "./WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBannerHeader: {
    display: "flex",
    // width: "100%",
    marginLeft: 6,
  },
}));

const WorkflowDialogBanner = ({
  activeStep,
  steps,
}: Partial<IWorkflowBannerProps>) => {
  const classes = useStyles();
  const theme = useTheme();

  const stepsDefined = steps as string[];
  const activeStepDefined = activeStep as number;

  return (
    <Container className={classes.workflowHeaderRow} fixed disableGutters>
      <Box className={classes.workflowBannerHeader}>
        <Typography
          variant="subtitle1"
          style={{ color: theme.palette.grey[700], letterSpacing: 1.2 }}
        >{`${stepsDefined[activeStepDefined as number]}`}</Typography>
        <span>&nbsp;</span>
        <Chip
          style={{
            marginLeft: 5,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.primary.light,
            minWidth: 50,
          }}
          size="small"
          label={`${activeStepDefined + 1} | ${stepsDefined.length}`}
        />
      </Box>
    </Container>
  );
};

export default WorkflowDialogBanner;
