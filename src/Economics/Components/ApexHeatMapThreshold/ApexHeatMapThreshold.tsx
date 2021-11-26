import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { Button, Input, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import ApexPickerExtruder from "../../../Visualytics/Components/ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../../../Visualytics/Components/ColorPickers/ApexSketchPicker";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";

const useStyles = makeStyles(() => ({
  compSpacing: {
    "& > *": { marginLeft: 5 },
  },
}));

export type THeatMapThreshold =
  | "sensitivitiesHeatMapThresholdData"
  | "plotChartsHeatMapThresholdData";
export interface IApexHeatMapThreshold {
  currentThresholdTitle: THeatMapThreshold;
}

const ApexHeatMapThreshold = ({
  currentThresholdTitle,
}: IApexHeatMapThreshold) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const mapRef = React.useRef<HTMLDivElement>(null);

  const [solidThresholdColor, setSolidThresholdColor] = React.useState(
    theme.palette.primary.light
  );

  const [presetThresholdColors, setPresetThresholdColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [solidBackgroundColor, setSolidBackgroundColor] = React.useState(
    theme.palette.grey["200"]
  );

  const [presetBackgroundColors, setPresetBackgroundColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const operators = [">", ">=", "<", "=<", "=="];
  const opOptions = generateSelectOptions(operators);
  const [operatorOption, setOperatorOption] = React.useState<ISelectOption>(
    opOptions[0]
  );
  const [thresholdValue, setThresholdValue] = React.useState(0);
  const [showThresholdPicker, setShowThresholdPicker] = React.useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = React.useState(false);
  const [willUpdateMap, setWillUpdateMap] = React.useState(false);

  React.useEffect(() => {
    dispatch(
      updateEconomicsParameterAction(currentThresholdTitle, {
        heatMapThresholdValue: thresholdValue,
        heatMapThresholdColor: solidThresholdColor,
        heatMapBackgroundColor: solidBackgroundColor,
        relationalOperatorOption: operatorOption,
      })
    );
  }, [willUpdateMap]);

  return (
    <ApexFlexContainer flexDirection="column" alignItems="space-evenly">
      <ApexFlexContainer
        height={430}
        flexDirection="column"
        justifyContent="flex-start"
        className={classes.compSpacing}
      >
        <Typography
          style={{
            width: "100%",
            color: theme.palette.primary.dark,
          }}
        >
          {"Threshold Format"}
        </Typography>
        <ApexFlexContainer height={40} justifyContent="space-between">
          <ApexSelectRS
            valueOption={operatorOption}
            data={opOptions}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
              setOperatorOption(option as ISelectOption);
            }}
            menuPortalTarget={mapRef.current as HTMLDivElement}
            isSelectOptionType={true}
            containerHeight={40}
          />
          <Input
            name="thresholdValue"
            style={{ width: "100%", marginLeft: 10 }}
            value={thresholdValue}
            onChange={(event: React.ChangeEvent<any>) =>
              setThresholdValue(event.target.value)
            }
            required
            autoFocus
            fullWidth
          />
        </ApexFlexContainer>
        <ApexFlexContainer
          justifyContent="space-between"
          height={50}
          moreStyles={{ marginTop: 10 }}
        >
          <ApexPickerExtruder
            color={solidThresholdColor}
            showPicker={showThresholdPicker}
            setShowPicker={setShowThresholdPicker}
          />

          <Button
            onClick={() => setWillUpdateMap(!willUpdateMap)}
            type="submit"
            variant="outlined"
            color="primary"
            startIcon={<FormatColorFillIcon />}
            fullWidth
            style={{ marginLeft: 20 }}
          >
            Apply
          </Button>
        </ApexFlexContainer>
        {showThresholdPicker && (
          <ApexSketchPicker
            solidColor={solidThresholdColor}
            setSolidColor={setSolidThresholdColor}
            presetColors={presetThresholdColors}
            setPresetColors={setPresetThresholdColors}
            showButtons={false}
          />
        )}
      </ApexFlexContainer>
      <ApexFlexContainer
        height={350}
        flexDirection="column"
        justifyContent="flex-start"
        className={classes.compSpacing}
        moreStyles={{ borderTop: `1px solid ${theme.palette.grey[400]}` }}
      >
        <Typography
          style={{
            width: "100%",
            color: theme.palette.primary.dark,
          }}
        >
          {"Background Color"}
        </Typography>
        <ApexFlexContainer justifyContent="space-between" height={40}>
          <ApexPickerExtruder
            color={solidBackgroundColor}
            showPicker={showBackgroundPicker}
            setShowPicker={setShowBackgroundPicker}
          />

          <Button
            onClick={() => setWillUpdateMap(!willUpdateMap)}
            type="submit"
            variant="outlined"
            color="primary"
            startIcon={<FormatColorFillIcon />}
            fullWidth
            style={{ marginLeft: 20 }}
          >
            Apply
          </Button>
        </ApexFlexContainer>
        {showBackgroundPicker && (
          <ApexSketchPicker
            solidColor={solidBackgroundColor}
            setSolidColor={setSolidBackgroundColor}
            presetColors={presetBackgroundColors}
            setPresetColors={setPresetBackgroundColors}
            showButtons={false}
          />
        )}
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default ApexHeatMapThreshold;
