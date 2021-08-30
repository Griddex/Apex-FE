import { makeStyles, TextField } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import AnalyticsTitle from "../Basic/AnalyticsTitle";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 200,
    marginLeft: 20,
    backgroundColor: "#F7F7F7",
    ".MuiInputBase-input:hover": "none",
    "&:focused": { border: `2px solid ${theme.palette.primary.main}` },
  },
}));

export interface IApexMuiTextField {
  title: string;
  titleStyle?: CSSProperties;
  textFieldName: string;
  textFieldInitialValue?: React.Key;
  textFieldStyle?: CSSProperties;
  action: (event: React.ChangeEvent<any>) => void;
  helperText?: string;
  required?: boolean;
  autoFocus?: boolean;
  type?: "password";
}

const ApexMuiTextField = ({
  title,
  titleStyle,
  textFieldName,
  textFieldInitialValue,
  textFieldStyle,
  action,
  helperText,
  required,
  autoFocus,
  type,
}: IApexMuiTextField) => {
  const classes = useStyles();

  return (
    <div>
      <AnalyticsTitle title={title} titleStyle={titleStyle} />

      <TextField
        name={textFieldName}
        className={classes.input}
        variant="outlined"
        style={textFieldStyle}
        helperText={helperText}
        error={Boolean(helperText)}
        value={textFieldInitialValue}
        onChange={action}
        required={required}
        autoFocus={autoFocus}
        type={type}
        fullWidth
      />
    </div>
  );
};

export default ApexMuiTextField;
