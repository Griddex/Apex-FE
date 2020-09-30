const generatelTableRolesIndices = (noOfTableRows) => {
  //Initial Table Roles
  const dataRowsExceptFirstTwo = new Array(noOfTableRows - 2).fill(2);
  const initialRolesProps = [0, 1, ...dataRowsExceptFirstTwo];
  return initialRolesProps;
};

export default generatelTableRolesIndices;
