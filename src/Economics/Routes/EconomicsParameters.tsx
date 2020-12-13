import {
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import React, { ChangeEvent } from "react";
import { IPersonDetail } from "../../Application/Components/Author/Author";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import MainTitle from "./../../Application/Components/Basic/MainTitle";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "flex-start",
    // justifyContent: "",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
    "& > *": { marginBottom: 40 },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  economicParameter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 5,
    width: "100%",
  },
  parameterName: { width: "20%" },
  parameterIcon: { width: "5%" },
  parameterValue: { width: "15%" },
  parameterUnit: { width: "15%", marginLeft: 5 },
  parameterRemark: { width: "45%", marginLeft: 5 },
  parameterTable: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

export type StatusTextType = "Approved" | "Pending" | "Returned" | string;
export interface IForecastDetail {
  titleName: string;
  statusText: StatusTextType;
  author: IPersonDetail;
  approvers?: IPersonDetail[] | string;
  createdOn: Date;
  modifiedOn: Date;
}
interface IEvent<T> {
  name?: string | undefined;
  value: T;
}
export interface IEconomicParameter {
  parameterName: string;
  parameterRuleAction: () => string;
  parameterValue: string | number;
  parameterUnits: Record<string, string>[];
  parameterUnitSelected: number;
  parameterRemark: string;
}

const EconomicParameter = (props: IEconomicParameter) => {
  const classes = useStyles();
  const {
    parameterName,
    parameterRuleAction,
    parameterValue,
    parameterUnitSelected,
    parameterUnits,
    parameterRemark,
  } = props;

  const [parValue, setParValue] = React.useState(parameterValue);
  const handleParameterValueChange = (event: {
    target: { value: React.SetStateAction<React.ReactText> };
  }) => {
    setParValue(event.target.value);
  };

  const [parUnitSelected, setParUnitSelected] = React.useState(
    parameterUnitSelected
  );
  const handleParameterUnitSelectedChange = (
    event: ChangeEvent<IEvent<unknown>>
  ) => {
    if (typeof event.target.value === "number")
      setParUnitSelected(event.target.value);
  };

  const [parRemark, setParRemark] = React.useState(parameterRemark);
  const handleParameterRemarkChange = (event: ChangeEvent<IEvent<unknown>>) => {
    if (typeof event.target.value === "string")
      setParRemark(event.target.value);
  };

  return (
    <div className={classes.economicParameter}>
      <Typography className={classes.parameterName}>{parameterName}</Typography>
      <LaunchOutlinedIcon
        className={classes.parameterIcon}
        onClick={() => parameterRuleAction()}
      />
      <TextField
        className={classes.parameterValue}
        label="Outlined"
        variant="outlined"
        value={parValue}
        onChange={handleParameterValueChange}
      />
      <Select
        className={classes.parameterUnit}
        value={parUnitSelected}
        onChange={handleParameterUnitSelectedChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {parameterUnits.map((unit, i) => (
          <MenuItem key={i} value={unit[i]}>
            unit[i]
          </MenuItem>
        ))}
      </Select>
      <TextField
        className={classes.parameterRemark}
        label="Outlined"
        variant="outlined"
        value={parRemark}
        onChange={handleParameterRemarkChange}
      />
    </div>
  );
};

const parameters: IEconomicParameter[] = [
  {
    parameterName: "Discounting Reference Year",
    parameterRuleAction: () => "hello",
    parameterValue: 2020,
    parameterUnits: [{ 0: "mm-dd-YYYY" }, { 1: "dd-mm-YYYY" }],
    parameterUnitSelected: 0,
    parameterRemark: "",
  },
  {
    parameterName: "First Oil Date",
    parameterRuleAction: () => "hello1",
    parameterValue: 2023,
    parameterUnits: [{ 0: "mm-dd-YYYY" }, { 1: "dd-mm-YYYY" }],
    parameterUnitSelected: 1,
    parameterRemark: "",
  },
  {
    parameterName: "First Gas Date",
    parameterRuleAction: () => "hello2",
    parameterValue: 2023,
    parameterUnits: [{ 0: "mm-dd-YYYY" }, { 1: "dd-mm-YYYY" }],
    parameterUnitSelected: 1,
    parameterRemark: "",
  },
];

const EconomicParameterTable = ({
  parameters,
}: {
  parameters: IEconomicParameter[];
}) => {
  const classes = useStyles();

  return (
    <div className={classes.parameterTable}>
      {parameters.map((row, i) => {
        return <EconomicParameter key={i} {...row} />;
      })}
    </div>
  );
};

const SelectDevelopmentScenario = () => {
  const classes = useStyles();

  const developmentScenarios = [
    "Oil Development",
    "NAG Development",
    "Oil + NAG Development",
  ];
  const [scenario, setScenario] = React.useState(developmentScenarios[0]);

  const handleDevelopmentScenarioChange = (
    event: ChangeEvent<IEvent<unknown>>
  ) => {
    if (typeof event.target.value === "string") setScenario(event.target.value);
  };

  return (
    <Select
      className={classes.formControl}
      value={scenario}
      onChange={handleDevelopmentScenarioChange}
      label="Development Scenario"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {developmentScenarios.map((scenario, i) => (
        <MenuItem key={i} value={scenario}>
          scenario
        </MenuItem>
      ))}
    </Select>
  );
};

const EconomicsData = () => {
  const [economicsData, setEconomicsData] = React.useState("template");

  const handleEconomicsDataChange = (event: ChangeEvent<IEvent<string>>) => {
    setEconomicsData(event.target.value);
  };

  return (
    <RadioGroup value={economicsData} onChange={handleEconomicsDataChange}>
      <FormControlLabel value="template" control={<Radio />} label="Template" />
      <FormControlLabel value="import" control={<Radio />} label="Import" />
      <FormControlLabel value="manual" control={<Radio />} label="Manual" />
    </RadioGroup>
  );
};

const EconomicsParameters = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <MainTitle title="Economics Parameters" />
      <AnalyticsComp
        title="Development Scenario"
        content={<SelectDevelopmentScenario />}
        direction="Horizontal"
      />
      <AnalyticsComp
        title="Economics Data Source"
        content={<EconomicsData />}
        direction="Vertical"
      />
      <div style={{ width: "100%" }}>
        <AnalyticsTitle title="Parameters" />
        <EconomicParameterTable parameters={parameters} />
      </div>
    </Container>
  );
};

export default EconomicsParameters;
