import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { DeckValidationTextType } from "./DeckValidationTypes";

const useStyles = makeStyles(() => ({
  deckValidation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 32,
    fontSize: 14,
  },
}));

const deckValidationColor = (deckValidationText: DeckValidationTextType) => {
  const theme = useTheme();

  switch (deckValidationText) {
    case "Warning":
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };

    case "Error":
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };

    default:
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };
  }
};

const DeckValidation = ({
  deckValidationText,
}: {
  deckValidationText: DeckValidationTextType;
}) => {
  const classes = useStyles();
  const deckValidationStyle = deckValidationColor(deckValidationText);

  return (
    <div className={classes.deckValidation} style={deckValidationStyle}>
      {deckValidationText}
    </div>
  );
};

export default DeckValidation;
