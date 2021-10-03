import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from "@mui/material";

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
