import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import ApexFlexContainer from "../Styles/ApexFlexContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey["200"],
  },
}));

export interface INoSelectionPlaceholder {
  icon?: JSX.Element;
  text: string;
}

const NoSelectionPlaceholder = ({ icon, text }: INoSelectionPlaceholder) => {
  const classes = useStyles();

  return (
    <ApexFlexContainer flexDirection="column" className={classes.root}>
      {icon as JSX.Element}
      {text}
    </ApexFlexContainer>
  );
};

export default NoSelectionPlaceholder;
