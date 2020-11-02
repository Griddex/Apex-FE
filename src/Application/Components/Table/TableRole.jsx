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
import CircularArray from "./../../Utils/CircularArray";
import { useSnackbar } from "notistack";
import uniq from "lodash.uniq";

const useStyles = makeStyles(() => ({
  rolesRoot: {
    width: 80,
    height: 30,
  },
  tableRole: {
    border: (props) => `2px solid ${props.roleColors[props.roleNumber]}`,
    color: (props) => `${props.roleColors[props.roleNumber]}`,
  },
}));

const TableRole = ({ i, roleNames, roleColors }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const tableRoleIndices = useSelector(
    (state) => state.importReducer.tableRoleIndices
  );

  const roleNumber = tableRoleIndices[i];
  const circularTableRoleNumbers = React.useRef(
    new CircularArray([0, 1, 2], roleNumber)
  );

  const tableData = useSelector((state) => state.importReducer.tableData);
  const classes = useStyles({ roleNumber, roleColors });

  return (
    <Button
      className={clsx(classes.rolesRoot, classes.tableRole)}
      onClick={(event) => {
        event.persist();

        const rowIndex = parseInt(i);
        const nextRoleNumber = circularTableRoleNumbers.current.next();
        if (nextRoleNumber === 2) {
          const newtableRoleIndices = tableRoleIndices.map((roleNumber, j) => {
            if (j === rowIndex) return nextRoleNumber;
            else return roleNumber;
          });

          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
        }
        //Units
        else if (nextRoleNumber === 1) {
          const newtableRoleIndices = tableRoleIndices.map((roleNumber, j) => {
            if (j === rowIndex) return nextRoleNumber;
            else {
              if (roleNumber === 1) return 2;
              else return roleNumber;
            }
          });

          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));

          const newFileUnits = Object.values(tableData[rowIndex]);
          const fileUnitsUnique = uniq(newFileUnits).filter(
            (unit) => unit !== ""
          );
          dispatch(persistFileUnitsAction(newFileUnits, fileUnitsUnique));
        } else if (nextRoleNumber === 0) {
          //Headers
          const newtableRoleIndices = tableRoleIndices.map((roleNumber, k) => {
            if (k === rowIndex) return nextRoleNumber;
            else {
              if (roleNumber === 0) return 2;
              else return roleNumber;
            }
          });

          const newFileHeaders = Object.values(tableData[rowIndex]);
          const newFileHeadersTrueFalse = newFileHeaders.map((header) => {
            if (header) {
              return true;
            } else {
              return false;
            }
          });

          const isAnyHeaderMissing = newFileHeadersTrueFalse.some(
            (b) => b === false
          );
          if (isAnyHeaderMissing) {
            enqueueSnackbar("Some headers are missing", {
              persist: true,
              variant: "error",
            });
          }

          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
          dispatch(persistFileHeadersAction(newFileHeaders));
        }
      }}
      variant="outlined"
    >
      {roleNames[roleNumber]}
    </Button>
  );
};

export default React.memo(TableRole);
