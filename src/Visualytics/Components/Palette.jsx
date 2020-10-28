import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useDispatch } from "react-redux";
import getPredefinedPalettes from "../Utils/PredefinedPalettes";
import { setChartCellColorsAction } from "./../Redux/ChartActions/ChartActions";
import generateRandomColors from "./../Utils/GenerateRandomColors";

const useStyles = makeStyles((theme) => ({
  rootPalette: {
    width: "100%",
    height: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.main,
  },
  paletteAccordionSummary: {
    borderRadius: 0,
    margin: 0,
    height: 20,
    minHeight: 20,
    "&.Mui-expanded": { height: 20, minHeight: 20 },
  },
  paletteAccordionDetails: { padding: 5 },
  colorPicker: { width: "91%", boxShadow: "none" },
  paletteRidge: { display: "flex", width: 200, height: 20, cursor: "pointer" },
  predefinedPalette: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "auto",
    "& > *": { marginTop: 5 },
  },
  paletteFormControlLabel: { height: 20 },
}));

export default function Palette() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const options = ["None", "Predefined", "User"];
  const [option, setOption] = React.useState("none");

  const handlePaletteOptionChange = (event) => {
    setOption(event.target.value);
  };
  //Ability to add and store user's own preset colors
  const palettes = getPredefinedPalettes();
  const [newColors, setNewColors] = React.useState([]);

  const handlePaletteChange = (palette) => {
    dispatch(setChartCellColorsAction(palette));
  };

  const handleNewPaletteClick = () => {
    const colors = generateRandomColors({ count: 100 }); //Store no of series in redux and use here
    setNewColors(colors);
  };

  const PaletteRidge = ({ colors, handleClick }) => {
    return (
      <div className={classes.paletteRidge} onClick={handleClick}>
        {colors.slice(0, 11).map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color, height: 20, width: 20 }}
          ></div>
        ))}
      </div>
    );
  };

  const renderPaletteOption = (option) => {
    switch (option) {
      case "none":
        return null;

      case "predefined":
        return (
          <div className={classes.predefinedPalette}>
            {palettes.map((palette, i) => (
              <PaletteRidge
                key={i}
                colors={palette}
                handleClick={() => handlePaletteChange(palette)}
              />
            ))}
          </div>
        );

      case "user":
        return (
          <div>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              style={{ height: "30px", marginBottom: "5px" }}
              onClick={handleNewPaletteClick}
            >
              Generate
            </Button>
            {newColors && (
              <PaletteRidge
                colors={newColors}
                handleClick={() => handlePaletteChange(newColors)}
              />
            )}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className={classes.rootPalette}>
      <Accordion square>
        <AccordionSummary
          className={classes.paletteAccordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Palettes</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.paletteAccordionDetails}>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="fill-colors"
                name="fillColors"
                value={option}
                onChange={handlePaletteOptionChange}
              >
                {options.map((option, i) => {
                  return (
                    <FormControlLabel
                      className={classes.paletteFormControlLabel}
                      key={i}
                      value={option.toLowerCase()}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {!(option === "none") && renderPaletteOption(option)}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
