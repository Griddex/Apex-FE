import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  persistTableRolesIndicesAction,
  persistFileHeadersAction,
  persistFileUnitsAndUniqueUnitsAction,
} from "../../Import/Redux/Actions/ImportActions";

const useStyles = makeStyles(() => ({
  rolesRoot: {
    width: 80,
    height: 30,
  },
  tableRoles: {
    border: (props) => `2px solid ${props.roles[props.index]}`,
    color: (props) => `${props.roles[props.index]}`,
  },
}));

const TableRoles = (props) => {
  const dispatch = useDispatch();
  const { rowIndex, texts } = props;

  const tableRoles = useSelector((state) => state.importReducer.tableRoles);
  const tableData = useSelector((state) => state.importReducer.tableData);
  const [index, setIndex] = React.useState(tableRoles[rowIndex]);
  const classes = useStyles({ index, ...props });

  const guardHeadersUnitsRow = (index, rowIndex, roleNumber) => {
    if (index === roleNumber) {
      const updatedTableRoles = tableRoles.map((role, i) => {
        if (role === roleNumber && i !== rowIndex) return 2;
        else return role;
      });

      dispatch(persistTableRolesIndicesAction(updatedTableRoles));
    }
  };

  return (
    <Button
      id={rowIndex}
      className={clsx(classes.rolesRoot, classes.tableRoles)}
      onClick={(event) => {
        event.persist();
        const nextIndex = index + 1;
        if (nextIndex > texts.length - 1) setIndex(0);
        else setIndex(nextIndex);
        if (index === 0) {
          const fileHeaders = Object.values(tableData[rowIndex]);

          guardHeadersUnitsRow(index, rowIndex, 0);
          dispatch(persistFileHeadersAction(fileHeaders));
        }

        //if headers or units is selected, ensure no other row
        //is a headers or units row
        if (index === 1) {
          const fileUnits = Object.values(tableData[rowIndex]);

          guardHeadersUnitsRow(index, rowIndex, 1);
          dispatch(persistFileUnitsAndUniqueUnitsAction(fileUnits));
        }
      }}
      variant="outlined"
    >
      {texts[index]}
    </Button>
  );
};

export default TableRoles;
