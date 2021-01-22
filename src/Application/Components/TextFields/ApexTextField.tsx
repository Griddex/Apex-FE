import { makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateRegistrationFormAction } from "../../../Administration/Redux/Actions/AdminActions";
import AnalyticsTitle from "./../Basic/AnalyticsTitle";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 200,
    backgroundColor: "#F7F7F7",
    "&:hover": { border: `2px solid ${theme.palette.primary.light}` },
    "&:focused": { border: `2px solid ${theme.palette.primary.main}` },
  },
}));

export interface IApexTextField {
  title: string;
  titleStyle?: CSSProperties;
  textFieldName: string;
  textFieldInitialValue?: React.Key;
  textFieldStyle?: CSSProperties;
  apexAction: typeof updateRegistrationFormAction;
}

const ApexTextField = ({
  title,
  titleStyle,
  textFieldName,
  textFieldInitialValue,
  textFieldStyle,
  apexAction,
}: IApexTextField) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(textFieldInitialValue);
  const handleChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    setValue(value);
    apexAction && dispatch(apexAction(name, value));
  };

  return (
    <div>
      <AnalyticsTitle title={title} titleStyle={titleStyle} />
      <input
        name={textFieldName}
        className={classes.input}
        style={textFieldStyle}
        type="input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default ApexTextField;
