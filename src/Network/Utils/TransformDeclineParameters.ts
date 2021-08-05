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
            forecastInputDeckId,
            id,
            projectId,
            userId
          } = row;
    
    
          return {
            id: id,
            userId: userId,
            title: title,
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

    const { approval, approvers, author, createdOn, description,
        id, modifiedOn, sn, title } = currentRow;


      const newRow = { approval, approvers, author, createdOn, description,
        id, modifiedOn, sn: noOfRows+1, title: "User", userId: "Gabriel" } as IStoredDataRow;
  
    return newRow;
  };