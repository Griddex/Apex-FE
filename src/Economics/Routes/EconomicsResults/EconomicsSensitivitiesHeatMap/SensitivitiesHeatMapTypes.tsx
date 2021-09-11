import { TUseState } from "../../../../Application/Types/ApplicationTypes";

export interface ISensitivitiesHeatMap {
  selectedZ: string;
  setSelectedZ: TUseState<string>;
}
