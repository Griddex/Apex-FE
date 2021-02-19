import {
  Box,
  Chip,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { IWorkflowBannerProps } from "./WorkflowTypes";
import CompanyLogo from "../../Images/CompanyLogo.svg";

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
    flexGrow: 1,
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

  return (
    <Container className={classes.workflowHeaderRow} fixed disableGutters>
      <div className={classes.companyLogoToolbar}>
        <img src={CompanyLogo} alt="Company logo" height={24} width={24} />
      </div>
      <Box className={classes.workflowBannerHeader}>
        <Typography variant="subtitle1">{`${subModuleName}`}</Typography>
        <span>&nbsp;</span>
        <Typography variant="subtitle1">{`${moduleName} `}</Typography>
        <Chip
          style={{
            marginLeft: 5,
            borderRadius: 4,
            minWidth: 50,
          }}
          size="small"
          label={`${activeStep + 1}/${steps.length}`}
        />
      </Box>
    </Container>
  );
};

export default WorkflowBanner;
