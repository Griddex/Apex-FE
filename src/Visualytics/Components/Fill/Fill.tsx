import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ChangeEvent } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { ColorPicker } from "react-color-gradient-picker";
import "react-color-gradient-picker/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { persistChartObjectAction } from "../../Redux/ChartActions/ChartActions";
import { initialColorGradient } from "../../Redux/ChartState/ChartState";
import { optionType } from "../FormatAggregators/FormatAggregatorTypes";

const useStyles = makeStyles((theme) => ({
  rootFill: {
    width: "100%",
    height: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover": { color: theme.palette.primary.main },
  },
  icon: {
    "&:hover": { color: theme.palette.primary.main },
  },
  fillAccordionSummary: {
    borderRadius: 0,
    margin: 0,
    height: 20,
    minHeight: 20,
    "&.Mui-expanded": { height: 20, minHeight: 20 },
  },
  fillAccordionDetails: { padding: 5 },
  colorPicker: { width: "91%", boxShadow: "none" },
  fillFormControlLabel: { height: 20 },
}));

export default function Fill() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const options: optionType[] = ["None", "Solid", "Gradient"];
  const [option, setOption] = React.useState<optionType>("None");
  const [solidColor, setSolidColor] = React.useState(
    theme.palette.primary.main
  );

  const { selectedChartObjId } = useSelector(
    (state: RootState) => state.chartReducer
  );

  // const [gradientColorStops, setGradientColorStops] = React.useState([
  //   { offset: 0.0, color: theme.palette.primary.light, opacity: 1.0 },
  //   { offset: 0.5, color: theme.palette.primary.main, opacity: 1.0 },
  //   { offset: 1.0, color: theme.palette.primary.dark, opacity: 1.0 },
  // ]);

  //Ability to add and store user's own preset colors

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    // theme.palette.tertiary.main,
    theme.palette.secondary.main,
  ]);

  const handleFillOptionChange = (event: ChangeEvent<any>) => {
    setOption(event.target.value);
  };

  const handleSolidColorChangeComplete = (
    solidColor: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hexColor = solidColor.hex;
    setSolidColor(hexColor);

    dispatch(
      persistChartObjectAction({
        chartObjId: selectedChartObjId,
        chartObjName: "none", //Pass obj here
        formatObj: {
          colorScheme: "solid",
          color: solidColor.hex,
        },
      })
    );

    setPresetColors((prevState) => [...prevState, hexColor]);
  };

  const reducer = (state: typeof initialColorGradient, action: IAction) => {
    switch (action.type) {
      case "UPDATE_GRADIENT":
        return { ...state, ...action.payload };

      default:
        return state;
    }
  };
  // const [gradientAttrs, setGradientAttrs] = React.useReducer(initialColorGradient);
  const [gradientAttrs, localDispatch] = React.useReducer(
    reducer,
    initialColorGradient
  );

  const handleGradientAttrsChange = (
    gradientAttrs: typeof initialColorGradient
  ) => {
    localDispatch({ type: "UPDATE_GRADIENT", payload: { gradientAttrs } });

    dispatch(
      persistChartObjectAction({
        chartObjId: selectedChartObjId,
        chartObjName: "none",
        formatObj: {
          colorScheme: "gradient",
          gradient: gradientAttrs,
        },
      })
    );
  };

  const renderFillOption = (option: optionType) => {
    switch (option) {
      case "None":
        return null;

      case "Solid":
        return (
          <SketchPicker
            className={classes.colorPicker}
            color={solidColor}
            onChangeComplete={handleSolidColorChangeComplete}
            presetColors={presetColors}
            // onSwatchHover={(color, event) => console.log(color, event)}
          />
        );

      case "Gradient":
        return (
          <div style={{ width: "190px" }}>
            <ColorPicker
              isGradient
              onStartChange={handleGradientAttrsChange}
              onChange={handleGradientAttrsChange}
              onEndChange={handleGradientAttrsChange}
              gradient={gradientAttrs}
            />
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className={classes.rootFill}>
      <Accordion square>
        <AccordionSummary
          className={classes.fillAccordionSummary}
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Fill</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.fillAccordionDetails}>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="fill-colors"
                name="fillColors"
                value={option}
                onChange={handleFillOptionChange}
              >
                {options.map((option, i) => {
                  return (
                    <FormControlLabel
                      className={classes.fillFormControlLabel}
                      key={i}
                      value={option.toLowerCase()}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {!(option === "None") && renderFillOption(option)}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
