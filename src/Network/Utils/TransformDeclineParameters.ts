import {  IStoredDataRow } from "../../Application/Types/ApplicationTypes";
import { IBackendDeclineParametersRow } from "../Components/Dialogs/StoredNetworksDialogTypes"

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
            userId
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
        }
      ) as IStoredDataRow[];
  

    const snTransStoredData = transStoredData.map((row, i) => ({
      sn: i + 1,
      ...row,
    })) as IStoredDataRow[];

  
    return snTransStoredData;
  };

  export const cloneDeclineParameter = (
    currentRow: IStoredDataRow,
    noOfRows: number
  ) => {

    const { createdOn, description,
        id, title } = currentRow;

      const newRow = { 
        createdAt: createdOn, 
        description,
        forecastInputDeckId: "",
        id,
        projectId: "",
        title,
         userId: "Gabriel" } as IBackendDeclineParametersRow;
  
    return newRow;
  };