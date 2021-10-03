import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateRegistrationFormAction } from "../../Redux/Actions/UserActions";

const useStyles = makeStyles((theme) => ({
  regScenario: {
    width: "100%",
    height: 50,
  },
}));

const RegistrationScenarios = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [registrationScenario, setRegistrationScenario] =
    React.useState("single");

  const handleRegistrationScenarioChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    setRegistrationScenario(value);

    updateRegistrationFormAction &&
      dispatch(updateRegistrationFormAction(name, value));
  };
  return (
    <div className={classes.regScenario}>
      <RadioGroup
        value={registrationScenario}
        onChange={handleRegistrationScenarioChange}
        style={{ flexDirection: "row" }}
      >
        <FormControlLabel
          value="single"
          control={<Radio />}
          label="Single User"
        />
        <FormControlLabel
          value="multiple"
          control={<Radio />}
          label="Multiple Users"
        />
      </RadioGroup>
    </div>
  );
};

export default RegistrationScenarios;
