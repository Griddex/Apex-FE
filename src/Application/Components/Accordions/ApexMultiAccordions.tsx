import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ApexFlexStyle from "../Styles/ApexFlexStyle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export interface IApexMultiAccordion {
  name: string;
  title: string;
  content: JSX.Element;
}

export type TApexMultiAccordions = IApexMultiAccordion[];

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function ApexMultiAccordions({
  apexMultiAccordionsData,
}: {
  apexMultiAccordionsData: TApexMultiAccordions;
}) {
  const [expanded, setExpanded] = React.useState<string | false>(
    apexMultiAccordionsData[0].name
  );

  const handleChange =
    (panel: string) =>
    (event: React.ChangeEvent<any>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <ApexFlexStyle flexDirection="column" moreStyles={{ width: "100%" }}>
      {apexMultiAccordionsData &&
        apexMultiAccordionsData.map((obj, i) => {
          const { name, title, content } = obj;

          return (
            <Accordion
              key={i}
              square
              expanded={expanded === name}
              onChange={handleChange(name)}
              style={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${name}-content`}
                id={`${name}-header`}
              >
                <Typography>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>{content}</AccordionDetails>
            </Accordion>
          );
        })}
    </ApexFlexStyle>
  );
}
