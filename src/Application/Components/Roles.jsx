import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  rolesRoot: {
    width: 80,
    height: 30,
  },
  roles: {
    border: (props) => `2px solid ${props.roles[props.index]}`,
    color: (props) => `${props.roles[props.index]}`,
  },
}));

const Roles = (props) => {
  const { rowIndex, texts } = props;
  const tableRowsRoles = useSelector(
    (state) => state.importReducer.tableRowsRoles
  );
  const [index, setIndex] = React.useState(tableRowsRoles[rowIndex]);
  const classes = useStyles({ index, ...props });

  return (
    <Button
      id={rowIndex}
      className={clsx(classes.rolesRoot, classes.roles)}
      onClick={(e) => {
        e.persist();
        const nextIndex = index + 1;
        if (nextIndex > texts.length - 1) setIndex(0);
        else setIndex(nextIndex);
      }}
      variant="outlined"
    >
      {texts[index]}
    </Button>
  );
};

export default Roles;
