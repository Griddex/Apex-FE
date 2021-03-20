import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { SavedTextType } from "./Types";

const useStyles = makeStyles(() => ({
  saved: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: 32,
    fontSize: 14,
  },
}));

const savedColor = (savedText: SavedTextType) => {
  const theme = useTheme();

  switch (savedText) {
    case "Saved":
      return {
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.light,
      };

    case "Not Saved":
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

const Saved = ({ savedText }: { savedText: SavedTextType }) => {
  const classes = useStyles();
  const savedStyle = savedColor(savedText);

  return (
    <div className={classes.saved} style={savedStyle}>
      {savedText}
    </div>
  );
};

export default Saved;
