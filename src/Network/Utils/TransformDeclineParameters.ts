import { IStoredDataRow } from "../../Application/Types/ApplicationTypes";
import { IBackendDeclineParametersRow } from "../Components/Dialogs/StoredNetworksDialogTypes";

export const declineParametersStoredWithSN = (
  declineParametersStored: IBackendDeclineParametersRow[]
) => {
  const transStoredData = declineParametersStored.map(
    (row: IBackendDeclineParametersRow) => {
      const {
        createdAt,
        title,
        description,
        id,
        forecastInputDeckId,
        forecastInputdeckTitle,
      } = row;

      return {
        id: id,
        forecastInputDeckId,
        title: title,
        forecastInputdeckTitle,
        approval: "Not Started",
        author: { avatarUrl: "", name: "None" },
        approvers: [{ avatarUrl: "", name: "" }],
        description: description,
        createdOn: createdAt,
        modifiedOn: createdAt,
      };
    }
  ) as IStoredDataRow[];

  const snTransStoredData = transStoredData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IStoredDataRow[];

  return snTransStoredData;
};

export const cloneDeclineParameter = (currentRow: IStoredDataRow) => {
  const { createdOn, description, forecastInputdeckTitle } = currentRow;

  const newRow = {
    id: "",
    forecastInputDeckId: "",
    forecastInputdeckTitle,
    projectId: "",
    title: "New Title",
    description,
    type: "User",
    createdAt: createdOn,
  } as IBackendDeclineParametersRow;

  return newRow;
};
