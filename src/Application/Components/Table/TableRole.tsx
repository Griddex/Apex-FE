import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import uniq from "lodash/uniq";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  persistFileHeadersAction,
  persistFileUnitsAction,
  persistTableRolesIndicesAction,
} from "../../../Import/Redux/Actions/ImportActions";
import { RootState } from "../../Redux/Reducers/RootReducer";
import CircularArray from "../../Utils/CircularArray";
import { ITableRoles, ITableRolesProps, RoleNumberType } from "./TableTypes";

const useStyles = makeStyles(() => ({
  rolesRoot: {
    width: 80,
    height: 30,
  },
  tableRole: {
    border: (props: ITableRolesProps) => {
      const { rolesProps, roleNumber } = props;
      return `2px solid ${
        rolesProps && rolesProps.roleColors[roleNumber as number]
      }`;
    },
    color: (props: ITableRolesProps) => {
      const { rolesProps, roleNumber } = props;
      return `${rolesProps && rolesProps.roleColors[roleNumber as number]}`;
    },
  },
}));

const TableRole = (props: ITableRolesProps) => {
  const { rolesProps } = props;
  console.log(
    "Logged output --> ~ file: TableRole.tsx ~ line 38 ~ TableRole ~ props",
    props
  );
  const { i, roleNames } = rolesProps as ITableRoles;

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const tableRoleIndices = useSelector(
    (state: RootState) => state.importReducer.tableRoleIndices
  );

  const roleNumber: RoleNumberType = tableRoleIndices[i];
  const circularTableRoleNumbers = React.useRef(
    new CircularArray([0, 1, 2], roleNumber)
  );

  const tableData = useSelector(
    (state: RootState) => state.importReducer.tableData
  );
  const classes = useStyles({ roleNumber, rolesProps });

  return (
    <Button
      className={clsx(classes.rolesRoot, classes.tableRole)}
      onClick={(event) => {
        event.persist();

        const rowIndex = parseInt(i);
        const nextRoleNumber = circularTableRoleNumbers.current.next();
        if (nextRoleNumber === 2) {
          const newtableRoleIndices = tableRoleIndices.map(
            (roleNumber: number, j: number) => {
              if (j === rowIndex) return nextRoleNumber;
              else return roleNumber;
            }
          );

          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
        }
        //Units
        else if (nextRoleNumber === 1) {
          const newtableRoleIndices = tableRoleIndices.map(
            (roleNumber: number, j: number) => {
              if (j === rowIndex) return nextRoleNumber;
              else {
                if (roleNumber === 1) return 2;
                else return roleNumber;
              }
            }
          );

          dispatch(persistTableRolesIndicesAction(newtableRoleIndices));

          const newFileUnits = Object.values(tableData[rowIndex]);
          const fileUnitsUnique = uniq(newFileUnits).filter(
            (unit) => unit !== ""
          );
          dispatch(persistFileUnitsAction(newFileUnits, fileUnitsUnique));
        } else if (nextRoleNumber === 0) {
          //Headers
          const newtableRoleIndices = tableRoleIndices.map(
            (roleNumber: number, k: number) => {
              if (k === rowIndex) return nextRoleNumber;
              else {
                if (roleNumber === 0) return 2;
                else return roleNumber;
              }
            }
          );

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
