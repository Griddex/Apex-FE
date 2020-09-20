import React from "react";

const generateInitialTableRoles = (noOfTableRows) => {
  //Initial Table Roles
  const dataRowsExceptFirstTwo = new Array(noOfTableRows - 2).fill(2);
  const initialRolesProps = [0, 1, ...dataRowsExceptFirstTwo];
  return initialRolesProps;
};

export default generateInitialTableRoles;
