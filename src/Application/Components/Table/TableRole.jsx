import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  persistTableRolesIndicesAction,
  persistFileHeadersAction,
  persistFileUnitsAction,
} from "../../../Import/Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rolesRoot: {
    width: 80,
    height: 30,
  },
  tableRole: {
    border: (props) => `2px solid ${props.roleColors[props.roleNumber]}`,
    color: (props) => `${props.roleColors[props.roleNumber]}`,
  },
}));

const TableRole = ({ i, roleNames, roleColors, tableRoleIndices }) => {
  const dispatch = useDispatch();

  const [roleNumber, setRoleNumber] = React.useState(tableRoleIndices[i]);
  const tableData = useSelector((state) => state.importReducer.tableData);

  const classes = useStyles({ roleNumber, roleColors });

  return (
    <Button
      name={i.toString()}
      className={clsx(classes.rolesRoot, classes.tableRole)}
      onClick={(event) => {
        event.persist();
        const nextRolesIndex = roleNumber + 1;
        const rowIndex = parseInt(event.target.name);

        if (nextRolesIndex > roleNames.length - 1) {
          setRoleNumber(0);

          //check indices if there is a zero, if so change it to 2
          const newtableRoleIndices = tableRoleIndices.map((roleNumber, i) => {
            if (i !== rowIndex && roleNumber === 0) return 2;
            else return roleNumber;
          });
          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
          const newFileHeaders = Object.values(tableData[rowIndex]);
          dispatch(persistFileHeadersAction(newFileHeaders));
        } else {
          setRoleNumber(nextRolesIndex);

          if (roleNumber === 1) {
            //check indices if there is a zero, if so change it to 2
            const newtableRoleIndices = tableRoleIndices.map(
              (roleNumber, i) => {
                if (i !== rowIndex && roleNumber === 1) return 2;
                else return roleNumber;
              }
            );
            dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
            const newFileUnits = Object.values(tableData[rowIndex]);
            dispatch(persistFileUnitsAction(newFileUnits));
          }
        }
      }}
      variant="outlined"
    >
      {roleNames[roleNumber]}
    </Button>
  );
};

export default TableRole;
