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
import ReactGradientColorPicker from "react-gradient-color-picker";

const useStyles = makeStyles((theme) => ({
  rootGradient: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  gradientAccordionSummary: {
    borderRadius: 0,
    margin: 0,
    height: 30,
    minHeight: 30,
  },
}));

export default function Gradient() {
  const classes = useStyles();
  const theme = useTheme();

  const options = ["None", "Solid", "Gradient"];
  const [option, setOption] = React.useState("none");
  const [solidColor, setSolidColor] = React.useState(
    theme.palette.primary.main
  );
  const [gradientColorStops, setGradientColorStops] = React.useState([
    { offset: 0.0, color: theme.palette.primary.light, opacity: 1.0 },
    { offset: 0.5, color: theme.palette.primary.main, opacity: 1.0 },
    { offset: 1.0, color: theme.palette.primary.dark, opacity: 1.0 },
  ]);

  const handleFillOptionChange = (event) => {
    setOption(event.target.value);
  };
  const handleSolidColorChangeComplete = (solidColor) => {
    setSolidColor(solidColor);
  };
  const handleGradientColorStopsChange = (colorStops, colorMap) => {
    setGradientColorStops(colorStops);
  };

  const presetColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.tertiary.main,
  ];
  const renderFillOption = (option) => {
    switch (option) {
      case "none":
        return null;

      case "solid":
        return (
          <div>
            <SketchPicker
              color={solidColor}
              onChangeComplete={handleSolidColorChangeComplete}
              presetColors={presetColors}
              // onSwatchHover={(color, event) => console.log(color, event)}
            />
            {/*width increment/decrement control*/}
            {/*dashline type menu dropdown control*/}
          </div>
        );

      case "gradient":
        return (
          <div>
            <ReactGradientColorPicker
              style={{ width: "100%" }}
              stops={gradientColorStops}
              onChange={handleGradientColorStopsChange}
            />
            {/*width increment/decrement control*/}
            {/*dashline type menu dropdown control*/}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className={classes.rootGradient}>
      <Accordion>
        <AccordionSummary
          className={classes.gradientAccordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Gradient</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                      key={i}
                      value={option.toLowerCase()}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {!(option === "none") && <div>{renderFillOption(option)}</div>}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
