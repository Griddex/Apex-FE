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
    height: 24,
    margin: 5,
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.primary.main}`,
    "& > *": { fontWeight: "bold" },
  },
  workflowBannerHeader: {
    display: "flex",
    width: "100%",
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
  companyLogoToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 12,
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
  const theme = useTheme();

  return (
    <Container className={classes.workflowHeaderRow} fixed disableGutters>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <hr
            style={{
              width: "50px",
              height: "2px",
              color: "gray",
              backgroundColor: "gray",
              textAlign: "left",
              marginLeft: "0px",
            }}
          />
        </div>
        <div
          style={{
            height: 14,
            width: 6,
            backgroundColor: theme.palette.primary.main,
          }}
        />
      </div> */}
      <Box className={classes.workflowBannerHeader}>
        <Typography
          variant="button"
          style={{ color: "#6D7374", letterSpacing: 2 }}
        >{`${subModuleName}`}</Typography>
        <span>&nbsp;</span>
        <Typography
          variant="button"
          style={{ color: "#6D7374", letterSpacing: 2 }}
        >{`${moduleName} `}</Typography>
        <Chip
          style={{
            marginLeft: 5,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.primary.light,
            minWidth: 50,
          }}
          size="small"
          label={`${activeStep + 1} | ${steps.length}`}
        />
      </Box>
    </Container>
  );
};

export default WorkflowBanner;
