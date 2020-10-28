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
import React from "react";
import { SketchPicker } from "react-color";
import { ColorPicker } from "react-color-gradient-picker";
import "react-color-gradient-picker/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { updateChartElementObjectAction } from "./../Redux/ChartActions/ChartActions";

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

  const options = ["None", "Solid", "Gradient"];
  const [option, setOption] = React.useState("none");
  const [solidColor, setSolidColor] = React.useState(
    theme.palette.primary.main
  );

  const selectedChartElementId = useSelector(
    (state) => state.chartReducer.selectedChartElementId
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

  const handleFillOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleSolidColorChangeComplete = (solidColor) => {
    setSolidColor(solidColor.hex);

    dispatch(
      updateChartElementObjectAction({
        id: selectedChartElementId.id,
        colorScheme: "solid",
        color: solidColor.hex,
        gradient: null,
      })
    );
    // setPresetColors((prevState) => [...prevState, solidColor]);
  };

  const [gradientAttrs, setGradientAttrs] = React.useState({
    points: [
      {
        left: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
      },
      {
        left: 100,
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
      },
    ],
    degree: 0,
    type: "linear",
  });

  const handleGradientAttrsChange = (gradientAttrs) => {
    setGradientAttrs(gradientAttrs);

    dispatch(
      updateChartElementObjectAction({
        id: selectedChartElementId.id,
        colorScheme: "gradient",
        gradient: gradientAttrs,
        color: null,
      })
    );
  };

  const renderFillOption = (option) => {
    switch (option) {
      case "none":
        return null;

      case "solid":
        return (
          <SketchPicker
            className={classes.colorPicker}
            color={solidColor}
            onChangeComplete={handleSolidColorChangeComplete}
            presetColors={presetColors}
            // onSwatchHover={(color, event) => console.log(color, event)}
          />
        );

      case "gradient":
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
            {!(option === "none") && renderFillOption(option)}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
