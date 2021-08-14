import { TVariableNameTitleData } from "../Types/ApplicationTypes";
import { IVariableNameTitle } from "./../Types/ApplicationTypes";

const swapVariableNameTitleForISelectOption = (
  data: TVariableNameTitleData
) => {
  const definedData = data.filter(
    (row) => row.variableTitle !== "" && row.variableName !== ""
  );

  const newData = definedData.map((row: IVariableNameTitle) => {
    return { value: row["variableName"], label: row["variableTitle"] };
  });

  return newData;
};

export default swapVariableNameTitleForISelectOption;
