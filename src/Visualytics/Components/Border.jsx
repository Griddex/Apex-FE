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
    height: 20,
    minHeight: 20,
    "&.Mui-expanded": { height: 20, minHeight: 20 },
  },
  gradientFormControlLabel: { height: 20 },
}));

export default function Border() {
  const classes = useStyles();
  const theme = useTheme();

  const options = ["None", "Solid", "Gradient"];
  const [option, setOption] = React.useState("none");
  const [solidColor, setSolidColor] = React.useState(
    theme.palette.primary.main
  );
  // const [gradientColorStops, setGradientColorStops] = React.useState([
  //   { offset: 0.0, color: theme.palette.primary.light, opacity: 1.0 },
  //   { offset: 0.5, color: theme.palette.primary.main, opacity: 1.0 },
  //   { offset: 1.0, color: theme.palette.primary.dark, opacity: 1.0 },
  // ]);

  const handleFillOptionChange = (event) => {
    setOption(event.target.value);
  };
  const handleSolidColorChangeComplete = (solidColor) => {
    setSolidColor(solidColor);
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
          <SketchPicker
            color={solidColor}
            onChangeComplete={handleSolidColorChangeComplete}
            presetColors={presetColors}
            // onSwatchHover={(color, event) => console.log(color, event)}
          />
        );

      case "gradient":
        return (
          <ColorPicker
            isGradient
            onStartChange={handleGradientAttrsChange}
            onChange={handleGradientAttrsChange}
            onEndChange={handleGradientAttrsChange}
            gradient={gradientAttrs}
          />
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
          <Typography className={classes.heading}>Border</Typography>
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
                      className={classes.gradientFormControlLabel}
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
