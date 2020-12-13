import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    padding: 3,
    border: "1px solid #F7F7F7",
    backgroundColor: "#F7F7F7",
  },
}));

interface IMainTitleProps {
  title: string;
}

const MainTitle: React.FC<IMainTitleProps> = ({ title }) => {
  const classes = useStyles();

  return <Typography className={classes.mainTitle}>{title}</Typography>;
};

export default MainTitle;
