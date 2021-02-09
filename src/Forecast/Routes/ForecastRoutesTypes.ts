import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

export interface IForecastRoutes {
  wrkflwCtgry: "existingDataWorkflows";
  wrkflwPrcss: IExistingDataProps["wkPs"];
  showChart?: boolean;
  finalAction?: () => void;
}
