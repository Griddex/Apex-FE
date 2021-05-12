import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import { ColorResult, SketchPicker } from "react-color";
import { ColorPicker } from "react-color-gradient-picker";
import "react-color-gradient-picker/dist/index.css";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { forecastCaseOptions } from "../../Data/EconomicsData";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import { ValueType } from "react-select";

const useStyles = makeStyles((theme) => ({
  compSpacing: {
    "& > *": { marginLeft: 5 },
  },
}));
const MapStyleFormatters = () => {
  const classes = useStyles();

  const operators = [">", ">=", "<", "=<", "=="];
  const opOptions = generateSelectOptions(operators);
  const [operatorOption, setOperatorOption] = React.useState(opOptions[0]);
  const [thresholdValue, setThresholdValue] = React.useState(0);

  return (
    <CenteredStyle height={40} width={"60%"} justifyContent="space-evenly">
      <CenteredStyle width={200} className={classes.compSpacing}>
        <Typography>{"Background"}</Typography>
        <Button type="submit" variant="outlined" color="primary">
          Color
        </Button>
      </CenteredStyle>
      <CenteredStyle width={300} className={classes.compSpacing}>
        <Typography>{"Threshold"}</Typography>
        <ApexSelectRS
          valueOption={operatorOption}
          data={opOptions}
          handleSelect={(option: ValueType<ISelectOption, false>) => {
            setOperatorOption(option as ISelectOption);
          }}
          menuPortalTarget={document.body}
          isSelectOptionType={true}
        />
        <TextField
          name="thresholdValue"
          variant="outlined"
          style={{ width: "100%" }}
          value={thresholdValue}
          onChange={(event: React.ChangeEvent<any>) =>
            setThresholdValue(event.target.value)
          }
          required
          autoFocus
          fullWidth
        />
        <Button type="submit" variant="outlined" color="primary">
          Color
        </Button>
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default MapStyleFormatters;
