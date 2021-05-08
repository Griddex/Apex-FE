import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useDispatch } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import getRSStyles from "../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../Application/Utils/GetRSTheme";
import ChartCategories from "../ChartCategories/ChartCategories";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  chartSelect: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  treeViewPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export interface IChartDataPanel {
  selectLabel: string;
  selectedOption: ISelectOption;
  titleOptions: ISelectOption[];
  selectedTitle: string;
  handleSelectChange: (row: ValueType<ISelectOption, false>) => void;
  treeViewComponent: React.FC;
}

const ChartDataPanel = ({
  selectLabel,
  selectedOption,
  titleOptions,
  handleSelectChange,
  treeViewComponent: TreeViewComponent,
}: IChartDataPanel) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "existingDataWorkflows";

  const firstRender = React.useRef(true);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    event: React.ChangeEvent<any>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const SelectTitle = () => {
    const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

    return (
      <Select
        value={selectedOption}
        options={titleOptions}
        styles={RSStyles}
        onChange={handleSelectChange}
        menuPortalTarget={document.body}
        theme={(thm) => getRSTheme(thm, theme)}
      />
    );
  };

  const expandedRender = () => {
    if (firstRender.current) return true;
    else return expanded === "panel1";
  };

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <CenteredStyle flexDirection="column">
      <AnalyticsComp
        title={selectLabel}
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectTitle />
            <CallMadeOutlinedIcon />
          </div>
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
      <div style={{ width: "100%", height: "100%" }}>
        <Accordion
          expanded={expandedRender()}
          onChange={handleAccordionChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Tree View</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              // height: expanded === "panel1" ? `calc(100% - 48px)` : 48,
              overflow: "auto",
              height: expanded === "panel1" ? 650 : 48,
            }}
          >
            <TreeViewComponent />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Chart Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              // height: expanded === "panel2" ? `calc(100% - 48px)` : 48,
              height: expanded === "panel2" ? 650 : 48,
            }}
          >
            <ChartCategories />
          </AccordionDetails>
        </Accordion>
      </div>
    </CenteredStyle>
  );
};

export default ChartDataPanel;
