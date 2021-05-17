import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import React from "react";
import "react-color-gradient-picker/dist/index.css";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import ApexSketchPicker from "../../../Visualytics/Components/ColorPickers/ApexSketchPicker";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";

const useStyles = makeStyles((theme) => ({
  compSpacing: {
    "& > *": { marginLeft: 5 },
  },
}));

export interface IMapStyleFormatters {
  mapData: any;
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"];
}

const MapStyleFormatters = ({
  mapData,
  workflowProcess,
}: IMapStyleFormatters) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const wp = workflowProcess;

  const [solidThresholdColor, setSolidThresholdColor] = React.useState(
    theme.palette.primary.main
  );

  const [presetThresholdColors, setPresetThresholdColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [solidBackgroundColor, setSolidBackgroundColor] =
    React.useState("#F8F9FA");

  const [presetBackgroundColors, setPresetBackgroundColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const operators = [">", ">=", "<", "=<", "=="];
  const opOptions = generateSelectOptions(operators);
  const [operatorOption, setOperatorOption] = React.useState(opOptions[0]);
  const [thresholdValue, setThresholdValue] = React.useState(0);
  const [showThresholdPicker, setShowThresholdPicker] = React.useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = React.useState(false);
  const [updateMap, setUpdateMap] = React.useState(false);

  React.useEffect(() => {
    if (!mapData) return;
    if (Array.isArray(mapData)) {
      dispatch(
        updateEconomicsParameterAction(
          `sensitivitiesHeatMapDataDisplayed`,
          mapData
        )
      );
    } else {
      const mapDataKeys = Object.keys(mapData);

      dispatch(
        updateEconomicsParameterAction(
          `sensitivitiesHeatMapDataDisplayed`,
          //TODO Dynamic Z value here instead of 0
          mapData[mapDataKeys[0]]
        )
      );

      dispatch(
        updateEconomicsParameterAction(`heatMapStylingData`, {
          heatMapThresholdValue: thresholdValue,
          heatMapThresholdColor: solidThresholdColor,
          heatMapBackgroundColor: solidBackgroundColor,
          relationalOperator: operatorOption,
        })
      );
    }
  }, [updateMap]);

  return (
    <CenteredStyle flexDirection="column" alignItems="space-evenly">
      <CenteredStyle
        height={430}
        flexDirection="column"
        justifyContent="flex-start"
        className={classes.compSpacing}
      >
        <Typography
          style={{
            width: "100%",
            color: theme.palette.primary.dark,
            // fontWeight: "bold",
          }}
        >
          {"Threshold Format"}
        </Typography>
        <CenteredStyle height={40} justifyContent="space-between">
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
            style={{ width: "100%", marginLeft: 10 }}
            value={thresholdValue}
            onChange={(event: React.ChangeEvent<any>) =>
              setThresholdValue(event.target.value)
            }
            required
            autoFocus
            fullWidth
          />
        </CenteredStyle>
        <CenteredStyle
          justifyContent="space-between"
          height={50}
          moreStyles={{ marginTop: 10 }}
        >
          <FormatColorFillIcon
            onClick={() => setShowThresholdPicker(!showThresholdPicker)}
            color="primary"
            style={{ border: `1px solid ${theme.palette.grey[400]}` }}
          />
          <Box
            style={{
              width: "100%",
              marginLeft: 10,
              height: 36,
              backgroundColor: solidThresholdColor,
              border: `1px solid ${theme.palette.grey[400]}`,
            }}
          />
          <Button
            onClick={() => setUpdateMap(!updateMap)}
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginLeft: 20 }}
          >
            Apply
          </Button>
        </CenteredStyle>
        {showThresholdPicker && (
          <ApexSketchPicker
            oneButtonAction={() => {}}
            solidColor={solidThresholdColor}
            setSolidColor={setSolidThresholdColor}
            presetColors={presetThresholdColors}
            setPresetColors={setPresetThresholdColors}
            showButtons={false}
          />
        )}
      </CenteredStyle>
      <CenteredStyle
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
            // fontWeight: "bold",
          }}
        >
          {"Background Color"}
        </Typography>
        <CenteredStyle justifyContent="space-between" height={40}>
          <FormatColorFillIcon
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
            color="primary"
          />
          <Box
            style={{
              width: "100%",
              marginLeft: 10,
              height: 36,
              backgroundColor: solidBackgroundColor,
              border: `1px solid ${theme.palette.grey[400]}`,
            }}
          />
          <Button
            onClick={() => setUpdateMap(!updateMap)}
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginLeft: 20 }}
          >
            Apply
          </Button>
        </CenteredStyle>
        {showBackgroundPicker && (
          <ApexSketchPicker
            oneButtonAction={() => {}}
            solidColor={solidBackgroundColor}
            setSolidColor={setSolidBackgroundColor}
            presetColors={presetBackgroundColors}
            setPresetColors={setPresetBackgroundColors}
            showButtons={false}
          />
        )}
      </CenteredStyle>
    </CenteredStyle>
  );
};

export default MapStyleFormatters;
