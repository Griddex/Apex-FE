import { IStoredDataRow } from "../../Application/Types/ApplicationTypes";

export const productionPrioritizationStoredWithSN = (
  productionPrioritizationStored: any[]
) => {
  const transStoredData = productionPrioritizationStored.map((row: any) => {
    const {
      createdAt,
      title,
      description,
      forecastInputDeckId,
      id,
      projectId,
      userId,
      typeOfPrioritization,
      typeOfStream,
      useSecondaryFacility,
    } = row;

    return {
      id: id,
      userId: userId,
      title: title,
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      description: description,
      createdOn: createdAt,
      modifiedOn: createdAt,
    };
  }) as IStoredDataRow[];

  const snTransStoredData = transStoredData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IStoredDataRow[];

  return snTransStoredData;
};

export const cloneProductionPrioritizationRow = (
  currentRow: IStoredDataRow,
  noOfRows: number
) => {
  const {
    approval,
    approvers,
    author,
    createdOn,
    description,
    id,
    modifiedOn,
    sn,
    title,
  } = currentRow;

  const newRow = {
    approval,
    approvers,
    author,
    createdOn,
    description,
    id,
    modifiedOn,
    sn: noOfRows + 1,
    title: "User",
    userId: "Gabriel",
    typeOfPrioritization: "",
    typeOfStream: "",
    useSecondaryFacility: "",
  };

  return newRow;
};
