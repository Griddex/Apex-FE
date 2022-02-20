import {
  IExtendedSelectOption,
  IIdNameTitlePathOption,
} from "../../Application/Components/Selects/SelectItemsType";
import { TUseState } from "../../Application/Types/ApplicationTypes";

const generateVariableDataOptions = (
  variableOptions: Record<string, IIdNameTitlePathOption>,
  setSelectedZ?: TUseState<any>
) => {
  const zId = Object.keys(variableOptions)[0];
  const zObj = variableOptions[zId];

  let ZValuesTitle = "";
  let zStrValues = "";
  let variableZDataOptions = [] as IExtendedSelectOption[];

  if (Object.keys(variableOptions).length > 0) {
    const parts = zObj?.title?.split("_");
    ZValuesTitle = parts[0];
    zStrValues = parts[1];

    variableZDataOptions = zStrValues?.split("-")?.map((v: string) => {
      return {
        value: v,
        label: v,
        handleCheck: () => setSelectedZ && setSelectedZ(v),
      };
    });
  }

  return { variableZDataOptions, ZValuesTitle };
};

export default generateVariableDataOptions;
